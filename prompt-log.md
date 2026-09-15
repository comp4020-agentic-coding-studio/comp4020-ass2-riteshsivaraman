# Prompt log

Every prompt from the user, brief context, and a running read on trajectory.
Tracked, but coaching notes only — not part of the graded narrative.

## Entries

1. Context: session open. Prompt: "Are we ready to work on this assignment?"
   Orientation check, no action requested. Fine as-is.
2. Context: before any building. Prompt: "1) Discuss a system to keep track
   of learnings for the process, reflection." Clear, scoped, single ask.
3. Context: after proposed WORKLOG.md system. Prompt: "Yes, I think you have
   a good idea." Short confirmation — exempt from vagueness check.
4. Context: before building starts. Prompt: numbered 11-item list of harness
   rules (succinctness, prompt discipline, compound engineering, permanent
   bug/pattern logs, style, git hygiene, agent team, enforcement symmetry,
   CLAUDE.md anti-bloat, checks/rollback, permission to disagree), plus a
   request for feedback on the list itself. Well specified: each item names
   a concrete behaviour and most give a reason. Only friction: #1 and #5
   pull in opposite directions on list usage — flagged and resolved rather
   than blocked, since intent was clear enough to arbitrate.

5. Context: after locking assessment structure, moving to curriculum
   build-out. Prompt: asks for the knowledge graph and page structure to
   be worked on together, then asks for "fresh interactive and dynamic
   elements," and anchors the ask with three concrete examples (progress
   tracker, historical-larper-of-the-week, weekly brainrot term) before
   saying "think of more." Good pattern worth naming: giving a few
   concrete seed examples before asking for open-ended ideas gives the
   brainstorm a shape to extend rather than a blank page to fill — the
   output is more likely to land near what was actually wanted, and it's
   easier to judge "more like this" against real anchors than against a
   bare adjective like "creative" or "innovative."

6. Context: fresh session, handoff read. Prompt sequence: "Have you looked
   at all resources available?" → "Let's look at those reference courses
   for tone calibration" → satire-woven-throughout + "I want it to
   actually feel like a portal... the experience should be a journey" →
   "sketch a concrete homepage/IA structure" → "form a detailed plan that
   uses a sde team based multi-agent workflow with communication between
   agents". Strong sequence: the first prompt was a challenge rather than
   an instruction, and it caught a real gap — the brief and spec had never
   been fetched from the course site, only the repo-local READMEs. Worth
   naming as a pattern: asking "have you looked at everything" before
   accepting a readiness claim is cheap and caught the most expensive
   possible omission. Direction prompts after that were decisive and
   answered the exact questions put to them (register, then IA, then
   workflow) without scope drift.

7. Context: plan drafted, about to be approved. Prompt sequence: "Plan looks
   good, only thing is that the harness, claude.md lacks context of the
   actual assignment." → "Don't start implementation now, just finalise the
   plan. the next conversation will pick it up. is the multiagent workflow
   parallel? I am looking at quick development, not over the course of
   multiple days." → "I'll clear context and build in another convo. Is
   handoff required?" → "I approve the plan, do those 3 and write the plan
   to the repo". Three things worth naming. First, the CLAUDE.md gap was a
   real one and I had not noticed it: the harness carried working style and
   git rules but nothing about *what is being built or what it is marked
   on*, so every subagent would have inherited a rulebook with no subject.
   Second, "is the workflow parallel?" was a good challenge to a plan that
   had unconsciously organised itself by calendar day — the fix was
   reorganising phases into dependency waves and stating honestly that
   authoring is parallel while building and committing are not. Third,
   asking "is handoff required?" before clearing context is the right
   instinct and it caught three live gaps: the plan was invisible from the
   repo, five WORKLOG entries were uncommitted, and two decisions made in
   conversation had never been written down at all.

## Trajectory

Seven entries in, consistently clear and appropriately scoped — no vague
asks yet, nothing blocked. Three strengths now visible, and they are the
same move at different scales: anchoring open-ended brainstorm requests with
concrete seed examples (#5), challenging a readiness claim rather than
accepting it (#6), and interrogating a plan's implicit assumptions —
calendar-shaped phasing, a harness with no subject, an undeclared handoff
(#7). The pattern is refusing to accept a claim of completeness at face
value, and it has caught something real every time.

Standing gap on my side, not the user's: prompt #5 recorded a request for
interactive/dynamic elements that never made it into `WORKLOG.md` as a
decision, so the handoff lost it, and the same happened to the stream-model
amendment agreed in #6. Both are now logged. The lesson is structural — a
decision that exists only in conversation does not survive a context clear,
so anything settled in dialogue gets written to `WORKLOG.md` in the same
turn, not at some tidier moment later.
