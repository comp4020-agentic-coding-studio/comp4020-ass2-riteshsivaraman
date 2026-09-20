import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";

// Display copy only — the `sessions` content collection, its `/sessions/`
// URL path, and every file/folder under it keep the original name. "Tutorial"
// is what a marker or a student actually expects on the page; renaming only
// the label costs nothing that "Session" was buying, since the satire lives
// in the content, not the nav.
export const sessionLabels = {
  singular: "Tutorial",
  plural: "Tutorials",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  // The branding package is deliberately *not* spread. It carries the Slop
  // horizontal lockup and crest, and the theme renders a logo image in the nav
  // whenever one is supplied --- which is the single most recognisable piece of
  // the institutional template this site is trying not to look like. Omitting
  // `logo` makes the theme fall back to a text wordmark, which
  // src/styles/notepad.css then types out.
  //
  // The favicon is kept: it is a 16px institutional mark in a browser tab, and
  // the fiction is still that Slop University published this.
  favicon: slopBranding.favicon,
  name: "Slop University",

  // Flat and complete on purpose: this alone guarantees every page a marker
  // opens is reachable in one click, whatever the homepage does with the
  // semester narrative.
  links: [
    { text: "Lectures", href: "/lectures/" },
    { text: `Weekly ${sessionLabels.plural}`, href: "/sessions/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "Glossary", href: "/glossary/" },
    { text: "People", href: "/people/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  // No social card: the gateway this course provisions exposes only chat
  // models, so there is no image generation here and the site commits to a
  // deliberate type-and-CSS treatment instead. `socialImage` is optional.
});
