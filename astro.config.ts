import { defineConfig, fontProviders } from "astro/config";
import courseGraph from "astro-course-university";
import universityTheme from "astro-theme-university";
import { astromotion, deckRemarkPlugins } from "astromotion";
import { courseMeta } from "./src/course-config.ts";
import axisEngine from "./src/integrations/axis-engine.ts";
import { courseApiCollections } from "./src/site-config.ts";
import { gitOrigin, resolveDeployment } from "./scripts/pages-base.ts";

// Derived, never hardcoded --- see scripts/pages-base.ts for why.
const { site, base } = resolveDeployment(process.env, gitOrigin);

export default defineConfig({
  site,
  base,
  // Pages build as directories, so every route URL ends in a slash. Saying so
  // explicitly makes Astro emit matching links, which keeps the canonical URL
  // and what a visitor clicks in agreement --- otherwise each click costs a
  // 301 on GitHub Pages.
  trailingSlash: "always",
  // The two faces the identity is built from, registered here rather than left
  // to the theme. The theme auto-registers Public Sans + Roboto Mono when its
  // `fonts` option is left on; it is switched off below, so these are the only
  // webfonts the site loads. Both are variable-or-two-weight and self-hosted by
  // Astro's font pipeline at build time, so nothing is fetched from Google at
  // run time.
  // Only Newsreader stays on Astro's self-hosted pipeline. Anybody (display)
  // and Martian Mono (utility) load from the Google Fonts CDN instead, via
  // @import in notepad.css/decks/theme.css — Astro's font pipeline's support
  // for arbitrary variable axes (wdth in particular) is unconfirmed, while
  // the CSS2 axis-tuple endpoint is verified working for both faces.
  fonts: [
    {
      // Prose. A text serif that holds up over the long read a session page
      // asks for, and carries an optical-size axis so the same family sets
      // both small captions and body measure without looking like two fonts.
      provider: fontProviders.google(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      weights: ["200 800"],
      styles: ["normal", "italic"],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
    },
  ],
  integrations: [
    universityTheme({
      defaultLayout: "src/layouts/PageLayout.astro",
      // The whole visual identity, in one file. `brandCss` is imported after
      // the theme's own styles and deliberately unlayered, so it re-brands via
      // the --at-* tokens *and* wins structural overrides over
      // `@layer at.components` without specificity games. See the file header.
      //
      // This replaces `astro-theme-slop/slop.css`, which was three colour
      // tokens and a crest offset — the same branding package the real course
      // site wears, which is precisely the problem it was solving for someone
      // else.
      brandCss: "/src/styles/notepad.css",
      // Our own two faces instead of the theme pair. Both are above the fold
      // on every page: the body face in the first paragraph, the typewriter in
      // the nav wordmark and the h1.
      fonts: false,
      preloadFonts: ["--font-newsreader"],
      imageFormat: "avif",
      llmsTxt: true,
      // The theme owns the markdown plugin chain, so astromotion's slide
      // plugins (slide breaks, classes, backgrounds, notes, QR codes) are
      // handed to it rather than registered separately. Each one gates on
      // `.deck.mdx`, so ordinary pages are untouched.
      extraRemarkPlugins: deckRemarkPlugins,
    }),
    courseGraph({
      collections: courseApiCollections,
      timezone: "Australia/Canberra",
      course: courseMeta,
      canonicalUrl: `https://courses.slop.university/${courseMeta.code}/`,
    }),
    // Slide decks: every `.deck.mdx` under src/decks/ becomes a Reveal.js page
    // at /decks/<name>/. The theme's deck stylesheet reads the same brand
    // tokens the site does, so a deck arrives already wearing the site's
    // palette --- see src/decks/theme.css. `fontVariables` makes the deck page
    // emit the @font-face rule for Newsreader; a deck page does not load the
    // site's stylesheets, so without it the slides fall back to Georgia.
    // Martian Mono reaches the deck via its own @import in decks/theme.css.
    astromotion({
      theme: "./src/decks/theme.css",
      fontVariables: ["--font-newsreader"],
    }),
    // The velocity-driven type signature: one script, injected on every
    // route via Astro's integration hook rather than a layout edit. See
    // src/integrations/axis-engine.ts for why.
    axisEngine(),
  ],
});
