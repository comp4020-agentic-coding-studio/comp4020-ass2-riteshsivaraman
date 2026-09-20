---
name: agent-fanout
description: Splits a round of frontend/content fixes across background agents with non-overlapping exclusive file scopes, so main stays the sole git-committer and build-runner. Use whenever a round has more than one fix to make, even if each fix is individually small — a bounded single edit is still agent work if main doesn't need to steer it mid-execution.
---

# Agent fan-out

For this repo (COMP4020 Assignment 2). Implements `CLAUDE.md`'s "Agent team"
section directly — read that section first if this skill's summary is
ambiguous on a specific point.

## When to fan out

Not just when work is parallelisable in the traditional sense. The test is
**"does this need main's judgement while it's being written,"** not "is
there more than one of these." A single well-specified CSS tweak or copy
rewrite goes to an agent exactly like a four-way content build does — see
`LEARNINGS.md`'s "Orchestration only pays off when execution, not just
fan-out, is delegated" entry, written after a session blew its context
budget doing four mechanical single-file fixes inline and only delegating
the one task that had multiple pieces.

## Building the wave

1. List every fix in the round with the exact file(s) it touches.
2. Assign each fix to exactly one agent, and check the file sets are
   disjoint across the whole wave — **no file has two owners in a wave**.
   If two fixes need the same file, either merge them into one agent's brief
   or sequence them (second agent starts after the first's diff is reviewed
   and committed), never run them concurrently.
3. Each agent's brief states its exclusive write scope explicitly, and
   instructs it to message main (not touch the file itself) if it discovers
   it needs a change outside that scope.
4. Dispatch all agents for the wave in a single message with multiple Agent
   tool calls, so they actually run concurrently rather than serially.

## What agents do NOT do

Per `CLAUDE.md`: agents write files and report; they never run `git`
commands and never run `pnpm check`/`pnpm build` (or, for `design/pilot-a/`,
never need to — it has no build step). Two agents running `git add`
concurrently stage each other's half-written files; two concurrent builds
corrupt `dist/` and the a11y cache. The build (where applicable) is the
merge point, executed only by main, only after the whole wave reports back.

## After the wave

Main reviews every agent's diff directly — `git diff` per file, not just
the agent's self-report of what it did — before committing. Commit as one
batch or logically grouped commits per this repo's git-hygiene rules (small,
atomic, descriptive, no amend/rebase/force-push). Then hand the user a
verification checklist — see `verify-pilot` or `verify-frontend`, whichever
scope applies.
