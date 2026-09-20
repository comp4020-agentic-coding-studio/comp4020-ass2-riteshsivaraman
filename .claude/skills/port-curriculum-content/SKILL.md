---
name: port-curriculum-content
description: Transcribes real content from CURRICULUM.md into site pages (week pages, assessment pages, stream pages, deck slides) instead of inventing placeholder or approximate copy, and flags any gap-filling explicitly rather than silently authoring new curriculum. Use whenever a page needs to go from structural/placeholder to real content.
---

# Port curriculum content

For this repo (COMP4020 Assignment 2). `CURRICULUM.md` is the canonical
source of truth for course content — streams, weekly topics, the assessment
ladder, due dates, convenor names. A page is not "real" until its copy
traces back to a specific section of that file.

## Rule: transcribe, don't invent

Every fact that has a home in `CURRICULUM.md` — a due date, a weight, a
stream tagline, a convenor name, a week's topic — is copied or paraphrased
from there, not reconstructed from memory or plausibility. Per this repo's
"Design and content direction" rule, there is no such thing as placeholder
content standing in for the real thing; a page ships with real content or it
doesn't ship.

## When CURRICULUM.md doesn't cover something a page needs

Some pages need connective or in-world material `CURRICULUM.md` doesn't
specify (e.g. a "further reading" blurb, a stream's "pick it if" framing
detail not in the table, a slide's exact wording). When authoring this:

1. Keep it consistent with the surrounding voice and with every fact
   `CURRICULUM.md` does state — never contradict a due date, weight, or
   policy that is specified there.
2. **Flag it explicitly** in the report back to main — name exactly what was
   invented and why, rather than letting it blend in silently with
   transcribed content. Main decides whether to keep, cut, or replace it.
3. Never invent a *policy* (what's required, what's optional, what's graded
   how) — policies come from `CURRICULUM.md` or from main's explicit
   direction, never from an agent filling a perceived gap.

## Avoid the fiction-leak failure mode while doing this

Porting content is exactly where authoring-history leaks creep in — see
`fiction-leak-sweep`. State the current policy as settled fact. Never narrate
that a requirement "used to be X" or that "an earlier version" of a week or
assessment existed, even if that's literally true of the real build process.
The student sees only the current, real course.

## Report format

List each page touched, and for each: which `CURRICULUM.md` section(s) it
draws from, and a separate, explicit list of anything invented to fill a gap
`CURRICULUM.md` doesn't cover. An empty invented-content list is worth
stating outright ("nothing invented, full transcription") — it's the
strongest possible signal the page is done.
