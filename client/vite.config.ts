import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["jwt-decode"], // Force Vite à inclure jwt-decode lors du bundle
  },
});
