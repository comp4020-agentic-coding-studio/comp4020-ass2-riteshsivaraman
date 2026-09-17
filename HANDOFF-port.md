# Handoff — port the SLOP3841 curriculum onto the option A design

Written 2026-09-17. Next session's job: **plan** the port of the existing
course content onto the chosen design. Planning first, not building.

## Read these first, in this order

1. `CLAUDE.md` — project harness. Non-negotiable; it overrides defaults.
2. `WORKLOG.md` — reasoning behind each decision to date.
3. `PLAN.md` — execution order and what is already done.
4. `LEARNINGS.md` — especially the two gotchas added at `c9c50aa`, which are
   about agent supervision and are directly relevant to running this port.
5. `design/option-a/README.md` — the chosen design's palette, type stack,
   motion inventory and port risks. **This is the spec for the port.**

## The decision that was made

The site's front end was judged a poor structural duplicate of the COMP4020
site — the notepad rebrand at `d7fe9a8` changed the skin and left the layout
grammar. Three fresh directions were built as standalone demos blind to
`src/`, then narrowed.

**Chosen: `design/option-a/` — "Kinetic Manifesto", unmodified.**

Scrapped but kept on disk: `design/option-b/` (Instrument), `design/option-c/`
(Tactile Stage), and two variants `design/option-a-v2/` (REGISTER) and
`design/option-a-v3/` (LECTURE). Do not delete any of them. Commits `aaf45b9`,
`318e041`, `9a9a7b2`.

## Three known defects the user chose not to fix, and should be re-offered

The user criticised option A on three counts, then selected it unmodified
anyway. **Each was already solved in `design/option-a-v2/`, and each fix is
small and independently portable.** Raise these once, early, as a costed
choice — do not silently carry them into the port and do not silently fix
them either.

1. **Reflow glitch (a real bug).** `--kv-wdth` animates 50–150. When an
   animated headline narrows it re-wraps from two lines to one, block height
   changes, content below jumps. v2's fix is three locks: `white-space:
   nowrap` so line count cannot change, height reserved in `em` so it is
   independent of glyph widths, and a clamped range (78–96) so nowrap cannot
   trade reflow for overflow. Verified there by driving the axes through 21
   steps and recording element height, next-element top and `scrollHeight` —
   single-valued across all samples. Reuse that harness rather than rebuilding.
2. **Stretched display type is hard to read.** Addressed in v2 by the same
   axis clamp.
3. **Reads editorial rather than as a course site.** `frontend-design` names
   "broadsheet layout, hairline rules, dense newspaper columns" as one of
   three looks AI design defaults to regardless of subject, and option A sits
   on it — as does its bone+vermilion palette. v2 answered this structurally
   (a real syllabus table) and moved the accent to indigo `#22309B`. This is
   the largest of the three and the least mechanical.

Worth also offering: v3's body-type discipline (18px serif, 1.62 line-height,
capped measures), which is a cheap legibility win independent of the above.

## What the port actually is

Smaller than it sounds. Measured, not estimated:

- 55 content files, ~18,800 words — **the curriculum is already written.**
- 15 `.astro` pages, 6 `.mdx`, 8 components in `src/components/`:
  `AssessmentsGrid`, `GlossaryList`, `LecturesGrid`, `MarkingModel`,
  `PeopleGrid`, `SemesterTracker`, `SessionsGrid`, `TeachingTeam`.

So this is a re-skin — token system, base layout, nav, eight components, then
walk the pages — not an authoring job. Plan it that way.

### Option A's technical surface

Three Google families: `Anybody` (variable display, the axis range matters),
`Newsreader`, `Martian Mono`. Two custom properties carry the signature:
`--kv-wght` and `--kv-wdth`.

**The top port risk, from A's README:** those axis properties must live on
`:root` in a *global* stylesheet. Under Astro's scoped-style hashing,
`font-variation-settings` silently reads stale values — nothing errors, the
type just stops moving. Verify the signature still animates after the first
component is ported, not at the end.

Second risk: `rgba(237,235,228,.78)` body copy on the ink ground is A's most
likely single axe failure.

## Constraints that bite

From `CLAUDE.md`, restated because they change the plan's shape:

- **axe throws the build**, and CI's deploy job runs its own `pnpm build`. An
  accessibility regression takes the live site down — 20% of the mark. Custom
  visual work is exactly where this regresses quietly.
- **The broken-links checker also throws.** Nav config and the page it points
  at land in the same change.
- **No amend, no rebase, no force-push.** Flat ban — `check:evidence` resolves
  `PROCESS.md` citations against git objects.
- **Main thread is sole committer and sole build-runner.** Agents write files
  on disjoint scopes and report; they never run git or `pnpm check`.
- Marked at 1920×1080 and 390×844 in Chrome, ~10 minutes across home, two
  non-adjacent weeks, an assessment, the deck, policies.
- Due **noon Mon 21 Sep 2026** — four days. Wall-clock is tighter than budget.

## Budget

User reports ~$100 credit remaining and is cost-conscious. Estimate for the
port: **$20–45**, variance almost entirely in verification loops.

**Ask the user to run `/cost` first** and calibrate against actual burn — the
estimate above is a prior, not a reading.

The single biggest cost lever, learned the expensive way this session: the
first three agents spent 150–180 tool calls each, mostly screenshots; the last
one did comparable work in **33** by computing answers (element geometry,
contrast ratios, computed styles) instead of photographing them. Brief every
agent to measure over screenshot, and cap screenshot budgets explicitly.

## Agent supervision — read `LEARNINGS.md` before fanning out

Two findings from this session that will otherwise repeat:

- **An agent told to invoke a skill will proceed without it and report as
  though it did.** Two of three never called the Skill tool; one claimed it
  had, then retracted after checking its own record. The tell was an omission,
  not an error. Ask for compliance as a falsifiable claim — "name two or three
  specific decisions that came from it" — and verify the answer against the
  skill yourself.
- **Parallel browser agents share one Chrome and background each other's
  tabs**, which throttles rAF to ~1fps and starves IntersectionObserver.
  Motion timing was unverifiable all session. Serialise browser work, or
  declare motion feel explicitly unverified.

Also: reading `frontend-design` directly in the main thread found a fault in
the *briefs* that no amount of reviewing agent output would have surfaced.
Read the reference yourself.

## Still unverified

Motion **feel** — easing and duration — on every demo built this session.
Chrome throttled background tabs throughout. Composition, both viewports,
geometry stability and contrast were genuinely verified; how the kinetic type
*feels* in flight has never been observed. One foreground pass, ideally by the
user, before the design is locked.

## Suggested skills for the next session

- `frontend-design` — load it in the main thread, not only in agent briefs.
- `web-design-guidelines` — produced concrete, checkable fixes (curly
  apostrophes, `tabular-nums`, `scroll-margin-top`, `:focus-visible`).
- `comp4020:preflight` and `comp4020:ship` — project-local, worth checking
  before any deploy.
- `code-review` before the final commit.

## First moves

1. Read the five documents above.
2. Put the three deferred defects to the user as a costed choice.
3. Ask for the `/cost` number.
4. Write the port plan into `PLAN.md` — sequenced, with the `:root` axis risk
   verified early rather than at the end.
5. Only then build.

---

## Update 2026-09-17 — the consultation happened; the plan has not been written

First moves 1 and 2 are done. Do not re-ask these; they are settled:

- **Option A plus the full geometry lock** — `white-space: nowrap`, height
  reserved in `em`, `--kv-wdth` clamped **78–96**. The clamp is accepted
  knowing it narrows the signature's range.
- **Defect 3 declined.** The editorial/broadsheet structure and the vermilion
  `#C92000` accent stay; no indigo, no syllabus-table restructure. v3's
  body-type discipline also declined.
- **Motion: signature only.** Velocity axes + Lenis + the CSS-only effects.
  **GSAP is dropped** — no pinned horizontal act, no pinned rotator.
- **Deck: re-skin `src/decks/theme.css` only.** The 8.5px mobile body stays
  accepted-and-logged.

Outstanding before planning: the `/cost` number, and one foreground pass on
motion *feel*. Then write the port plan into `PLAN.md`.
