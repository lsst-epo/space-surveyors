import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "space-surveyors": resolve(__dirname, "../dist/space-surveyors.js"),
    },
  },
  plugins: [react()],
});
