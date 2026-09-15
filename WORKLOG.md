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
