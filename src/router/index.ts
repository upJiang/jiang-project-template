import "nprogress/nprogress.css";

import NProgress from "nprogress";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const modules = import.meta.glob("./modules/**", {
  eager: true,
}) as Record<string, { default: RouteRecordRaw[] }>;

const routes = Object.keys(modules).map((s) => modules[s].default);

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.flat(),

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((_to, _from, next) => {
  // 添加进度条
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
