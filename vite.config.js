import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,

    rollupOptions: {
      // overwrite default .html entry
      input: "/src/firefox-extension.js",

      output: {
        // Removes hash from built file in `dist/`.
        // Easier to load from Firefox add-on debugger.
        entryFileNames: "[name].js",
      },
    },

    server: {
      // Defines the origin of the generated asset URLs during development
      origin: "http://127.0.0.1:8000",
    },
  },
});
