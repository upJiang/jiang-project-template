import { fileURLToPath, URL } from "node:url";

import uni from "@dcloudio/vite-plugin-uni";
import uniRouter from "unplugin-uni-router/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "#": fileURLToPath(new URL("./types", import.meta.url)),
    },
  },
  plugins: [uni(), uniRouter()],
});
