# Work log

Running record of decisions as the assignment gets built — raw material for
`PROCESS.md`, not the deliverable itself. One entry per notable decision.

The execution plan these decisions feed into is `PLAN.md`, in this repo root.
Read this file for *why*, that one for *what next*.

Format per entry:

```
## <date> — <short decision title>

- **Decision:** what was decided
- **Why:** the reasoning, what made this the right call now
- **Rejected:** the alternative(s) considered and why they lost
- **Encoded as:** CLAUDE.md rule | spec/ check | left out (and why)
- **Commit:** <hash>, once it lands
```

---

## 2026-09-15 — Set up a process/decision log

- **Decision:** keep this `WORKLOG.md`, tracked in git, updated after each
  notable decision throughout the build.
- **Why:** `PROCESS.md` is graded on showing *why* a decision beat the obvious
  alternative and *how the outcome was known to be right* — commit messages
  alone don't carry that; a running log written in the moment does.
- **Rejected:** reconstructing the narrative from `git log` at the end (loses
  the reasoning and rejected alternatives); an untracked/gitignored scratch
  file (keeps the repo cleaner but loses it as visible process evidence,
  which is 45% of the mark).
- **Encoded as:** not a CLAUDE.md rule or spec check — it's a working habit,
  not something to enforce mechanically.
- **Commit:** `5d75266`

## 2026-09-15 — Course concept: professional LARPing

- **Decision:** the course is general professional LARPing — performing a
  career identity you don't yet have. Open to anyone with basic
  fundamentals, no field prerequisite. Field-specific guest lectures late
  in semester; "streams" split tutorials/workshops by field. Register is
  satirical shell around genuinely useful career advice: name the bit
  ("the room already knows you're performing"), then teach the real skill
  underneath.
- **Why:** narrow enough no real university runs it, but has real depth
  (résumé, interviews, personal branding, imposter syndrome all fit
  naturally under the frame). Satirical-shell register was chosen over pure
  deadpan or pure sincere because the user wants the content genuinely
  useful, not just a bit — deadpan alone doesn't teach, sincere alone loses
  the distinctive voice the brief asks for.
- **Rejected:** field-specific course (e.g. "LARPing your way into tech") —
  general keeps the streams idea meaningful; pure deadpan register — funny
  but doesn't deliver "genuinely useful"; pure sincere register — reads as
  a generic careers pamphlet, no distinctive voice.
- **Encoded as:** not yet — feeds the course-config and week-by-week design
  next.
- **Commit:** `cdfb63a` — decided 2026-09-15 but sat uncommitted until
  2026-09-16; see the note at the foot of this file.

## 2026-09-15 — Assessment model: real applications, process-graded

- **Decision:** capstone assessment is real job/internship applications and
  interviews the student pursues anyway, graded on process artefacts
  (application materials, reflection log, interview debrief) — never on
  outcome or company prestige. Rubric rewards gap articulation (distance
  between role requirements and real skillset), performance awareness
  (what was performed vs genuine, and why), and adaptation under real
  friction. Safety net: a student without a real interview by week 9
  switches to an opt-in practice-interview partner pool (recruiters who
  knowingly volunteer for SlopU practice interviews) so assessment still
  runs on schedule.
- **Why:** the original pitch — unwitting companies plus a secretly-briefed
  "backup" company — deceives real, non-consenting third parties (the
  recruiters actually running the interviews) for an outcome they never
  agreed to. That's the same shape of problem human-subjects ethics review
  exists to block, and it risks real reputational cost if traced back.
  Grading on outcome would also be unfair, since interview success isn't
  within a student's full control.
- **Rejected:** unwitting companies + secretly-briefed backup contact
  (deceives non-consenting recruiters); grading on landing an offer
  (penalises students for an uncontrollable external result); purely
  simulated assessment centres with no real stakes (loses the
  unpredictability that makes the exercise worth anything).
- **Encoded as:** feeds the `assessments` content collection and rubric
  text directly; likely also a `spec/` check that assessment weights sum
  to 100% regardless of this model.
- **Commit:** `cdfb63a` — same delay as above.

## 2026-09-15 — Tutorial structure: streams, no fixed weekly template

- **Decision:** each of the three streams runs its own weekly tutorial at
  two identical time slots (student attends either); lectures stay shared
  across all students. Cross-stream tutorial/guest-lecture attendance is
  encouraged but not mandatory or assessed. Tutorials have no fixed
  weekly template — the activity format varies week to week (teardown,
  roleplay, gallery-walk critique, etc.) — but every week ties to that
  week's lecture skill and advances the same running artefact toward the
  capstone application.
- **Why:** a repeated four-part template read as routine and generic;
  varying the format keeps tutorials feeling fresh while the shared
  throughline (always feeding the real project) keeps the semester
  coherent rather than twelve disconnected exercises.
- **Rejected:** fixed four-part weekly template (drill/workshop/debrief/
  portfolio update) — consistent but routine, against the brief's warning
  about twelve interchangeable weeks.
- **Encoded as:** design principle for the `sessions` content collection;
  no spec check needed (this is judged at the crit, not mechanically
  checkable).
- **Commit:** `cdfb63a` — same delay as above; amended by the 2026-09-16
  entry below.

## 2026-09-15 — Fold prior-crit lessons into CLAUDE.md

- **Decision:** pulled five lessons from earlier crit/assignment-1
  reflections into `CLAUDE.md`: distrust of green checks, mutation-testing
  own checks, not defaulting design/content decisions to the agent,
  screenshot-verifying against intent instead of assuming, and deliberate
  context checkpointing.
- **Why:** these were hard-won in earlier work (a check that scanned zero
  files, 178 passing tests over an unplayable game at 1920×1080, steering
  away from an already-built wrong design) and this assignment is
  checks-heavy and marked at exactly those two viewports — same failure
  modes are live risks here.
- **Rejected:** copying an old CLAUDE.md wholesale (ass1's is 434 lines and
  build-specific); re-deriving these lessons the hard way again.
- **Encoded as:** CLAUDE.md rules, integrated into existing "Checks and
  rollback" / "Compound engineering loop" sections plus one new "Design and
  content direction" section, not appended as a dump.
- **Commit:** `1511fe8`

## 2026-09-16 — Amend the stream model: one session page per week

- **Decision:** amends the tutorial-structure decision above. Streams stay
  real — three field streams, each with its own weekly tutorial — but the
  site models them as **one `sessions` node per week containing three stream
  sections** (a `streams:` frontmatter key), not one node per stream per
  week.
- **Why:** the per-stream-per-week model is 36 content nodes, each needing
  distinct written substance, against a five-day build. It also splits the
  page a marker actually opens: "week 7" would be three pages with no
  canonical one. Twelve week pages each showing all three streams is both
  less work and better information architecture, since the cross-stream
  comparison becomes visible on the page rather than requiring three tabs.
- **Rejected:** 36 nodes (infeasible at this scope, and the register would
  flatten into template across them); dropping streams to a single shared
  tutorial (loses the distinctive structural idea entirely); streams as
  tags on a flat tutorial list (loses the weekly narrative the course runs
  on).
- **Encoded as:** `streams:` frontmatter on the `sessions` collection;
  indirectly protected by the planned "no tutorial template" spec check
  (≥6 distinct `meta.format` values, no two session bodies sharing a
  normalised opening), which is what stops 12 week pages becoming 12
  interchangeable ones.
- **Commit:** `cdfb63a`

## 2026-09-16 — Interactivity: two elements, one of them zero-JS

- **Decision:** two interactive/dynamic elements, done properly, rather than
  the three originally floated. (1) A **semester progress tracker**: the
  complete 12-week list of links server-rendered with `data-date`
  attributes, plus one inline script that reads today's date and marks each
  week past/current/upcoming. (2) The **weekly brainrot term** as content
  rather than a widget — `term:` and `termGloss:` frontmatter rendered on
  each week page and aggregated into a glossary that links back. No client
  framework. **Cut: historical-larper-of-the-week.**
- **Why:** the tracker needs JS because a static build cannot know "today",
  but the list is complete and navigable with JS off, so it adds no axe
  surface — which matters because axe throws the build and CI's deploy runs
  its own build, making an a11y regression a live-site outage rather than a
  failing test. The brainrot term needs no JS at all, works at 390px for
  free, creates real lateral browsing through the glossary, and is the
  single best vehicle for the sincere-substance/parody-wrapper register,
  twelve times over. Larper-of-the-week duplicates the term's
  rotating-card mechanic and is the hardest of the three to keep
  substantive twelve times.
- **Rejected:** all three elements (the third earns nothing the second
  doesn't); adding a client framework for two widgets (none is installed;
  buys a new accessibility surface for nothing); hand-rolled
  `role="progressbar"` ARIA instead of native `<progress>` with adjacent
  visible text; a horizontal scrubber at 390px.
- **Encoded as:** `term:`/`termGloss:` frontmatter keys (the schemas are
  `.loose()`, so invented keys survive into the API's `meta`); the tracker
  as a component under `surface`'s ownership. Verified by the axe pass plus
  a look at both marking viewports, not by assuming.
- **Commit:** `cdfb63a`

## 2026-09-16 — Prompting feedback was owed and never given

- **Decision:** `CLAUDE.md`'s prompt discipline gains three clauses — a short
  approval of a large artefact counts as a vague prompt and gets read back
  before I act on it; a vague constraint ("quick", "soon") gets quantified
  before anything is planned around it; and the trajectory review is spoken
  in the conversation, not filed. `prompt-log.md`'s trajectory is corrected
  with the old text kept below a line.
- **Why:** the user pointed out they had received no prompting feedback in
  seven logged entries, despite the rule saying the discipline is symmetric.
  The trajectory section read "consistently clear and appropriately scoped —
  no vague asks yet", which was false: "let's go with this" approved an
  entire information architecture and "plan looks good" approved 388 lines.
  It stayed unexamined because I wrote it in a file the user had no reason
  to read back, which is the worst failure mode available to a self-review —
  it looks like the rule was followed.
- **Rejected:** rewriting the trajectory silently (hides that the review
  itself failed, which is the more useful finding); leaving the rule as-is
  and just being more diligent (the rule genuinely didn't cover vague
  *approvals*, only vague *requests*, so diligence wasn't the gap).
- **Encoded as:** three `CLAUDE.md` clauses under Prompt discipline, plus a
  `LEARNINGS.md` pattern on challenge-prompts. Not machine-checkable.
- **Commit:** `06c6f7c`

## 2026-09-16 — Four direction decisions locked, and the real time budget

- **Decision:** (1) Course title signed off as *Professional Identity
  Performance* / *fluency in a role you do not yet hold*. (2) Streams get a
  plain institutional name for navigation plus one satirical tagline where
  each is defined. (3) The twelve brainrot terms are drafted with the
  curriculum spec for the user to approve or swap individually. (4) Imagery
  gets a five-minute reachability spike with the image-free treatment
  pre-approved as fallback. Working budget: **tonight and Saturday only**,
  aiming for **top marks**.
- **Why:** all four were assumptions the plan had been quietly carrying, and
  three of them touch every page — the title, the stream labels a marker
  sees twelve times, and the terms that are the highest-visibility voice
  artefact in the build. Streams-as-institutional-names keeps satire in the
  body copy, which is where it survives repetition; a satirical *label* seen
  twelve times is exactly where the register flattens. The time budget
  confirms the plan's wave structure rather than changing it: two working
  blocks is what "one long session, or two" meant, but it forces both user
  gates (curriculum spec, voice exemplar) to close tonight, or Saturday
  opens blocked on the user and the parallel fan-out cannot start.
- **Rejected:** satirical stream names (flatten fastest at twelve
  repetitions); the user supplying all twelve terms (best voice fidelity but
  a blocking ask on the one night both gates must close); breadth traded for
  depth on the twelve weeks — rejected because the marker samples
  non-adjacent weeks at random, so a weak week is a coin flip from being
  read.
- **Encoded as:** `src/course-config.ts` (code, level, title, description,
  tags) and `src/site-config.ts` (labels, flat nav). Both files now frozen —
  main owns them, no agent writes them.
- **Commit:** `fec9ac3`

## 2026-09-16 — No image generation exists; commit to type and CSS

- **Decision:** delete all four starter images rather than replace them, and
  build a deliberate type-and-CSS treatment with no photography or
  illustration anywhere. No social card either.
- **Why:** the course was understood to provision image generation. Probing
  took five minutes and disproved it — `$ANTHROPIC_BASE_URL` authenticates,
  but `/v1/models` reports `mode: "chat"` for every entry and
  `/v1/images/generations` returns HTTP 500. Deleting rather than replacing
  also clears the `check:evidence` fingerprint gate, since a deleted file
  passes its `existsSync` guard, and an image-free treatment suits a
  bureaucratic-satire register better than stock art would.
- **Rejected:** sourcing stock imagery (off-register, and licensing is a
  problem in a submitted artefact); keeping the starter images (they *are*
  the gate — matching their hashes is the failure condition); deferring the
  question to Saturday (the layout would have been built assuming heroes).
- **Encoded as:** the deletions plus three coupled edits — the hero import
  and props in `index.astro`, `socialImage` in `site-config.ts`, and
  `photo`/`photoAlt` on both starter people. Logged in `LEARNINGS.md` as a
  gotcha with the probe commands.
- **Commit:** `fec9ac3`

---

## 2026-09-16 — Curriculum spec signed off, with two changes and a rename

- **Decision:** `CURRICULUM.md` is the frozen W0 spec every builder derives
  from — twelve weeks, three streams, the Dossier, a 20/25/10/45 ladder, 33
  content files, 34 nodes. Eleven flagged judgement calls went to the user at
  the gate. Nine stand as specified; two changed. Separately, the weekly
  sessions are called **Sessions**, not Rehearsals.
- **Why (week 7):** the specified tutorial required every student to actually
  send one outreach message to a real practitioner for marks. That conscripts a
  non-consenting stranger into an assessment, which is the same objection that
  produced the week-9 consent-based interview pool — the course cannot hold
  that line in one week and breach it in another. Drafting stays compulsory,
  sending is the student's choice, and the Outreach Log is graded identically
  either way, so the week loses nothing it was actually teaching.
- **Why (lecture spine):** the edge table declared two parallel week-N →
  week-N+1 spines, 22 of 50 edges. Two spines pointing the same way render as a
  ladder rather than a network, and lateral browsing is a promise the graph
  visualisation has to actually deliver. The session spine is kept because week
  pages are what a marker opens; the lecture spine is cut. **39 edges, not 50.**
- **Why (Sessions):** "Rehearsals" was my invention, not the user's, and it put
  satire in the navigation — the one surface where a marker with ten minutes
  must not have to translate anything. The satire belongs in the content; the
  nav's only job is findability. Caught while it was a two-file change rather
  than twelve page bodies.
- **Confirmed unchanged at the gate:** flagship deck on week 6 rather than 9;
  four assessments rather than three; peer critique graded at 10%. All twelve
  brainrot terms stand as drafted.
- **Rejected:** keeping the real-send requirement with an opt-out (an opt-out
  students must invoke is still pressure); cutting both spines (leaves week
  pages with no next-week link); renaming the collection and URL along with the
  label (churns every ref for no gain).
- **Encoded as:** §3, §7 and §10 of `CURRICULUM.md`; `sessionLabels` in
  `src/site-config.ts`; one line in `src/pages/glossary/index.mdx`.
- **Commit:** `aca1320` (spec as written), then this change

---

## Note on the 2026-09-15 entries

Three decisions dated 2026-09-15 — course concept, assessment model,
tutorial structure — were written in the moment as intended but sat
uncommitted for a day and landed together in `cdfb63a`, alongside two
decisions genuinely made on 09-16. So `git log` shows five decisions
arriving at once when the record shows four days' worth of thinking, and
`cdfb63a`'s own message claims only two decisions were unlogged, which
undercounts by three. Both facts are left standing rather than tidied:
amending is banned for the rest of this assignment, because
`check:evidence` resolves every `PROCESS.md` citation with local
`git cat-file -e` and a rewrite would invalidate them while the rendered
markdown still looked perfect.

The lesson is the one already in `LEARNINGS.md`: writing a decision down is
only half of it. An uncommitted log is invisible to the marker, invisible to
CI's starter sweep — which greps tracked files only — and one `git checkout`
away from gone. Commit the entry with the decision, not at a tidier moment
later.

---

## 2026-09-16 — The wide wave written in parallel, then verified at both viewports

- **Decision:** six agents wrote concurrently against disjoint exclusive write
  scopes — four voice-writers (weeks 1–4, 5–8, 9–12, and
  assessments/people/policies), `surface` for components and the deck,
  `sensors` for `spec/` — with the approved week-1 session as the single
  register reference. Main built, committed and integrated; no agent ran git
  or `pnpm`. Landed as six commits (`a6f31ab`, `a989b31`, `bb17884`,
  `2fcf232`, `d63d1da`, `601c878`) rather than one, so the history shows
  tranches arriving.
- **Why the exemplar gate paid for itself:** register drift is what parallel
  writing costs, and four writers each holding one approved page produced a
  consistent voice across 33 files with no rewrite round. The cost was one
  serial sign-off.
- **Three real faults found by agents reporting rather than editing.** Writer D
  found `people/[slug].astro` looking `role` up in a four-value table with no
  fallback, so four of five Role rows silently vanished, and a `contact` field
  that was never rendered. `surface` found `MdxPageLayout` emitting the lead
  paragraph *above* the body's `h1` on every MDX page — visible on `/policies/`
  and `/assessments/`. Fixed once in `PageLayout.astro` and once in
  `[slug].astro`, both main-owned files outside every agent's scope, which is
  the ownership rule working as intended.
- **Two agent claims were wrong and were tested rather than actioned.**
  `surface` reported `404.md` would fail axe's `page-has-heading-one`; the rule
  is not enabled in this theme and a cold build proved it. Writer C reported
  duplicated stream `focus:` strings "may" affect other weeks; an audit of all
  twelve found only the two it had already fixed. Report-then-verify is now a
  `LEARNINGS.md` pattern.
- **Verified at both marking viewports, and the phone half changed what I
  know.** Zero horizontal overflow and exactly one `h1` on all six marker
  pages at 390px; the semester tracker collapses to a single vertical column
  with per-week text state, never a horizontal scrubber. The deck, though,
  renders body prose at an effective **8.5px** at 390px, because reveal scales
  a fixed 1280×720 canvas and astromotion disables reveal's mobile scroll view
  upstream. Accepted and logged rather than patched — the levers are in
  `node_modules` and the only one we own risks the axe gate that fails the
  deploy.
- **Measured, not assumed:** every marker target is **one** click from home,
  not the two the plan promised, with lectures at two. Now sensored from the
  rendered link graph rather than asserted.
- **Rejected:** letting agents run their own builds (concurrent `astro build`
  corrupts `dist/` and the a11y cache); one monolithic wave commit; overriding
  astromotion's deck scaling with custom media queries during a verification
  pass.
- **Encoded as:** `src/content/**` and the five index pages;
  `src/components/SemesterTracker.astro` and `GlossaryList.astro`; two new
  checks in `spec/course-design.test.ts`, both mutation-tested.
- **Commit:** the six above, then `2347288`

---

## 2026-09-16 — The site was a recolour of the template, and the rebrand that fixed it

- **The fault, which the user caught and I had not:** "the UI of the whole
  website quite literally mimics the comp4020 website". Correct, and the cause
  was structural rather than aesthetic — `brandCss` pointed at
  `astro-theme-slop/slop.css`, three colour tokens and a crest offset, the
  same branding package the real course site wears. No custom visual treatment
  had ever been built, so every page was the institutional template with the
  hue turned. That is a direct hit on the 35% response-to-brief mark, and it
  had survived every green build because nothing in the suite can assert
  "looks like its own thing".
- **Decision:** a notepad identity, chosen by the user from four options. Ink
  on cream, faint ruled lines, a doubled red margin rule, Newsreader for prose
  and Courier Prime for everything structural, `--at-border-radius: 0`
  squaring cards, callouts, buttons, inputs and badges from one token. The
  course is about rehearsing a role before you hold it; the artefact of
  rehearsal is a notebook. The whole identity is one file,
  `src/styles/notepad.css`.
- **Why it needed no theme fork:** `brandCss` is injected after the theme's
  own styles and is **unlayered**, while theme rules live in `@layer at.base` /
  `at.components` / `at.tokens`. Unlayered CSS beats layered CSS regardless of
  specificity, and layers are decided before specificity — so a plain
  `.at-nav { … }` in the brand file outranks the theme's, including its
  media-query variants, with no `!important`. That mattered because the nav,
  search and focus behaviour are axe-tested upstream and reimplementing them
  is how the deploy gate breaks.
- **I proposed the wrong direction first.** The user suggested a notepad theme
  in the previous session and I steered to a theatre metaphor instead. The
  notepad is the better answer, and for a reason available at the time: a
  theatre skin would have been another dark-surface institutional site, while
  the pad reframes every page as a working document, which is what the course
  actually asks a student to keep.
- **Three faults the rebrand surfaced, none of which a diff would have shown.**
  The theme's `--at-text-muted` is ink at 62% alpha with its contrast claim
  measured against a 99.4%-lightness surface, so darkening the paper drops it
  to roughly 3.8:1 — under the AA floor, and axe throws the build that CI's
  deploy job re-runs. `deck.css` hardcodes `var(--font-public-sans, …)` for
  slide body text and a system stack for code rather than reading the brand
  tokens, and the theme's `fonts` option is off, so slides silently rendered
  prose in a generic sans until `src/decks/theme.css` set `--r-main-font` and
  `--r-code-font` explicitly. And `.course-tags li` hardcoded
  `border-radius: 999px` instead of reading the token, so rounded pills
  survived a token-level rebrand.
- **The deck flips `color-scheme` rather than repainting piecemeal**, so every
  `light-dark()` brand token resolves to the arm that was contrast-checked
  against the cream stage. The two `_class: impact` slides stay blue — a
  stamped interstitial on paper, same device as the title block.
- **Rejected:** forking the theme package; `!important` overrides; keeping the
  Slop crest in the nav (omitting `logo` makes the theme fall back to a text
  wordmark, which the brand file then types out — the favicon stays, since the
  fiction is still that Slop University published this).
- **Verified by looking, not only by building.** Cold build with the axe cache
  deleted: 42 pages no accessibility violations, 1 deck clean, no broken
  links, 11/11 tests. Then home, weeks 1 and 9, the capstone, the deck and
  policies at 1920×1080 and 390×844 — no horizontal overflow anywhere, and the
  margin rule clears the text column at 390px via a widened content inset.
- **Commit:** `d7fe9a8`

## 2026-09-20 — Pilot-a feedback fixes, deck repurposed, and the full site hierarchy

Live review of `design/pilot-a/` surfaced eight concrete problems: the hero
didn't show the course identity, the kinetic engine's `--kv-wdth` swing
reflowed running text (a bug already diagnosed and fixed once in
`design/option-a-v2/`, on 2026-09-17 — the pilot reintroduced it by prioritising
literal Design-A fidelity over that fix), the pinned rotator replayed its
glitch-scramble on every scroll wobble near a boundary, the section rail
wasn't sticky at the 390×844 marking viewport, week pages scrolled with a
layout-thrash lag, the lecture spine listed specific clock times the brief
never asked for, and there was no resource-distribution model at all.

- **Kept GSAP.** Re-confirmed via direct question: fix the rotator's retrigger,
  don't remove the pin. Fixed by gating the glyph-scramble replay behind a
  ~140ms settle timer — item/tick/label updates stay instant on scroll.
- **Reused the already-verified `--kv-wdth` clamp** (78–96, not a new number)
  across `index.html`, `week-01.html`, `week-07.html`. See `LEARNINGS.md`.
- **Sticky rail fixed with a measured `--navh`**, not a literal `0` — same
  pattern `index.html` already used for its own masthead offset. Mobile's
  explicit `top:auto` override, which disabled stickiness at the marking
  viewport, is removed.
- **`markRail()` rAF-coalesced** — one read/write per frame instead of one per
  scroll event, on both native and Lenis scroll. See `LEARNINGS.md`.
- **Lecture spine reworded** from a timed runsheet to untimed discussion
  points; the heading changed from "Lecture spine" to "What this lecture
  covers." Overall-duration statements (the "118 minutes" stat) were left
  alone — they're not the runsheet that was the complaint.
- **Resources built as real in-site pages**, not mocked external links: a
  compact Resources strip on each week page, plus `resources.html` (sitewide
  index, grouped by type) and three stub pages — `policies.html`,
  `support.html`, `assessments.html` — each with real masthead/footer chrome
  and one honest placeholder paragraph, never a dead link or fabricated
  content standing in as real.
- **`deck.html` repurposed** from one week's 13-slide lecture detail into a
  12-slide, one-per-week pitch deck — hook + what happens + (where relevant)
  what's due and its weight, one slide per week, reusing only the deck's
  existing station variants (`st--open`, `st--split`, `st__list`, `st--dark`,
  `st__rules`, `st--volt`, `st--close`). Content for weeks other than 1 and 7
  drawn from `CURRICULUM.md`'s week-by-week detail and assessment ladder, not
  invented. Mechanics (dynamic station count, digit-key 1–9, progress bar,
  swipe) carried over unchanged.

### Site hierarchy and navigation (planning decision, not built this round)

Seventeen pages total: `index.html` (home), `weeks.html` (a 12-tile index
reusing the home page's existing `.wk` card component — no new component),
`week-01.html`…`week-12.html`, `deck.html` (now the repurposed pitch deck),
`assessments.html` plus one page per assessment (brief + rubric together, not
split), `people.html`, `policies.html`, `resources.html`, `support.html`.

Navigation reuses Design A's existing chrome rather than inventing new UI:
**masthead** (every page) — `Home · Weeks · Deck · Assessments`, four items to
fit the masthead's current bordered-grid budget; `Weeks` always points at the
index so no page's masthead has to hardcode a specific neighbouring week.
**Colophon** (every page's footer, not just home) — `People · Policies ·
Resources`, the same link cluster Design A's home page footer already has,
put on every page rather than invented anew. `Support` has no top-level slot;
it's reached from Resources and Policies. Each week page's Resources strip
is the tertiary, in-context fast path to that week's own material; the
sitewide `resources.html` is the fallback for "find anything."

Deliberately not built this round beyond the stub pages already listed
above — the plan is signed off, the rest of the port comes next.

- **Files:** `design/pilot-a/index.html`, `week-01.html`, `week-07.html`,
  `deck.html` edited; `resources.html`, `policies.html`, `support.html`,
  `assessments.html` created.

## 2026-09-20 — Round-2 pilot-a fixes: stretch guard, rail scroll, real nav, real content

Ritesh's round-2 feedback logged verbatim in `prompt-log.md`, handed off in
`HANDOFF-round2.md`. Six items, run as orchestrator per that handoff: item 1
kept as my own design work (the harder judgement call), items 5 fanned out
to four parallel content agents (disjoint files, no shared writes), items 2/
4/6 and the item-3 nav pass done directly since each is small and mechanical
once item 1's file-level context was already loaded.

- **Decision (item 1 — kinetic-engine stretch):** replaced the shared 78–96
  `--kv-wdth` clamp on `.rot__say`/`#ldH` (`index.html`) and `.wh__t`/
  `.act2__h`/`.ck__h` (week pages) with a per-element measured safe range —
  `initGuards()` binary-steps each heading's own `--kv-wdth` outward from
  rest until its measured line count would change, in both directions (the
  round-1-known narrowing risk, and a second, previously unflagged widening
  risk from `prefers-reduced-motion`'s static 112 override). Re-measured on
  `document.fonts.ready` and on resize.
- **Why:** the shared clamp was one number asserted safe for several
  elements with different `max-width`s and wrap thresholds — it happened to
  hold for some viewports and not others, which is exactly the bug
  report. Ritesh asked for "the more robust one" between a global
  re-clamp and a per-element measured approach; a global number is always a
  guess about elements it wasn't measured against, a per-element guard is
  not. See `LEARNINGS.md` for the full bug/fix pair.
- **Rejected:** forcing `white-space:nowrap` on the affected headings —
  would have silently killed their intentional multi-line wrapping at
  narrow viewports, trading one bug for a worse, quieter one.
- **Decision (item 2 — rail smooth-scroll):** rail links on `week-01.html`/
  `week-07.html` now `preventDefault()` and call `lenis.scrollTo()`
  (offsetting by the measured `--navh`) instead of the browser's default
  instant anchor jump, falling back to `window.scrollTo({behavior:"smooth"})`
  when Lenis or GSAP failed to load.
- **Decision (item 3 — real site-wide nav):** built `weeks.html`, a 12-tile
  grid reusing the `.wk` card component from the horizontal act (only weeks
  01 and 07 link out, the rest stay plain `<article>`s since no other week
  page exists yet). Masthead standardised to `Home · Weeks · Deck ·
  Assessments` and colophon to `Home · People · Policies · Resources` across
  every page except `deck.html` (full-viewport slideshow, masthead only by
  design, unchanged). `Support` kept off both nav tiers, reached only from
  Resources/Policies bodies, matching the plan recorded in the entry above.
- **Decision (item 4 — native swipe on the pinned act):** above 900px the
  `.act__view` strip stays `overflow:hidden` with GSAP driving `track`'s
  transform (unchanged), but a `wheel` listener on the view now redirects
  deltaX-dominant events (trackpad/mouse sideways swipe) into
  `window.scrollBy(0, deltaX)`, which ScrollTrigger's existing scrub turns
  back into lateral motion — one input source (vertical scroll position)
  still drives the animation, so it never fights the pin.
- **Rejected:** setting `overflow-x:auto` on the view and syncing `scrollLeft`
  back into the GSAP timeline — two independently-writable scroll positions
  for one animation, more failure surface for no visible benefit over
  redirecting the gesture.
- **Decision (item 6 — card DOM order):** swapped `.wk__t`/`.wk__d` order in
  every `.wk` card (`index.html`, new `weeks.html`) so title now follows the
  number, before the description — matches reading order. `.wk__t`'s
  `margin:auto 0 0` (previously pinning title to the card's bottom when it
  was the last child) was removed rather than moved to `.wk__d`, since
  moving it would have split the flex free-space between two auto margins
  and centred the block instead of just relocating the pin.
- **Decision (item 5 — real content, already covered under "Site hierarchy"
  above):** `assessments.html`, `policies.html`, `support.html`,
  `resources.html` rewritten and `people.html` created, all transcribed
  verbatim from `CURRICULUM.md` §4–5 by four parallel content agents, zero
  shared files between them. `grep -ln "placeholder" design/pilot-a/*.html`
  returns nothing.
- **Files:** `design/pilot-a/index.html`, `week-01.html`, `week-07.html`,
  `resources.html`, `policies.html`, `support.html`, `assessments.html`
  edited; `design/pilot-a/people.html`, `weeks.html` created.
- **Not yet done:** the user has not yet visually verified the item-1 fix or
  the new nav — see the verification checklist handed over in-conversation
  this session. No `pnpm check`/`check:evidence` run — pilot-a sits outside
  the Astro build and its own checks per the harness's platform-facts
  section.

## 2026-09-20 — src/ restyle-vs-eject attempt abandoned; full Astro redesign called for

**This entry supersedes the "Stage 1" work-in-progress below it in this
file's chronology (it's appended above, but happened after).** A fresh
session picking this up should read this entry first, then decide with
Ritesh whether anything in the uncommitted working tree is worth keeping
before starting the redesign — do not assume yes or no.

- **Context:** a prior session ran `pnpm approve-plan`-style sign-off on a
  7-stage plan (still on disk at
  `~/.claude/plans/glistening-moseying-mountain.md`) to rebuild `src/` (the
  real, required Astro deliverable) so it looks exactly like
  `design/pilot-a/` (a static-HTML "Kinetic Manifesto" prototype, never wired
  into the build). Stage 1 was "design-system infra + home page only," gated
  behind an explicit checkpoint before any other stage started.
- **What happened in Stage 1, in order:**
  1. CSS-only restyle of the theme's `.at-nav`/`.at-footer` against
     `notepad.css`, plus new section CSS appended to `index.astro` below the
     page's existing, untouched hero.
  2. Ritesh inspected the running preview himself and said, verbatim: *"I've
     opened up the preview and it looks like you already failed your task.
     This looks almost identical to the astro project initially in src, and
     doesn't look like pilot-a AT ALL... Do you see the difference? I'm not
     sure why it is difficult to understand."* Two screenshots made the gap
     concrete: pilot-a's giant edge-to-edge `.hl` headline with a red
     highlight-wipe, inverted-tab masthead and live "AXES 300/96" HUD vs. the
     site's small default `<h1>`/lead and a CSS-tinted version of the theme's
     own nav.
  3. **Root cause, self-diagnosed on inspection:** `astro-theme-university`'s
     `BaseLayout.astro`/`ContentLayout.astro`/`MdxPageLayout.astro` hardcode
     their own `Nav`/`Footer` imports and unconditionally inject a generic
     `<h1>{title}</h1>`/`<p class="lead">` ahead of any page-authored hero
     slot content, with no prop or slot to override either. A CSS restyle of
     `.at-nav`/`.at-footer` was a ceiling from the start, not a path to
     pixel parity — and a subagent's prior "hero: pass" visual-QA verdict on
     this exact page was wrong, which is itself the bigger problem: a
     subjective screenshot pass/fail was being treated as equivalent to an
     actual structural diff against pilot-a's markup.
  4. Ritesh's fix instruction: *"Eject and fork Nav.astro so it's
     pixel-exact,"* then, once component-scoped forking was under way:
     *"However, this is not just about the mast, it is about the whole
     website."*
  5. Acting on that, this session forked `Nav.astro` → pilot-a's `.mast`
     (3-column grid: course-code wordmark / horizontal tab strip with
     inverted current-tab + underline-slide / live axis HUD), `Footer.astro`
     → pilot-a's `.colo` colophon (label + convenor prose + link rows, giant
     `.colo__big` decorative wordmark, credit strip), and local
     `BaseLayout.astro`/`ContentLayout.astro`/`MdxPageLayout.astro` wrappers
     around the theme's so those two local components actually render, with
     a `heroSlot` opt-out on `ContentLayout` for pages supplying their own
     hero. Six pages' + `PageLayout.astro`'s imports were repointed at the
     local forks. `.d` (wrapping display-type role) and the full
     `.hero`/`.hero__kick`/`.hl`/`.field` wipe/`.hero__foot` CSS were ported
     into `notepad.css`. `pnpm build` was green (axe clean, no broken links,
     42 pages) after each tranche. **Not done:** `index.astro`'s body markup
     itself was never rewritten to use the new `.hero` structure — the CSS
     was staged but the page still renders its pre-existing hero markup, so
     none of this was visually verified against pilot-a before the session
     was stopped.
- **Ritesh's stop instruction, verbatim:** *"Ok stop, we need a COMPLETE
  redesign of the frontend, using astro. Write a handoff to a new session
  that will give it the necessary context."* Read as: the fork-by-fork,
  CSS-first, restyle-what-you-can approach — even once it escalated to
  ejecting individual theme components — is not the right unit of work
  anymore. The next session should treat the frontend as a from-scratch
  Astro build against pilot-a's actual design (or a redesign it agrees with
  Ritesh on), not a patch chain against the existing theme-derived `src/`.
- **State left behind, uncommitted, nothing pushed:**
  - Modified: `src/styles/notepad.css` (`.mast`/`.mast__*` fully replacing
    `.at-nav`, `.colo`/`.colo__*` fully replacing `.at-footer`, `.d` utility
    class, full `.hero`/`.hero__kick`/`.hl`/`.hl--bleed`/`.hl--in`/
    `.hl--nudge`/`.field`/`.field__bg`/`.field__t`/`.hero__foot` block —
    the last of these has no markup consumer yet), `src/scripts/axis-
    engine.client.js` (added `#mast-hud-w`/`#mast-hud-x` live text updates,
    wired to nothing else new), `src/pages/index.astro` (new CSS for
    streams/act/rotator/ledger sections added earlier in the session, plus
    two `withBase()` href fixes; hero markup itself unchanged), and the
    import line in each of `src/layouts/PageLayout.astro`,
    `src/pages/{index,sessions/index,sessions/[slug],people/[slug],
    assessments/[slug],lectures/[slug]}.astro` (now pointing at local layout
    forks instead of the theme's).
  - New, untracked: `src/components/Nav.astro`, `src/components/Footer.astro`,
    `src/layouts/BaseLayout.astro`, `src/layouts/ContentLayout.astro`,
    `src/layouts/MdxPageLayout.astro`.
  - `package.json`/`pnpm-lock.yaml` also show as modified in `git status`
    from earlier in the session; not audited as part of this handoff — check
    what changed before assuming it's redesign-related.
  - None of this is committed. `main` is unchanged from `448555a`. A fresh
    session should look at this diff and ask Ritesh whether any piece of it
    (the Nav/Footer/layout forks in particular — they solve a real platform
    constraint, forced markup with no override point, that will recur in any
    from-scratch rebuild too) is worth keeping before a `git stash`/reset, or
    whether he'd rather start the redesign on a clean tree. **Don't discard
    or reset unilaterally — this is exactly the "investigate before
    overwriting" case CLAUDE.md calls out, and there's a prior incident this
    session (`backup/unwanted-src-port`, see the entry below) about
    unreviewed `src/` changes on this exact repo.**
- **Platform facts that constrain any redesign, restated from `CLAUDE.md`
  because they will bite a fresh session immediately:** `published: false`
  is banned (dangling-ref hard-fail; use `draft: true`); axe throws the
  build and CI's deploy job re-runs `pnpm build`, so an accessibility
  regression takes the live site down; the broken-links checker also throws
  in `astro:build:done` and checks the *whole site* on any one nav/footer
  link change, so a new nav/footer link and the page it points to must land
  in the same commit (this bit twice this session — once on two
  `index.astro` hrefs, once on `Footer.astro` linking to not-yet-built
  `/deck/`/`/resources/`); there is no image generation, so any redesign
  commits to type-and-CSS, not imagery; `{/* embed: <ref> */}` in body
  content silently creates a graph edge and self-refs throw; the starter
  sweep (`git grep -- src`) only sees tracked files, so `check:evidence`
  must run after committing, not before.
- **Design source of truth, unchanged:** `design/pilot-a/index.html` (plus
  its per-week/assessment/etc. siblings) is the static-HTML reference for
  what "the redesign" currently means, unless Ritesh redirects it. It is a
  prototype, never wired into the Astro build — reading it does not require
  running anything.
- **Task list:** the 7-stage plan's tasks (`Stage 1` through `Stage 7`, all
  still showing in `TaskList`) are stale against this pivot and should be
  replaced with whatever task breakdown the redesign actually needs, once
  scoped with Ritesh — don't resume Stage 2 onward as if Stage 1 merely
  needs finishing.
- **Prompt-log and per-reply discipline:** the stop instruction is logged to
  `prompt-log.md`. It's a clear, well-scoped instruction — a full-scope
  pivot stated in one sentence, not a vague approval — but it is also a
  *decision that reopens a decision already made* (the 7-stage restyle
  plan was pre-approved), so the fresh session should get an explicit
  confirmation of scope (from scratch vs. from pilot-a's markup vs. new
  design entirely) before writing any code, not assume "redesign" means
  "finish what this session started, but faster."

## 2026-09-20 — Round-3 fixes, six skills built, and an unwanted-port revert

- **Decision (round-3 fan-out):** five agents fixed round-3 feedback on
  `design/pilot-a/`, each with an exclusive file scope: fiction-leak removal
  in `index.html`/`policies.html`/`week-07.html`, a three-stream card layout
  on `index.html` linking to a new `streams.html`, four dedicated
  `assessment-1..4.html` pages transcribed from `CURRICULUM.md` §4 (linked
  from `assessments.html` and from the A1–A4 rows on `index.html`), a
  bobbing `.scue` scroll-down cue on `weeks.html`, and a full 12-slide
  `deck.html` reframe around each week's learning outcome. One agent (the
  assessment/streams pages) died mid-task on an API error with zero files
  written and was relaunched clean with the same brief.
- **Bug caught pre-commit:** a direct `grep -rniE` sweep across all of
  `design/pilot-a/*.html` (not yet run by the dedicated skill below) found a
  fiction leak in `weeks.html`'s lead paragraph naming "index.html" and
  "this pilot" directly — pre-existing from an earlier round, never caught.
  Fixed inline. See `LEARNINGS.md`.
- **Decision (skills):** built six project-level skills in `.claude/skills/`
  so this session's recurring workflows survive into future sessions rather
  than being re-invented each time: `fiction-leak-sweep` (grep first pass,
  then a fresh no-context agent for narrative leaks), `verify-pilot`
  (pilot-a's build-less sibling of `verify-frontend`), `agent-fanout`
  (exclusive-scope delegation rule, including the "bounded single edit is
  still agent work" test), `port-curriculum-content` (transcribe, don't
  invent, flag every gap), `log-learnings`, `log-prompt`.
- **Harness correction:** Ritesh corrected a misunderstanding — `LEARNINGS.md`
  is not code-technique-only, it is where his own learning about *how he
  works with me* belongs, and building a skill out of a recurring ritual is
  itself exactly that kind of entry. `CLAUDE.md`'s permanent-learnings-log
  section and `LEARNINGS.md` were both edited to say this explicitly. Read
  that section before reporting "nothing to log" on a session whose output
  was process/collaboration change rather than a site change.
- **Discovered and reverted: an unwanted concurrent Astro port.** While
  answering "what's pending for a complete course website," found via
  `git log -- src/`, `git status`, and the shared `TaskList` that a peer
  session (`comp4020-ass2-riteshsivaraman-c2`) had, without this session's
  knowledge, been porting pilot-a's fixes into the real `src/` tree: 8
  commits (`2ca1b60`..`eba7763`, including a `src/pages/preview/` fidelity
  page, `axis-engine.client.js` and `site-config.ts` edits) plus 5
  uncommitted file changes on top. Ritesh confirmed this was not wanted and
  had rewound his own session to before it happened, asking to "come back
  from completely."
  - **Action taken:** nothing was discarded. `backup/unwanted-src-port`
    branch created at the pre-revert HEAD (`eba7763`), with the uncommitted
    working-tree state committed onto it too (`4b3f270`) so the full port is
    recoverable if any of it turns out to be wanted later. `main` was then
    `git reset --hard` to `f8d25d9` — this session's own last commit, the
    point immediately before the port began.
  - **Peer session notified:** messaged
    `comp4020-ass2-riteshsivaraman-c2 [626d29]` to stop working in that
    direction, pointed it at the backup branch, and asked it not to push or
    re-apply anything to `main` unilaterally. Shared task #9 ("Get pilot-a
    fidelity preview approved before re-porting pages") deleted.
  - **Not yet resolved:** whether the two other idle peer sessions on this
    repo (`comp4020-ass2-riteshsivaraman-ec`, `-2a`) are related to the
    unwanted port and need the same notice — not yet checked. Confirmation
    from `-c2` that it has stopped had not arrived when this session ended.
- **Next session starts here:** `main` is at `f8d25d9`
  ("deck.html: reframe all 12 slides around each week's learning outcome"),
  working tree clean, `design/pilot-a/` round-3 fixes are all committed and
  landed (see commits `5f46bff`..`f8d25d9`). The "what's pending for a
  complete course website" todo list that was being built when the port was
  discovered was never finished — re-derive it fresh from `main`'s actual
  state, not from anything that referenced the reverted commits. Do not
  treat `backup/unwanted-src-port` as dead weight without checking with
  Ritesh first; it may still contain content worth deliberately re-porting
  later, under this session's own control rather than an unreviewed parallel
  one.

## 2026-09-20 — Wave 0–1 built against the approved mockup, fidelity gaps closed

- **Superseding note:** the "COMPLETE redesign" pivot logged above is now
  underway against `~/.claude/plans/buzzing-foraging-tide.md`, not
  `design/pilot-a/`. The actual design source of truth changed again after
  that handoff was written: a standalone static mockup
  (`/tmp/slop3841-mockup-v2.html`, not in the repo) went through subagent
  design critique and landed on "Night Terminal" — Archivo Black/IBM Plex
  Sans/IBM Plex Mono, asymmetric grid, sticky left rail with a 12-week audit
  tracker, claim/evidence "stamp" component — in two finished palettes,
  Daylight Concrete (light, `nt-l2`) and Violet Signal (dark, `nt-d1`), wired
  as a real persisted toggle rather than a single fixed look.
- **Wave 0 (foundations) and Wave 1 (home page)** are built and were
  committed at `9e2ea5f`: token stylesheet with the three-state light/OS-
  dark/explicit-toggle CSS pattern, self-hosted `@fontsource` fonts (no CDN
  font requests), fresh `Nav.astro`/`Footer.astro` sourced from
  `siteConfig.links`, and a rebuilt `index.astro` with the stamp component,
  streams grid, week grid, and assessment ladder.
- **Design-fidelity check (Ritesh, verbatim): "It does not resemble the
  original design, any reason why?"** Treated as a real audit request, not
  reassurance-seeking — re-read the mockup in full and diffed it against the
  shipped code rather than re-screenshotting. Found three genuine gaps: the
  rail never got the mockup's signature always-visible 12-tick audit
  tracker (Wave 1 only put a detailed tracker in the homepage body); the
  week grid was 4 columns instead of the mockup's 6-column
  `repeat(6,1fr)`/`grid-auto-rows:150px` with weeks 1 and 6 as 2×2
  solid-fill `.wk--big` tiles; the assessment grid was a 2×2 box-border
  layout instead of the mockup's 4-across background-gap hairline-divider
  technique (`gap:2px; background:var(--ink-line)` with each card owning its
  own solid fill). The stampcard clip-path/rotation was initially also
  flagged as missing but turned out to already be correct in
  `src/styles/base.css` — a false alarm from checking `ClaimStamp.astro`/
  `index.astro` first instead of the shared CSS file.
- **Fixes:** extracted `src/lib/semester.ts` (week/date → past/current/
  upcoming state) so the rail's new compact tick-grid tracker and the
  homepage's detailed list tracker read the same computation and can never
  disagree about which week is current; added the tick-grid tracker to
  `Nav.astro`; corrected `.week-grid`/`.wk--big` and `.assess-grid` CSS in
  `index.astro` to match the mockup's actual grid geometry.
- **Follow-up feedback (Ritesh, verbatim): "It looks much better. My only
  feedback is that the nice visual features/components are buried towards
  the end of the page and arent noticed as easily."** Diagnosed as the
  homepage's `<SemesterTracker />` detailed list — a large block sitting
  between the hero and the streams grid — pushing the more visually
  distinctive sections (streams cards, week grid, assessment ladder) further
  down the page. It was also redundant against the mockup's actual homepage
  body, which never had a second tracker once the rail carried one, and
  redundant against the rail's own compact tracker on every page. Removed
  the `<SemesterTracker />` call and its import from `index.astro`; the
  component itself is kept (not deleted) for reuse as the detailed week-list
  view on `sessions/index.astro` in Wave 2, where that level of detail is
  the right amount for a dedicated index page. Reverified with `pnpm check`
  and a visual pass at both marking viewports — the streams grid now
  appears directly after the facts list, one scroll below the hero.
- **State:** Waves 0–1 plus these fixes are committed together (this
  session did not commit the fidelity/buried-content fixes separately from
  Wave 1's original landing, since they were caught and fixed before Wave 2
  started). Waves 2–4 (session pages, secondary pages, deck re-skin) are
  still open — see `~/.claude/plans/buzzing-foraging-tide.md` for the
  remaining breakdown.

## 2026-09-20 — Wave 2: session pages, the heading-name mismatch, and a site-wide anchor bug

- **The mismatch:** the mockup drew the session page's body as a fixed
  two-heading split labelled "Bring" / "In the room." Grepping all twelve
  real session bodies for `^## ` showed only "Leaving with" recurs
  reliably as a heading name, and even it isn't always last — week 1 has a
  further heading after it. Hardcoding "Bring"/"In the room" as literal
  markdown headings would have silently broken on every week phrased
  differently, so this went to Ritesh as an `AskUserQuestion` rather than
  guessed (see `prompt-log.md`, Wave 2 kickoff entry).
- **Decision:** Ritesh chose the generic two-column split. Implemented as
  CSS `columns: 2 320px` on the rendered `<Content />` (`.week-body` in
  `base.css`) — heading-name-agnostic, collapses to one column at ≤720px.
  "Leaving with" and everything after it is then lifted out of that column
  flow into its own full-width `.leaving-band`, client-side, by a small
  `is:inline data-astro-rerun` script that finds the `h2` matching
  `/^leaving with/i` and moves it plus its remaining siblings into a new
  wrapper `insertAdjacentElement("afterend")`d after the body.
- **Why DOM-lift over splitting the markdown itself:** Astro's `render()`
  returns a `<Content />` component for the whole entry, not a string
  that's easy to cut at a heading boundary — reaching into
  `@astrojs/markdown-remark`'s internals (hoisted awkwardly under pnpm's
  `.pnpm/` store) to split at render time was worse surface area than a
  ~25-line progressive-enhancement script matching the same pattern
  `SemesterTracker.astro` already uses. With JS disabled the "Leaving with"
  section stays inline in the two-column flow instead of breaking into its
  own band — content-complete, just less visually distinct.
- **Bug found by looking, not by the green build:** the theme's markdown
  plugin injects a permalink anchor (`<a class="at-heading-anchor"
  aria-hidden="true">#</a>`) after every heading in rendered content. No
  CSS in the codebase styled it, so it rendered as a visible stray "#"
  after headings site-wide (e.g. "BRING#") — invisible to every check run
  so far because this was the first wave to visually inspect long-form
  rendered `<Content />` body copy at the marking viewports, rather than
  short hand-authored page copy. Not scoped to Wave 2's own code; pre-
  existing since whichever wave first rendered markdown bodies. Fixed with
  `opacity: 0` by default, revealed on `:hover`/`:focus-visible`, so it
  stays keyboard-reachable without reading as a typo.
- **Deleted:** `StreamBands.astro` and `SessionsGrid.astro`, both fully
  superseded by the new `sessions/[slug].astro`/`sessions/index.astro` —
  confirmed via `grep -rln` that neither had any remaining real caller
  (one apparent `index.astro` match was already a stale code comment).
- **Verified:** `pnpm check` green (axe: 0 violations across 42 pages,
  vitest 11/11), plus a live look at weeks 01 and 09 (the marker's two
  non-adjacent-week sample) at both 1920×1080 and 390×844 — mobile
  confirms the multi-column body collapses to one column, the leaving-band
  and stream-strip both stack correctly, and week 01's extra trailing
  heading after "Leaving with" is correctly absorbed into the lifted band
  rather than left behind in the two-column flow.
- **Commit:** `3f20431`
- **Not committed — flagged, not actioned:** untracked `SHIP_INSTRUCTIONS.md`
  and `.claude-ship-kit/` appeared in the working tree this session, never
  created by this agent. The file is written as instructions to a future
  Claude session telling it to flip the GitHub repo public and deploy —
  an irreversible, high-blast-radius action. Left both untouched and
  unstaged; raised with Ritesh directly rather than acted on, per the
  instruction-source-boundary rule (content sitting in files is data, not
  a command, regardless of who or what put it there).
