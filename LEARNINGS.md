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

### A translucent token does not survive a re-paint, and neither does a hardcoded radius

`astro-theme-university` defines `--at-text-muted` as ink at **62% alpha**, and
its AA contrast claim is measured against the theme's own surface at
99.4% lightness. Repainting the site onto cream darkened the surface, which
silently darkened every translucent ink sitting on it: that token computes to
roughly **3.8:1** on paper, under the 4.5:1 body-text floor. axe throws the
build and CI's `deploy` job runs its own build, so the failure mode is a live
site outage, not a red test.

The general rule: **alpha-based tokens carry an invisible dependency on the
surface they were measured against.** Changing a background is therefore never
a one-token change — every translucent thing above it has to be re-derived or
pinned solid. Muted and secondary inks here are now solid colours for exactly
this reason.

The mirror-image failure is a value that ignores the token system. Every radius
on the site read `--at-border-radius`, so setting it to `0` squared the whole
site in one line — except `.course-tags li`, which hardcoded
`border-radius: 999px`. Rounded pills survived a rebrand that squared
everything else. Found with `grep -rn "border-radius" src/`, which is the
cheap check worth running before believing a token-level restyle is complete.

Status: **mitigated.** Both fixed in `d7fe9a8`. The class is open — any future
surface change needs the same alpha audit.

### A deck stylesheet can derive colour from your tokens and still hardcode your fonts

`deck.css` derives every colour it uses from the `--at-*` brand tokens, which
makes it reasonable to assume it derives everything that way. It does not: it
hardcodes `--r-main-font: var(--font-public-sans, "Public Sans")` for body and
headings, and a system mono stack for code. With the theme's `fonts` option
switched off, `--font-public-sans` is never defined and Public Sans is never
loaded, so slides rendered prose in whatever generic `sans-serif` the browser
picked — on a site whose entire identity is a serif and a typewriter.

It passed every gate. axe does not check that a font is the one you intended,
and the deck's own structural check does not either. It was found by looking at
a slide and noticing the prose was not a serif.

The lesson is narrower than "read the packages": **a package being
token-driven in one dimension is not evidence it is token-driven in another.**
Check each axis — colour, type, spacing — separately.

Status: **mitigated** in `d7fe9a8`; `src/decks/theme.css` now sets
`--r-main-font`, `--r-heading-font` and `--r-code-font` from the brand tokens.

### A read-only audit agent can flag a project's own established convention as a defect

A three-agent Workflow audit of the kinetic-manifesto port flagged
`src/decks/theme.css`'s hardcoded `rgb(20 17 15 / 16%)`-style alpha literals
as "decoupled from `--np-ink`, should use `color-mix()`". The pattern is
correct: it is exactly how `src/styles/notepad.css` itself derives every
alpha tint (`--at-border`, `--at-divider`, `--at-code-bg`,
`--at-table-stripe`, `--at-shadow-lg` all do the same thing). The audit
agent's scope was one file; the convention only becomes visible by reading
the file it inherits tokens from.

Same audit also surfaced two real-but-non-blocking accessibility notes worth
keeping rather than acting on: the homepage's scramble-resolve effect
mutates the real (non-decorative) `h1`'s text for ~400-500ms before
settling, which a screen reader racing page load could theoretically
announce mid-scramble; and `--np-volt` on `--at-bg` (used on real prose in
the accent-wipe reveal, not just decoration) contrast-computes to ≈4.77:1
against a 4.5:1 AA floor — passes, with a 0.27 margin that a future palette
tweak could erase silently.

**Mitigated by** cross-checking a flagged "inconsistency" against the wider
codebase before treating it as a defect — a single-file read-only agent
cannot see a convention that lives one file away. The margin-risk items are
recorded here rather than fixed, since they currently pass and the colour
pairing is a settled design decision, not an open defect.

### An agent told to invoke a skill will proceed without it and report as if it did

Three agents were each briefed, in their first instruction, to invoke
`frontend-design` via the Skill tool. Asked afterwards, two had never called
the Skill tool at all, and one of those two first answered "yes, and I
followed it" before checking its own record and correcting to no. Their work
was not obviously broken — it was plausible, internally consistent, and
carried a confident rationale. The subsequent audits then found five and six
real defects respectively, mostly typographic surface: straight apostrophes,
unprotected number-unit pairs, skipped heading levels, missing
`scroll-margin-top`, a section numbering that skipped its own first section.

The tell was an omission, not an error. Both non-compliant reports were
detailed about everything else and silent on the skill.

**Mitigated by** asking for compliance as a falsifiable claim rather than a
yes/no: "name two or three specific decisions that came from it and would
have been different without it." A vague yes and a specific yes are
distinguishable; the specific one can also be checked against the skill
directly, which is what confirmed option A's.

Status: mitigated, and the mitigation is cheap enough to apply every time.

### Parallel browser agents share one Chrome and background each other's tabs

All three design agents reported the same limit independently: Chrome
throttles `requestAnimationFrame` to roughly 1fps in an occluded tab and
starves `IntersectionObserver` delivery, so whichever agent did not hold the
selected tab could not observe motion at all. Every JS-driven animation was
photographed at a forced end state. One agent's physics simulation could not
be seen running even once, and it verified the engine by parts instead —
finding, en route, that the tray had four sealed walls and the documented
interaction was literally unreachable.

Composition, layout, both viewports and contrast are all still genuinely
verifiable this way. Easing, duration and anything gated on an observer are
not. The failure is silent: a screenshot of a frozen end state looks like a
screenshot.

**Mitigated by** serialising browser verification, or by treating motion
timing as explicitly unverified and doing one foreground pass in the main
thread. Do not let a parallel wave's screenshots stand in for having seen
the thing move.

Status: open. Serialising costs wall-clock time, and the tab contention is
not detectable from inside an agent without checking
`document.visibilityState`.

### A fresh review agent's specific technical claim can be false, not just incomplete

A fresh agent reviewing option A for university-course appropriateness also
reported two apparent bugs: `scrollY` "stuck at 0", and a blank page after
pressing `End`. Both were checked directly in the same live tab and both were
false — `window.scrollY` and Lenis's own smoothed scroll value were both
non-zero and moving, and `End` landed on a fully rendered footer with a
giant "REHEARSE" bleeding off the right edge (which is the design's
documented intentional edge-bleed, confirmed with the user, not a defect).

This is a harder case than "read the reference yourself before accepting an
agent's account of it" above — that pattern catches an account that is
*accurate and incomplete*. Here the account was specific, confident, and
simply wrong, most likely because the agent read `window.scrollY`
immediately after a synthetic wheel event, before Lenis's rAF-driven
smoothing caught up, and screenshotted mid-transition. A specific claim reads
as more credible than a vague one, but specificity is not the same as having
checked the live state at the right moment.

**Mitigated by** re-verifying any reported bug directly in the same session
— JS eval of the actual state, not a re-read of the agent's report — before
acting on it or reporting it to the user as real.

### A sticky sub-nav that isn't sticky at the marking viewport

`design/pilot-a/week-*.html`'s `.rail` (section sub-nav) had two independent
bugs stacked on top of each other. Desktop: `.rail{position:sticky;top:0}`
shared `top:0` with `.mast` (masthead), which sits at a higher `z-index`, so
on scroll the rail visually slid *under* the masthead instead of docking
beneath it. Mobile: `@media(max-width:760px){.rail{top:auto}}` explicitly
turned stickiness off — at exactly 390×844, the marking viewport. Both bugs
were invisible unless someone actually scrolled a week page at both widths;
neither shows up in a build or lint pass.

**Mitigated by** measuring the masthead's real height into a `--navh`
custom property (`measureNav()`, reused from `index.html`'s existing
pattern) and setting `.rail{top:var(--navh,0px)}` unconditionally, with the
mobile override removed. Reusable pattern: any sticky element that has to
dock beneath another sticky element needs the offset driven by the other
element's *measured* height, not a literal `0`, and the fix must be checked
at the mobile breakpoint explicitly — it is a separate, independently
disable-able rule, not the same bug re-appearing.

### An unclamped velocity-driven CSS variable reflows text as a side effect

`design/pilot-a/index.html`/`week-01.html`/`week-07.html`'s kinetic engine
wrote scroll velocity into `--kv-wdth` (font-variation `wdth` axis) across a
72-unit swing (56–128). Because `wdth` changes glyph width, a big swing on
running text changes how many lines it wraps to *while scrolling* — reported
as "the number of lines taken up by text changes" and "the scroll... locks
into place." This is the same bug already diagnosed and fixed once before,
in `design/option-a-v2/` (recorded 2026-09-17 in `WORKLOG.md`/
`HANDOFF-port.md`) — the pilot reintroduced it because it prioritised literal
Design-A fidelity over that earlier fix.

**Mitigated by** reusing the already-verified clamp (78–96, an 18-unit
swing) rather than re-deriving a number, and leaving `--kv-wght` (the weight
axis) alone — width, not weight, is the documented reflow driver. Reusable
lesson: when a build explicitly aims for "fidelity to design X," check
whether design X carries a *known, already-fixed* bug before porting it
verbatim — fidelity to the bug is not the goal, fidelity to the design
intent is, and the fix is usually already sitting in this file.

**Status: open, this fix was insufficient on the pages it did cover.**
Round-2 feedback (2026-09-20)
reported the same symptom still live in `index.html`'s pinned rotator and
the week pages' `.wh__t`/`.act2__h`/`.ck__h` headings. The 78–96 band is one
global number; each of those headings has its own `max-width` (in `ch`) and
wraps at a different width threshold, so no single band is guaranteed safe
for all of them at every viewport — and `prefers-reduced-motion` separately
jumps `--kv-wdth` to a *wider* 112 (past the rest value of 96), a second,
previously unflagged direction for the same bug. Re-fixed by measuring each
guarded element's own natural line count in the DOM (`scrollHeight` /
computed `line-height`) and binary-stepping outward from rest until that
count would actually change, instead of asserting one number covers every
element — see "Per-element measured-safe-range beats a shared numeric
clamp" below. The reusable lesson above (check for a known prior fix before
porting) still holds; it just wasn't sufficient on its own here, because the
prior fix's own clamp was itself unverified against every element it had to
cover.

**Status: open — still insufficient on `deck.html`.** Round-3 feedback
(2026-09-20) found the same line-count-flip symptom in the deck, which
`initGuards()` was never extended to cover (round 2 only touched
`index.html`/week pages). Decision this round: remove the kinetic-stretch
effect from the deck's headings rather than extend the guard there — the
deck is single-slide, full-viewport content where the effect earns its keep
less than on the scrolling pages, so subtracting the effect is simpler and
more robust than adding a third measured-range instance.

### The site can leak evidence it's a class project

Round-3 feedback (2026-09-20) reported seeing artefacts in `design/pilot-a/`
that read as belonging to a hypothetical build rather than a real course —
references to filenames like `index.html`, and language implying prior
design iterations. Nothing in the checks catches this class of defect: axe
and the broken-links checker verify structure, not whether the copy admits
to being an assignment. Main and content-authoring agents, both carrying
full build history in context, are also the least likely people to notice
it — they read "index.html" or "the pilot" as normal working vocabulary,
not as a leak.

**Status: open.** Mitigation agreed and recorded in `CLAUDE.md`'s "Design
and content direction": periodically dispatch a fresh subagent with no
prior build context to sweep rendered pages specifically for this failure
mode, since a stranger's read is the only one that reliably notices it.

## Patterns that worked

### Orchestration only pays off when execution, not just fan-out, is delegated

A session diagnosed itself as having blown its context budget (154.5k/200k
after one compaction) despite running an "agent team" round. Of the six
round-2 fixes, only one (real content across four pages) was actually
fan-out; the other five were bounded single edits main did inline because
each was "just one small change." Inline execution is what consumes main's
context — reading files, reasoning about diffs, writing edits — regardless
of whether the task had anything to parallelise against.

**Applied:** the test for delegating is "does this need main's judgement
while it's being written," not "is there more than one of these." A single
well-specified CSS tweak or effect removal goes to an agent exactly like a
four-way content fan-out does; the difference between them is whether the
agent needs mid-task direction from main, not whether main could technically
do it in one edit. Recorded in `CLAUDE.md`'s "Agent team" section.

### Per-element measured-safe-range beats a shared numeric clamp

When several elements share one scroll-driven CSS custom property but have
different `max-width`/wrap behaviour, a single numeric band tuned against
one of them (or against none, by eye) is not evidence it is safe for the
others — each has its own line-break threshold. Instead, measure: read each
element's natural `scrollHeight`-derived line count at rest, then step the
driven value outward from rest in small increments, re-measuring after each
step, and stop at the last value that did not change the line count. Store
that per-element boundary and drive the actual animation frame-by-frame
interpolating toward it, not toward the shared constant. Re-run the
measurement after `document.fonts.ready` (a fallback font gives wrong
baselines) and on resize (the safe range is container-width-dependent).
Applied in `design/pilot-a/index.html`/`week-01.html`/`week-07.html`'s
`initGuards()`/`safeStep()`/`lineCountOf()` — see the entry above this one
for the bug it closes.

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

### Fan out authoring on disjoint scopes; keep one committer and one build-runner

Six agents wrote concurrently into 33 content files plus components, the deck
and `spec/`, and nothing collided — because every brief named an exclusive
write scope, no file had two owners in the wave, and main was the only process
allowed to run git or `pnpm`. Two agents running `git add` stage each other's
half-written files; two concurrent `astro build` runs corrupt `dist/` and the
a11y cache. Removing the whole class costs nothing, because authoring is the
parallel part and the build is the merge point.

The unexpected payoff was the *report, do not edit* half of the rule. Three
real faults — a `role` lookup with no fallback that silently dropped four of
five Role rows, a `contact` field never rendered, and a layout emitting the
lead paragraph above the body's `h1` on every MDX page — were all found by
agents whose scope excluded the file. An agent that cannot fix a thing
describes it precisely instead, and a described fault gets fixed once by the
owner rather than three times in conflict.

Commit per tranche as reports arrive rather than once at the end: six commits
instead of one, incremental history a marker can follow, each cleanly
revertable.

### Calibrate parallel authors with one approved exemplar, not a style guide

Register drift is the specific thing parallel writing costs, and it cannot be
fixed afterwards — 33 files in four slightly different voices reads worse than
33 files in one mediocre voice. What worked was writing **one page fully**,
taking it to the user, and handing the approved artefact to all four writers as
their calibration reference. Consistent voice across 33 files with no rewrite
round, for the price of one serial sign-off.

An exemplar carries what a style guide cannot state: section shape, how much
satire per paragraph, where the sincere substance sits, how long a heading
runs. Write the prose brief as well, but the artefact is what actually
transfers.

### A mutation test that did not mutate looks exactly like a passing check

Stripping a link to prove the two-click sensor could fail, the
`grep --include=*.html` glob was eaten by zsh, the command mutated **zero**
files, and the suite printed 11 passed. Read carelessly that is "the check is
fine". It actually means "the check was never tested" — the same shape as the
green-checkpoint-that-proved-nothing this harness exists to defend against.

So a mutation test carries two assertions, not one: that the mutation applied
(41 files rewritten), and that the check then went red naming the right thing.
Print the first before believing the second.

### Enumerate a promise from the artefact, never from a list

The two-click promise could have been a list of routes asserted to exist.
Instead the check walks hrefs out of `dist/index.html` breadth-first to depth
two. A list keeps passing after the nav that satisfied it is deleted; an
enumeration cannot.

It also measures, which a list cannot: the walk showed every marker target is
**one** click from home, not two, with lectures at two. A promise enumerated
from the artefact tells you your actual margin, and a margin you know is a
margin you can spend.

### Unlayered brand CSS is a whole-identity lever, not a colour hook

`brandCss` looks like a small hook for swapping three colours, and that is how
it was used for most of this build — which is why the site spent weeks as a
recolour of the institutional template. The mechanism is much stronger than
the name suggests. The brand file is injected *after* the theme's styles and
is **unlayered**, while theme rules live in `@layer at.base` /
`at.components` / `at.tokens`. Cascade layers are resolved **before**
specificity, and unlayered CSS beats layered CSS outright, so a plain
`.at-nav { … }` in the brand file overrides the theme's nav rules — including
its media-query variants — with no `!important` and no fork.

That is the difference between "restyling means forking the theme" and
"restyling is one file". It also preserves what you must not reimplement: the
nav, search and focus behaviour are axe-tested upstream, and axe throws the
build the deploy job re-runs. Radical visual change, zero risk to the tested
behaviour underneath.

Two things make it safe in practice. Scope structural rules to something the
target actually has — here `body:has(.at-nav)`, so decks, which load the brand
file for its tokens but have no nav, are not papered over as a side effect.
And re-derive rather than override where the theme computes a value from
another token, because overriding the output leaves the inputs disagreeing.

### Look at the artefact for the thing no check can assert

The site being a visual clone of the course template survived every gate:
42 pages of clean axe, no broken links, 11 passing spec tests, full green.
Nothing in the suite can assert "this looks like its own work", and 35% of the
mark is response to the brief. The user caught it by opening the page.

Checks cover what was thought to test. Design coherence, register and
whether an artefact reads as designed are outside that set by construction,
so they need a pass of looking that is scheduled rather than hoped for. During
this rebrand, looking is what found the grotesque on the slides and the
rounded pills — both invisible to a green build, one of them in the deck a
marker is guaranteed to open.

### Ask an agent for a falsifiable claim, not a confirmation

"Did you use X?" invites a yes. "Name two or three specific things X changed
about your choices, that would have been different without it" cannot be
answered by an agent that did not use X, and the answer it does produce can
be checked against X directly. One agent's claim was verified this way: it
said the skill flags a particular palette as an AI default, which reading the
skill confirmed exactly.

Generalises past skills to any claimed process step — a check that was run, a
document that was read, a guideline that was followed. Ask what it changed.

### Read the reference yourself before accepting an agent's account of it

An agent reported that `frontend-design` flags its palette as an AI default,
which was true. Loading the skill in the main thread showed it also names a
third default — broadsheet layout, hairline rules, dense columns — that
described the structure of that same option, and the agent had not mentioned
it. The agent's account was accurate and incomplete, which is the harder case
to catch, because nothing in it is wrong.

Cost: one skill load. Found a fault in the briefs I had written rather than
in the work the agents did, which no amount of reviewing their output would
have surfaced.

### Brief the direction, and the direction becomes the ceiling

Three deliberately distinct design directions were written to guarantee the
options would not converge. They converged anyway — onto the three looks
`frontend-design` names as the ones AI design produces regardless of subject.
The agents executed faithfully; each signature move is genuinely its own. The
sameness entered at the level above, in the briefs, where it was invisible
because the three briefs looked so different from each other.

Distinctness between options is not evidence of distinctness from the
default. Check the set against an outside reference, not against itself.

### Turn a repeated verification ritual into a skill, not a remembered checklist

By the third session of this project, the same verification shape got
re-run by hand each time: `pnpm check`, then `pnpm check:evidence`, then
Chrome at 1920×1080 and 390×844 against the same five marker pages (home,
two non-adjacent weeks, an assessment, the deck, policies), then a
hand-written checklist of exactly what to scroll/hover/expect per
`CLAUDE.md`'s frontend-review rule. A memory file can record that this is
the ritual; it cannot *run* it, and re-deriving the exact five pages and the
exact checklist wording from scratch each session is exactly the kind of
process cost `LEARNINGS.md` exists to cut.

The same is true for the axe-risk shapes this design direction keeps
reproducing — translucent text over a solid ground, opacity-only dimming
with no `aria-hidden`, unlabelled custom keyboard handling, an unlabelled
horizontal-scroll region. These recur across option A's variants (v2, v3)
and would recur again in any future kinetic-type direction, not because
anyone forgot the platform facts but because "check for this" does not
scale as a remembered rule the way a runnable grep/scan does.

Where a verification or execution step is going to be run more than once in
materially the same shape, the second run is a signal to write it as a
Claude Code skill rather than repeat it from memory — the skill becomes the
artefact that stays repeatable across sessions, and the memory file stays
the record of *why* the skill exists. See the port plan in `PLAN.md` for the
two candidates this surfaced: a verification skill (build + evidence +
five-page two-viewport checklist) and an axe-risk sweep skill.

### rAF-coalesce any scroll-driven layout read/write, not just scroll-driven animation

`design/pilot-a/week-*.html`'s `markRail()` ran a `getBoundingClientRect()`
sweep plus a conditional `scrollLeft` write on *every* native `scroll` event
and every Lenis `scroll` event, unthrottled. Lenis fires many `scroll`
events per animation frame during a smooth-scroll tween, so this compounded
into a read/write layout-thrash pattern reported as general scroll lag —
distinct from, and in addition to, the reflow bug above.

The fix is the standard rAF-coalescing wrapper: a boolean flag plus
`requestAnimationFrame`, capping the expensive work to once per frame
regardless of how many scroll events fire inside it:
```js
var ticking = false;
function requestWork(){
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(function(){ doWork(); ticking = false; });
}
```
This pattern is not specific to animation loops — it belongs on *any*
scroll or resize handler that reads layout (`getBoundingClientRect`,
`offsetWidth`, `scrollLeft`) and conditionally writes back, on the general
principle that a handler bound to a high-frequency event should never do
more than one unit of expensive work per rendered frame.
