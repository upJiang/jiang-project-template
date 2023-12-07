import { fileURLToPath, URL } from "node:url";

import uni from "@dcloudio/vite-plugin-uni";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "#": fileURLToPath(new URL("./types", import.meta.url)),
    },
  },
  plugins: [uni(), viteMockServe()],
});
