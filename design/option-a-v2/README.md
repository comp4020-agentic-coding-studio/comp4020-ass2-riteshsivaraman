# Option A · v2 — “REGISTER”

The manifesto disciplined into an institution. Two standalone pages,
`index.html` (home) and `inner.html` (week 07, dense). No build step, no local
assets; Google Fonts is the only CDN. There is no deck — `design/option-a/deck.html`
remains the reference for that.

## The direction in one paragraph

Option A was a poster that happened to carry a syllabus. This is a syllabus that
happens to be well set. The organising device is the **register**: twelve weeks in
sequence, as a real `<table>` with dates, the shared lecture, three parallel stream
columns, what is due, and what is already done. That table is the spine of the home
page and reappears on the inner page as a twelve-cell locator strip, so the answer to
“what am I doing in week seven” is on screen within one scroll rather than after
three. Numbering earns its place because the content genuinely is a sequence. The
hard 1.5px rules, the absence of cards, radii, shadows and gradients, and the
confidence of the display face all survive; the kinetic engine survives too, but
demoted from the page’s ambient behaviour to punctuation on two elements.

## Palette

Off vermilion, which is a flagged AI default. The accent is now a stamped indigo —
the colour of an official mark on paper — with one status-only green so the register
can say “complete” with more than a word.

| Token | Hex | Role |
|---|---|---|
| `--bone` | `#EAE8E0` | ground |
| `--ink` | `#14120F` | ink, every rule, inverted grounds |
| `--ink2` | `#57534C` | secondary text, captions, metadata |
| `--stamp` | `#22309B` | the accent: current week, section marks, due flags |
| `--moss` | `#4C6420` | status only: work already complete |
| `--tint` | `#DEDCD3` | the one surface fill (row hover, callouts) |

Measured contrast floor across both pages: **5.43:1**, computed in-browser with the
full alpha stack composited. No text pair falls below WCAG AA.

## Type stack

Deliberately the same three families as option A — this is the *disciplined* variant,
so the material is unchanged and only the handling differs.

| Role | Face | How it is used now |
|---|---|---|
| Display | **Anybody** | `wdth` held between 78 and 96 instead of 50–150. No line runs past 18ch. |
| Body | **Newsreader** | `opsz` 16–22, measures capped at 46–66ch. |
| Data | **Martian Mono** | Register headers, dates, weights, status. `tnum` everywhere numbers align. |

## What changed from option A, and why

1. **Structure now encodes course information.** The home page is a twelve-row
   register, an assessment ledger whose weights are shown summing to 100 in a
   proportional bar, and three ruled stream bands. Editorial rhythm is gone as the
   organising logic; sequence, date, parallel stream and status are the logic.
2. **Display sizes came down and measures tightened.** The hero moved from bleeding
   off the right edge to `max-inline-size:18ch`; body copy is capped at 46–66ch.
3. **The axis range was cut by roughly four fifths.** `wght` 300→900 became 420→760;
   `wdth` 128→56 became 96→78. The motion now reads as the type tightening under
   speed rather than as a font stress test, and it is legible at every point in the
   range.
4. **The kinetic engine is punctuation, not ambience.** Only two things consume the
   axes: the single hero word and the week ordinals. Every other display element is
   set at a fixed, chosen weight and width.
5. **GSAP and Lenis are gone.** Velocity comes from native `scrollY` in a plain rAF
   loop. Three CDN dependencies became one (fonts), which removes most of option A’s
   port risk with no visible loss.
6. **The register is a real table.** Semantic `<thead>`/`<th scope="col">`, a
   `<caption>`, and at ≤900px each row restacks into a labelled record via
   `data-l` attributes rather than being hidden or horizontally scrolled.

## How the reflow bug was fixed

Option A’s bug: the `wdth` axis swung 128→56, a 2.3× change in glyph advance. Any
heading allowed to wrap re-wrapped from two lines to one, its block height changed,
and everything below it jumped. Nothing reserved the space.

Three locks, all of which are needed:

1. **`white-space: nowrap` on every kinetic element.** The line count is fixed at
   one. A width-axis change now *physically cannot* alter it — this is the load-bearing
   lock, because it removes the failure mode rather than making it rarer.
2. **`min-block-size` expressed in `em`** (`1.04em`, matching `line-height:1.04`).
   The reserved height is derived from the line-height ratio, which is independent of
   glyph widths, so the box measures identically at every axis value even before the
   text is laid out.
3. **A clamped range plus `contain: layout`.** At `wdth` 96 — the widest the axis ever
   goes — the longest kinetic string is still narrower than its column, so nowrap
   cannot cause overflow instead of reflow. `contain: layout` stops any residual size
   change escaping the element.

**Verified by scrubbing, not by reasoning.** A Playwright script drives
`window.__kv.axes(w, x)` through 21 steps across the full range, forcing a reflow at
each step and recording the kinetic element’s height, the `top` of the element
immediately below it, and `document.scrollHeight`. At both 1920×1080 and 390×844, on
both pages, all three are **single-valued across all 21 samples** — for example
`index.html @ 1920`: `kinH [95.67]`, `nextTop [476.39]`, `docH [3212]`. Measuring the
text advance separately with a `Range` confirms the type really is moving (7.3% on the
hero, 3.5% on the week ordinal) while the geometry does not.

## Port risks

- **`--kv-*` must live on `:root` in a global stylesheet.** Astro’s scoped-style
  hashing will otherwise leave `font-variation-settings` reading a stale value. This
  was option A’s single worst trap and it is unchanged here.
- **One rAF loop, instantiated once.** Two pages each owning a loop is fine as a
  static demo; in Astro it becomes one `is:inline` script that must survive view
  transitions.
- **The responsive register uses `data-l` for its stacked labels.** The label text is
  duplicated between `<th>` and the attribute. In a real build these must come from one
  source or they will drift.
- **`tr[data-now]` uses `box-shadow: inset` for the current-week marker.** Borders on
  table rows are unreliable with `border-collapse`; this works but is worth a comment
  so nobody “fixes” it into a border.
- **The sticky `<thead>` is offset by a hard-coded `top: 43px`** matching the masthead.
  A responsive or collapsing nav needs that published as a measured custom property
  with a `ResizeObserver`.
- **`:has()` is used for the checklist focus ring.** Fine in Chrome at marking time;
  needs a fallback if the real target list is broader.
- **Not verified:** motion *feel* — easing, attack and release timing — was only ever
  observed at forced end states, never mid-flight in a foreground window.
