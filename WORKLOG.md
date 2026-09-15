# Work log

Running record of decisions as the assignment gets built — raw material for
`PROCESS.md`, not the deliverable itself. One entry per notable decision.

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
