# COMP4020 Assignment 2 — build plan

## Context

Assignment 2 asks for a complete website for a fictional university course of my
own design, hosted as Slop University and deployed to GitHub Pages. Due **noon
Mon 21 September 2026**, marked **45% legibility of process, 20%
working deployed artefact, 35% response to the brief**, assessed live in Chrome
at **1920×1080** and **390×844**. Markers spend about ten minutes on the home
page, a few non-adjacent weeks, an assessment, the deck, and policies.

Four design decisions are already logged in `WORKLOG.md` (course concept,
assessment model, tutorial structure, harness rules), but **nothing has been
built and no commits have landed against them**. Three gates fail today: 13
`STARTER_CONTENT` markers across 12 tracked files, all four SHA-fingerprinted
starter images still matching their starter hashes (matching *is* the failure; a
deleted file passes via an `existsSync` guard), and `PROCESS.md` still carrying
its `TEMPLATE:` comment.

The outcome wanted: a coherent 12-week course whose satire carries genuinely
useful career content underneath, presented as a portal you explore rather than a
syllabus you scroll, both check gates green, and a commit history a marker can
follow.

## Platform facts that constrain everything

Found by reading the packages, not the README — each one changes the plan:

- **`published: false` breaks the build.** `astro-course-university`'s graph is
  built by re-reading raw files from `src/` (`course-content.ts:106` skips
  `published === false`), so an unpublished node disappears from the node set
  and **every inbound `related:` ref to it becomes a dangling ref**, which
  `course-graph-integration.ts:134` throws on. Banned for this build; use
  `draft: true`, which keeps the node in the graph.
- **axe throws the build** (`astro-theme-university/index.ts:413`), and the CI
  `deploy` job runs its own `pnpm build`. So an accessibility regression takes
  **the live site** down, while a failing `spec/*.test.ts` does not — deploy
  deliberately does not depend on `check`. Caution belongs on the axe side.
- **Nothing enforces assessment weights summing to 100 across assessments.**
  `content.config.ts:15-31` only checks that one assessment's *criteria* sum to
  100. A hard requirement of the brief with zero sensor.
- **`spec/data-integrity.test.ts` requires every date inside the course period**,
  including `meta.due`. The capstone due date must sit inside the window.
- `{/* embed: <ref> */}` in a body **silently creates a graph edge**
  (`course-content.ts:114`). Self-refs throw. Edges are symmetrised, so each is
  declared once.
- `check:evidence`'s starter sweep is `git grep -F STARTER_CONTENT -- src` —
  **tracked files only**, so the sweep runs *after* committing, not before.
- Citations resolve via local `git cat-file -e`. **No amend, no rebase, no
  force-push for the rest of this assignment** — a rewrite silently invalidates
  every citation in the file carrying 45% of the mark, while the rendered
  markdown still looks perfect.

## The course (locked with the user)

- **Code:** `SLOP3841`, `level: 3` (the `superRefine` cross-checks the two).
- **Title:** institutional title plus satirical subtitle; working draft
  *Professional Identity Performance: fluency in a role you do not yet hold*.
- **Premise:** professional LARPing — performing a career identity you do not yet
  hold. No field prerequisite.
- **Register:** satire woven through the whole framing, every wrapper carrying
  real usable career content underneath — the *Calling Bullshit* move applied to
  every surface rather than concentrated in a footer.
- **Structure:** shared lectures; three field **streams**; guest lectures late in
  semester. **One session page per week containing three stream sections** (a
  `streams:` frontmatter key), not a page per stream per week — 12 nodes instead
  of 36, and the week page is the one a marker opens. This amends the logged
  tutorial-structure decision and needs a `WORKLOG` entry saying so.
- **No fixed weekly tutorial template** — format varies per week and that promise
  becomes a machine check (below), not a hope.
- **Capstone:** real applications the student is pursuing anyway, graded on
  process artefacts only, never outcome or prestige. Week-9 safety net: opt-in
  practice-interview partner pool.

**Week dates** — verified all Mondays, all inside the existing
`2027-02-22`→`2027-05-28` window, so `course-config.ts` dates stay put:

| W1 | W2 | W3 | W4 | W5 | W6 | *break* | W7 | W8 | W9 | W10 | W11 | W12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 02-22 | 03-01 | 03-08 | 03-15 | 03-22 | 03-29 | 04-05 | 04-12 | 04-19 | 04-26 | 05-03 | 05-10 | 05-17 |

## The agent team

**Main thread is the sole committer and the sole build-runner.** Agents write
files and report; they never touch git and never run `pnpm check`. Two agents
running `git add` stage each other's half-written files, and two concurrent
`astro build` runs corrupt `dist/` and the a11y cache — this removes the entire
class, and costs nothing because main batches a build per tranche. This needs a
carve-out added to `CLAUDE.md`'s "every change is verified with `pnpm check`"
rule **before any agent reads it**, since agents inherit that file.

| Agent | Exclusive write scope | Runs in |
|---|---|---|
| `curriculum-architect` | none — produces the spec doc | W0 only, then dissolves |
| `voice-writer` ×4 | `src/content/**` split by range (see W2), `src/pages/policies/index.mdx` | W1, W2 |
| `register-critic` | none — rejects drafts, messages the writer directly | invoked per tranche, **max 2 rounds** then escalates to the user |
| `surface` | everything else under `src/` — `pages/index.astro`, `pages/*/index.*`, `components/**`, `layouts/**`, `decks/**` | W2, W3 |
| `sensors` | `spec/*.test.ts` | W2, W3 |
| `scribe` | `WORKLOG.md`, `LEARNINGS.md`, `prompt-log.md` — a running `sha \| what \| why` ledger | throughout |

`PROCESS.md` is owned by **nobody but the user**: I assemble a draft from the
scribe's ledger at the end and the user rewrites it in their own voice.

Cut from the earlier roster and why: a separate `deck-engineer` (one deck, same
visual-judgement skill as `surface`, merging removes a coordination edge) and a
separate `a11y-viewport-qa` (axe is already in the build and already throws;
what remains is *looking*, which is rationed to one batched round per visible
layer and is the user's judgement, not an agent's).

**Ownership rule, one line in every brief:** *`src/content/**` plus
`src/pages/policies/` belongs to `voice-writer`. Everything else under `src/`
belongs to `surface`. No file has two owners in any phase. Need a change outside
your scope? Message main — do not edit it.*

**Communication topology** (deliberately not a star):
`curriculum-architect` broadcasts the spec to all builders → `voice-writer` ↔
`register-critic` runs a tight bounded rewrite loop with no main-thread hops →
`surface` reports to main for builds → `sensors` messages the *owner* of a red
check rather than fixing content itself, so a red check stays a finding instead
of becoming a silent patch → everyone sends `scribe` anything ledger-worthy.

**The homepage collision is designed out, not scheduled around.** The portal
teases specific nodes, and a node's tease *is* its `description:` frontmatter —
which `voice-writer` owns in the content file and `surface` reads via
`getPublishedCollection`. Copy flows through the data layer, so the two never
edit the same file.

### How parallel this actually is

Authoring is parallel; verification is not. Six agents write concurrently in the
widest wave, but main is the only one that builds and commits, so the build is
the **merge point** — agents fan out, main integrates. That is the design, not a
limitation: concurrent `astro build` runs corrupt `dist/` and the a11y cache,
and concurrent `git add` stages other agents' half-written files.

What genuinely blocks what, and nothing else does:

- the curriculum spec blocks **everything** (one serial gate, unavoidable —
  every other agent reads it)
- every content file existing blocks `related:` wiring (a ref to a missing node
  hard-fails the build)
- content stubs block **passing** API sensors, but not **writing** them
- rendered HTML blocks DOM sensors
- the last cited commit blocks `PROCESS.md`

Everything else runs at the same time. Shape of the run:

```
W0  architect ──────────────────► spec  ⛔ gate
W1  writer ──► all stub files ──► main wires graph ──► build green
W2  writer×4 ═╗
    surface  ═╣ all concurrent, disjoint directories
    sensors  ═╝   main builds at each tranche boundary
W3  main: integrate ──► batched viewport look ──► DOM sensors ──► gates green
W4  ledger ──► PROCESS.md draft ──► user rewrites
```

W2 is the wide wave and the bulk of the work. Realistically this is **one long
working session, or two** — the calendar has days left in it, but the critical
path is W0 gate → W1 stubs → W2 fan-out → W3 integration → W4 deploy, and the
only genuinely serial human time is W0's spec sign-off, W2's exemplar sign-off,
and W3's looking. Waves are work boundaries, not calendar days; if a wave
finishes, the next one starts.

## Waves

### W0 — Spine. Main + `curriculum-architect`. ⛔ User sign-off.

**Task 1, before anything else: give `CLAUDE.md` the assignment.** It currently
carries working style, prompt discipline and git rules but says nothing about
*what is being built or what it is marked against* — so every agent that reads it
inherits a harness with no idea what the deliverable is. Add, integrated into the
existing sections rather than appended as a dump:

- **What this is**: SLOP3841, the course premise and register, the 12-week
  structure, the capstone model. Short — the detail lives in `WORKLOG.md`.
- **What it is marked on**: 45/20/35, the two viewports, the five pages a marker
  actually opens in ten minutes.
- **The platform gotchas** from `## Platform facts` above — `published: false`
  banned, axe throws the build and the deploy runs its own build, `embed:`
  directives create graph edges silently, the starter sweep only sees tracked
  files.
- **The single-build-runner carve-out** to the existing "every change is verified
  with `pnpm check`" rule: agents write and report; main builds and commits.
  This one must land before any agent reads the file, or the rule itself
  instructs them into the highest-probability failure in the plan.
- **No amend, no rebase, no force-push** for the rest of the assignment, with the
  reason (citations resolve via local `git cat-file -e`), which also narrows the
  existing "amending requires confirmation" line to a flat prohibition.

Also land this plan into the repo (or a `WORKLOG.md` pointer to it) so a fresh
session can find it — the handoff rule sends the next session to `WORKLOG.md`,
and a plan sitting in `~/.claude/plans/` is invisible from there.

Then:

- `course-config.ts`: `SLOP3841`, `level: 3`, title + subtitle, description
  80–300 chars, 1–3 tags, dates bracketing **every** date including the capstone
  due.
- `site-config.ts`: `sessionLabels`, and a **flat, complete nav** — that alone
  guarantees every marker page is ≤2 clicks regardless of what the homepage
  does. Then both config files are **frozen**; main owns them, nobody else.
- Delete the four starter images. Three coupled edits come with it: the
  `hero-home.avif` import in `index.astro`, `socialImage` in `site-config.ts`,
  and each portrait's `photo:` **and** `photoAlt:` keys.
- `curriculum-architect` → `WORKLOG.md`: 12 weeks (lecture title, tutorial
  format, running-artefact step), 3 stream definitions, assessment ladder summing
  to 100, the **full node-id inventory**, and the **explicit `related:` edge
  table**. Nobody currently owns the graph invariant; this is where it gets an
  owner.
- **Imagery spike:** the user says the course provisions image generation; the
  environment exposes an Anthropic gateway but the course plugin ships no
  image skill. Five minutes to confirm reachability. Fallback is a deliberate
  CSS/SVG image-free treatment, which the README blesses and which suits a
  bureaucratic-satire register better than stock art.
- 3–4 commits. **The gate is genuine and it is the only unavoidable serial
  wait** — six agents derive from this spec, and a wrong arc discovered in W3
  cannot be re-run.

### W1 — Stub the graph, then arm the sensors. ⛔ Build-green.

- `voice-writer` writes **every** content file as a schema-valid stub: real
  frontmatter (week, date, weight, teachers, slides, streams, format, term),
  one-line body, **no `related:`**. Commit.
- Wire the **complete** `related:` graph in a second commit. Build green. Because
  every node exists first, no edge can dangle — this is why graph wiring is one
  pass with one owner rather than something each week adds.
- `sensors` writes the **data checks now** and watches them go red against the
  stubs. The "a DOM sensor is written when the DOM exists" constraint applies to
  HTML, **not** to `dist/api/index.json`, which is fully populated the moment
  stubs land. **Commit the red sensor and its fix as separate commits** — that
  red→green pair is the cheapest process evidence available.

This wave is deliberately short and mostly serial, because it buys the
parallelism of the next one: once every node exists and the graph is closed, six
agents can write into it at once without any of them being able to break the
build for the others.

### W2 — The wide wave. ⛔ Exemplar sign-off, once, early.

**One writer produces one fully-written exemplar page first** — likely policies
or week 1 — and it goes to the user before anything else is written. The "satire
everywhere, substance underneath" register is exactly what goes *uniformly*
wrong, and one approved exemplar is far cheaper than 30 rewrites. This gate is
short and it is what makes parallel writing safe: the approved exemplar becomes
the calibration reference every writer holds.

Then everything below runs **concurrently**:

| Agent | Scope in this wave |
|---|---|
| `voice-writer` A | sessions + lectures, weeks 1–4 |
| `voice-writer` B | sessions + lectures, weeks 5–8 |
| `voice-writer` C | sessions + lectures, weeks 9–12 |
| `voice-writer` D | assessments, people, policies |
| `surface` | components, layouts, homepage portal, index framing, the deck |
| `sensors` | remaining API-level checks and their mutation tests |

`register-critic` is invoked **fresh per tranche** (a fresh instance stops it
converging on its own house style), max 2 rounds, then escalates. The four
writers each hold the exemplar plus the architect's spec for their range, which
is what keeps four parallel authors in one voice — the risk parallel writing
introduces is register drift, and the exemplar is the mitigation.

Main builds and commits at each tranche boundary as agents report in: 6–8
commits of real incremental history, which is what the process mark rewards.

### W3 — Integration and looking

Homepage portal per the agreed sketch (in-voice hero, institutional orientation
block, discovery grid pointing at specific nodes, streams teaser, fine-print
aside into policies). Collection index pages get one line of in-voice framing and
otherwise stay plain — a marker hunting for "the assessments page" must not have
to explore. The deck: real astromotion, single-line MDX directives only, ```notes
fences, deck-relative asset paths.

**Interactivity — two, and only one of them is JavaScript.** No client framework:
none is installed, and adding one for two widgets buys a new axe surface for
nothing.

1. **Semester progress tracker** — the portal spine, and what makes the 2-click
   promise true rather than asserted. Server-render the complete 12-week `<ol>`
   of links with `data-date` attributes; one inline `<script>` reads today's date
   and sets `data-state="past|current|upcoming"`. A static build cannot know
   "today", so the JS is load-bearing, but **the list is complete and navigable
   with JS off** — which is what keeps axe green. Native `<progress>` with
   adjacent visible text, never hand-rolled `role="progressbar"` ARIA. At 390px
   it collapses to a vertical list, never a horizontal scrubber.
2. **Weekly brainrot term — as content, not a widget.** `term:` and `termGloss:`
   frontmatter (schemas are `.loose()`, so they survive and land in the API's
   `meta`), rendered on the week page and aggregated into a glossary that links
   back. Zero JS, zero axe surface, free at 390px, real lateral browsing — and
   the single best vehicle for the sincere-substance/parody-wrapper move, twelve
   times over.

**Cut: historical-larper-of-the-week.** It duplicates the rotating-card mechanic
the term already provides and is the hardest of the three to keep substantive
twelve times. If it earns its way back, it is another frontmatter key on the same
pattern — not a third widget. Reclaimed time goes to the deck, which the marker
*will* open.

Then **one batched screenshot round** at both viewports over the five marker
pages — not per change. DOM sensors get written now that the HTML exists.

### W4 — Eradication, evidence, deploy

- `git grep -n STARTER_CONTENT -- src` **after committing** — the sweep only
  sees tracked files, so an uncommitted fix reads as a pass locally and a fail
  in CI.
- Both gates green: `pnpm check`, then `pnpm check:evidence`.
- `PROCESS.md` last, and only last: I assemble a draft from the scribe's ledger
  **after the final commit it will ever cite**, the user rewrites it in their
  voice, `check:evidence` runs again after. No example SHAs anywhere in the file
  — the citation regex would match them and `git cat-file -e` would reject them.
- Push, wait for the `deploy` job, then visit the **real Pages URL** under its
  `/<repo>/` base path at both viewports. Deploy runs its own build, so this is
  the only check that the live artefact — 20% of the mark — actually works.

This wave is serial by nature and cannot be compressed: the ledger cannot cite a
commit that does not exist yet, and the deploy cannot be verified before it runs.
Everything else is already done by the time it starts.

## Spec checks worth writing

The build already owns compilation, axe, contrast, base-path links,
dangling/self refs, API generation, deck compilation, per-assessment criterion
weights, and schema validity; `data-integrity.test.ts` owns dates-in-period.
None of that gets restated. Ship **5–7** of these, each mutation-tested — break
the thing it targets, confirm it goes red *for that reason*, restore:

1. **Assessment weights sum to 100 across assessments**, ≥3 assessments, no
   single weight >50 (encodes the staged-process-marking promise). Explicitly
   required by the brief, currently unenforced.
2. **Weeks 1–12 each appear exactly once** in `sessions` and once in `lectures`.
   The build cheerfully accepts week 5 three times and no week 7.
3. **Week dates monotonic in week number, ~7 days apart** — catches a
   copy-pasted date that is inside the period, so `data-integrity` passes, but
   out of order. Likely in agent-written frontmatter.
4. **The flagship deck resolves** — ≥1 lecture with `meta.slides` matching the
   regex **and** `dist/decks/<name>/index.html` existing on disk. The schema
   validates the string's shape; nothing validates that it resolves.
5. **The 2-click promise, enumerated from the page** — regex hrefs out of
   `dist/index.html`, then out of each of those, and assert a session, an
   assessment, the deck and `/policies/` all appear within depth 2. Enumerated
   from the link graph, never a hand-maintained list.
6. **No tutorial template** — ≥6 distinct `meta.format` values across 12
   sessions, and no two session bodies sharing a normalised opening 40
   characters. This converts the most fragile design promise in the course into
   a cheap machine check, which is the direct answer to Assignment 1's
   "the harness became the spec and the quality nothing measured decayed to
   zero".
7. **No isolated nodes** — every node's symmetrised `related` list non-empty and
   every session linked to its week's lecture. The build rejects *broken* edges
   and says nothing about *absent* ones, and lateral browsing is a promise.

Mechanics: second-argument failure messages throughout (matching the existing
test), and **guard every `dist/**.html` read with `existsSync`** — these files
read at module top level, so a missing path throws at collection time and takes
the suite down with an unhelpful error, which is precisely the green-checkpoint-
reported-nothing shape being defended against.

## Top risks

1. **Concurrent git/builds corrupt each other** (high) → main is sole committer
   and sole build-runner, stated in every brief, with the `CLAUDE.md` carve-out
   landed first.
2. **Satire flattens into a uniform template across 30 pages** (high) → exemplar
   sign-off plus check 6 above, which measures the promise instead of trusting it.
3. **Scope** (high) → resolved in W0 by the one-page-per-week streams model.
4. **PROCESS.md citations break** (medium) → continuous ledger, authored last,
   flat ban on history rewriting.
5. **The portal swallows findability** (medium) → flat complete nav guarantees
   ≤2 clicks independent of the homepage; check 5 measures it.
6. **An axe regression takes the live site down** (medium, expensive) → custom
   interactive CSS is where a11y regresses quietly, and here it kills the deploy,
   not just a test. The batched viewport look happens in W3, before the first
   push that could deploy a broken build.

## Verification

- `pnpm check` — typecheck, build (axe, base-path links, dangling refs, decks,
  API), then `vitest run spec`
- `pnpm check:evidence` — markers gone, images replaced or removed, template
  comment gone, every cited SHA resolving locally
- Chrome at 1920×1080 and 390×844 on home, two non-adjacent weeks, an
  assessment, the deck and policies — looked at, and described before explained
- Every spec check mutation-tested before it is trusted
- The live Pages URL under its base path, before freeze

## Port to option A — plan

Settled in the consultation logged at `HANDOFF-port.md` and `prompt-log.md`
(2026-09-17), not to be re-litigated: option A ("Kinetic Manifesto") plus the
full geometry lock (`white-space: nowrap`, height reserved in `em`, `--kv-wdth`
clamped 78–96); defect 3 and v3's body-type discipline both declined; motion
is signature-only — velocity axes + Lenis + CSS-only effects, **GSAP fully
dropped** (no pinned horizontal act, no pinned rotator); the deck is a
re-skin of `src/decks/theme.css` only, not a rebuild — the 8.5px mobile body
text stays accepted-and-logged.

### Why this port has almost no natural parallelism

The original W0–W4 build fanned out across 55 content files with disjoint
owners. This port is the opposite shape: every real change lands in a small
number of *shared, globally-wired* files —

- `src/styles/notepad.css`, injected once via `brandCss` in `astro.config.ts`
- `src/layouts/PageLayout.astro`, the sole layout every page renders through
- `src/decks/theme.css`, injected once via `theme` in `astro.config.ts`

— and the changes inside them are sequentially dependent (the axis engine's
custom properties have to exist on `:root` before anything can consume them
in `font-variation-settings`; the deck re-skin reads the same token names the
brand stylesheet defines). Splitting these three files across agents buys
nothing and risks two agents racing edits to the same file inside a wave,
which `CLAUDE.md`'s agent-team rule exists to prevent. **The main thread
authors all three files itself.**

### Sequencing

1. **Verify the `:root` risk first, not last.** Land the velocity-axis engine
   (scroll-velocity smoothing → `--kv-wght`/`--kv-wdth` on `:root`) as a small
   inline `<script>` in `PageLayout.astro` before touching a single visual
   token, and confirm in a real page that a `.d`-classed element's computed
   `font-variation-settings` actually moves on scroll. This is the item
   `design/option-a/README.md` calls hardest to get wrong in Astro — global
   scope, not component-scoped CSS — so it is proven in isolation first.
2. **Fix the known axe risk before the first full build**, not after: replace
   the `rgba(237,235,228,.78)` translucent body-copy colour with a solid
   token. Doing this before wiring the rest of the palette means the first
   `pnpm build` this session already passes axe, rather than needing a second
   pass to find the same regression the README already named.
3. **Rewrite `src/styles/notepad.css`** to option A's four tokens (`--bone`,
   `--ink`, `--ink2`, `--volt`) and three-font stack (Anybody / Newsreader /
   Martian Mono), inside the existing `@layer at.tokens` / `at.base` /
   `at.components` structure — same unlayered-beats-layered mechanism the
   current file already relies on, just new values.
4. **Re-skin `src/decks/theme.css`** with the same token names once step 3 has
   proven them out. No change to the deck's `astromotion` mechanics.
5. **Fonts**: preconnect + `<link>` the three Google variable fonts in
   `PageLayout.astro`'s head (this course has no image-generation path and no
   existing web-font pipeline to reuse, so CDN delivery is the pragmatic
   choice over self-hosting for a project this size).
6. **`prefers-reduced-motion` and pointer-bulge gating** land with the engine
   in step 1, not bolted on afterward — `(hover:hover) and (pointer:fine)` for
   the per-character bulge, a static fallback for reduced motion, matching the
   README's spec.
7. **Sweep the other axe risks** named in `design/option-a/README.md`: the
   deck overview's `opacity:.34` dimmed stations need `aria-hidden` or a solid
   colour swap; the live-updating HUD needs `aria-hidden="true"`; any custom
   arrow-key handling needs scoping/role/name; a horizontal-scroll region
   needs `tabindex="0"` and a label.
8. **`pnpm check` then `pnpm check:evidence`**, main thread only.
9. **Both marking viewports, looked at, not assumed** — home, two
   non-adjacent weeks, an assessment, the deck, policies.
10. **Foreground motion-feel pass** — still unverified after two sessions'
    worth of attempts (background-tab `requestAnimationFrame` throttling, then
    an unreliable review agent this session). This is the last gate before the
    port is considered locked, and it has to happen in a tab that is not
    backgrounded and not driven by a headless/automated agent.

### Where a multi-agent team still earns its keep

Not for the three shared files above, but for **read-only, fan-out audits**
across the 55 content files and 8 components that report back to the main
thread rather than edit — consistent with `CLAUDE.md`'s rule that agents
write in their own scope and never touch git or the build:

- grep all 55 content files for hard-coded references to the old
  `--np-*` token names, so nothing silently falls back to an unstyled default
  once `notepad.css` is rewritten
- check every `.astro`/`.mdx` page for anything assuming the old deck theme
  or old font stack inline
- an independent pass re-checking the axe-risk list in step 7 against the
  actual rendered components, since a list written before the port is a
  prediction, not a verification

Each of these is a single findings report back to main; main applies any
fix itself.

**Roles and models:**

| Role | Scope | Model | Why this tier |
|---|---|---|---|
| Main thread (author + committer + build-runner) | `notepad.css`, `PageLayout.astro`, `theme.css`, all git/build ops | Sonnet 5 (this session) | Sequential, design-sensitive edits to shared files; nothing here is delegable per `CLAUDE.md`'s sole-committer rule regardless of model |
| Token-reference sweep agent | grep 55 content files + 8 components for stale `--np-*` names | `general-purpose`, Haiku-tier | Mechanical pattern match, no judgment calls — a weaker/cheaper model is sufficient and the report is easy to spot-check |
| Old-styling assumption sweep agent | grep pages/components for inline assumptions about the old deck theme or font stack | `general-purpose`, Haiku-tier | Same shape as above — pattern search, not synthesis |
| Axe-risk re-check agent | independently re-verify the step-7 axe list against rendered output | `general-purpose`, Sonnet-tier | This is judgment (does this actually read as accessible, not just "matches a pattern"), and a Haiku-tier agent's unsupervised technical claims are exactly what went wrong with the fresh review agent this session (see `LEARNINGS.md`) — keep this one at main's own model tier and still verify its claims directly before acting on them |
| Foreground motion-feel observer | scroll/hover option A live, describe what it feels like | Sonnet-tier agent *or*, preferably, the user directly | Feel cannot be inferred from a screenshot or a token count; this is the one role a stronger model doesn't rescue — it needs a foreground, non-throttled tab, which is a runtime constraint, not a capability gap |

No role in this table runs `git` or `pnpm check`/`pnpm check:evidence` — those
stay with main, per the standing agent-team rule.

### Skills worth creating for this port (see also `LEARNINGS.md`)

Two candidates, both because this project already runs the same verification
shape by hand every session and keeps re-deriving it:

1. **A verification skill** that runs `pnpm check`, then
   `pnpm check:evidence`, then opens Chrome at 1920×1080 and 390×844 against
   the fixed five-page marker set (home, two non-adjacent weeks, an
   assessment, the deck, policies) and hands back the *exact checklist*
   `CLAUDE.md` now requires for frontend review — what to scroll, what to
   hover, what behaviour is expected — rather than a bare "looks fine."
2. **An axe-risk sweep skill**, generalised past this one port: grep/scan for
   the recurring failure shapes (translucent text over a solid ground,
   opacity-only dimming with no `aria-hidden`, unlabelled custom keyboard
   handling, unlabelled horizontal-scroll regions). This is a pattern this
   design direction reproduces every time a kinetic-type treatment is tried,
   so it is worth a repeatable check rather than a one-off memory.

### Open risk carried forward

Motion **feel** — easing, snap/release asymmetry, hover-bulge smoothness —
has never been observed in a foreground tab across two sessions of attempts.
It is not gated behind any automated check; it is gated behind a human or a
genuinely foreground agent watching it scroll. Do not sign off the port
without that pass.
