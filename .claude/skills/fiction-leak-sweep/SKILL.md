---
name: fiction-leak-sweep
description: Dispatches a fresh subagent with no prior build context to read rendered pages the way a marker or stranger would, and flag anything that reveals this is a class project rather than a real course site — literal filenames/meta-language, and in-fiction narration of real authoring/curriculum-revision history dressed as course lore. Use periodically, and always before a submission checkpoint.
---

# Fiction-leak sweep

For this repo (COMP4020 Assignment 2). The fiction is that Slop University
actually runs SLOP3841. Nothing on the live pages should contradict that —
see `CLAUDE.md`'s "Design and content direction" section, which this skill
implements.

## Why a fresh agent, not main

Main and any content-authoring agent carrying full build history in context
are the least likely people to notice this defect: they read "index.html" or
"the pilot" as normal working vocabulary, not as a leak, and they know the
real design history well enough that an in-fiction retelling of it reads as
unremarkable rather than as a leak. A stranger's read is the only one that
reliably catches it. No automated check catches this class of defect either
— axe and the broken-links checker verify structure, not whether the copy
admits to being an assignment.

## First pass: a cheap grep, every batch, not just periodically

Before dispatching an agent, run a direct grep across visible copy for the
literal-leak shape — it's cheap enough to run on every round of pilot-a
changes, not held in reserve for a periodic sweep:

```
grep -rniE "index\.html|\bpilot\b|prototype|placeholder|this (pilot|prototype)" design/pilot-a/*.html
```

Filter out structural matches (`href="index.html"` nav links, HTML comments,
JS variable/selector names) — only visible body copy counts. This caught a
real instance during this project (`weeks.html`'s lead paragraph read
"...the twelve weeks index.html scrolls sideways through... this pilot
ports unmodified" — see `LEARNINGS.md`) before any dedicated sweep agent
ran. The grep does not replace the agent dispatch below — it only catches
the literal-filename/meta-language shape, not the narrative-leak shape,
which needs an actual read.

## Dispatch

Spawn a `general-purpose` agent (fresh, not a fork — it must NOT inherit this
session's build context) with a **read-only** brief:

1. Open every page under `design/pilot-a/` (or the equivalent live route set
   once ported into the Astro build) as if landing on it cold, with no
   knowledge of how or why the site was built.
2. Flag two distinct leak shapes, separately:
   - **Literal leaks** — filenames (`index.html`), the word "pilot",
     "prototype," "assignment," "marking," or any other meta-language that
     admits this is a build artefact rather than a shipped course site.
   - **Narrative leaks** — any passage that narrates a *revision history* of
     the course or its policies, even when framed as in-universe lore ("an
     earlier version of this week required X; that requirement was removed
     because Y"). A student has no reason to see or care about a course's
     design history — they should see the current policy stated as settled
     fact, not as the resolution of a discarded alternative. This applies
     regardless of how plausible or well-written the in-fiction dressing is.
3. For each finding: quote the exact text, give the file, and say which
   shape it is. Do not fix anything — report only, per this repo's
   agent-team read-only-audit convention.

## After the sweep

Main reviews each finding and either rewrites the passage as a stated
policy/fact (no memory of a prior version, no "earlier design," no
"required... now optional") or dismisses it with a stated reason. Log any
real find in `LEARNINGS.md` under "Bugs / gotchas" if the shape is new —
see `log-learnings`.
