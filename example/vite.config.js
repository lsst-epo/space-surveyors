import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const embeddedHtmlFallbackPlugin = {
  name: "embedded-html-fallback",
  configureServer(server) {
    server.middlewares.use("/embedded", (req, res, next) => {
      req.url += ".html";
      next();
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: new URL("index.html", import.meta.url).pathname,
        embedded: new URL("embedded.html", import.meta.url).pathname,
      },
    },
  },
  plugins: [react(), embeddedHtmlFallbackPlugin]
});
