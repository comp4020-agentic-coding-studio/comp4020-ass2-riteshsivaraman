# Learnings

Permanent, append-only. Never delete an entry — bugs get marked mitigated,
not removed; patterns stay even if unused for a while.

## Bugs / gotchas

### A nav link to a page that does not exist yet fails the whole build

**Mitigated.** `astro-broken-links-checker` runs in `astro:build:done` and
throws. Adding `/glossary/` to `site-config.ts`'s `links` before writing
`src/pages/glossary/index.mdx` broke **every one of the 16 pages at once**,
because the nav renders site-wide — the error output lists 16 "found in"
locations for a single missing target, which reads far worse than it is.

This was not in the platform-facts list, which had catalogued axe as the
build-failing gate and missed this one. Two consequences worth keeping:
config that references a page and the page itself must land in the same
change, and CI's `deploy` job runs its own build, so this class of error
takes the live site down rather than just failing a test. Now recorded in
`CLAUDE.md`.

### The Anthropic gateway this course provisions cannot generate images

**Mitigated.** `$ANTHROPIC_BASE_URL` is reachable and authenticates fine,
but `/v1/models` reports `mode: "chat"` for every entry and
`/v1/images/generations` returns HTTP 500. There is no image generation
here, so "the course has given provision for image generation" does not
hold for artwork. The site commits to a deliberate type-and-CSS treatment
and all four starter images are deleted rather than replaced — which also
clears the `check:evidence` SHA fingerprint gate, since a deleted file
passes its `existsSync` guard.

Cost five minutes to establish by probing, against the alternative of
discovering it on the last build day with the layout already assuming
hero images.

### A link inside deck speaker notes is an axe violation

**Mitigated.** astromotion renders a ` ```notes ` fence into
`<aside class="notes" aria-hidden="true">`. A focusable `<a>` inside an
`aria-hidden` container trips axe's `aria-hidden-focus` rule, and axe throws
the build — which CI's `deploy` job re-runs, so it takes the live site down
rather than failing a test.

Caught while authoring, before a build, by reasoning about what the fence
compiles to rather than what it looks like in source. The rule generalises to
anything hidden-but-focusable: notes fences take prose only, and any URL a
presenter needs goes on the slide or in a ` ```comment ` fence instead.

## Patterns that worked

### Verify a subagent's factual claims against the package, not its confidence

The deck agent reported using four astromotion features, two of which
(`_animate: id` scoping, ` ```comment ` fences) I had never seen in this
codebase. Grepping the README and the theme's `deck.css` confirmed all four
exist and behave as described — but the check cost one command, and a
hallucinated directive would have compiled to visible junk on the flagship
page a marker opens. The README itself says an unrecognised directive is
passed through, so the failure mode is silent-and-visible, the worst pair.

Report-then-verify is cheap enough to be unconditional for any agent claim
about an API surface, and it is separate from running the build: the build
would not have flagged a passed-through directive at all.

### Challenge the claim of completeness before accepting it

"Have you looked at all the resources available?" caught that the actual
assignment brief and spec had never been fetched — only the repo-local
READMEs — after readiness had already been asserted. The same move applied
to the plan caught a harness with no subject and a phasing scheme organised
by calendar day rather than dependency. One cheap question, three expensive
omissions. Ask it at every claimed checkpoint rather than trusting the
claim.

### Write a decision down in the turn it is made

Two decisions settled in conversation — the interactive-elements scope and
the one-page-per-week stream amendment — never reached `WORKLOG.md`, so a
context clear would have lost both, and one had already survived a handoff
only by luck. A decision that exists only in dialogue does not exist. The
fix is not "log more diligently later"; it is logging in the same turn the
decision lands, because there is no later that reliably arrives.

### Read the packages, not the README

Every constraint that actually changed the build plan came from reading
dependency source: `published: false` silently breaks the graph for every
inbound ref, axe throws the build and CI's deploy runs its own build,
`embed:` directives create graph edges, assessment weights are unenforced
across assessments. None of that is in the starter documentation. On a
platform you did not write, the failure modes live in the code.

### Stub every node first, then wire the graph in one pass

Because the build hard-fails on a dangling `related:` ref, incremental
graph-wiring means every intermediate state is broken. Creating all nodes as
schema-valid stubs first makes it impossible for an edge to dangle, turns
graph wiring into one reviewable commit with one owner, and — the real
payoff — lets many authors write into the graph concurrently without any of
them being able to break the build for the others.
