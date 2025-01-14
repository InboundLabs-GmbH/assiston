import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
// import netlify from "@astrojs/netlify";
const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        budgetListItem: "storyblok/BudgetListItem",
        contactSection: "storyblok/ContactSection",
        descriptionListItem: "storyblok/DescriptionListItem",
        footer: "storyblok/Footer",
        galleryItem: "storyblok/GalleryItem",
        heroSection: "storyblok/HeroSection",
        page: "storyblok/Page",
        processContainer: "storyblok/ProcessContainer",
        processItem: "storyblok/ProcessItem",
        richtext: "storyblok/RichText",
        serviceListItem: "storyblok/ServiceListItem",
        teamListItem: "storyblok/TeamListItem",
        textSection: "storyblok/TextSection",
      },
    }),
  ],
  site: "https://assiston.netlify.app/",
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  // output: "server",
  // adapter: netlify(),
});
