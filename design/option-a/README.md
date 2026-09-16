# Option A — Kinetic Manifesto

Three standalone pages: `index.html` (home), `inner.html` (one week, dense),
`deck.html` (eight-station lecture deck). Open any of them directly from
disk; there is no build step and no local asset. Fonts and two libraries come
from CDNs, everything else is inline.

## The aesthetic, in one paragraph

Typography is not set *in* the layout here — it **is** the layout. The page is
a protest poster held to Swiss discipline: a bone ground, near-black ink,
exactly one high-voltage vermilion, hard 1.5px rules doing all the work that
borders, shadows, radii and cards would normally do, and nothing on the page
that is not type, rule, or a flat accent field. Display lines run at absurd
scale and bleed off the right edge on purpose; beneath them, tight 34ch
columns of small serif text are used as **texture** as much as prose, so the
composition reads as a printed sheet before it reads as a website. The single
idea that ties it together is that the type is *alive*: the weight and width
axes of the display face are wired to how fast you are reading, so the page
is heavy and narrow when you move and light and wide when you stop. There are
no cards, no gradients, no icon set, no rounded corners, and no second accent.

## Type stack

Three roles, three faces, all variable, all from Google Fonts.

| Role | Face | Axes used |
|---|---|---|
| Display (`.d`) | **Anybody** | `wght 100–900`, `wdth 50–150`, italic |
| Body | **Newsreader** | `opsz 6–72`, `wght 200–700`, italic |
| Utility / data (`.m`) | **Martian Mono** | `wdth 75–112.5`, `wght 300–700` |

Anybody was chosen over the usual grotesque-with-a-width-axis suspects
because its 50–150 width range is wide enough that an axis animation is
legible as *movement* rather than as a rendering wobble — the signature does
not work on a face with a timid `wdth` range. Newsreader carries an optical
size axis, so the same family sets both the 11px captions and the 20px
measure columns without looking like two fonts. Martian Mono is the only
place the page admits to being a screen.

## Palette

Four values. That is the whole palette.

| Token | Hex | Role |
|---|---|---|
| `--bone` | `#EDEBE4` | ground |
| `--ink` | `#14110F` | ink, every rule, and the inverted sections' ground |
| `--ink2` | `#5A544E` | secondary text only (metadata, captions) |
| `--volt` | `#C92000` | the single accent: fields, live states, the counter |

`--rule` is an alias of `--ink`. There is no border colour, no surface
colour, no muted-background colour, no success/warning pair.

## Dynamic behaviour inventory

### The signature — velocity-driven type axes
`index.html`, `inner.html`. **Hand-rolled vanilla; Lenis 1.1.13 only as the
velocity source.** Scroll velocity is normalised (`min(1, vel/70)` = full
tilt), smoothed asymmetrically — attack `0.34`, release `0.055`, so the type
snaps into motion and relaxes out of it — and written once per frame to two
custom properties on `:root`:

```
--kv-wght : 300 → 900   (rest → full tilt)
--kv-wdth : 128 → 56
```

Every `.d` element consumes those in `font-variation-settings`, so one
rAF-driven write animates the entire typographic hierarchy at once. A small
mono HUD prints the live axis values, which makes the mechanism visible
rather than subliminal.

**Its second channel: per-character pointer proximity.** Headlines are split
into per-glyph spans (`splitChars`) and each glyph's axes are pushed by
distance to the cursor, falling off as `(1 − d/R)^2.2` with `R = 300px`, so
the cursor drags a bulge through the word. Gated behind
`(hover:hover) and (pointer:fine)` — it does not run on touch.

**Its mobile degradation, stated as a decision:** pointer proximity is
desktop-only, so on a phone the signature is carried by velocity alone. That
channel is if anything *stronger* on touch, because flick-scrolling produces
higher peak velocities than a wheel; observed live at 390 (HUD reading
482/106 → 573/95 → 643/87 across one flick). Nothing is faked and nothing is
disabled — one of the two inputs simply does not exist on the device.

### index.html
- **Pinned horizontal act** — twelve weeks as a filmstrip scrubbed by
  vertical scroll. **GSAP 3.12.5 + ScrollTrigger** (`matchMedia` ≥901px, `pin`,
  `scrub`). The section is exactly `100vh` with the measured masthead height
  reserved at the top, so the pin fills the frame instead of floating.
  **Below 900px it becomes a native `scroll-snap-type: x mandatory` strip**
  and the caption swaps from "keep scrolling down" to "swipe sideways" — the
  instruction changes with the mechanism.
- **Sticky rotating statements** — four statements on a pinned stage with a
  position indicator. GSAP ScrollTrigger.
- **Text scramble / resolve** — headline glyphs resolve over 26 frames on
  entry. Vanilla, with a run token so scrubbing back and forth cannot start
  two loops writing competing glyphs to one node.
- **Accent-field wipe** — `scaleX` mask reveal of the vermilion plate behind
  a word. IntersectionObserver + CSS transform.
- **Reading progress bar** and a live week counter. Vanilla.
- **Smooth scroll** — Lenis 1.1.13.

### inner.html
No GSAP at all. **Lenis** for smooth scroll and velocity, plus vanilla for:
- **Section rail** that tracks the heading crossing `innerHeight * 0.32`, and
  auto-scrolls itself in *both* directions when it overflows on a phone.
- **Checklist counter** — `#ckCount` with a `data-all` state on completion.
- The velocity→axes signature and its HUD, as above.

The density test is passed by column structure, not by cards: the three
streams are bands separated by full-bleed rules, each opened by an enormous
A/B/C glyph in the gutter, with the prose set in multi-column tight measure.
On a phone the glyph goes solid vermilion and its width axis opens to 122 —
a 1.5px outline at `wdth 58` collapses into an unreadable domino at that
size, so the desktop treatment is deliberately not scaled down.

### deck.html
**Zero JavaScript libraries.** Vanilla + CSS only.
- **One continuous ribbon** of eight stations moved by a single CSS
  transform — arrow keys, `Home`/`End`, and the on-screen controls.
- **`[O]` overview** — the *same* ribbon element scaled `1/N` about
  `transform-origin: 0 50%`, so the whole deck becomes a filmstrip you can
  click into. No second DOM tree, no thumbnail rendering.
  **On a phone 1/8 puts the labels at ~8px, so it degrades to a 3-up context
  strip centred on the live station**, caption swapped to "nearby stations".
- **Elastic axis landing** — each station's headline overshoots
  `wght 900/wdth 56 → 250/145 → 340/120` on arrival. Pure CSS `@keyframes`,
  no JS timing.
- **Progress indicator** — a tick bar plus `nn / 08`, the live station
  inverted to the vermilion plate in both the bar and the overview.
- Off-screen stations carry `inert`, so they leave both the tab order and the
  accessibility tree.

### Libraries, total
GSAP 3.12.5 + ScrollTrigger (index only), Lenis 1.1.13 (index, inner). Google
Fonts. Nothing else. The deck ships none.

### Reduced motion
`prefers-reduced-motion: reduce` is handled per page, not globally stubbed:
transitions drop to `.001ms`, the axes freeze at a composed static value
(`wght 380 / wdth 112`), the accent field renders already-revealed, the
pinned horizontal act becomes a plain scrollable strip, the pinned rotator
un-pins to normal document flow, and the deck's landing keyframe is removed.
Every page remains fully legible and fully navigable with all motion gone —
the layout does not depend on an animation having run.

### Debug hooks
`window.__kin` (index, inner) exposes the Lenis instance and `axes(w, x)` to
force axis values; `window.__deck` exposes `go(k)`, `zoom(on)`, `state()`.
These exist because the verification pass needed to force end states; they
would be removed on port.

## Port risks

**Honest about what would be hard, and what an audit would flag.**

### Hard to rebuild in Astro
1. **The velocity engine wants to be one module, not an island.** It is
   currently an inline rAF loop per page that owns Lenis. In Astro it has to
   become a single client-side script with `is:inline` or a client directive,
   instantiated once, surviving view transitions if those are used — and the
   custom properties it writes must be on `:root` in the *global* stylesheet,
   not scoped by Astro's component CSS, or `font-variation-settings` reads
   stale values. **Astro's scoped-style hashing is the specific trap here.**
2. **ScrollTrigger pinning fights islands and layout shift.** The pinned act
   measures its own height at mount; if any island above it hydrates late or
   a font swaps, the pin start is computed against the wrong document height
   and the scrub desynchronises. It needs `ScrollTrigger.refresh()` after
   fonts load and after every hydration, plus real content (twelve weeks,
   not three) which changes the track width.
3. **`splitChars` is a DOM mutation on server-rendered markup.** Per-glyph
   spans are generated at runtime, which means the SSR HTML and the hydrated
   DOM differ, and any framework that reconciles will either wipe the spans
   or warn. It also makes every character a legal break opportunity, which is
   why the mobile hero is locked to `white-space: nowrap` and sized to fit
   instead of reflowing — that constraint has to travel with the component or
   the headline breaks mid-word.
4. **The masthead-height token.** A JS-published `--navh` is measured on load
   and resize. A real site with a responsive or collapsing nav needs a
   `ResizeObserver`, not a `resize` listener.
5. **Three CDN dependencies would become three real dependencies**, and GSAP
   ScrollTrigger is not free — roughly 70KB gzipped for two effects on one
   page. Worth questioning whether the rotator survives that trade.

### Would likely fail, or narrowly pass, an axe audit
1. **Opacity-blended small text on the ink ground.** Body copy on inverted
   sections is `rgba(237,235,228,.78)` over `#14110F`. That computes safely
   over a *known* ground, but axe evaluates it as a colour pair and any
   nested translucency compounds. **This is the most likely single failure and
   the first thing to replace with a solid token on port.**
2. **The deck overview's dimmed stations** render at `opacity:.34`, which puts
   their body text well under 3:1. They are decorative-at-that-moment
   context, but axe cannot know that — they need `aria-hidden` while zoomed,
   or the dimming needs to be a solid colour swap rather than opacity.
3. **The HUD is live-updating text with no announcement policy.** It changes
   many times a second. It must be `aria-hidden="true"`, not a polite live
   region, or a screen reader is unusable — currently it is visual-only by
   construction, but nothing enforces that.
4. **Custom keyboard handling on the deck** owns arrow keys globally. That is
   fine for a deck, but the region needs an explicit role and an accessible
   name, and the key handling should be scoped to focus within it rather than
   to `document`.
5. **The horizontal scroll act** is a scroll region; the native-strip variant
   needs `tabindex="0"` and a label to be keyboard-reachable, and the pinned
   variant hijacks scroll distance, which some audits treat as a
   `2.2.2 Pause, Stop, Hide` concern even though it is user-driven.
6. **`--ink2` (`#5A544E`) on bone** is about 6.4:1 — fine for body, but it is
   used at 11px in places. Above the 4.5:1 floor, but small.

### What could not be verified in this environment
Motion **timing** and scrub feel. Chrome throttles `requestAnimationFrame` to
roughly 1fps in an occluded tab, so every JS-driven animation had to be
photographed at a forced end state rather than mid-flight. Static
composition, layout at both marking viewports, the axis engine's live output,
the horizontal act mid-pin, and both deck modes were all seen and confirmed;
easing curves and durations were not. They need one pass in a foreground
window before anyone signs off on how it *feels*.
