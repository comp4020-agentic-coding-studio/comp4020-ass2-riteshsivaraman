---
name: verify-pilot
description: Hands back an exact, steppable visual/motion verification checklist for changes to the static prototype in design/pilot-a/ — which is outside the Astro build, so pnpm check/build do not apply. Use after any frontend change to design/pilot-a/*.html, before asking the user to review it.
---

# Verify pilot

For this repo (COMP4020 Assignment 2), scoped to `design/pilot-a/` — the
static HTML prototype used to settle design direction before porting into
the Astro build. It has no build step: no `pnpm check`, no axe pass, no
broken-links checker. That means the burden of catching a regression here
falls entirely on a human looking at the rendered page — never skip the
checklist because "nothing failed," since nothing runs to fail.

This is the sibling of `verify-frontend` (which targets the ported Astro
site under `src/`); use whichever one matches where the change actually
landed. Do not run `pnpm` commands against `design/pilot-a/` — open the
files directly or serve the directory statically.

## 1. Open every changed file, both marking viewports

**1920×1080** and **390×844**, in Chrome. List which files changed and
confirm each was actually opened at both sizes — don't infer from the diff
that it matches the description.

## 2. Write the checklist, never "take a look"

For each behavioural change, state precisely what to do and what to expect
— per this repo's `CLAUDE.md` rule, this is the one thing a sensor
structurally cannot catch:

```
- Scroll [where, at what pace] → expect [specific behaviour]
- Hover / click [what] → expect [specific behaviour]
- Resize to [width] / reduced-motion on → expect [specific behaviour]
```

Cover, whichever apply to the change: line-count stability of any kinetic/
variable-width text under fast scroll AND at rest AND under
`prefers-reduced-motion`; any sticky-rail or smooth-scroll landing position
relative to the masthead; swipe/wheel/trackpad gesture behaviour on any
pinned or scrubbed section; nav item presence/order/`aria-current` across
every page (the masthead is hardcoded per-page, not a shared include, so a
change to one page's nav does not propagate); card/row ordering; new-page
links actually navigating to real content, not a dead or placeholder link.

## 3. Report format

State which files were opened at which viewports, then the checklist. If a
change is copy-only with nothing a human needs to feel, say so explicitly
rather than omitting the section — an omission reads as "forgot," not "not
applicable."
