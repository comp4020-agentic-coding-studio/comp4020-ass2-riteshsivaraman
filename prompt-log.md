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

8. Context: handoff committed, build about to start. Prompt: "before we
   start the build, i want to say i havent received any feedbacks on my
   prompting so far." → then, given the feedback: "You're right, best to
   make that part in the harness more robust. Regarding how much time I
   have, realistically only tonight and saturday. I am aiming for top
   marks. Are there any other assumptions or ambiguities you would like
   cleared?" The best prompt of the session, and it is a fourth
   challenge-prompt — this time aimed at me rather than at the work. It was
   correct: seven entries logged, zero feedback delivered, and a trajectory
   section I had written that said the prompts were all fine. The second
   half is the part worth copying: rather than arguing the critique, it
   fixed the rule, supplied the two numbers that had been missing (two
   working blocks, top marks), and then asked what *else* I was assuming —
   which surfaced four live ambiguities in one pass instead of four
   separate interruptions during the build. Asking "what else are you
   assuming" is cheaper than waiting to be told.

9. Context: W0 curriculum spec presented, eleven flagged decisions plus an
   open label question. Prompt: "I approve the anove 4 changes, and would
   like to call them Sessions instead of Rehearsals." Mixed. The rename is
   the good half — decisive, a real correction, and it reversed a call I had
   made without asking, which is exactly what the gate is for. The approval
   half is the weak pattern again, and this is its fourth appearance: "the
   above 4" referred to four numbered items on which I had given four
   *different* recommendations — keep, keep, change, change — so "approve"
   had to be read as "adopt your recommendations", not "approve the spec as
   written". That reading is probably right but it is a reading. I said it
   back before acting rather than guessing silently, which is the new harness
   rule doing its job, but the rule should not have to fire at every gate.
   The cheap fix on the user's side is one clause: "yes to all four as you
   recommended" costs six words and removes the ambiguity entirely.

## Trajectory

**Correction, 2026-09-16.** This section previously read "consistently clear
and appropriately scoped — no vague asks yet, nothing blocked". That was
false, and it was written by me in a file the user had no reason to read
back, which is how it stayed unexamined. The user asked for prompting
feedback and observed they had received none in seven entries. They were
right: the rule says this discipline is symmetric and that I review the
trajectory, and I had been logging generously instead of reviewing. The
harness now says the review has to be spoken in the conversation, and that
the log should be graded as if it will be read aloud. Old text kept below
the line rather than deleted.

**The strongest habit, and it is not close: challenge-prompts.** "Have you
looked at all resources available?", "is the multiagent workflow parallel?",
"is handoff required?" — three questions, three real gaps caught, including
a brief that had never been fetched and a plan unconsciously organised by
calendar day instead of dependency. Cheap to ask, expensive to have
skipped. Also strong: anchoring an open-ended brainstorm with concrete seed
examples (#5), which gives the output a shape to extend rather than a blank
page to fill.

**The weakest pattern: short approvals of large artefacts.** "Let's go with
this" approved an entire information architecture. "Plan looks good"
approved 388 lines with one amendment. "That's alright, if it sits on top"
approved the register model. Each transferred every unstated decision to me
without either of us noticing, and the rule about subject-and-success-
criteria should have fired at all three. It did not, because the rule was
written with vague *requests* in mind and said nothing about vague
*approvals* — now fixed in `CLAUDE.md`.

**Vivid direction without a definition of done.** "I want it to actually
feel like a portal... the experience should be a journey" reshaped the whole
plan and is the single most useful thing said in the session. It also had no
acceptance criterion, so I supplied one — a homepage sketch and a 2-click
spec check — and those were my definitions of "journey", not the user's.
Dressing a defaulted creative decision as a machine check is worse than
defaulting it openly, because the check makes it look settled.

**Vibes where numbers were needed.** "Quick development, not over the course
of multiple days" and no stated grade target. One evening and three days
justify materially different plans; the four-way writer fan-out is sensible
under one and unnecessary risk under the other. Resolved on 09-16 — two
working blocks, top marks — but only because it was finally asked for.

**Standing gap on my side:** prompt #5 recorded an interactive-elements
request that never became a `WORKLOG.md` decision, so the handoff lost it,
and the stream-model amendment from #6 went the same way. Both now logged. A
decision that exists only in conversation does not survive a context clear.

---

_Superseded 09-16, kept for the record:_ "Seven entries in, consistently
clear and appropriately scoped — no vague asks yet, nothing blocked."
