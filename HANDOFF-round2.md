# Handoff — pilot-a round 2 feedback, orchestrator takeover

Written because the previous session's context filled up mid-investigation.
The next session should run as an **orchestrator**: stay as Ritesh's main
point of contact, keep its own context light, and delegate all actual file
edits to subagents per the `## Agent team` rules in `CLAUDE.md` — read that
section again before assembling a team, it's binding, not a suggestion.

Read `WORKLOG.md` in full first (per `## Session handoff` in `CLAUDE.md`),
then this file, then `PLAN.md`. This file is the live-task handoff; the
other two are the standing record.

## Where things stand

Round one of feedback on `design/pilot-a/` (a standalone, Astro-independent
copy of "Kinetic Manifesto" Design A with real SLOP3841 content) was fully
resolved and committed as `3b78a30`. That covered: hero text, kinetic-engine
`--kv-wdth` clamp narrowed to 78–96, rotator scramble-replay debounce, rail
rAF-throttling, sticky rail fix, spine reworded to untimed discussion points,
a resources model, and `deck.html` repurposed from one week's lecture into a
12-slide one-per-week pitch deck. Full detail is in `WORKLOG.md`'s
2026-09-20 entry and `LEARNINGS.md`.

Ritesh then reviewed that round's output and gave six further points of
feedback (quoted verbatim in `prompt-log.md`'s second 2026-09-20 entry — read
that entry, it's the exact spec). **None of round two has been implemented
yet.** No files have changed since `3b78a30` except `prompt-log.md`. This
handoff file itself is the only other change, about to be committed.

## The six open items (this is the task)

1. **Kinetic-engine stretch is still visibly wrong.** Round one narrowed the
   `--kv-wdth` swing to 78–96, which reduced but did not eliminate line-count
   changes on `.d`/`.hl` elements as the velocity-driven font-variation axis
   animates. Ritesh's actual requirement, stated precisely: *"only maintains
   the same number of lines as the text does in its natural state, and only
   stretches it out horizontally, not vertically."* That's a hard guarantee,
   not a narrower probability. A numeric clamp alone cannot promise this
   across arbitrary viewport widths and content lengths — the fix likely
   needs to measure each `[data-kin]`/`.hl` element's natural (resting) line
   count and either (a) pin its block-size/height so any reflow is visually
   absorbed without changing line count, extended from the `white-space:
   nowrap` + fixed `em` height trick already applied to the hero's four
   `.hl` lines in round one, out to every other `.d`-styled element that
   animates on the axis (week-card titles, section heads, etc.), or (b)
   compute a per-element safe wdth range from its own container width rather
   than one global 78–96 constant. Needs a design decision before
   implementation — this is the one item worth spending orchestrator
   reasoning on rather than just delegating blind.
   - Relevant code: `:root{--kv-wght:300;--kv-wdth:96}` and `.d{...
     font-variation-settings:"wght" var(--kv-wght),"wdth" var(--kv-wdth)}` in
     each page's `<style>`; the `tick()` function that writes those vars
     from scroll velocity (`index.html` ~633-634, also in `week-01.html`/
     `week-07.html`); the reduced-motion override
     `:root{--kv-wght:380;--kv-wdth:112}`.

2. **Rail links need smooth-scroll.** On week pages, the `.rail` section
   sub-nav (`<a href="#lecture">` etc., see `week-07.html` CSS at line
   111-129 for the rail styling) currently relies on default browser anchor
   jump behaviour. Needs explicit `e.preventDefault()` + Lenis
   `lenis.scrollTo(target, {...})` wiring on click. Apply to `week-01.html`
   and `week-07.html` now, and treat it as the pattern for every future week
   page — so the fix should live somewhere reusable (a shared inline script
   block, copied verbatim across week pages the way the rest of the kinetic
   engine already is).

3. **Masthead nav is inconsistent site-wide — build the real hierarchy.**
   Confirmed by direct read: every page currently has a bespoke
   `.mast__nav` link set (`index.html`: Home/Week 07/Deck; `week-01.html`/
   `week-07.html`: Home/Week 0N/Deck; `deck.html`: Home/Resources/Deck;
   `resources.html`/`policies.html`/`support.html`/`assessments.html`:
   Home/Deck/[self]). Round one's `WORKLOG.md` entry already sketched but
   never built a consistent model: masthead `Home · Weeks · Deck ·
   Assessments`, colophon `People · Policies · Resources`. Round two requires
   **actually implementing** this identically across every existing page,
   which also requires **creating `weeks.html`** (does not exist yet) as a
   12-tile index reusing the `.wk` card component, since "Weeks" needs a
   real destination. Every page must be reachable in 1-2 clicks.

4. **Enable native sideways/swipe scroll on the pinned 12-week horizontal
   act**, on top of its existing GSAP scroll-scrub. `index.html`'s
   `.act__view#actView` (line 411, already has `role="region"
   aria-label="Week schedule, scrolls horizontally"` — the label already
   overclaims). The pin mechanism is `ScrollTrigger.matchMedia({"(min-width:
   901px)": ...})` at ~line 723-748, driving `gsap.to(track, {x: ...,
   scrollTrigger: {pin:true, scrub:0.6, ...}})`. Below 900px it already
   degrades to a native `overflow-x:auto` snap strip (confirmed: `.act__view
   {overflow-x:auto}` and `.wk{width:84vw}` in the `@media(max-width:760px)`
   reduced-motion-adjacent block around line 344-345, plus a `scroll` event
   listener at line 753-760 that already updates the week counter for the
   native-scroll case). So the native/swipe path may already substantially
   exist below certain breakpoints — the gap is enabling it **above** 900px
   too, concurrently with the GSAP pin, without the two mechanisms fighting
   over `track`'s transform. Needs care: this is the trickiest item
   technically.

5. **Replace placeholder content with real content — four files, one new
   page.** Confirmed via `grep -ln "placeholder" *.html` in `design/pilot-a/`
   that exactly `assessments.html`, `policies.html`, `support.html`,
   `resources.html` contain placeholder language ("This page is a
   placeholder for the full port"). Ritesh's framing: *"For this prototype
   (with not all the weeks ported yet), I want it to essentially be a subset
   of the final website, so replace every placeholder instance with real
   course content."* Fewer pages/weeks is fine; no page should read as a
   stub. Source all real content from `CURRICULUM.md`:
   - `assessments.html` — `CURRICULUM.md §4` has the full real ladder: A1-A4
     slugs, weights (20/25/10/45), due dates, "Submits" descriptions, full
     weighted-criteria tables. Transcribe, don't invent.
   - `policies.html` — `CURRICULUM.md` week 1 and week 4 briefs plus the
     week-9 safety-net section (§4) already describe the real
     late-submission / extension / invented-record boundary content that
     belongs here.
   - `support.html` — `CURRICULUM.md §5` names Margot Tse (practice fellow)
     as the real contact for week-9 route declarations, extensions, and
     wellbeing-adjacent application stress — genuine, already-written
     content, not fabricated.
   - `resources.html` — already has a real structural model (four
     `<section>`s: Lecture Slides linking `deck.html#s1`..`#s12`,
     Assessment Briefs & Rubrics, Policies, Support) from round one; only
     its lead paragraph currently reads as placeholder-acknowledging and
     needs rewriting to sound like a finished page describing a genuine
     (if partial) subset.
   - **`people.html` does not exist yet** and should be created — `§5` of
     `CURRICULUM.md` has five real staff bios (slugs, roles, streams,
     in-voice bio direction) ready to transcribe. Needed for the nav
     hierarchy in item 3 to have a real destination for "People."

6. **`.wk` card layout: title below the number.** In `index.html`'s
   `.act__view`, each `<article class="wk">` currently orders `.wk__n`
   (big number) → `.wk__d` (description paragraph) → `.wk__t`
   (`<h3>` title). Content is already real and correct for all 12 cards
   (verified, not placeholder) — this is a pure DOM-reorder-plus-CSS task:
   move `.wk__t` to sit directly after `.wk__n`, before `.wk__d`, and check
   the `.wk__n`/`.wk__t`/`.wk__d` CSS block (search `.wk__n{` in
   `index.html`'s `<style>`) for any `order:` or flex assumptions that also
   need updating so the visual order matches the new DOM order.

## Orchestration guidance

Per `CLAUDE.md`'s `## Agent team` section: assemble subagents fitted to this
specific task, not a fixed pipeline; let them message each other directly
instead of routing through you; **you are the sole committer and the sole
build-runner** — subagents write files and report, never touch git, never
run `pnpm check` (this repo has no `pnpm check` inside `design/pilot-a/`
since it's a standalone static HTML pilot outside the Astro build, but the
same discipline applies: only you verify).

Suggested split, each a disjoint write scope (no file has two owners in one
wave):
- **Item 1 (kinetic engine)** is architecturally the riskiest and touches
  shared `<style>`/script blocks duplicated across `index.html`,
  `week-01.html`, `week-07.html` — consider doing the design thinking
  yourself (or with one agent) before implementation, since it needs a
  decision (measure-and-pin vs. per-element-range) more than it needs typing.
- **Item 3 (nav hierarchy) + item 6 (`weeks.html` creation)** are one
  agent's scope: touching every existing HTML file's masthead/colophon plus
  creating `weeks.html`.
- **Item 5 (real content)** is naturally 1 agent per stub file
  (`assessments.html`, `policies.html`, `support.html`, `resources.html`
  lead-paragraph rewrite, new `people.html`) — these are disjoint files, safe
  to run concurrently, each agent handed the exact `CURRICULUM.md` section it
  needs rather than the whole file.
- **Item 2 (rail smooth-scroll)** and **item 6 (`.wk` reorder)** are small,
  can go to one agent each or be folded into whichever agent already owns
  `index.html`/week pages that wave.
- **Item 4 (horizontal swipe)** is technically the trickiest — needs to
  understand the existing `matchMedia`/`ScrollTrigger` pin before touching
  it. Give it its own agent with the full context in the "open items"
  section above, not a one-line instruction.

After each wave, you (the orchestrator) do the actual file review, run
`pnpm check` / open the pages in a way you can verify (or hand a checklist
back to Ritesh per the `## Design and content direction` rule — "every time
a frontend change needs the user's own eyes, hand over an exact checklist,
not 'take a look'"), then commit. Log new prompts to `prompt-log.md`
yourself as they arrive; don't delegate that.

## Standing project rules that bite here

- `published: false` is banned elsewhere in the Astro site, not relevant to
  `design/pilot-a/` (plain static HTML, no frontmatter) — don't let that
  rule bleed into this work by habit.
- No amend/rebase/force-push, ever, for the rest of this assignment — flat
  ban, not ask-first.
- Every placeholder-string removal should be re-verified the same way round
  one was: `grep -ln "placeholder" design/pilot-a/*.html` after edits should
  return nothing.
- Update `LEARNINGS.md` with whatever the item-1 fix turns out to be (the
  round-one clamp-narrowing entry should get a follow-up noting it was
  insufficient and what actually fixed it) and `WORKLOG.md` with a new
  dated entry once round two lands.

## Files to read before starting

- `WORKLOG.md` — full 2026-09-20 entry, the nav-hierarchy sketch this round
  must actually build.
- `prompt-log.md` — the verbatim six-point feedback, second 2026-09-20 entry.
- `LEARNINGS.md` — the `--kv-wdth` bug entry (currently marked mitigated by
  the 78–96 clamp; that mitigation is now known-insufficient).
- `CURRICULUM.md` — `§4` (assessments), `§5` (staff bios), week 1/4/9
  sections (policy content), for the real-content authoring in item 5.
- `design/pilot-a/index.html`, `week-01.html`, `week-07.html`, `deck.html`,
  `resources.html`, `policies.html`, `support.html`, `assessments.html` —
  current state of every file in scope.
