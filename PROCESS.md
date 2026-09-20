# Process overview
Citations link to `comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman`.

## What I built

A good course is one idea, held for a semester, that someone would actually
want to take. My subject is professional LARPing, performing a career
identity you don't yet hold, narrow enough that no real university runs it
but with real depth underneath: résumé work, interviews, personal branding,
imposter syndrome
([cdfb63a](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/cdfb63a)).
Deadpan alone was funny but taught nothing; sincere alone was useful but
generic. I landed on a satirical shell around genuinely useful content, with
the satire living in body copy and structure, not in the navigation a
marker sampling five pages in ten minutes has to decode cold.

## How I got here

Coherence across twelve weeks was the risk I cared about most, so it got a
real check: `spec/course-design.test.ts` fails if fewer than six distinct
tutorial formats show up, or if any two weeks open with the same first line
([35a20fb](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/35a20fb)).
That only proves the weeks are structurally different, not that the variety
reads as alive rather than as boxes ticked, and I left that second part
uncoded on purpose. "No fixed weekly template" is a design principle for the
`sessions` collection, not a spec check, because whether a week feels fresh
is a read only a person can make
([cdfb63a](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/cdfb63a)).
Two more rules came from watching myself repeat a mistake. A vague review
request gets vague feedback back, so any frontend change needing my own eyes
now gets an exact checklist, not "check it out"
([c948e6a](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/c948e6a)).
And after a session burned 154.5k of its 200k-token budget on small fixes
done inline instead of delegated, the test became "does this need my
judgement while it's written," not "is there more than one"
([2a9d21a](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/2a9d21a)).

Reading the actual result rather than trusting a green suite caught the site
wearing someone else's skin. I had pointed the agent at the real COMP4020
site as a reference for what a course website should include, never for how
it should look, and it copied the look anyway: `brandCss` pointed at the
theme's own stylesheet, three colour tokens swapped over an untouched
template. Several builds ran clean, axe passed, no broken links, the full
suite green, and I still said the site looked wrong
([d7fe9a8](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/d7fe9a8)).
That's the exact "twelve weeks that repeat one another" failure the brief
warns against, and no check I owned could tell a reference for content
apart from a reference for style. The same config field caused it again
later, silently, until three agents flagged it independently
([142a393](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/142a393)).

That same standard changed what I'd accept for this course specifically. I'd
been running a separate design track alongside the real site, fresh HTML
layouts meant to be carried across into `src/`. What I accepted instead was
an attempt to retrofit the content onto that prototype while `src/` itself
kept building on the COMP4020-anchored version, so a CSS-only restyle still
read as the stock theme with a tint. For a course about performing an
identity you don't yet hold, that wasn't a near-miss, it undercut the whole
premise. I stopped asking for tweaks and said we needed a complete redesign
of `src/` against the prototype, not a patch on the anchored version
([9e2ea5f...375b6e3](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/compare/9e2ea5f...375b6e3)).

It changed what I accepted back, too. The harness holds the agent to
reviewing my prompts for vagueness, and seven replies in I pointed out that
review had never happened: a "looks good" from me had quietly approved an
entire information architecture while the log kept claiming "no vague asks
yet." The rule caught vague requests but not vague approvals, so three
clauses went into `CLAUDE.md`: a large approval gets read back before it's
acted on, a vague constraint gets quantified first, and the review gets
spoken, not filed
([06c6f7c](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-riteshsivaraman/commit/06c6f7c)).
