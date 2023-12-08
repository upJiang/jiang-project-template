import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage";
import uviewPlus from "uview-plus";
import { createSSRApp } from "vue";

import App from "./App.vue";
import router from "./router";

export function createApp() {
  // 状态管理
  const store = createPinia();
  // 持久化
  store.use(createUnistorage());

  const app = createSSRApp(App);

  app.use(uviewPlus);
  app.use(store);
  app.use(router);

  return {
    app,
  };
}
