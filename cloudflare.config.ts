import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "wasm-repro",
    entrypoint: "./src/index.ts",
    compatibilityDate: "2026-10-19",
  },
});
