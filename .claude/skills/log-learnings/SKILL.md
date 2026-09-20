---
name: log-learnings
description: Appends a bug/gotcha or a working pattern to LEARNINGS.md in the repo's established two-section, append-only format, and states in the reply which entry was added (or that none was). Use after any failing check, real bug, or reusable methodology surfaces — before moving on to other work.
---

# Log learnings

For this repo (COMP4020 Assignment 2). `LEARNINGS.md` has two append-only
sections — never delete an entry, only add or update its status:

- **Bugs / gotchas** — a real defect that was found, with a status line
  (`open`, `mitigated`, or similar) that can be revised in place as the fix
  evolves, without deleting the original description.
- **Patterns that worked** — a reusable methodology worth repeating
  elsewhere in this project or others.

## Entry format

Match the existing entries' shape exactly (read a couple of neighbouring
entries in `LEARNINGS.md` before writing a new one, to catch drift in tone
or structure):

```
### <short, specific, symptom-first title>

<what happened, concretely — the failure mode or the technique, not a vague
gesture at the topic>

**Status: <open|mitigated|applied>.** <what was decided or done, and why —
enough that a future reader can judge whether the mitigation still holds>
```

- Bug titles describe the symptom or root cause, not the fix ("An
  unclamped velocity-driven CSS variable reflows text as a side effect", not
  "Fixed text reflow bug").
- Pattern titles name the reusable idea, not the instance it was learned
  from ("Orchestration only pays off when execution, not just fan-out, is
  delegated", not "Fixed context budget in round 2").
- If a later round finds the same bug insufficiently fixed, **append a new
  status paragraph to the existing entry** rather than opening a duplicate —
  see the "unclamped velocity-driven CSS variable" entry's round-2/round-3
  history for the pattern. Order paragraphs chronologically.
- Insert bug entries before the `## Patterns that worked` heading; insert
  pattern entries at the end of the file (or wherever the existing ordering
  convention places them — check current tail before appending).

## Binding reply rule

Per `CLAUDE.md`, every reply states in one line whether it added a
`LEARNINGS.md` entry and what it was (e.g. "Learnings: added — GSAP
retrigger gating pattern") or "Learnings: none this turn." This is not
optional and not batched — silence is not a valid answer, a stated decision
to skip it is.
