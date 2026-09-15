# Harness

Rules I hold myself and the user to for this assignment. Kept lean on
purpose — when adding a rule, integrate it into an existing section rather
than appending a new one, and re-read the whole file before editing it.

## The assignment

A complete website for a fictional course at Slop University, deployed to
GitHub Pages, due noon Mon 21 Sep 2026. The course is **SLOP3841**
(`level: 3`): professional LARPing — performing a career identity you do not
yet hold. No field prerequisite. Register is satire woven through the whole
framing, with every wrapper carrying genuinely usable career content
underneath; never satire concentrated in a footer, never sincere careers
pamphlet. Twelve weeks, shared lectures, three field streams (one session
page per week containing three stream sections), no fixed weekly tutorial
template. Capstone is real applications the student is pursuing anyway,
graded on process artefacts only — never outcome or prestige.

Marked **45% legibility of process, 20% working deployed artefact, 35%
response to the brief**, assessed live in Chrome at 1920×1080 and 390×844.
A marker spends about ten minutes, on five pages: home, a couple of
non-adjacent weeks, an assessment, the deck, policies. Those five carry the
mark; everything else supports them.

Full week-by-week detail and the build plan live in `PLAN.md`; the decision
record lives in `WORKLOG.md`.

## Platform facts that bite

Discovered by reading the packages, not the README. Each one is a real
failure mode, not a style preference:

- **`published: false` is banned.** The course graph re-reads raw files and
  skips unpublished nodes, so every inbound `related:` ref to one becomes a
  dangling ref and hard-fails the build. Use `draft: true` instead.
- **axe throws the build**, and CI's `deploy` job runs its own `pnpm build`.
  An accessibility regression takes the live site down — 20% of the mark —
  while a failing `spec/` test does not. Caution belongs on the axe side.
- **`{/* embed: <ref> */}` in a body silently creates a graph edge.** Edges
  are symmetrised, so declare each once. Self-refs throw.
- **The starter sweep is `git grep -- src`: tracked files only.** An
  uncommitted fix reads as a pass locally and a fail in CI, so run
  `check:evidence` after committing, not before.
- **Nothing enforces assessment weights summing to 100 across assessments** —
  only criteria within a single assessment. That gap is ours to sensor.

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
- On non-trivial work, a prompt needs a clear subject and success criteria
  before I proceed — if it's missing, I stop and ask for a sharper prompt
  rather than guessing. Exempt: short factual or yes/no asks.
- **A short approval of a large artefact is a vague prompt.** "Looks good",
  "let's go with this", "that's alright" against a plan, a design sketch or
  a written page transfers every unstated decision to me silently. Before
  acting on one I say back what I am treating as settled and what is still
  undecided, and get the second confirmed. This is the rule's most-missed
  case, not an edge case.
- **Quantify a vague constraint before planning around it.** "Quick",
  "soon", "not too much" are vibes; hours until the deadline and the grade
  being targeted are numbers, and the plan differs materially by them. Ask
  for the number rather than assuming one.
- **Say the feedback in the conversation, not just to the log.** Reviewing
  the trajectory means telling the user what is and isn't working while
  they can still change it. A flattering note in a file nobody reads back is
  worse than no review, because it looks like the rule was followed. Grade
  the log as if it will be read aloud.
- This discipline is symmetric: I hold the user to compound-engineering
  practice the same way I hold myself to it, and I have skipped it in that
  direction before.

## Compound engineering loop

No plugin installed here, so the workflow is adopted manually, not invoked
as slash commands. For non-trivial work: brainstorm the requirement, write
a plan, execute it, simplify the result, review it against the plan, then
capture the lesson in `LEARNINGS.md` before moving on. Front-load the rigor
into plan and review, not execution. Checkpoint and clear context
deliberately at natural task boundaries rather than letting the context
window run out mid-task and decide it instead.

## Permanent learnings log

`LEARNINGS.md` has two append-only sections:

- **Bugs/gotchas** — never delete an entry; mark it open or mitigated.
- **Patterns that worked** — reusable methodology worth repeating elsewhere.

Check it before starting similar work; add to it after finishing any.

## Agent team

For non-trivial work, assemble subagents fitted to the specific task rather
than following a fixed pipeline. Let agents message each other directly
instead of routing everything back through the main thread.

**The main thread is the sole committer and the sole build-runner.** Agents
write files and report; they never touch git and never run `pnpm check`.
Two agents running `git add` stage each other's half-written files, and two
concurrent `astro build` runs corrupt `dist/` and the a11y cache. Authoring
fans out; the build is the merge point. Every agent brief states its
exclusive write scope, and no file has two owners in a wave — an agent
needing a change outside its scope messages the main thread instead of
editing.

## Git hygiene

Commit after each meaningful unit of work with a descriptive message,
without asking each time — this file is standing authorisation for routine
commits. `reset --hard` still requires explicit confirmation every time.

**No amend, no rebase, no force-push for the rest of this assignment.** Not
"ask first" — prohibited. `check:evidence` resolves every `PROCESS.md`
citation with local `git cat-file -e`, so rewriting history silently
invalidates citations in the file carrying 45% of the mark while the
rendered markdown still looks perfect. This narrows the confirm-first
default above to a flat ban.

## Checks and rollback

- Every change is verified with `pnpm check` before it's considered done;
  `pnpm check:evidence` before anything ships. **Carve-out:** when subagents
  are running, only the main thread executes either — agents report and main
  batches a build per tranche.
- A green suite is not proof of correctness, only proof the work matches
  whatever was thought to test. After checks pass, look at the actual
  rendered pages at both marking viewports (1920×1080, 390×844) and say
  what's seen, even before knowing why.
- Before trusting a new check, mutation-test it: break the thing it's meant
  to catch, confirm it goes red for that reason, then restore. A check that
  can't fail is the bug.
- Keep commits small and atomic so any one is cleanly revertable with
  `git revert`.
- A failing check gets logged in `LEARNINGS.md` as a bug, not silently
  patched and forgotten.

## Design and content direction

- Curricular and creative decisions (voice, palette, layout, what a week
  actually teaches) are not the agent's to default on. Ask for direction
  rather than filling gaps with agent-shaped chunks — steering away from an
  already-built wrong idea costs more than asking up front.
- Verify built pages against actual intent by looking at them, not by
  assuming a diff matches the description. No placeholder links or content
  standing in for the real thing; it undermines the artefact's integrity.
- Custom visual/CSS work is where accessibility regresses quietly — check
  it against `pnpm build`'s axe pass and both marking viewports before
  it's considered done, not just under the general checks rule.

## Session handoff

Starting a fresh session on this repo means reading `WORKLOG.md` in full
first, then `PLAN.md` — the first carries the reasoning behind each
decision, the second carries the execution order and what is already done.
Both are tracked in the repo deliberately: a plan living only in
`~/.claude/plans/` is invisible to the next session.
