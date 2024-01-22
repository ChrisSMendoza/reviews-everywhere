import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,

    rollupOptions: {
      // overwrite default .html entry
      input: '/src/main.js',
    },

    server: {
        // Defines the origin of the generated asset URLs during development
        origin: 'http://127.0.0.1:8000',
    },    
  },
});


