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

10. Context: the fully-written week-1 session presented as the register
    exemplar, with one question flagged — whether its closing "a note on what
    this course is asking of you" section should stay, since it breaks the
    week's own structure. Prompt: "Approved, keep the last section — fan out
    the four writers." **The best approval so far, and still the weak
    pattern.** Better because it answered the one open question explicitly
    instead of leaving me to infer it, and because it authorised the next step
    in the same breath, which is what a gate is for. Still weak because
    "approved" was the entire specification for an artefact four writers then
    replicated across 33 files — the exemplar fixes voice, section shape,
    heading style, how much satire per paragraph and where the sincere
    substance sits, and none of that was named. It happened to hold, which is
    luck plus an exemplar, not a brief.

    **My own failure this round, and it is the same rule pointed the other
    way.** Finding the deck unreadable at 390px, I decided unilaterally to
    accept it rather than fix it — a layout call on a flagship page, which
    `CLAUDE.md` says is explicitly not mine to default on. The reasoning is
    sound and the levers really are in `node_modules`, but "sound reasoning"
    is what defaulting always feels like from the inside. It should have gone
    to the user as a finding with a recommendation, at the moment it was
    measured, rather than as a line in `LEARNINGS.md` written after the
    decision was already made. Raised in the conversation on the same turn as
    this entry, which is late but not silent.

11. Context: verification round finished and reported, `LEARNINGS.md` already
    carrying one new pattern from it. Prompt: "Cool, what things worked? To go
    into learnings." Short, clear, correctly scoped — asks for the reusable
    half of the round and names where it belongs, so it is exempt from the
    subject-and-criteria rule and needs nothing added. What makes it worth an
    entry is the timing: it runs the compound-engineering loop's last step
    deliberately, at the moment the work is already green and the pull is to
    move on to the deploy. That is the step that silently gets skipped.

    The asymmetry is the finding. Four patterns went in, three of which I had
    not volunteered — including the mutation test that mutated zero files,
    which I had lived through fifteen minutes earlier, correctly recovered
    from, and then failed to generalise. Fixing a thing and learning from it
    are separate acts, and I had been treating the first as covering the
    second. Being asked "what worked" is doing work I should be doing unasked
    at every tranche boundary.

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

---

## 11 — "What are our options to radically change the theme?" (09-16)

**Context:** the user opened the built site and said the UI "quite literally
mimics the comp4020 website, which is unacceptable", noted they had suggested
a notepad theme and that I had steered to a theatre theme instead, and asked
for options.

**Grading the prompt: clear subject, correct diagnosis, and a fair
correction.** It named the defect, named the cause of the defect in my
behaviour, and asked for options rather than prescribing one — which is the
shape that gets a useful answer. No ambiguity to resolve.

**Grading my prior conduct, which is the part worth recording.** The user
proposed a notepad direction and I redirected to a theatre metaphor without
saying that I was overriding a stated creative preference. `CLAUDE.md` already
says curricular and creative decisions are not mine to default on; quietly
substituting my metaphor for the user's is a stronger version of the same
failure, because it looks like agreement. The notepad is also simply the
better answer, for a reason available to me at the time: a theatre skin is
another dark institutional site, while a pad reframes every page as a working
document, which is what the course asks a student to keep.

**What it cost:** the mimicry survived several sessions of green builds. Not
because any check failed, but because no check can assert "this looks like its
own work" — and the design direction that would have fixed it had already been
offered and set aside.

**Handled by:** four options with ASCII previews, one selection ("Notepad /
legal pad"), then a settled/undecided readback before building, per the
short-approval rule. Landed as `d7fe9a8`.

**Still open and owned by the user:** the deck at 390px renders body prose at
an effective 8.5px, logged as accepted on 09-16. The rebrand did not change
it, and the decision to accept or spend roughly twenty minutes on in-canvas
media queries has not been put to the user as a question. It should be, rather
than defaulted again.

---

## 2026-09-17 — "completely forget the current front end; give me 2-3 fresh design options"

**Prompt (verbatim intent):** the site so far is a poor duplicate of the
COMP4020 site's style and is unsatisfactory. Forget the current front end
entirely. Using only the theme of the course, produce a *design demo* for a
fresh front end — modern and innovative above all. Not building the site;
getting a design first. May be unrelated to course content and ported later.
Astro/libraries available, so be innovative. Give 2–3 options, blind to
existing work. Must capture an aesthetic *and* interesting dynamic page
elements. "Any questions?"

**Context:** follows the notepad rebrand (`d7fe9a8`), which this prompt
supersedes. The verdict is that the rebrand fixed the *skin* but not the
underlying structural mimicry — the layout grammar was still COMP4020's.

**Questions asked before starting** (per the ask-for-direction rule; the
prompt invited them): format, content, constraints, scope.

**Answers, treated as settled:**
- Standalone HTML in `design/` — no Astro, no build, opened directly in Chrome.
- Abstract placeholder content — judged on form alone; porting real copy is a
  later pass, with the known risk that real content breaks a design.
- Anything goes — CDN libraries (GSAP, three.js, Lenis), WebGL, heavy JS. axe
  and portability are deferred until a winner is picked.
- Home + inner + deck per option, three options — nine pages.

**Still undecided and owned by the user:** which option wins; whether the
winner ports wholesale or only its layout grammar; how much of the "anything
goes" dynamism survives the axe gate.

---

## 2026-09-17 — "Read handoff port, and consult me before you create a plan"

**Prompt (verbatim):** "Read handoff port, and consult me before you create a
plan."

**Context:** fresh session opened against `935edae`. Short and precise, and it
names both the input (`HANDOFF-port.md`) and the gate (consult before
planning), so no sharper prompt was needed. Read in the handoff's stated
order: `CLAUDE.md`, `WORKLOG.md`, `PLAN.md`, the `c9c50aa` `LEARNINGS.md`
entries, `design/option-a/README.md`.

**Consultation, and what it settled:**
- **Option A's three deferred defects** — put as a costed choice per the
  handoff. The first answer selected both "reflow/geometry lock" and "port A
  unmodified", which are mutually exclusive; re-asked rather than guessed,
  noting that the lock's third component (the `wdth` 78–96 clamp) is not a
  pure bug fix because it visibly narrows the signature's range. Resolved to
  the **full lock including the clamp**. Defect 3 (reads editorial rather than
  as a course site) and v3's body-type discipline are **declined** — vermilion
  and A's editorial structure stay.
- **Motion scope: signature only.** Velocity-driven `wght`/`wdth` axes plus
  Lenis and the CSS-only effects; **GSAP is dropped entirely** — no pinned
  horizontal twelve-week act, no pinned rotator. Removes ~70KB and the
  pin-vs-hydration desync risk.
- **Deck: re-skin `src/decks/theme.css` only.** No attempt on the 8.5px mobile
  body problem, no rebuild of A's ribbon.

**Still undecided at the time of writing:** the `/cost` calibration number,
and who does the one foreground pass on motion *feel*, which has never been
observed on any demo this project has built.

---

## 2026-09-20 — pilot-a design review + request for a full site plan

**Context:** after `design/pilot-a` (index, week-01, week-07, deck) was built
and reported. **Prompt (paraphrased, feedback list plus a follow-on):** hero
needs the course code/title in the big kinetic letters; scroll is laggy and
"locks into place" on the weekly page; the pinned rotator "bounce" fires on
every scroll movement and is annoying; the velocity-driven font axes change
how many lines text wraps to, which looks awkward; the deck should become a
one-slide-per-week pitch deck, each slide uniquely designed; the week page's
section rail should be sticky; drop the timed lecture runsheet in favour of
an untimed list of discussion points; design (not yet build) how course files
and resources — slides, briefs, rubrics, policies, support pages — get
distributed and linked; comp4020 may inform content only, never layout, this
time. Followed immediately by: plan and hand over a full page hierarchy and
navigation structure for the whole site, including policy/people pages,
before porting the rest.

Well specified on the fixes — each names a concrete symptom. The rotator/lag
complaint turned out to already have a standing decision behind it: the
2026-09-17 entry above recorded dropping GSAP/ScrollTrigger entirely (no
pinned horizontal act, no pinned rotator) and fully clamping the velocity axes
for exactly this reflow defect, for the real site port. The pilot had drifted
from that decision by keeping Option A's GSAP pinning for visual fidelity —
worth surfacing back to the user rather than silently re-deciding it. Entered
plan mode given the number of architectural calls bundled in (nav
generalisation, resource-distribution model, deck repurpose) plus the
explicit ask for a hierarchy document as a separate deliverable.

**Follow-on prompt, same turn-set:** "Also, hope learnings are being
updated." A check-in on process discipline, not a new task — answered by
continuing to keep `LEARNINGS.md` current through this round of fixes (see
the two bug entries and the rAF-coalescing pattern added 2026-09-20).

## 2026-09-20 — Second pilot-a review: stretch fix incomplete, nav inconsistent, real content required

**Context:** after the first feedback round's fixes (hero, rotator debounce,
rail throttle/sticky, spine, resources, deck repurpose) were committed
(`3b78a30`) and handed back with a visual-check request. **Prompt (verbatim
list):** the stretch text still looks weird when line count changes — the
effect should only ever stretch horizontally, never change line count from
the text's natural/resting state; week-07 (and all future week pages) rail
links should smooth-scroll to their target; the top masthead nav (Home / Deck
/ Week 07 / Resources, varying per page) is inconsistent and needs a proper
hierarchy where every page is reachable in one or two steps, obviously;
enable actual sideways/swipe scrolling on the pinned 12-week horizontal act,
on top of whatever drives it now; a lot of current content reads as
placeholder — for this prototype (not all weeks ported yet) the site should
be a genuine subset of the final site, so replace every placeholder instance
with real course content; and on the 12-week horizontal act, put each week's
title below its big number for recognisability.

Six concrete, well-specified points, several with real architectural weight
(a genuine site-wide nav hierarchy touches every existing page; "replace
every placeholder with real content" means building out policies/support/
assessments/people for real, not just relabelling). Entering plan mode.

## 2026-09-20 — Stop the Stage-1 restyle, redesign the frontend from scratch

**Context:** mid-way through Stage 1 of an approved 7-stage plan
(`~/.claude/plans/glistening-moseying-mountain.md`) to rebuild `src/` to
match `design/pilot-a/` exactly. Nav.astro and Footer.astro had just been
forked, BaseLayout/ContentLayout/MdxPageLayout local wrappers written and
wired across six pages, and `.mast`/`.colo`/`.d`/`.hero` CSS ported into
`notepad.css` — build green, but `index.astro`'s hero markup itself not yet
rewritten, so nothing new was visually verified. **Prompt (verbatim):** "Ok
stop, we need a COMPLETE redesign of the frontend, using astro. Write a
handoff to a new session that will give it the necessary context."

Clear stop instruction, unambiguous about ending the current approach. Vague
on what "complete redesign" means in scope: same pilot-a source reworked
from scratch, or a new design direction entirely. Treated as a directive to
write the handoff, not to also resolve that ambiguity by guessing — the
handoff (`WORKLOG.md`, 2026-09-20 entry above the round-3 one) flags this
explicitly as something the next session must confirm with Ritesh before
writing code, rather than assuming "redesign" means "finish faster."

## 2026-09-20 — Night Terminal build, Wave 0 through Wave 1 kickoff

**Context:** fresh session picking up the round-3 handoff. Sequence:
"can we switch to a model with larger context window? ... otherwise suggest
ways to reduce running into the context limit" (real constraint, answered
with concrete mitigations — forking, not re-reading large docs, delegating
bounded work — since a model switch isn't available mid-session); "show me
the options when it's done" (clear, waits on async work); "resume" (killed
subagent, clear); "yes, i requested 2+2. Let's go with daylight concrete /
violet signal for light / dark. Now, we must build the full website. What
are the rough parts we'll proceed in, how many passes required? Let's not
do everything all at once." (confirms a prior ambiguity in my favour, locks
the theme choice, and asks for a staged plan rather than one big pass —
well-scoped, led to the 5-wave plan approved via ExitPlanMode); "let me know
if there is anything you need from me" (open-ended check-in, no action
implied); "hold on, i hope subagents are aware of the carastrophy from the
last two times, always give me an opportunity to view the website by
providing the link" (a real process correction landing mid-turn — logged as
a standing rule: brief subagents on the two prior failed attempts, and hand
over an actual clickable link at every verification checkpoint rather than
just reporting what I checked).

**Wave 0 verification round:** "Yes, it works. But this looks very
different to the agreed design?" — a fair challenge, not vague: pointed at
a specific observation (screenshots looked like a bare document, not the
mockup's band/card language) rather than a general complaint. Answered by
distinguishing what Wave 0 was scoped to ship (rail nav, footer, tokens,
layouts) from what it deliberately hadn't touched yet (inner-page markup,
which is Wave 1/2's job) — this was the plan working as designed, not a
regression, and worth calling out explicitly rather than letting the
challenge stand unanswered.

**Latest prompt:** "Yes, go ahead with Wave 1." A short approval, but not
the vague kind the harness rule warns about — it's greenlighting a
already-detailed, already-approved wave from the plan file, not signing off
on a new large artefact whose scope was never stated. Treated as clear to
proceed with Wave 1 as specified in `~/.claude/plans/buzzing-foraging-tide.md`.

**Mid-verification prompt:** "My suggestion would be, don't waste too many
tokens on observing screenshots yourself, since they do take up many
tokens, I can do that for you." A clear, specific process correction — not
vague. Landed mid-visual-verification-crawl for Wave 1; cut the remaining
screenshot-by-screenshot self-review short, reported what had already been
visually confirmed (desktop dark, desktop light, mobile nav collapse), and
handed the live preview link over for Ritesh to check the rest himself.
Wave 1 committed as `9e2ea5f` on the strength of `pnpm check`/axe (already
green pre-compaction) plus that partial visual pass.

**Design-fidelity challenge:** "It does not resemble the original design,
any reason why?" Real signal, not vague — treated as a direct instruction to
investigate, not to reassure. Re-read the approved mockup
(`/tmp/slop3841-mockup-v2.html`) in full and diffed it against the shipped
`index.astro`/`Nav.astro`/`base.css`. Found three genuine gaps: the rail's
signature always-visible 12-tick audit tracker was never built (Wave 1
instead put a large list-based tracker in the homepage body only), the
week-grid was 4 columns instead of the mockup's 6, and the assess-grid was
2×2 instead of 4-across with the background-gap hairline-divider technique.
The stampcard clip-path/rotation, initially also flagged as missing, turned
out to already be correct in `base.css` — a false alarm from checking the
wrong files first. Fixed all three real gaps (compact tick-grid tracker
added to `Nav.astro` via a new shared `lib/semester.ts` helper, week-grid to
6 columns with the `.wk--big` 2×2 solid-fill treatment, assess-grid to the
4-column hairline-divider layout), reverified with `pnpm check` and a
targeted visual pass. Per `feedback_dont_fix_on_question.md`, presented the
findings and fixes without committing and asked Ritesh to confirm before
folding them into history — did not commit as a follow-up fix
unilaterally.

**AskUserQuestion, Wave 2 kickoff:** the mockup's session page draws a rigid
two-heading "Bring / In-the-room" split, but the real twelve week bodies
don't share consistent heading names — only "Leaving with" appears
reliably, and not even always last (week 1 has a trailing heading after
it). Asked how to reconcile the mockup's visual rhythm with per-week
heading drift rather than guessing or hardcoding week-specific logic.
Ritesh selected **"Generic two-column split (Recommended)"**: whatever `##`
sections precede "Leaving with" go into a responsive two-column grid
(stacking on mobile), with "Leaving with" always breaking out into its own
receipt-card band regardless of what precedes it. This is exactly the
right question to have asked rather than defaulted, since the alternative
(hardcoding "Bring"/"In the room" as literal heading text) would have
silently broken on every week that phrased its own headings differently —
confirmed by grep across all twelve session files before asking.

**Approval plus new feedback:**
 "It looks much better. My only feedback is
that the nice visual features/components are buried towards the end of the
page and arent noticed as easily. Anyways, continue with building the rest
of the website, we are going in a good direction now." Three things in one
message: approval to commit the fidelity fixes, a new and specific (not
vague) complaint about page structure, and authorisation to proceed into
Wave 2+. Diagnosed the "buried" complaint as the homepage's detailed
`<SemesterTracker />` list sitting between the hero and the streams grid,
redundant now that the rail carries its own compact tracker and absent from
the mockup's homepage body entirely — removed it from `index.astro` (kept
the component for reuse on `sessions/index.astro` in Wave 2), reverified
with `pnpm check` and a visual pass, and committed the fidelity fixes and
this structural fix together.

## 2026-09-20 — "we have around $15 dollars of credit left, is the final product achievable by then?"

**Context:** mid Wave 3, four parallel subagents just reported back
(assessments, people, lectures, glossary+policies), merge build not yet
run. **Prompt:** a real budget constraint, phrased as a direct yes/no
question, arriving with a number attached — exactly what the "quantify a
vague constraint" rule asks for, except this time the number came
unprompted and the constraint I cannot resolve is on my side: I have no
visibility into this account's actual dollar spend or Sonnet 5's exact
per-token rate, so "is it achievable" cannot be answered as a clean yes.
Answered honestly with that limitation stated up front, then reasoned from
what's observable — the four just-finished agents each burned ~105-114k
tokens, and what remains (merge build, verification, one deck re-skin,
final ship) is smaller in kind than what Wave 3 alone just cost — and gave
a concrete fallback triage against the 45/20/35 mark split in case the
budget runs out mid-Wave-4.

## 2026-09-20 — six-point frontend feedback list, post-Wave-3

**Context:** Wave 3 just closed out; I'd proposed doing Wave 4 (deck re-skin,
cross-page pass) either inline or as a single agent given the stated budget
constraint, and asked which. Instead of answering that, the user came back
with direct design/content feedback on the built site.

**Prompt:** six items — clear nav on the home page; highlight the selected
week's cell in the SemesterTracker grid; rename "session" to "tutorial" in
display copy; the home page's three-stream cards ("they are n" — genuinely
truncated); cross-links between a lecture page and its matching tutorial
page and back; and de-duplicate the "where the semester is" tracker on the
tutorial page against the "where the semester goes" boxes on the home page,
keeping only the boxes version. Also opened with a caution that doing this
work inline in the current session risks forcing an auto-compaction —
useful, actionable signal, not vague.

Five of six items were clear and specific enough to act on directly. One
(the streams line) was cut off mid-sentence and had to be asked back rather
than guessed — "they are n" could plausibly have meant several different
problems with that section, and guessing wrong burns a round-trip anyway.
The "sessions → tutorials" item also had a real fork worth surfacing before
touching anything: display wording only, or the URL path too, since the
latter touches nav config and the broken-links-checker gotcha. Asked both
in one round; got "not equally sized" for the streams issue and "display
wording only" for the rename. Good prompt overall — the one gap was a
literal truncation, not an ambiguity in the request itself.

## 2026-09-20 — second feedback round: home link, external logo, cell fill, budget

**Context:** immediately following the six-point round above; nav/logo work
was still incomplete after that round's first pass.

**Prompt:** "Still missing a home navigation to get to the home page. For
slop university in the corner, also use its logo and link it to the actual
slop university page. https://slop.university/ But below that there should
be a link to the home page or landing page of the course. dont commit the
ship instructions. continue ith wave 4. also for highlighting the cells, i
really meant fill the cell, not highlight the border. we have $10 dollars
of credit left, you can complete within that."

Six items, all concrete and actionable — no truncation, no vague constraint
left unnumbered (the budget was given a real figure, not "quick" or "soon").
One item was a direct correction of previously-shipped work: "highlight"
had been read as an outline/border treatment; the user's actual intent,
stated plainly this time, was a solid fill — worth remembering that
"highlight" is ambiguous vocabulary in this project going forward. The $10
figure is a real number to plan against, not a vibe, and correctly pushed
this round toward direct execution over further agent dispatch. Asked one
clarifying question before acting (which logo variant(s) to self-host,
since downloading a file requires explicit permission) rather than guessing
— the user answered "both" and that was actioned as given.
