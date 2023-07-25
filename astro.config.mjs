import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  })]
});
