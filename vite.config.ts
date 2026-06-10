import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  // Host-agnostic base path.
  //   Vercel / root domain  -> "/" (default)
  //   GitHub Pages project   -> set VITE_BASE="/<repo>/" (e.g. "/portfolio/")
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
