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

### The axe cache survives `rm -rf dist`, so a green build can be a stale green

**Mitigated by habit, not by code.** The accessibility results live in
`node_modules/.astro/astro-theme-university/a11y-check.json`, outside `dist/`.
Delete `dist/`, rebuild, and the build prints "N unchanged, reused from cache"
— it has *not* re-checked those pages. So the local build that matters least
(warm) is the one you keep running, and the build that gates the deploy (cold,
in CI, with no `node_modules` cache) is the one never exercised.

Found while disproving a subagent's claim that `404.md` would fail axe's
`page-has-heading-one`: the build was green, but green from cache, so the
green proved nothing either way. Deleting the cache and rebuilding checked all
42 pages and was genuinely green — **and established separately that
`page-has-heading-one` is not among the rules this theme enables**, so the
claim was wrong on the consequence even though the missing `h1` was real.

Every verification build from here deletes that file first. A cached pass is
not a pass.

### A reveal deck is unreadable at 390px and the platform has decided that for us

**Open — accepted, not fixed.** At a 390px viewport the deck's 1280×720 canvas
scales to 0.3047, so 28px body prose renders at an effective **8.5px** and a
46.8px heading at 14.3px. Measured, not eyeballed. The deck is one of the five
pages a marker opens, and the brief marks at 390×844, so this is a real
weakness on a flagship page.

It is not ours to fix cleanly. `astromotion/pages/[...slug].astro` hardcodes
`width: 1280, height: 720` and sets `scrollActivationWidth: null`, which
explicitly disables reveal's own mobile scroll view — the one feature that
would solve this. Both live in `node_modules`. The only lever we own is CSS
inside the slide canvas, and bumping font sizes under a media query fights a
deliberate upstream decision while risking the axe gate that takes the live
site down.

Recorded rather than patched: the deck is legible at 1920×1080, which is how a
deck is used, and matching the platform's intended behaviour is defensible in
a way that overriding a vendor's scaling model mid-verification is not.

## Patterns that worked

### To see a real mobile viewport when the window will not resize, use an iframe

`resize_window` returned success three times and `window.innerWidth` stayed
1512 — the window silently refused every geometry change, including after
leaving fullscreen. Screenshots kept coming back desktop-shaped while
reporting the requested size, which is the dangerous failure: it looks like
verification happened.

The fix is to make a viewport instead of asking for one. Inject a same-origin
iframe sized exactly 390×844 and point it at the page: media queries resolve
against the *iframe's* viewport, so the layout inside is the genuine 390px
layout, and `contentDocument` is scriptable for overflow measurement. That
turned the look from "squint at a screenshot" into numbers — zero horizontal
overflow and exactly one `h1` across all six marker pages, and the 8.5px deck
prose above, none of which a screenshot would have told me.

Confirm the viewport you think you are testing before trusting what you see in
it. `innerWidth` is one line and the tool's success message is not evidence.

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
