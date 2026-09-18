// The velocity-driven type signature. One module, one Lenis instance, one
// rAF loop, writing --kv-wght / --kv-wdth to :root so every `.kv` element
// animates off a single source of truth. Consumers never touch Lenis.
//
// Width range is 78-96, not the original design's 56-128: the full geometry
// lock (HANDOFF-port.md) narrowed it after two defects (reflow glitch,
// stretched-type readability) traced to the wider swing. `.kv` elements
// additionally reserve their box in `em` and set `white-space: nowrap` in
// CSS, so they must be short, hand-placed strings — never bound to arbitrary
// content-authored headings.
import Lenis from "lenis";

const REST_WGHT = 380;
const REST_WDTH = 112;
const MAX_WGHT = 900;
const MIN_WGHT = 300;
const MAX_WDTH = 96;
const MIN_WDTH = 78;
const VELOCITY_CEILING = 70;
const ATTACK = 0.34;
const RELEASE = 0.055;

let engine = null;

function initEngine() {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    root.style.setProperty("--kv-wght", String(REST_WGHT));
    root.style.setProperty("--kv-wdth", String(REST_WDTH));
    return null;
  }

  const lenis = new Lenis({ autoRaf: false });
  let smoothed = 0;
  let rafId = null;

  lenis.on("scroll", ({ velocity }) => {
    const target = Math.min(1, Math.abs(velocity) / VELOCITY_CEILING);
    const rate = target > smoothed ? ATTACK : RELEASE;
    smoothed += (target - smoothed) * rate;
  });

  function tick(time) {
    lenis.raf(time);
    const wght = Math.round(MIN_WGHT + (MAX_WGHT - MIN_WGHT) * smoothed);
    // Width axis inverts: full tilt narrows, rest widens.
    const wdth = (MAX_WDTH - (MAX_WDTH - MIN_WDTH) * smoothed).toFixed(2);
    root.style.setProperty("--kv-wght", String(wght));
    root.style.setProperty("--kv-wdth", String(wdth));
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);

  return {
    lenis,
    destroy() {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    },
  };
}

function initPointerBulge() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canHover === false) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const RADIUS = 300;
  let pointerX = -9999;
  let pointerY = -9999;
  let rafId = null;

  function splitChars(el) {
    if (el.dataset.kvSplit) return;
    el.dataset.kvSplit = "true";
    const text = el.textContent ?? "";
    el.textContent = "";
    for (const ch of text) {
      const span = document.createElement("span");
      span.textContent = ch === " " ? " " : ch;
      span.style.display = "inline-block";
      span.style.fontVariationSettings = "inherit";
      el.append(span);
    }
  }

  document.querySelectorAll(".kv-bulge").forEach(splitChars);

  function onMove(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }

  function frame() {
    document.querySelectorAll(".kv-bulge > span").forEach((span) => {
      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(cx - pointerX, cy - pointerY);
      const falloff = dist >= RADIUS ? 0 : (1 - dist / RADIUS) ** 2.2;
      const wght = Math.round(MIN_WGHT + (MAX_WGHT - MIN_WGHT) * falloff);
      const wdth = (MIN_WDTH + (MAX_WDTH - MIN_WDTH) * (1 - falloff)).toFixed(2);
      span.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`;
    });
    rafId = requestAnimationFrame(frame);
  }

  window.addEventListener("pointermove", onMove, { passive: true });
  rafId = requestAnimationFrame(frame);

  return () => {
    window.removeEventListener("pointermove", onMove);
    if (rafId) cancelAnimationFrame(rafId);
  };
}

function boot() {
  engine?.destroy();
  engine = initEngine();
  initPointerBulge();
}

// Runs once per full navigation, and again after every Astro view
// transition — the engine is not an island, so it has to re-arm itself on
// astro:page-load rather than relying on component hydration.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
document.addEventListener("astro:page-load", boot);
