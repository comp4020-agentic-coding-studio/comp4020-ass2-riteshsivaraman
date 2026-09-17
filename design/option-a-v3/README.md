# Option A · v3 — “LECTURE”

The warmer, quieter answer. Two standalone pages, `index.html` (home) and
`inner.html` (week 07, dense). No build step, no local assets; Google Fonts is the
only CDN. No deck — `design/option-a/deck.html` remains the reference.

## The direction in one paragraph

A well-made course site that happens to have one striking moment, where v2 is a
striking site that has been disciplined. The material changes completely: off bone
and vermilion entirely, onto warm chalk, deep chalkboard green and oxblood — the
colours of a teaching room rather than of a protest poster, and deliberately not the
flagged cream-and-terracotta default either. Prose is set in a humanist serif at 18px
with a 1.62 line-height and measures capped around 56–66ch, because the inner page is
long and reading it should be comfortable rather than impressive. The twelve weeks are
grouped into **three named parts**, and the grouping is real: each part ends with
something being handed in, which is why the parts fall where they do. The kinetic
engine survives as exactly **one word on each page** — the last word of the headline —
and nothing else on either page animates at all.

## Palette

| Token | Hex | Role |
|---|---|---|
| `--chalk` | `#E6E7E0` | ground |
| `--paper` | `#EFF0EA` | raised panels: the “now” card, row hover, the glance card |
| `--board` | `#22352B` | chalkboard green: all ink, rules, and inverted grounds |
| `--board2` | `#4E5A53` | secondary text |
| `--ox` | `#7A2230` | the single accent: the kinetic word, current week, due flags |
| `--ox-soft` | `#F0DFE1` | accent wash behind “required” tags and stream outcomes |

Measured contrast floor across both pages: **5.40:1**, computed in-browser with the
full alpha stack composited. No text pair falls below WCAG AA.

## Type stack

| Role | Face | Notes |
|---|---|---|
| Display | **Archivo** | `wght` 420–700, `wdth` 86–104. A grotesque with real character and a genuine width axis, so the one kinetic moment has something to move. |
| Body | **Source Serif 4** | Humanist serif with an optical-size axis; `opsz` 18–26 across the scale. This is the reason the inner page is comfortable to read end to end. |
| Utility | **IBM Plex Mono** | Labels, dates, times, weights, section marks. Never used for prose. |

## What changed from option A, and why

1. **Structure encodes course information, calmly.** The home page is a schedule in
   three named parts (Ground / Pressure / Assembly), each part a group of week rows
   carrying number, date, title, what the session does, and a due flag. The inner page
   opens with a “this week at a glance” card — lecture, streams, readings, due, prep
   time — because that is the actual question a student arrives with.
2. **The material is different, not just retuned.** Palette, both text faces and the
   body’s reading rhythm all changed. Nothing of the bone-and-vermilion family remains.
3. **Prose is set for reading, not for texture.** 18px serif, 1.62 line-height, 56–66ch
   measures. Option A used small serif columns as texture; here they are there to be
   read.
4. **The kinetic engine is one moment.** `wght` 430–680, `wdth` 92–104 — a 20% advance
   swing, on one word per page. Everything else is fixed.
5. **All JS libraries removed.** Native scroll velocity in a plain rAF loop; no GSAP,
   no Lenis. Fonts are the only remaining CDN.
6. **Surfaces are allowed back, sparingly.** This is the calm variant, so a raised
   panel and a soft accent wash do work that hairline rules alone were doing badly.

## How the reflow bug was fixed

Same root cause as option A: a 2.3× `wdth` swing re-wrapped headings from two lines to
one, the block height changed, and the content below jumped with no space reserved.

The fix here is the same contract as v2, applied to a single element per page:

1. **`white-space: nowrap`** on `.kin`. Its line count is fixed at one, so a width-axis
   change cannot re-wrap it. The failure mode is removed, not reduced.
2. **`block-size: 1.02em`** — a *fixed*, not merely minimum, height, derived from the
   line-height ratio and therefore independent of the rendered glyphs. The box measures
   the same at every axis value.
3. **A small range plus `contain: layout`.** At `wdth` 104 the word is still far
   narrower than its line, so nowrap cannot trade reflow for overflow.

Because only one inline element on each page consumes the axes, and it is the last
element on its line, nothing downstream has anything to be pushed by. The trailing full
stop on the home page was initially left outside the span and visibly shunted sideways
as the word grew; it was moved inside, so the whole unit travels together.

**Verified by scrubbing, not by reasoning.** The same Playwright harness drives
`window.__kv.axes(w, x)` through 21 steps across the full range, forcing a reflow at
each step, recording the kinetic element’s height, the `top` of the next element, and
`document.scrollHeight`. At both 1920×1080 and 390×844, on both pages, all three are
**single-valued across all 21 samples** — `index.html @ 1920`: `kinH [75.47]`,
`nextTop [497.48]`, `docH [4132]`. A `Range` measurement confirms the glyph advance
does move, by 20.2% on the home page and 20.6% on the inner page, while the geometry
stays fixed. Two screenshots of the identical crop at both axis extremes show the word
changing and every other pixel on the page unchanged.

## Port risks

- **`--kv-*` must live on `:root` in a global stylesheet**, or Astro’s scoped-style
  hashing leaves `font-variation-settings` reading a stale value.
- **`block-size` on `.kin` is a fixed em height.** It is correct for a one-line inline
  element and wrong for anything else. If a future author reuses the class on a
  wrapping heading it will clip, so the constraint has to travel with the component.
- **Archivo and Source Serif 4 are two variable fonts plus a mono**, roughly the same
  payload as option A. They need `font-display: swap` and preloading, and the layout
  must not depend on metrics that shift on swap.
- **The three schedule parts are hard-coded groupings.** In a real build the part
  boundaries are data (“which part does week N belong to”), not markup, or weeks and
  parts will disagree.
- **The week strip and the schedule duplicate week metadata.** One source of truth
  required.
- **`:has()` is used for the checklist focus ring**, and `text-wrap: balance` on
  headings. Both fine in Chrome at marking time; both need a graceful fallback.
- **Not verified:** motion *feel* — attack and release timing — was only ever observed
  at forced end states, never mid-flight in a foreground window.
