目前该模板支持了：

- `husky、eslint、prettier、stylelint、tsc` 等规范
- `uview-plus` 组件库，自动按需导入的，无需在页面导入直接使用
- `pinia` 作为状态管理，`pinia-plugin-unistorage` 作为缓存处理
- `axios` 处理请求，`uniapp-axios-adapter` 适配小程序
- `mock` 手动处理
- `uniapp-router-next` 封装路由，让习惯跟 `vue-router` 保持一致
- 使用 `vscode` 开发，拒绝 `hbuilder`，因为不熟悉
- 使用 `ts` 开发

请注意插件的版本号，某些插件版本不同可能会报错，这里都不会再让你踩坑，后续会添加一些通用组件及方法。可先[下载模板](https://github.com/upJiang/jiang-project-template/tree/uniapp-vue-vite)后，再看文章。如果觉得该模板还行，可否给仓库一个 `star` 🙏

## init 项目

[官网地址](https://uniapp.dcloud.net.cn/quickstart-cli.html#install-vue-cli)

- 全局安装 `vue-cli`

```
npm install -g @vue/cli
```

- 创建 `uni-app`

```
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
```

若执行报错，直接去[下载模板](https://gitee.com/dcloud/uni-preset-vue/tree/vite-ts/)

## 使用 vscode 开发

安装插件:

- `VSCode` 安装 `uniapp` 代码提示插件： `uniapp-snippet` 、`uni-app-schemas`
- `VSCode` 安装一键创建页面、组件、分包 插件: `uni-create-view`

## 在微信开发者工具打开

- 自行使用邮箱[注册](https://open.weixin.qq.com/)一个新的小程序，保存 `appid`
- 在 `src/manifest.json` 中填入 `appid`
- 修改 `package.json`，仅保留对微信小程序的支持，方便调试，今后想加其它端的自行网上查找添加

```
"scripts": {
    "dev": "uni -p mp-weixin",
    "build": "uni build -p mp-weixin",
    "type-check": "vue-tsc --noEmit"
},
```

- 执行 `yarn dev`，在微信开发者工具中新建项目，导入 `dist\dev\mp-weixin`，运行即可

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13eafd42c17a432d8d74d77605083b8e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=385&h=674&s=12666&e=png&b=fefefe)

至此，初始化完成！

## 添加规范

### 配置别名

tsconfig.json

```
"baseUrl": ".",
/* 配置别名 */
"paths": {
    "@/*": ["src/*"],
    "/#/*": ["types/*"]
}
```

vite.config.ts

```
import { fileURLToPath, URL } from 'node:url';
resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
},
```

项目规范请直接 [参考文章](https://juejin.cn/post/7051512232374435847)，过程完全一致，部分内容请使用文章中的 `vue` 对应规范。对于项目规范，**建议直接使用我文章内的插件版本号**，避免踩坑，毕竟是规范而已版本并不需要追求太高太新，适用即可。

而外安装 `sass` 的支持

```
yarn add postcss sass sass-loader -D
```

## 生成区块文件

> 个人开发习惯，我是习惯将一个页面文件分离成多个文件，将视图、数据、方法、状态管理、api、常量等都分别抽离，这样可以极大的减少单个页面的代码长度。如果您没有这个习惯可直接忽略。下面介绍的 api、store 您可根据自己的习惯选择放到页面级别还是项目根目录区分模块级别中。

- 新建 `materials/blocks` 文件夹，需要提前配置该文件夹内的文件

- 安装 `vscode` 插件 `CodeToolBox` 插件,选中文件夹后右键，`CodeToolBox => 创建区块`

### 新建页面

通过 `CodeToolBox` 生成区块文件，页面的路由需要统一在 `src/package.json` 中添加

```
"pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ],
```

## 使用 uview-plus 作为组件库

因为我不想使用 `hbuilder` 开发，然而组件库的使用应该尽可能简单，让开发者无负担，于是就找到了这个组件库，使用跟开发 `web` 几乎无异，无需导入组件直接使用

[官网地址](https://ijry.github.io/uview-plus/components/quickstart.html)

- 安装依赖

```
yarn add uview-plus dayjs clipboard
```

- 配置 `main.ts`

```
import uviewPlus from 'uview-plus'
app.use(uviewPlus)
```

- 配置 `src/pages.json`

```
  "easycom": {
    "custom": {
      "^u--(.*)": "uview-plus/components/u-$1/u-$1.vue",
      "^up-(.*)": "uview-plus/components/u-$1/u-$1.vue",
      "^u-([^-].*)": "uview-plus/components/u-$1/u-$1.vue"
    }
  },
```

- 配置 `src/uni.scss`，添加组件库的主题变量，此文件不需要在任何地方引入

```
@import "uview-plus/theme.scss";
```

- 修复 `uview-plus` 的组件宽度默认 100% 问题

在 `app.vue` 中添加

```
<style lang="scss">
@import "@/styles/index.scss";
</style>
```

- 新建 `src/styles/index.scss`、 `src/styles/uview-commom.scss`

```
// src/styles/uview-commom.scss，修复 button、tag 的宽度问题，后续遇到再添加
.u-button,
.u-tag {
  width: max-content !important;
}

// src/styles/index.scss
@import "./uview-commom.scss";
```

- 直接使用，无需导入

```
<up-button type="primary" :text="model.test.value" />
```

## 配置 pinia，使用 pinia-plugin-unistorage 作为缓存

- 安装依赖

`vue` 版本如果大于等于 3.3 则使用 2.1 版本的 `pinia`，若低于 3.3 请锁死 `pinia` 版本为 2.0.36

```
yarn add pinia pinia-plugin-unistorage
```

- 配置 `main.ts`

```
import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage";

// 状态管理
const store = createPinia();
// 持久化
store.use(createUnistorage());

app.use(pinia);
```

- 因为 `pinia` 的扩展类型中没有 `unistorage`,直接在 `/src/types/common.d.ts` 中添加

```
declare module "pinia";
```

- 在页面内或者多个页面外的公共的文件中去定义，然后直接导入使用，可配置缓存

```
// store.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTestStore = defineStore(
  "test",
  () => {
    const testCache = ref();
    return {
      testCache,
    };
  },
  {
    unistorage: {
      key: "test", // 在缓存里面 key 值
      storage: localStorage,
      paths: ["testCache"], // 需要缓存哪些变量
    },
  },
);

// 在页面上使用
import { useTestStore } from "./store";

testPinia() {
  const testStore = useTestStore();
  // 查看Storage应该存在了 localStorage
  testStore.testCache = `测试缓存${this.model.test.value}`;
}
```

## 封装 axios

- 安装依赖

`uniapp-axios-adapter` 用于适配小程序，`axios` 版本锁死，高版本会有问题

```
yarn add axios@0.27.0 uniapp-axios-adapter
```

- 添加 `/src/utils/request.ts`

```
import { UniAdapter } from "uniapp-axios-adapter";
const instance = axios.create({
  adapter: UniAdapter,
});

其它都为常规配置，可直接参考仓库代码
```

## 配置 mock

由于 `vite-plugin-mock` 在小程序环境不适用，所以我这里是直接拦截请求，然后读取文件夹的内容，找到对应的请求 url 直接返回相应的结果。唯一的缺点就是无法在 `network` 中看到，但也能满足开发的需求。

- `/src/utils/commom.ts` 添加方法

```
// 处理 mock 直接返回 returnData
export const handleMockDataReturn = (url: string) => {
  if (!url) return;
  const mockModules = import.meta.glob("/mock/**", {
    eager: true,
  }) as Record<string, { default: [] }>;
  const curMock = Object.keys(mockModules).map((s) => mockModules[s].default);
  const current = curMock
    .flat()
    .find((item: { url: string }) => item.url === url) as unknown as {
    returnData: unknown;
  };
  return current.returnData;
};
```

- 在 `request.ts` 中拦截

```
import { handleMockDataReturn } from "./commom";
// 处理mock，直接返回数据
if (error.config?.url?.includes("/mock")) {
  const returnData = handleMockDataReturn(error.config.url || "") || "";
  console.log("mock 数据结果：", returnData);
  return Promise.resolve(returnData);
}
```

- 在根目录新建 `mock` 文件夹，在此文件夹下随意新建 `xx.ts`

```
export default [
  {
    url: "/mock/getMockData",
    returnData: {
      code: 0,
      message: "ok",
      result: ["测试1", "测试2"],
    },
  },
];
```

- 使用

```
// mock 请求示例
export function fetchMockTest() {
  return request<IFetchXXResult>({
    url: `/mock/getMockData`,
    method: "GET",
  });
}

import { fetchMockTest } from "./api";
await fetchMockTest();
```

## 使用 `uniapp-router-next` 封装路由

[插件地址](https://socket.dev/npm/package/uniapp-router-next)

- 安装依赖

```
yarn add uniapp-router-next
yarn add unplugin-uni-router -D
```

- 在 `vite.config.ts` 引入 `uniRouter`

```
import uniRouter from "unplugin-uni-router/vite";
plugins: [uni(), uniRouter()],
```

- 新建 `/src/router.ts`

```
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

// 可以查看打印信息，感觉就跟写 vue 普通项目无差
router.beforeEach((_to, _form, next) => {
  //   console.log(to, form, "beforeEach");
  next(); // 这个一定要写，不要就跳转不了了哈
});
export default router;
```

- 在 `main.ts` 中导入

```
import router from "./router";
app.use(router);
```

- 全局注册组件

`/src/pages.json` 添加代码

```
{
     "easycom": {
        "custom": {
            "router-navigate": "uniapp-router-next/components/router-navigate/router-navigate.vue"
        }
    }
}
```

- 新建 `about` 区块页面，尝试跳转，页面新增依旧要写到 `/src/pages.json` 中

写法跟 `vue-router` 基本一致了

```
import { useRouter } from "uniapp-router-next";
const router = useRouter();

  const handleToAbout = () => {
    router.navigateTo({
      path: "/pages/about/index",
      //参数
      query: {
        name: "name",
      },
    });
  };
```

- 组件跳转

```
<router-navigate to="/pages/about/index">go</router-navigate>
```

至此已完成整个 `uniapp` 小程序的模板创建，也可使用我的 `cli` 下载各种模板代码，

```
npm install -g jiang-cli
jiang create myProject
```
