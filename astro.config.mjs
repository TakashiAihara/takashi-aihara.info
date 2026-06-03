import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import { defineConfig } from "astro/config";

// sitemap integration is temporarily disabled because @astrojs/sitemap@2.0.2
// passes an absolute destinationDir to sitemap@7.1.3 which rejects it.
// Re-enable after the Astro upgrade in #13.

// https://astro.build/config
export default defineConfig({
  site: "https://takashiaihara.site",
  integrations: [mdx(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  })]
});
