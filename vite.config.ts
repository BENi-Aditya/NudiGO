// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deployment target for Nitro. Defaults to Vercel (build output at .vercel/output,
// which Vercel auto-detects). Lovable's own sandbox forces its preset and ignores
// this; local `npm run dev` doesn't use it. Override with NITRO_PRESET when
// building for another host (e.g. `NITRO_PRESET=node-server npm run build`).
const preset = process.env["NITRO_PRESET"] ?? "vercel";

export default defineConfig({
  nitro: { preset },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
