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
