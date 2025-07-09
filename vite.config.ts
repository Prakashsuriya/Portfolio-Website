import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa",
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "ui-vendor": ["framer-motion"],
          "three-vendor": ["@react-three/fiber", "@react-three/drei"],
          "icons-vendor": ["lucide-react"],
          // Split large UI components
          components: [
            "./client/components/ui/button.tsx",
            "./client/components/ui/card.tsx",
            "./client/components/ui/badge.tsx",
          ],
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split("/")
                .pop()
                .replace(".tsx", "")
                .replace(".ts", "")
            : "chunk";
          return `assets/${facadeModuleId}-[hash].js`;
        },
      },
    },
    chunkSizeWarningLimit: 500,
    // Enable source maps for better debugging in production
    sourcemap: false,
    // Minimize CSS
    cssCodeSplit: true,
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
