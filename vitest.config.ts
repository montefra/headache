import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["src/test/setup.ts"],
    globals: true,
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      exclude: ["node_modules", "test", "**/*.test.*", "src/generated/**"],
      include: ["src"],
      reporter: ["text", "html", "json-summary", "json"],
    },
  },
  resolve: {
    alias: {
      "@headache": path.resolve(__dirname, "./src"),
    },
  },
  logLevel: "error",
});
