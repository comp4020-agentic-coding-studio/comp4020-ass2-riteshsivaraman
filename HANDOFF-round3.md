# Handoff: round-2 done, verification + harness fix pending

Read WORKLOG.md then PLAN.md first (session-handoff rule).

## Done, committed (f50d2b9, e45bea4, df1a4a8)
All 6 round-2 items from prompt-log.md shipped in design/pilot-a/:
1. Kinetic stretch: per-element measured-safe-range guard (initGuards/
   safeStep/lineCountOf) replacing the insufficient global 78-96 clamp.
   index.html, week-01.html, week-07.html.
2. Rail links use lenis.scrollTo() not default anchor jump.
3. Nav standardised: masthead Home/Weeks/Deck/Assessments, colophon
   Home/People/Policies/Resources, all pages. weeks.html created (12-tile
   index reusing .wk card).
4. Native swipe: wheel deltaX over pinned act redirected to
   window.scrollBy, so GSAP scrub stays the single driver.
5. Real content in assessments/policies/support/resources.html,
   people.html created. grep -ln "placeholder" *.html clean.
6. .wk card DOM: number -> title -> description.
LEARNINGS.md and WORKLOG.md updated with full reasoning.

## Not done — pick up here
1. **User has not visually verified any of this.** A checklist was handed
   over in-conversation (not saved to a file) covering: line-count
   stability under fast scroll + reduced-motion + resize, rail
   smooth-scroll landing clear of masthead, trackpad swipe on the pinned
   act >900px, nav consistency, card order. Ask the user if they ran it;
   if not, re-issue the checklist before doing anything else.
2. **Harness fix agreed but not applied.** User confirmed diagnosis that
   this session blew context (154.5k/200k after one prior compaction)
   because main did items 1/2/4/6 inline instead of delegating single
   mechanical edits to agents — only item 5 was actually parallelised.
   Agreed fix, not yet written: add to CLAUDE.md's `## Agent team`
   section a rule that a bounded single edit not needing main's judgement
   is still agent work, not just the parallel-fan-out case. Apply this
   edit, and log a LEARNINGS.md entry ("orchestration only pays off when
   execution, not just fan-out, is delegated").

## Session discipline reminders
- Per CLAUDE.md: every reply needs a one-line learnings-status line and a
  one-line prompt-feedback line (added this session, binding).
- No amend/rebase/force-push, ever. Main is sole committer/build-runner.
