import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      exclude: ["node_modules", "test", "**/*.test.*", "src/generated/**"],
      include: ["src"],
      reporter: ["text", "html", "json"],
    }
  },
  logLevel: 'error',
});
