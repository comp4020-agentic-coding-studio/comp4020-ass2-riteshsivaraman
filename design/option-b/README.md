# Design Option B — INSTRUMENT

Three standalone pages, no build step, no bundler, no JavaScript libraries.
Open any of them directly in Chrome.

- `index.html` — home / overview
- `inner.html` — Week 07, the content-dense inner page
- `deck.html` — the eight-frame lecture deck

## Guidelines audit

The pages were originally built against the brief plus the Web Interface
Guidelines *from memory*. They were afterwards audited against the
`frontend-design` skill and against the Vercel guidelines fetched live
from source. Recording what that caught, and what it did not.

### What the audit changed

- **Straight apostrophes → `’`** in fourteen places across the three
  pages (`partner's`, `channel's`, `unit's`, `students'`). The typography
  rule asks for real curly quotes; memory had let ASCII through. On a
  design judged partly on typographic quality this is not cosmetic.
- **Sixteen number-unit pairs bound with `&nbsp;`** — `5&nbsp;min`,
  `55&nbsp;min`, `3&nbsp;wk`, `72&nbsp;h`, `300&nbsp;words`. These sit in
  narrow mono cells where a wrap between the digit and its unit is exactly
  the break the rule exists to prevent.
- **`translate="no"`** added to the brand name and the unit number, which
  are identifiers rather than translatable prose.
- **`scroll-margin-top` on `body.textmode .frame`.** In text mode the deck
  frames become real scroll anchors, so a `#f5` deep link was landing
  underneath the sticky top rail. The two non-deck pages already had
  `scroll-margin`; the deck was the gap.
- **The clipped `VP 390×844` readout** on the home page's status strip,
  found while re-verifying at 390 — it was overrunning its cell by 11px
  and rendering as a truncated value. The strip now drops that cell on
  narrow screens, matching what the inner page already did.

Everything was re-verified at 1920×1080 and 390×844 afterwards: no
horizontal overflow on any page at either size, and the earlier mobile
hit-target fixes intact.

### What the audit confirmed was already right

`:focus-visible` with no `outline:none` anywhere, `tabular-nums` on every
numeric column, `text-wrap: balance` on headings, no `transition: all`,
`aria-label` on the icon-only transport buttons, `aria-pressed` on every
toggle, `aria-live="polite"` for frame changes, `preconnect` plus
`display=swap` on the font request, `color-scheme: dark`, deck state
reflected in the URL as `#f5` and restored on load, and animation confined
to `transform`/`opacity`. The ambient field would otherwise trip the
"autoplay motion over five seconds needs a control" rule; it is covered by
the Motion toggle on desktop and by the field being held static on phones,
so no uncontrolled motion exists at either size.

### Deliberate departures

- **Sentence case, not Title Case.** The Vercel guidelines ask for Chicago
  Title Case on headings and buttons; the `frontend-design` skill asks for
  sentence case in the same breath as "plain verbs, no filler". They
  conflict, so this is a choice rather than an oversight. Sentence case
  stays: in an instrument panel the shouting is done by the mono uppercase
  label layer (`FIELD`, `MODE`, `CHANNEL B`), and title-casing the display
  type on top of that would make "Drift and Correction" read as marketing
  copy instead of a panel caption. Buttons keep specific labels
  (`Open Week 07`, not `Continue`), which is the part of that rule that
  actually carries meaning.
- **The palette knowingly sits on two of the skill's named AI defaults.**
  `frontend-design` calls out "near-black background with a single bright
  acid-green accent" and "hairline rules, zero border-radius" as looks
  that appear regardless of subject. Option B is both. The skill's own
  carve-out applies — the brief pinned this axis explicitly ("deep
  near-black or ink-blue ground, fine hairline rules… readout green,
  warning amber") and the brief's words win. Worth stating plainly
  though: on a brief that left the palette free, this would have been a
  default rather than a decision, and the originality is therefore spent
  on the signature (the contour field and the instrument chassis), not on
  the colour choice.
- **Numbered markers were questioned and mostly kept.** The skill warns
  that `01 / 02 / 03` is decoration unless the content really is a
  sequence. The activity steps `T+01`–`T+06` are a stated sequence — the
  copy says each step consumes the previous one's output — and the deck's
  eight frames are a sequence. The inner page's section numbers `01`–`05`
  are the weakest case and survive on a different argument: in this
  direction they read as panel channel-numbering consistent with the
  deck's frame counter, not as ornamental eyebrows. That is a judgement
  call, and it is the one I would revisit first.

### Was anything actually wrong, or only unaudited?

Mostly unaudited rather than wrong. Nothing structural failed: the
accessibility scaffolding, motion policy, focus handling and state-in-URL
behaviour all passed on inspection. What the audit caught was five real
but small defects, four of them typographic or attribute-level and one
(the clipped readout) a genuine visual bug at 390. The honest summary is
that building from memory produced a correct skeleton and a sloppy
surface, and the surface is the part a typography-led design is judged on.

## The aesthetic

The site is dressed as a precision measuring instrument rather than a
website: a near-black ink ground, a visible engineering grid, hairline
rules that meet at right angles, and every piece of metadata labelled and
stamped the way a panel labels its readouts — unit number, revision, sheet
2 of 3, coordinates, viewport. Structure is carried by rules and vertical
channel bands instead of cards and shadows, so a dense page reads as a
continuous chart rather than a wall of tiles. Two signal colours do
instrument work only, never decoration: a readout green marks live and
current state, an amber marks the second channel and anything cautionary.
Behind all of it a slow topographic contour field drifts and bunches under
the pointer, which is the one thing on the page that is not right-angled —
the restraint everywhere else is what makes it read as expensive rather
than as sci-fi kitsch.

## Type stack

One stylesheet request to Google Fonts; nothing else is loaded from the
network.

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Archivo** (variable `wdth` 62–125, `wght` 100–900) | Headings sit at `font-stretch:118–125%`; the width axis is what lets a long heading condense to fit a 390px gutter instead of overflowing it. |
| Prose | **Instrument Sans** 400–700 | 16px / 1.62 body. |
| Metadata | **Spline Sans Mono** 300–700 | Every label, stamp, readout and table cell. `font-variant-numeric: tabular-nums` throughout so digits do not jitter as they count. |

Fallbacks are `system-ui` / `ui-monospace`, and `font-synthesis:none` stops
the browser faking a weight before the webfont lands.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#06090E` | Page ground |
| `--ink2` | `#0A0F16` | Secondary ground |
| `--panel` | `#0E141C` | Panel fill |
| `--panel-hi` | `#141C26` | Raised panel / active cell |
| `--rule` | `#1E2A38` | Hairline rule |
| `--rule-hi` | `#2F4256` | Emphasised rule, tick marks |
| `--bone` | `#DCE3EA` | Body copy and headings |
| `--dim` | `#96A4B3` | Secondary prose |
| `--faint` | `#6E7C8B` | Labels and stamps |
| `--sig` | `#57D9A3` | Signal green — live state, Channel A |
| `--warn` | `#F2B24C` | Amber — Channel B, cautionary tags |
| `--chC` | `#C9D3DE` | Channel C (deliberately neutral, so three channels do not become a rainbow) |

Contrast against `--ink` `#06090E`: `--bone` ≈ 14.4:1, `--dim` ≈ 7.3:1,
`--faint` ≈ 3.9:1, `--sig` ≈ 10.4:1, `--warn` ≈ 9.8:1. `--faint` is used
only for uppercase mono labels at 9.5–11px, never for body copy. No text
is set below 9px, and nothing carrying meaning falls under 3:1.

## Dynamic behaviour inventory

**Every behaviour below is hand-written. The library count is zero** — the
only external request in any of the three files is the Google Fonts
stylesheet. No Three.js, no GSAP, no Reveal.js, no Anime.js.

### The signature move — ambient topographic contour field

A full-viewport fixed canvas behind the content, drawing slowly drifting
contour isolines that bunch and tighten around the pointer as though a
lens were being held over the terrain. It has two independent renderers
behind one interface:

1. **Fast path — WebGL2 fragment shader** (raw `WebGL2RenderingContext`,
   GLSL ES 3.00, no library). Value-noise fbm with a domain warp,
   converted to isolines analytically and antialiased with `fwidth`, plus
   a pointer term that locally compresses the field's scale.
2. **Fallback — canvas 2D marching squares.** The same scalar field
   sampled onto a grid and contoured by marching squares, with every iso
   level batched into a single `Path2D` and stroked once, and a cached
   `createRadialGradient` laid over the centre so prose never competes
   with a contour.

The page picks path 1 if `getContext('webgl2')` succeeds and silently
falls back to path 2 otherwise. Both are quality-adaptive: a running fps
sample lowers the GL render scale or raises the 2D cell size. The status
strip reports which one is live and at what rate (`ISO LIVE`, `ISO 3FPS`,
`ISO HOLD`, `ISO STATIC`), so the page tells you the truth about its own
renderer instead of hiding a degradation.

The field paints **synchronously on boot** before the animation loop
starts. This matters: relying on the first `requestAnimationFrame` means a
throttled or backgrounded tab delivers no frames and shows an empty
background forever.

### Everything else

| Behaviour | Where | Driven by |
| --- | --- | --- |
| Counter readouts easing to their settled value | `index.html` | `requestAnimationFrame` + cubic ease-out |
| Assessment meters filling | `index.html` | CSS `transform: scaleX()` on an IntersectionObserver trigger |
| Computed Σ that adds the weights live | `index.html` | Plain JS over the DOM, so the total cannot disagree with the rows |
| 12-week timebase ruler with hover readout | `index.html` | Pointer events against tick geometry |
| Section reveals on scroll | `index.html`, `inner.html` | `IntersectionObserver` + CSS transition |
| Sticky position rail tracking the current section | `inner.html` | `IntersectionObserver` |
| Live scroll-percentage and MODE readout in the status strip | all three | Scroll listener; MODE does a character-scramble "retune" to a new label, the way a device settles on a mode |
| Persisted return checklist (6 items, progress counter and bar) | `inner.html` | `localStorage`, `try`/`catch` wrapped so `file://`'s opaque origin cannot throw |
| Keyboard frame transport | `deck.html` | `keydown`: ←/→, PageUp/PageDown, Space, Home/End, `1`–`8` |
| Mode-change frame transition | `deck.html` | CSS `degauss` + `bloom` keyframes (collapse to a scanline, bloom back out) plus a scan-line flash |
| Progress indicator | `deck.html` | An 8-station timebase with a sweeping needle, plus a `Frame 05 / 08` readout and a labelled frame title |
| Grid / Motion / Text toggles, persisted | all three | `localStorage`, `aria-pressed` |

### What makes the deck not a Reveal.js clone

Pressing `T` reflows the *same eight frames* into one linear scrolling
document — same DOM, same source of truth, no second copy of the content
to drift out of sync. The frames stop being absolutely-positioned slides
and become sections with rules between them and a `Frame 03 of 8` stamp
generated from each frame's own `data-n`. It is a genuine accessibility
affordance rather than a decorative mode, and it is reachable by keyboard
and by a visible toggle. The deck advertises it in the footer of every
page ("Deck has a text version").

## Responsive decisions at 390×844

The mobile view is a decided layout, not a squeezed desktop. What the
signature move degrades into:

- **The field is held static on phones.** It paints once at a coarser cell
  size and then stops; the pointer lens is meaningless without a pointer
  and the battery cost is not. The strip says `ISO STATIC` so the
  degradation is legible rather than hidden.
- **The deck's bottom rail wraps the timebase onto its own full-width
  row** (`--railB` grows to 144px). The progress indicator is the one
  thing that must not be sacrificed on a phone.
- **GRAT and MOTION drop out of the deck's top rail below 480px; TEXT
  survives.** When the rail runs out of room, the accessibility affordance
  outranks the two decorative toggles. This is an explicit choice, noted
  in a comment beside the media query.
- The 12-week ruler on the home page becomes a tick grid rather than a
  single crushed 390px axis, and the timebase readout stacks under its
  heading instead of fighting it for width.
- The unit stamp leaves the nav so the header stays one row (49px).

Verified: `document.documentElement.scrollWidth === 390` on all three
pages, no element extending past the viewport, no horizontal scroll.

## Accessibility notes

Skip link, hierarchical headings, `:focus-visible` outlines in signal
green, `aria-pressed` on every toggle, `aria-current` on the active nav
item, `aria-label` on each deck frame, a polite live region announcing
frame changes, `color-scheme: dark`, `meta theme-color`,
`env(safe-area-inset-*)` on all three chassis, and `touch-action:
manipulation`.

Hit targets were measured at 390px rather than assumed, which caught two
real problems: the deck's nav anchors were collapsing to their 17px text
box because the parent rail centred them instead of stretching them, and
the stacked footer links were 19px rows spaced 5px apart. Both are fixed.
Every interactive element on the deck now fills its rail cell, and the
checklist's six checkboxes are each wrapped in a full-row `<label>`, so
the 16px box is not the target — the whole row is.

`prefers-reduced-motion: reduce` is honoured two ways: a `matchMedia`
query sets `body.reduced`, which collapses every animation and transition
to `.001ms`, forces all scroll reveals visible with no transition, and
holds the field static. The Motion toggle cannot be switched *on* against
the user's stated preference. This was verified live, not just read: with
`body.reduced` applied, the four scroll-revealed blocks go from
`opacity: 0` to rendered with no transition.

Scroll reveals are gated on an `html.js` class set by an inline script
before first paint, so with JavaScript disabled or
`IntersectionObserver` missing, nothing is stranded at `opacity: 0`.

## Port risks — honest list

**WebGL was unavailable in the environment these pages were verified in.**
`canvas.getContext('webgl2')` and `getContext('webgl')` both returned
`null` in the test Chrome, so every screenshot in this verification pass
shows the **canvas-2D marching-squares fallback**, not the shader. The
fallback is a real renderer and it looks good — but it means the GL path,
while written and wired, has not been seen rendering. On a marker's
machine with normal GPU access the shader path is what will run, and it
will look *different*: smoother, denser, with a more pronounced pointer
lens and a much higher frame rate. Two consequences worth stating plainly:

1. The visual I can vouch for is the 2D one. The GL one should be
   inspected on a real machine before this option is chosen.
2. Conversely, the fallback is proof the page survives a machine with no
   GPU, which is the failure mode that would otherwise take the
   background out entirely.

Related: because the verification tab was backgrounded by the automation
harness, `document.visibilityState` was `hidden` throughout, which freezes
Chrome's animation clock and starves `IntersectionObserver` delivery.
Scroll reveals and the deck's bloom transition therefore had to be
verified by forcing their end state. They are correct in a foreground tab;
this is a property of the harness, not of the code.

### Porting to Astro

- **The field is the main lift, but it is self-contained.** It is one
  canvas plus one IIFE with no DOM dependencies beyond the canvas and a
  status-readout element id. It ports cleanly to a single Astro component
  with a `client:idle` script. The awkward part is that the readout id
  differs per page (`st-field` on the home and inner pages, `m-field` on
  the deck) — that wants to become a prop.
- **The deck's TEXT mode depends on the frames being real sibling
  sections in one document.** If frames become separate Astro components
  or content-collection entries rendered into a slot, the `body.textmode`
  reflow and the `data-n` / `data-title` attribute plumbing need to be
  preserved deliberately. This is the piece most likely to be quietly
  broken by a refactor.
- **Three near-identical token blocks and three copies of the status
  strip** exist because each file must stand alone. In Astro these
  collapse to one layout and one global stylesheet, which is
  straightforwardly better.
- **`localStorage` keys** (`ob-motion`, `ob-grid`, `ob-chk07`) are fine,
  but the checklist key is week-specific and would need to be derived from
  the week's slug rather than hard-coded.

### What would need care in an axe audit

Nothing here is a known axe failure, but these are the places I would
expect a run to complain, and the build throws on an axe regression:

- **`--faint` `#6E7C8B` at 3.9:1** clears 3:1 but not 4.5:1. It is only
  used on uppercase mono labels, which are not body text — but if any of
  those labels ever grows into a sentence, or if a future edit drops
  `--faint` onto prose, that becomes a real contrast failure. The ground
  is dark enough that this regresses quietly, which is exactly the trap.
- **The canvas is decorative** and carries `aria-hidden` plus no
  accessible name. If it ever gains meaning it needs a text alternative,
  and there is no way to give a contour field a sensible one.
- **The graticule and crop marks are pure CSS backgrounds** on
  `pointer-events: none` layers. Safe now; would fail if anything
  interactive were ever placed inside them.
- **The deck toggles hidden below 480px** (`GRAT`, `MOTION`) are
  `display: none`, so they leave the accessibility tree entirely rather
  than becoming invisible focus traps. That is the correct choice, but it
  means two documented keyboard shortcuts (`G`, `M`) have no visible
  control on a phone. The shortcuts still work.
- **The MODE character-scramble** mutates text content roughly 12 times
  over ~400ms. It sits outside any live region so it will not spam a
  screen reader, but it is the kind of thing an audit flags on principle,
  and it is disabled under reduced motion.
