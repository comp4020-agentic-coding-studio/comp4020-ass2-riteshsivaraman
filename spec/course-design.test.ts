import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// These checks sensor the design promises SLOP3841 makes that the build does
// not already enforce. The build owns compilation, accessibility, base-path
// links, dangling and self refs, per-assessment criterion weights, and schema
// validity; `data-integrity.test.ts` owns dates-in-period. None of that is
// restated here — every check below targets a promise nothing else measures.

interface ApiNode {
  id: string;
  type: string;
  title: string;
  related?: string[];
  meta?: Record<string, unknown>;
  body?: string;
}

interface CourseApi {
  nodes: ApiNode[];
  edges: { from: string; to: string }[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((node) => node.type === type);
const num = (value: unknown): number => Number(value);

describe("assessment weighting", () => {
  // The brief requires staged process marking. Nothing in the platform checks
  // weights *across* assessments — `content.config.ts` only checks that one
  // assessment's criteria sum to 100 — so a ladder summing to 95 would ship.
  it("stages the mark across at least three assessments summing to 100", () => {
    const assessments = byType("assessments");
    expect(assessments.length, "fewer than three assessments is not staged marking").toBeGreaterThanOrEqual(3);

    const total = assessments.reduce((sum, node) => sum + num(node.meta?.weight), 0);
    expect(total, `assessment weights sum to ${total}, not 100`).toBe(100);
  });

  it("lets no single assessment carry more than half the mark", () => {
    for (const node of byType("assessments")) {
      const weight = num(node.meta?.weight);
      expect(weight, `${node.id} carries ${weight}%, which makes the rest decorative`).toBeLessThanOrEqual(50);
    }
  });
});

describe("the teaching calendar", () => {
  // The schema validates that `week` is 1..12. It says nothing about the set
  // being complete, so week 5 three times and no week 7 builds cleanly.
  it("has exactly one session and one lecture for each of weeks 1 to 12", () => {
    for (const type of ["sessions", "lectures"]) {
      const weeks = byType(type).map((node) => num(node.meta?.week)).sort((a, b) => a - b);
      expect(weeks, `${type} does not cover weeks 1-12 exactly once each`).toEqual(
        Array.from({ length: 12 }, (_, index) => index + 1),
      );
    }
  });

  it("keeps week dates in order and roughly a week apart", () => {
    // Catches a copy-pasted date that is inside the teaching period — so
    // `data-integrity` passes — but out of sequence for its week number.
    for (const type of ["sessions", "lectures"]) {
      const dated = byType(type)
        .map((node) => ({ id: node.id, week: num(node.meta?.week), date: String(node.meta?.date).slice(0, 10) }))
        .sort((a, b) => a.week - b.week);

      for (let index = 1; index < dated.length; index += 1) {
        const previous = dated[index - 1];
        const current = dated[index];
        const gapDays = (Date.parse(current.date) - Date.parse(previous.date)) / 86_400_000;
        expect(gapDays, `${current.id} is not after ${previous.id}`).toBeGreaterThan(0);
        // 7 normally; 14 across the single teaching break between weeks 6 and 7.
        expect(gapDays, `${previous.id} to ${current.id} is a ${gapDays}-day gap`).toBeLessThanOrEqual(14);
      }
    }
  });
});

describe("no fixed weekly tutorial template", () => {
  // The most fragile promise in the course design, and the direct answer to
  // Assignment 1's lesson that an unmeasured quality decays to zero.
  it("runs at least six distinct tutorial formats across the twelve weeks", () => {
    const formats = new Set(byType("sessions").map((node) => String(node.meta?.format)));
    expect(formats.size, `only ${formats.size} distinct tutorial formats`).toBeGreaterThanOrEqual(6);
  });

  it("does not open two session pages with the same sentence", () => {
    // The API carries frontmatter but not bodies, so this reads the rendered
    // page. Guarded with existsSync: these files are read at test time, and a
    // missing path would throw a uselessly generic error instead of failing
    // as the check it is.
    const openings = new Map<string, string>();
    for (const node of byType("sessions")) {
      const path = resolve(`dist/${node.id}/index.html`);
      expect(existsSync(path), `${node.id} did not render to ${path}`).toBe(true);

      const main = readFileSync(path, "utf8").match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
      const firstProse = main
        .replace(/<h1[\s\S]*?<\/h1>/, "")
        .replace(/<p class="lead"[\s\S]*?<\/p>/, "")
        .replace(/<p><strong>[\s\S]*?<\/strong><\/p>/, "")
        .match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";

      const opening = firstProse.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().toLowerCase().slice(0, 40);
      expect(opening.length, `${node.id} has no opening prose`).toBeGreaterThan(0);

      const clash = openings.get(opening);
      expect(clash, `${node.id} opens identically to ${clash}`).toBeUndefined();
      openings.set(opening, node.id);
    }
  });
});

describe("lateral browsing", () => {
  // The build rejects *broken* edges and says nothing about *absent* ones, so
  // a node with no edges at all is a silent dead end in a site that promises
  // you can wander sideways through it.
  it("leaves no node isolated in the graph", () => {
    for (const node of api.nodes) {
      expect(node.related?.length ?? 0, `${node.id} has no related nodes`).toBeGreaterThan(0);
    }
  });

  it("links every week's session to that week's lecture", () => {
    const linked = new Set(api.edges.map((edge) => `${edge.from}|${edge.to}`));
    for (let week = 1; week <= 12; week += 1) {
      const padded = String(week).padStart(2, "0");
      const forward = `sessions/week-${padded}|lectures/week-${padded}`;
      const backward = `lectures/week-${padded}|sessions/week-${padded}`;
      expect(
        linked.has(forward) || linked.has(backward),
        `week ${week}'s session and lecture are not linked to each other`,
      ).toBe(true);
    }
  });
});
