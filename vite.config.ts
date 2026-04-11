import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  clearScreen: false,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            id.includes("@tanstack/react-query")
          ) {
            return "react-vendor";
          }

          if (id.includes("@supabase") || id.includes("@lovable.dev")) {
            return "supabase-vendor";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("lucide-react") ||
            id.includes("sonner") ||
            id.includes("cmdk") ||
            id.includes("vaul")
          ) {
            return "ui-vendor";
          }

          if (id.includes("framer-motion") || id.includes("embla-carousel-react")) {
            return "motion-vendor";
          }

          if (id.includes("recharts")) {
            return "charts-vendor";
          }

          return "vendor";
        },
      },
    },
  },
}));
// Codebase classification: development Vite configuration.
