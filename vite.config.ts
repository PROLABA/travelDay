import { defineConfig } from "vite";
import vitePugPlugin from "vite-plugin-pug-transformer";
import pugPlugin from "vite-plugin-pug";
import path, { resolve } from "path";

const root = resolve(__dirname, "src");
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: "../local/templates/otevetto/dist",
    rollupOptions: {
      input: {
        index: resolve("index.html"),
        main: resolve(root, "pages", "main", "index.html"),
        // price: resolve(root, "pages", "prices", "index.html"),
        // ui: resolve(root, "pages", "ui", "index.html"),
        // extensions: resolve(root, "pages", "extensions", "index.html"),
        // referralProgram: resolve(
        //   root,
        //   "pages",
        //   "referral-program",
        //   "index.html"
        // ),
        // digitalFranchise: resolve(
        //   root,
        //   "pages",
        //   "digitalFranchise",
        //   "index.html"
        // ),
        // affiliatePrograms: resolve(
        //   root,
        //   "pages",
        //   "affiliatePrograms",
        //   "index.html"
        // ),
        // blog: resolve(root, "pages", "blog", "index.html"),
        // about: resolve(root, "pages", "aboutUs", "index.html"),
        // instructions: resolve(root, "pages", "instructions", "index.html"),
        404: resolve(root, "pages", "404", "index.html"),
        // contacts: resolve(root, "pages", "contacts", "index.html"),
        // newsDetail: resolve(root, "pages", "newsDetail", "index.html"),
        // userAgreement: resolve(root, "pages", "userAgreement", "index.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "unknown";
          if (name.endsWith(".css")) {
            return "assets/css/[name][extname]";
          } else if (
            name.endsWith(".jpg") ||
            name.endsWith(".png") ||
            name.endsWith(".webp") ||
            name.endsWith(".svg")
          ) {
            return "assets/img/[name][extname]";
          } else {
            return "assets/[name][extname]";
          }
        },
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
      },
    },
  },
  plugins: [
    vitePugPlugin({}),
    pugPlugin({
      localImports: true,
      alias: {
        "~/src": path.resolve(__dirname, "./src/"),
      },
    } as any),
  ],
});
