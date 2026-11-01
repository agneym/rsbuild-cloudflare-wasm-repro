import { defineConfig } from "@rsbuild/core";
import { cloudflare } from "rsbuild-plugin-cloudflare";

export default defineConfig({
  server: { port: 4123, strictPort: true },
  plugins: [cloudflare()],
});
