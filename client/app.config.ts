import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "netlify",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/about", "/coming-soon", "/terms-of-service"]
    }
  }
});
