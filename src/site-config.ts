import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";

// Plain labels, matching the collection and the URL. An in-voice renaming was
// considered and dropped: the satire in this course is carried by the content,
// and a marker hunting for the weekly schedule should never have to translate
// the navigation to find it.
export const sessionLabels = {
  singular: "Session",
  plural: "Sessions",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
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
