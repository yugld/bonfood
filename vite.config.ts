import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import { dirname, resolve } from "path";
import tailwindcss from "tailwindcss";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "vite";
import sourceParser from "./.setup/source-parser";
import { reloadSSR } from "./.setup/ssr-rebuilder";

const { outDir, input, basePath, ssr, manualChunks } = sourceParser();

const __dirname = dirname(fileURLToPath(import.meta.url));

if (input.length <= 0 && ssr) input.push(ssr);

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  ssr: {
    target: "node",
  },

  build: {
    assetsDir: "./assets",
    emptyOutDir: true,
    manifest: true,
    outDir,
    ssr,
    rollupOptions: {
      external: ["ymaps3"],
      input,
      output: {
        manualChunks: manualChunks,
      },
    },
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@ssr-client": fileURLToPath(new URL("./SSR/client", import.meta.url)),
      "@init-src": fileURLToPath(new URL("./themes/init/src", import.meta.url)),
      "@i18n": fileURLToPath(new URL("./i18n", import.meta.url)),
      "@app": fileURLToPath(new URL("./app/src/scripts", import.meta.url)),
      "@app-init": fileURLToPath(
        new URL("./app/init/src/scripts", import.meta.url),
      ),
      "@bonfood-new-src": fileURLToPath(new URL("./themes/bonfood-new/src", import.meta.url)),
    },
  },

  server: {
    cors: true,
  },

  css: {
    postcss: {
      plugins: [
        ...(ssr
          ? []
          : [
              tailwindcss({
                config: resolve(__dirname, ".setup", "tailwind.config.ts"),
              }),
            ]),
        autoprefixer(),
      ],
    },
  },

  plugins: [
    {
      name: "hmr",
      handleHotUpdate({ file, server }) {
        if (
          file.endsWith(".php") ||
          file.endsWith(".ts") ||
          file.endsWith(".tsx") ||
          file.endsWith(".json")
        ) {
          const localeRegex = /\/i18n\/locales\/[^/]+\/[^/]+\.json$/;
          if (file.endsWith(".php")) {
            server.ws.send({ type: "full-reload", path: "*" });
            return;
          }

          if (!localeRegex.test(file) && file.endsWith(".json")) return;

          if (!process.env.SSR) return;
          reloadSSR(__dirname).catch(console.warn);
        }
      },
    },

    react(),
  ],
});
