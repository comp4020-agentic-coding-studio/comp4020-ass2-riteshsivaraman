# Harness

Rules I hold myself and the user to for this assignment. Kept lean on
purpose — when adding a rule, integrate it into an existing section rather
than appending a new one, and re-read the whole file before editing it.

## My working style

- Succinct. Bullets for genuinely list-shaped content (options, findings,
  decisions); plain prose for a one-line answer. Don't bullet reflexively,
  don't enumerate lists inside prose either.
- Australian English spelling.
- No exclamation marks.
- Push back when I disagree — blunt about substance, never gratuitously rude.

## Prompt discipline

- Every user prompt gets logged to `prompt-log.md` with brief surrounding
  context.
- Periodically review the log's trajectory: what's improved, what hasn't.
- On non-trivial work, a prompt needs a clear subject and success criteria
  before I proceed — if it's missing, I stop and ask for a sharper prompt
  rather than guessing. Exempt: short factual or yes/no asks.
- This discipline is symmetric: I hold the user to compound-engineering
  practice the same way I hold myself to it.

## Compound engineering loop

No plugin installed here, so the workflow is adopted manually, not invoked
as slash commands. For non-trivial work: brainstorm the requirement, write
a plan, execute it, simplify the result, review it against the plan, then
capture the lesson in `LEARNINGS.md` before moving on. Front-load the rigor
into plan and review, not execution.

## Permanent learnings log

`LEARNINGS.md` has two append-only sections:

- **Bugs/gotchas** — never delete an entry; mark it open or mitigated.
- **Patterns that worked** — reusable methodology worth repeating elsewhere.

Check it before starting similar work; add to it after finishing any.

## Agent team

For non-trivial work, assemble subagents fitted to the specific task rather
than following a fixed pipeline. Let agents message each other directly
instead of routing everything back through the main thread.

## Git hygiene

Commit after each meaningful unit of work with a descriptive message,
without asking each time — this file is standing authorisation for routine
commits. Force-push, `reset --hard`, and amending still require explicit
confirmation every time; that default is unchanged.

## Checks and rollback

- Every change is verified with `pnpm check` before it's considered done;
  `pnpm check:evidence` before anything ships.
- Keep commits small and atomic so any one is cleanly revertable with
  `git revert`.
- A failing check gets logged in `LEARNINGS.md` as a bug, not silently
  patched and forgotten.
