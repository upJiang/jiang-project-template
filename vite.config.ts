import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
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
  plugins: [react(), viteMockServe()],
  server: {
    open: true,
    port: 9999,
    strictPort: true,
    // 设置代理示例
    proxy: {
      "/XXApi": "https://blog.junfeng530.xyz/",
    },
  },
});
