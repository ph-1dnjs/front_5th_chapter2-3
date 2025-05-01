/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  base: "/front_5th_chapter2-3/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@widgets": path.resolve(__dirname, "./src/app/widgets"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/app/features"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
})
