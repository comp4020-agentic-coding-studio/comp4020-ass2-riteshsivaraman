---
name: verify-frontend
description: Runs this repo's build/evidence checks and looks at the five marker pages in Chrome at both marking viewports, then hands back an exact scroll/hover checklist for the user. Use after any frontend change in this repo, before declaring it done or asking the user to review it.
---

# Verify frontend

For this repo (COMP4020 Assignment 2). Do not skip steps or summarise without
having run them — a check the user doesn't see run is a check that didn't
happen.

## 1. Automated checks (main thread only, per this repo's agent-team rule)

Run in order, stop and report on the first failure rather than continuing:

```
pnpm check
pnpm check:evidence
```

`pnpm check` is `typecheck` (astro check) then `test` (`pnpm build` + `vitest
run spec`) — a build failure here can mean axe, a broken nav link, a dangling
`related:` ref, or a decks/API collection error; say which. `check:evidence`
only sees **committed** files (`git grep`), so if uncommitted changes exist,
commit them first or the sweep silently passes on stale content.

## 2. The five marker pages, both viewports

These are the pages a marker actually opens (~10 minutes, carries 45%+20%+35%
of the mark). Use `pnpm preview` (or `pnpm dev`) and open each of these routes
in Chrome, once at **1920×1080** and once at **390×844**:

| Page | Route |
|---|---|
| Home | `/` |
| Week (non-adjacent #1) | `/sessions/week-02/` |
| Week (non-adjacent #2) | `/sessions/week-09/` |
| An assessment | `/assessments/01-role-teardown/` |
| The deck | `/decks/week-06-varnish/` |
| Policies | `/policies/` |

Swap the two week slugs for whichever weeks the current change actually
touches, keeping them non-adjacent. Look at each page — don't infer from the
diff that it matches the description.

## 3. Hand back an exact checklist, never "take a look"

For anything the automated checks structurally cannot catch — motion feel,
easing, whether an effect reads as alive or as jank, hover behaviour, focus
order — write the user a checklist that states precisely what to do and what
to expect at each step. This is a standing rule in this repo's `CLAUDE.md`; a
vague "check it out" makes the user re-derive what "working" means from
scratch. Template:

```
- Scroll [where, at what pace] → expect [specific behaviour]
- Hover [what] → expect [specific behaviour]
- Resize/stop at [width] → expect [specific behaviour]
```

If nothing changed that a human needs to feel (e.g. a copy-only fix), say so
explicitly rather than omitting the section.

## 4. Report format

State plainly: which checks passed/failed, which of the six pages were
actually opened at which viewports, and the checklist from step 3 if
applicable. Do not report "looks good" without having done 1–3.
