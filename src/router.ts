import routes from "uni-router-routes"; //由unplugin-uni-router/vite根据pages.json生成
import { createRouter } from "uniapp-router-next";

const router = createRouter({
  routes: [
    ...routes,
    // 通配符，一般用于匹配不到路径跳转404页面
    {
      path: "*",
      redirect: () => {
        // 可返回{ name: '404' }，{ path: '/pages/404/404' }， '/pages/404/404'
        return { name: "404" };
      },
    },
  ],
  //@ts-ignore
  platform: process.env.UNI_PLATFORM,
  h5: {},
});

router.beforeEach((_to, _form, next) => {
  // next("/pages/notFound/index");
  next();
});
export default router;
