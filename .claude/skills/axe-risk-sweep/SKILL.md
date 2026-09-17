---
name: axe-risk-sweep
description: Scans CSS/Astro/MDX for the recurring accessibility failure shapes this design direction reproduces (translucent text, opacity-only dimming, unlabelled custom keyboard handling, unlabelled horizontal-scroll regions), before pnpm build's axe pass finds them the expensive way. Use before or during any kinetic-type / custom-motion frontend change in this repo, especially the option-A port.
---

# Axe-risk sweep

For this repo (COMP4020 Assignment 2). This is a **read-only, report-only**
check — per this repo's agent-team rule, an agent running this sweep finds
and reports findings; it never edits files, runs `git`, or runs `pnpm
check`/`pnpm build` itself. Hand findings back to the main thread.

`pnpm build` runs axe and throws on a violation, and CI's `deploy` job runs
its own `pnpm build` — so an a11y regression here takes the *live deployed
site* down, not just a test. This sweep exists to catch these before that
build, not instead of it: it is a prediction to be verified by the real
build, not a replacement for one.

## What to grep for

Run each of these across `src/**/*.astro`, `src/**/*.mdx`, `src/**/*.css`,
and report every match with file:line and a one-line verdict (likely real /
likely fine):

1. **Translucent text over a solid ground** — any `rgba(`/`hsla(` or
   `opacity` applied to text colour (not background) where the ground colour
   is a solid brand token. Grep: `rgba\(.*,\s*\.\d+\)` and `opacity:\s*0?\.\d`
   near a `color:` declaration. A translucent foreground colour can drop
   below the contrast ratio the solid version was designed to meet — check
   the resulting effective ratio against the token pair's documented ratio
   (see `src/styles/notepad.css`'s inline ratio comments for the pattern this
   repo already follows).

2. **Opacity-only dimming with no `aria-hidden`** — any element visually
   dimmed via `opacity` (e.g. inactive/upcoming items in a rail, overview, or
   filmstrip) that isn't also `aria-hidden="true"` or `inert`. A sighted user
   reads it as de-emphasised; a screen reader still announces it at full
   weight. Grep: `opacity:\s*\.[0-9]` in component/page CSS, then check the
   matching markup for `aria-hidden`.

3. **Live-updating status/HUD elements without `aria-hidden`** — anything
   that rewrites its own text every animation frame (a velocity readout, a
   live counter) needs `aria-hidden="true"` unless it is meant to be
   announced, in which case it needs `aria-live="polite"` deliberately chosen,
   not left to default. Grep for `requestAnimationFrame`/`textContent =` /
   `innerText =` inside scripts and check the target element's markup.

4. **Custom keyboard handling not scoped, or missing role/name** — any
   `addEventListener("keydown", …)` bound outside a specific interactive
   element (e.g. global arrow-key handling on `document` or `window`) risks
   hijacking keys a screen-reader or browser already uses. Check it's scoped
   to a focused element with an appropriate `role` and accessible name, not
   global.

5. **Unlabelled horizontal-scroll region** — any container with
   `overflow-x: auto/scroll` needs `tabindex="0"` and an accessible label
   (`aria-label` or `aria-labelledby`) so keyboard/screen-reader users can
   find and operate it. Grep: `overflow-x:\s*(auto|scroll)`.

## Report format

One line per finding: `file:line — [risk category] — likely real / likely
fine — one-sentence reason`. If a category has zero matches, say so
explicitly rather than omitting it — a silent gap reads as "checked and
clean," which is only true if the grep pattern actually ran.

## After the sweep

Findings go back to the main thread, which decides fixes and re-runs `pnpm
build` (axe) to confirm. This sweep is a prediction; the build's own axe pass
is the actual gate.
