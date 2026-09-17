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

## The theme lab

The pages now carry a **theme lab**: a panel, present on all three, that
switches the whole design between six palettes and five type pairs. It
exists because the first round of this direction read *too technical where
it should be student friendly*, and the cheapest way to settle that is to
look at the same layout wearing different material rather than to argue
about it.

It is an **evaluation tool and is meant to be deleted** before the real
port. See *Stripping the theme lab* below for the exact cut.

**Using it.** A `Theme ·` tab sits in the bottom-right corner, above the
status strip. Open it for six named presets; a `Mix palette and type`
disclosure underneath free-mixes all 6 × 5 = 30 combinations. The choice
is written to `localStorage` (`ob-pal`, `ob-type`) and re-applied in
`<head>` before first paint, so navigating from the home page to a week or
to the deck keeps the theme with no flash of the previous ground. `Esc`
collapses the panel, `Shift`+`L` hides and restores it entirely, every
control is reachable by keyboard, and each change is announced through a
polite live region.

### How it is wired

Two data attributes on `<html>` — `data-pal` and `data-type` — and nothing
else. Every palette is a block of CSS custom properties behind an
attribute selector, so a palette change is a style recalculation, not a
script that walks the DOM repainting things. The lab's JavaScript only
sets the attributes, persists them, injects the type preset's font link,
keeps `<meta name="theme-color">` honest, and tells the canvas field to
re-read its colours.

Getting there needed the pages fully tokenised first. Roughly a hundred
composited `rgba()` literals (the engineering grid, the rule hairlines,
the panel wells, the signal glows) were hoisted onto rgb-triplet tokens
(`--ink-rgb`, `--rule-rgb`, `--sig-rgb`, `--grid-rgb`) so their alpha
survives a palette change; the four near-identical prose greys that had
drifted apart (`#C3CCD6`, `#C2CBD5`, `#B7C1CC`, `#B9C3CE`) collapsed into
one `--prose`. Three structural knobs were tokenised at the same time,
because a palette is not only colour: `--hair` (rule weight — Manifesto
needs a hard 1.5px), `--blur` (chrome backdrop blur — Manifesto needs
none) and `--grid-o` (grid overlay opacity, since a light line at 6%
alpha reads differently on a mid-tone ground than on black).

**The contour field was the real trap.** It paints from JavaScript, and it
had `#06090E` and `rgba(126,180,216,.21)` baked into both renderers — so a
light palette would have left a black field sitting behind a bone page.
Both renderers now read `--field-base` / `--field-line` / `--field-line-a`
off `<html>` at paint time. The shader gained two `vec3` uniforms and
resolves ink as `mix(uBase, uLine, …)` instead of *adding* light onto a
dark base, which is what lets it invert cleanly — a light ground gets dark
contours from the same code path, with no special case. `field.retheme()`
re-reads the tokens, rebuilds the canvas-2D vignette gradient (which
caches its colour stops and would otherwise keep the old ground) and
repaints synchronously.

Verified by sampling the live canvas pixel after each switch: the field
tracked the ground exactly through `instrument → paper → manifesto →
bench → instrument → paper`, including back to dark.

### Palettes

Every value below was checked for body-copy contrast against all four
grounds it can land on (`--ink`, `--ink2`, `--panel`, `--panel-hi`), not
assumed. Light grounds fail differently from dark ones: the ochres and
reds that look right on paper are the ones that quietly drop under 4.5:1.

**1 · Instrument** — the original, as the reference point.

| ground | ink | rules | text | signals |
| --- | --- | --- | --- | --- |
| near-black | `#06090E` `#0A0F16` | `#1E2A38` `#2F4256` | `#DCE3EA` `#C3CCD6` `#96A4B3` `#8494A5` | `#57D9A3` `#F2B24C` `#C9D3DE` |

Unchanged except `--faint`, raised `#6E7C8B` → `#8494A5`. The old value sat
at 3.9:1 and this README flagged it as the thing that would regress
quietly; tokenisation was the moment to close it. It is now 6.4:1.

**2 · Paper Instrument** — the flagship. Graphite on warm stock.

| ground | ink | rules | text | signals |
| --- | --- | --- | --- | --- |
| warm white | `#F7F4EE` `#EFEBE2` | `#D8D0C2` `#B2A896` | `#23272C` `#3C424A` `#545B64` `#5F6771` | `#1B4F9B` `#8A5A0B` `#454C55` |

Panels go *lighter* than the stock, so a panel still reads as a printed
card laid on the sheet rather than a hole cut in it. One ink blue for live
state, one muted ochre for the second channel — both darkened well past
their screen-native values to hold on a light ground.

**3 · Field Manual** — manila, brown-black, one signal red.

| ground | ink | rules | text | signals |
| --- | --- | --- | --- | --- |
| manila | `#E8DFC9` `#DFD5BB` | `#C4B693` `#9C8D66` | `#1E1A14` `#332C21` `#4A4132` `#554B3A` | `#A0261B` `#6E5010` `#3E3628` |

Heavier and older than Paper. The ink is brown-black rather than
graphite, which is what makes it read as printed decades ago rather than
laser-printed this morning.

**4 · Datum** — cool light, the most studio of the set.

| ground | ink | rules | text | signals |
| --- | --- | --- | --- | --- |
| near-white | `#FBFCFD` `#F1F4F8` | `#DCE2EA` `#AFB9C5` | `#0F141A` `#2B323B` `#48515C` `#5C6672` | `#0B4FD8` `#3F4A57` `#626B77` |

The brief asked for a single saturated accent, so this one takes it
literally: `--warn` and `--chC`, which are a second and third colour in
every other palette, are desaturated slates here. Exactly one thing on the
page is allowed to be a colour.

**5 · Drafting Bench** — mid-tone. Warm slate ground, cream ink.

| ground | ink | rules | text | signals |
| --- | --- | --- | --- | --- |
| warm slate | `#4E504A` `#45473F` | `#6A6C63` `#888A7F` | `#F6F4EC` `#E7E4D9` `#D6D3C7` `#C8C5B8` | `#B8E08E` `#F2C77A` `#DAD7CA` |

This one taught the most. On every other palette the panels are *raised*
away from the ground; on a mid-tone that direction costs contrast in both
directions at once, and the first draft failed eleven checks. The fix was
to invert the chassis logic — panels recess to `#42443D` and `#383A34`
instead of rising — which both restores the numbers and reads more like an
instrument than the raised version did. `--grid-o` goes to 1.5 because a
light grid line at 6% alpha all but vanishes on a mid ground.

**6 · Manifesto** — option B's layout wearing a different direction.

| ground | ink | rules | text | signals |
| --- | --- | --- | --- | --- |
| bone | `#F2EFE6` `#E9E5D9` | `#111111` `#111111` (at `--hair: 1.5px`) | `#0B0B0B` `#181818` `#303030` `#3D3D3D` | `#C02008` |

The only palette that moves structure as well as colour: hairlines become
hard 1.5px black rules, `--blur` drops to `0px` so no chrome is frosted,
and `--grid-o` goes *down* to 0.7 because the loudness belongs to the
rules and the type, not to the background. Exactly one accent, and it is
the only non-black ink on the page. The vermilion is `#C02008` rather than
a hotter `#D4290A`: the hotter one measured 4.43:1 on bone and had to be
darkened to clear 4.5.

### Contrast results

Measured in Chrome against the actual composited backgrounds — including
the alpha-blended nav and status strip, which are the two places a naive
check gets wrong. Every text node on all three pages, every palette:

| palette | worst ratio | failures |
| --- | --- | --- |
| Instrument | 6.42 | none |
| Paper Instrument | 5.22 | none |
| Field Manual | 4.94 | none |
| Datum | 5.26 | none |
| Drafting Bench | 4.55 | none |
| Manifesto | 4.58 | none |

One element is below 4.5 on every palette including the original: the
deck's disabled `◄` transport button, at 1.9–2.5:1. Disabled controls are
exempt under WCAG 1.4.3, it is pre-existing rather than introduced here,
and tokenising it to `--rule-hi` preserved the original appearance
exactly.

The smallest type on the page is 10px, on the uppercase mono label layer.
That is unchanged from the original design and is not body copy; no
sentence-shaped text is set below 13.5px.

### Type pairs

| Preset | Display | Body | Mono |
| --- | --- | --- | --- |
| **Instrument** | Archivo | Instrument Sans | Spline Sans Mono |
| **Reading Room** | Spectral | Source Serif 4 | IBM Plex Mono |
| **Broadsheet** | Fraunces | Public Sans | JetBrains Mono |
| **Seminar** | Bricolage Grotesque | Source Sans 3 | DM Mono |
| **Drafting** | Chivo | Karla | Azeret Mono |

**Reading Room** is the academic one, and the only one with a serif body.
It pairs two serifs deliberately: Spectral is high-contrast and does the
display work, Source Serif 4 is a text face with the x-height to survive
16px on screen. Spectral alone as body was tried and reads too small.

**Broadsheet** is serif display over sans body — Fraunces' optical-size
axis lets the hero go genuinely editorial without the body copy following
it. This is the pairing Manifesto wears.

**Seminar** is the direct answer to *too technical*. Warmth here is
Source Sans 3's humanist skeleton, open apertures and generous x-height,
not a rounded or friendly face; Bricolage Grotesque carries just enough
irregularity above it to stop the page reading as a spec sheet. DM Mono's
low stroke contrast keeps the telemetry layer from turning brittle.

**Drafting** is the fifth on my own judgement: Chivo's grotesque
neutrality over Karla, which has real character in the body size where
Inter would have been the default answer, with Azeret Mono's rectangular
drafting-instrument fit for the readouts.

**Loading.** Only the Instrument stack ships in `<head>`. The other four
fetch on selection, once, deduplicated by link id — nothing loads twenty
families up front. All four URLs were checked live for HTTP 200 before
being committed, since a typo'd Google Fonts request fails silently into
the system fallback and looks like a design decision.

**Width axis.** Archivo's `wdth` axis is what lets a long heading condense
into a 390px gutter, and only Archivo has it. `font-stretch` is therefore
tokenised as `calc(100% + N% * var(--str))`, and the four non-Archivo
presets set `--str: 0`, collapsing every stretch to a true 100% rather
than letting `font-synthesis: none` silently drop the declaration. They
also take `--dmax` down to 0.80–0.86, trimming the display ceiling so an
uncondensable face at 142px does not run out of line.

### Stripping the theme lab

Four cuts, all fenced with comments. Nothing outside them depends on the
lab — the tokenisation, the field's theme bridge and the `--hair` /
`--blur` / `--grid-o` / `--str` / `--dmax` knobs are all improvements to
the base design and should survive the port.

In each of `index.html`, `inner.html` and `deck.html`:

1. `<script id="lab-boot">` in `<head>` — the pre-paint restore.
2. In `<style>`: everything from `/* ═══ THEME LAB` to
   `/* ═══ end theme lab CSS ═══ */`. **Keep** the `:root` blocks inside it
   for whichever palette and type preset you ship; delete the
   `html[data-pal=…]` and `html[data-type=…]` blocks and all `.lab*` rules.
3. The `<div class="lab" id="lab">` node, fenced by
   `<!-- ═══ THEME LAB` and `<!-- ═══ end theme lab markup ═══ -->`.
4. In the final `<script>`: the IIFE from `/* ═══ THEME LAB wiring` to
   `/* ═══ end theme lab wiring ═══ */`.

Then set the winning palette and type preset as the plain `:root` values,
drop the losing `<link>` for fonts you are not shipping, and delete
`field.retheme()` if nothing will ever call it — though it is four lines
and worth keeping if a light/dark toggle is ever wanted.

### Which combination I would pick

**Paper Instrument + Seminar.** It is the one that answers the actual
complaint. The instrument grammar is entirely intact — the same measured
grid, the same hairlines meeting at right angles, the same labelled
readouts and mono telemetry strip, the same contour field — but printed
rather than illuminated, so it reads as a well-made lab manual instead of
a control room at night. The warmth comes from the stock and from a
humanist body face, not from softening the structure, which is what keeps
it out of the corporate-neutral failure mode. Against the other candidate
described as *too market-y*, this keeps every piece of the credibility and
loses the only thing that was costing it: the near-black ground that makes
a course website look like a product launch for developers.

Second choice is **Field Manual + Reading Room**, which is more distinctive
and more committed but narrower — the manila and the serif body make it
excellent for the week pages and slightly heavy on the home page. Manifesto
is the most striking of the six and the least appropriate: it is a poster
aesthetic, and a twelve-week course website has to be read, not glanced at.

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
