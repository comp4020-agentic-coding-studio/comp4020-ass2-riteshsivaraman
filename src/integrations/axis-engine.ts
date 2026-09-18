import type { AstroIntegration } from "astro";

// Registers the velocity-axis engine on every rendered page via Astro's
// `injectScript` hook, rather than editing a layout. Neither PageLayout.astro
// (MDX pages only) nor ContentLayout/BaseLayout (owned by
// astro-theme-university, in node_modules) is a single edit point that
// reaches every route, so the integration hook is the one mechanism
// guaranteed to run site-wide. Stage 'page' (not 'head-inline') because the
// script needs `import Lenis from "lenis"`, which only Vite-processed script
// stages resolve.
export default function axisEngine(): AstroIntegration {
  return {
    name: "axis-engine",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        injectScript("page", 'import "/src/scripts/axis-engine.client.js";');
      },
    },
  };
}
