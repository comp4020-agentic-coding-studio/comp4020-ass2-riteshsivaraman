# Option C — Tactile Stage

Three standalone pages. Open any of them directly from disk; the only external
requests are Google Fonts and four CDN scripts. No build step, no local assets,
no raster images anywhere — every texture is generated.

- `index.html` — home
- `inner.html` — Week 07 session sheet (the content-dense page)
- `deck.html` — eight-panel lecture deck

## The aesthetic

A paper toy theatre, printed in two inks. The site behaves like a set of cut
sheets laid on a warm bone ground and photographed under one aimed lamp: flats
with visible deckled edges, ruled and gridded stock, torn gaffer tape holding
the navigation down, rubber stamps that have bled slightly into the fibre, and
handwriting in the margins where a person argued with the page. Colour is
handled the way a two-colour risograph handles it — flat orange and flat teal,
nothing between them, and where the two overlap they multiply into a third
darker colour rather than blending. That constraint is what keeps it from
looking like a digital illustration: riso has no gradients, no glows and
essentially no shadows, so contact shadows here are tight, short-offset and
warm-brown rather than large soft halos, and every place that wanted an
airbrushed transition got a hard-edged colour band instead. Depth comes from
stacking real layers in an explicit order, not from blur.

## Type stack

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Bricolage Grotesque** (var, 300–800, wdth 75–100) | Condensed at large sizes for the poster headings and the giant week numeral |
| Body | **Newsreader** (var, opsz 6–72) | Optical sizing on; the whole point of the dense page |
| Mono | **Courier Prime** | Every stamp, slug, label, run-sheet and caption — the typewriter layer |
| Hand | **Caveat** | Marginal annotation only, always in teal, never load-bearing |

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--oat` | `#F4ECDC` | Ground, and the front-most cut sheets |
| `--manila` | `#E3D0A6` | Second stock: folders, tape, backdrop lower band |
| `--kraft` | `#C4A878` | Board: stage floor, heaviest stock, cut edges |
| `--ink` | `#211B15` | Text and every hard cut line |
| `--ink-soft` | `#4A3F33` | Slugs and captions |
| `--orange` | `#FF5A1F` | First ink |
| `--teal` | `#14625F` | Second ink; also the focus ring |

Highlight ink on paper is `#FBF5E8` (the lit face of a cut sheet). Overlaps are
`mix-blend-mode: multiply` — never a third hand-picked colour.

## Dynamic behaviour, and what drives each

### index.html

| Behaviour | Driven by |
| --- | --- |
| **Signature move.** A pinned proscenium that assembles as you scroll: two wings hinge in, hill flats slide up, the arch drops, and three stamps land in sequence. Scrubbed against scroll, so scrolling back takes the set apart again. | GSAP `ScrollTrigger` (pin + scrub) inside `gsap.matchMedia()` |
| "Curtain up" on load — the title card and stamps arrive before any scrolling | GSAP timeline, deliberately separate from the scrub timeline so the hero is never empty at scroll 0 |
| Lamp that tracks the pointer across the stage, moving the pooled highlight | Vanilla pointer listener writing `--lx/--ly`, rAF-throttled; armed only under `(pointer: fine)` |
| Three stream flats stitched together with drawn thread | Rough.js paths, drawn on entry via ScrollTrigger |
| Registration marks and rules that draw themselves on | CSS `stroke-dashoffset` with `pathLength="100"`, triggered by ScrollTrigger |
| **The weight tray.** Three physical counters (45 / 20 / 35) fall into an open tray. Drag one over the lip and the mark visibly stops adding up — the readout drops and stamps "Short". Buttons tip and refill it. | Matter.js engine + `MouseConstraint`; invisible bodies with DOM counters riding them; plain rAF loop with a clamped delta; drop gated on an `IntersectionObserver` so the one bit of motion that explains the section has not finished before anyone looks at it |
| Nav tapes lift away on downward scroll, return on upward scroll or on `focusin` | Vanilla scroll listener + CSS transform |
| Smooth scrolling | Lenis 1.0.42, registered as a ScrollTrigger scroller proxy |

### inner.html

| Behaviour | Driven by |
| --- | --- |
| One filing folder with three tabs; pulling a tab physically turns the leaf (`rotateY` ±84°) rather than swapping two parallel cards | GSAP; ARIA `tablist`/`tab`/`tabpanel` with roving tabindex |
| Checklist ticks that draw on when checked, with an off-register stamp | CSS only (`stroke-dashoffset`), no JS |
| Sticky ink-fill gauge tracking reading progress | Vanilla scroll listener; `role="status" aria-live="polite"` |
| Hand-drawn bracket around the taped activity slip | Rough.js |
| Section reveals | GSAP ScrollTrigger |
| Nav tapes hide on downward scroll | Same as home |

### deck.html

**No animation library at all** — CSS 3D transitions and about 200 lines of
vanilla JS. Eight panels form one continuous concertina strip in 3D: alternate
panels tilt ±34°, the inter-centre step is `panelSize × cos(34°)`, and the strip
counter-rotates about the active panel's centre so the panel you are reading is
always square to the camera while its neighbours fall away into the fold. The
progress indicator is that same fold drawn flat as a zig-zag, with traversed
segments inked orange. Keyboard: arrows, PageUp/PageDown, Home, End, Space.
Below 860px wide (or tighter than 9:11) the fold turns through the other axis.
Panel changes are announced through a polite live region.

## Procedural texture — how each effect is made

- **Grain** — SVG `feTurbulence` (fractalNoise), one fixed overlay per page at
  7.5% opacity, `mix-blend-mode: multiply`. Kept low deliberately: heavier grain
  behind Newsreader at body size starts eating the thin strokes.
- **Deckled paper edges** — `feTurbulence` + `feDisplacementMap` (`#deckle`),
  applied to the sheet's backing layer, never to a layer carrying text.
- **Rubber-stamp ink spread** — the same pairing at a different scale
  (`#inkspread`) on the stamp borders.
- **Halftone screens** — CSS `radial-gradient` dots with a scaled `mask-size`.
- **Ruled / gridded / corrugated stock** — `repeating-linear-gradient`.
- **Torn tape** — a 34-point `clip-path: polygon()` with a jittered edge.
- **Punched spine** — flex column of discs with inset shadows.

## Accessibility

- `prefers-reduced-motion: reduce` removes the pin and the scrub, drops every
  reveal to a plain state change, stops the concertina transition, stills the
  lamp, and leaves the physics section as a static tray with its buttons intact.
- Focus ring is a 3px teal outline with a 3px offset, never removed. The nav
  cannot be tabbed into while hidden — a `focusin` brings it back first.
- Everything reachable by drag is also reachable by button, and every readout
  that changes as a side effect of interaction sits in a polite live region.
- Skip link on every page; the folder tabs are a real ARIA tablist.
- Smallest type on any page is 11px, and only on tracked uppercase mono slugs.
  No body copy below 19px.
- Verified at 390×844 and 1920×1080: no horizontal document overflow on any
  page, and no text sitting under the fixed nav.

## Port risks — honest version

**The pinned scene is the expensive part.** On the home page the proscenium is
one `ScrollTrigger` with `pin: true` and `scrub`, and pinning is the single
hardest thing to move into a framework page. ScrollTrigger pins by taking the
element out of flow and inserting a spacer of measured height, so it needs the
final laid-out height of the page before it can compute anything. In an Astro
page that means: the trigger has to be created after fonts load (a font swap
changes the measured height and silently desynchronises the pin from the
scroll), after any island hydrates below it, and it has to be re-measured on
every resize and on view transitions. `ScrollTrigger.refresh()` has to be wired
to the navigation lifecycle or the second page visit gets a pin spacer sized for
the previous page. It also fights any other library that owns the scroller —
here Lenis is registered as a scroller proxy, and that proxy has to be
registered before the first trigger is created or the pin measures the wrong
scroller. Budget a day for the pin alone, and expect the first two attempts to
produce either a jump at the pin boundary or a page whose total height is wrong
by exactly the pinned section's height. If that budget does not exist, the
honest fallback is the mobile branch already written here: the same flats
revealed as discrete steps, no pin, no scrub. It loses the assembly but nothing
breaks.

**The draggable counters do nothing for a keyboard user.** Matter.js
`MouseConstraint` is pointer-only. There is no tab stop on a physics body, no
focus ring possible on something whose position is decided by a solver, and
arrow-key nudging a rigid body is not a real interaction. The mitigation here is
that the two things dragging can achieve — emptying the tray and refilling it —
are also plain buttons, and the total is announced politely, so a keyboard or
screen-reader user gets the *point* of the section without the physics. But that
is a substitute, not parity: they never see a counter leave. An axe audit would
pass this (the counters are decorative `div`s with no interactive role and no
accessible name claimed, and the informative content is in the readout and the
weight list beside it), which is precisely the problem — it passes while
offering a materially poorer interaction. If this ships, the counters should
carry a visible note that the buttons are the equivalent path, and the physics
should be treated as enhancement over a section that already works without it.

**Smaller ones.** The concertina relies on `preserve-3d` surviving
`overflow: hidden`, which is why the clip lives on `.viewport` and the
perspective on a separate `.camera` — collapse those two into one element and
Chrome flattens the whole fold. SVG filters are the main paint cost, so grain is
one fixed overlay per page rather than per sheet; adding a filter to more layers
is where frame rate goes. `preserveAspectRatio="none"` on the arch stretches
stroke widths non-uniformly, handled with `vector-effect="non-scaling-stroke"`
— any new stretched SVG needs the same treatment. And the panel bodies in the
deck scroll internally when copy overruns the fold at 390px, so long slide copy
degrades to a scroll rather than resizing; a real deck should cap slide word
count instead.

## What the design audit changed

The three pages were built from the brief plus judgement, then audited against
the `frontend-design` and `web-design-guidelines` skills after the fact. Most
of the quality floor was already met — no `transition: all`, no `outline: none`,
`:focus-visible` throughout, `text-wrap: balance`, `aria-hidden` on every
decorative SVG, tabular figures on the counters. Six things were genuinely
wrong rather than merely unaudited:

- **Heading levels skipped.** Both colophons jumped `h2` → `h4`. Four headings
  on each of two pages moved to `h3`; the outline is now unbroken on all three.
- **No Scene I.** The section slugs read Prologue, Scene II, Scene III. A
  theatrical numbering that skips its own first scene is a decorative device
  pretending to be structural — exactly what "structure is information" warns
  about. Renumbered so the labels describe the actual running order.
- **`color-scheme` was unset**, so form controls and scrollbars could render
  dark against a bone ground. Now `light` on all three.
- **`scroll-margin-top` was missing on the home page** (the week sheet had it),
  so an in-page anchor jump landed under the fixed nav tapes.
- **Straight apostrophes in visible copy** — twelve of them, in a page whose
  whole claim is that it was set rather than typed. Now curly. CSS and JS
  comments were left alone.
- **One accessory too many.** The pointer parallax slid five paper flats and
  the marquee. Cut. Cut paper pinned to a stage should not drift under the
  cursor, and it argued with the conceit while firing six GSAP tweens and a
  `getBoundingClientRect()` on every `pointermove`. The aimed lamp stays — that
  is the "set photographed under a real light" the direction asked for — with
  the rect hoisted out of the move handler and the paint coalesced into one rAF.

### Deliberately departed from

- **The warm-cream ground.** `frontend-design` flags "cream background near
  #F4F1EA with a high-contrast serif and a terracotta accent" as an AI default,
  and oat `#F4ECDC` + Newsreader + vermilion `#FF5A1F` is close to it. Kept: the
  brief pins the direction ("warm ground — bone, manila, oat … one or two
  saturated inks like a two-colour risograph"), and the skill's own rule is that
  the brief's words win. What keeps it off the default is that nothing here is a
  flat cream card deck — the ground is ruled, gridded and corrugated stock,
  the second ink overprints by `multiply`, and the palette carries a teal the
  default look does not have.
- **Sentence-case headings.** The guidelines ask for Title Case. Rejected: the
  copy is in an Australian editorial register, and Title Case headings over
  sentence-case mono slugs would read as two voices on one sheet.
- **Numbered markers were kept in two places** after checking they encode a real
  sequence: the week sheet's 01–05 is a chronological run ending at a Friday
  deadline, and the deck's 01–08 is fold order. Neither is decoration.

Every page changed in this pass was re-checked at 390×844 and 1920×1080: no
horizontal document overflow, no type below 11px, no heading-level skips, and
the earlier fixes (de-glossed contact shadows, `minmax(0, 1fr)` grids, the
retracting nav tapes, the deck caption inside the controls bar) all intact.

**Still unverified:** the Matter.js tray has not been watched physically
dropping and throwing. Backgrounded Chrome tabs suspend `requestAnimationFrame`
and `IntersectionObserver`, so the engine cannot be observed running from this
harness. It has been verified by parts — bodies, constraint, render loop, and
the readout — but not as a whole in motion.
