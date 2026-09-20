---
name: log-prompt
description: Appends the user's latest prompt to prompt-log.md with brief surrounding context and a one-line trajectory read (clear/scoped, vague in a named way, or a large approval that quietly settled undecided things), and states that same read back in the reply itself. Use on every substantive user prompt in this repo, not as a batched end-of-session pass.
---

# Log prompt

For this repo (COMP4020 Assignment 2). Implements `CLAUDE.md`'s "Prompt
discipline" section — read that section if this skill's summary leaves a
specific case ambiguous.

## What goes in prompt-log.md

One numbered entry per substantive prompt, matching the existing entries'
shape: `Context: <where in the session this landed>. Prompt: <the ask,
quoted or closely paraphrased>. <one to three sentences of trajectory read>.`

Exempt from full analysis (but still logged, just briefly): short factual or
yes/no asks, pure acknowledgements.

## The trajectory read — three shapes to check for, in order

1. **Is it a large approval of a prior artefact** — a plan, a design sketch,
   a written page — accepted with something short like "looks good" or
   "let's go with this"? If so, that short approval silently transfers every
   unstated decision in that artefact to the agent. Before treating it as
   settled, say back what's being treated as settled and what's still
   undecided, and get *that* confirmed — this is the rule's most-missed
   case, not an edge case, so check for it even when the prompt reads as
   simple.
2. **Is a vague constraint being planned around without a number** —
   "quick," "soon," "not too much"? If so, the log entry should flag that
   the plan differs materially by the actual number and a clarifying
   question is owed before proceeding, not after.
3. Otherwise, is the ask itself clear and scoped (names a concrete
   deliverable or decision) or vague in some other specific, nameable way?
   Say which, and why — genuine praise when it's earned, not manufactured
   criticism to look rigorous.

## Binding reply rule

Per `CLAUDE.md`, this is not a separate end-of-thread review pass — every
reply carries the same one-line read on the prompt *just received*, stated
in the conversation itself, not only written to the log file. A flattering
note filed somewhere nobody reads back is worse than no review, because it
looks like the discipline was followed. Grade the log entry as if it will be
read aloud.
