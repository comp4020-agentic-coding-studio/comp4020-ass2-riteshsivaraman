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
- **Commit:** _pending_

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
- **Commit:** _pending_

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
- **Commit:** _pending_

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
- **Commit:** _pending_

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
- **Commit:** _pending_

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
- **Commit:** _pending_

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
- **Commit:** _pending_
