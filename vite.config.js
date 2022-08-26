import fs from "fs/promises";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.jsx"),
      name: "Space Surveyors",
      // the proper extensions will be added
      fileName: "space-surveyors",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "react-dom",
        },
      },
    },
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@constants": resolve(__dirname, "./src/constants"),
      "@contexts": resolve(__dirname, "./src/contexts"),
      "@entities": resolve(__dirname, "./src/entities"),
      "@modules": resolve(__dirname, "./src/modules"),
      "@shapes": resolve(__dirname, "./src/shapes"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@systems": resolve(__dirname, "./src/systems"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          // allows putting JSX/TSX in JS/TS files
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.[tj]s$/ }, async (args) => ({
              loader: "tsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
  plugins: [
    react({
      babel: {
        presets: [
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
        ],
        plugins: [
          ["babel-plugin-styled-components", { namespace: "space-surveyors" }],
        ],
      },
    }),
    dts({
      outputDir: "dist/types",
      entryRoot: "src/",
      exclude: "src/vite-env.d.ts",
    }),
  ],
});
