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

执行报错，直接去[下载模板](https://gitee.com/dcloud/uni-preset-vue/tree/vite-ts/)

## 使用 vscode 开发

安装插件:

- `VSCode` 安装 `uniapp` 代码提示插件： `uniapp-snippet` 、`uni-app-schemas`
- `VSCode` 安装一键创建页面、组件、分包 插件: `uni-create-view`

## 在微信开发者工具打开

- 自行使用邮箱，[注册](https://open.weixin.qq.com/)一个新的小程序，保存 `appid`
- 在 `src/manifest.json` 中填入 `appid`
- 修改 `package.json`，仅保留对微信小程序的支持，方便调试，今后想加其它端的自行网上查找添加

```
"scripts": {
    "dev": "uni -p mp-weixin",
    "build": "uni build -p mp-weixin",
    "type-check": "vue-tsc --noEmit"
},
```

- 执行 `yarn dev:weapp`，在微信开发者工具中新建项目，导入 `dist\dev\mp-weixin`，运行即可

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13eafd42c17a432d8d74d77605083b8e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=385&h=674&s=12666&e=png&b=fefefe)

至此，初始化完成！

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

## 添加规范

[参考文章](https://juejin.cn/post/7051512232374435847)

除了上述，而外安装

```
yarn add postcss sass sass-loader -D
```

## 生成区块文件

- `materials/blocks`，需要提前配置该文件夹内的文件

- 使用我的插件自动在文件夹上生成文件，安装 `CodeToolBox` 插件,在文件夹上右键，`CodeToolBox => 创建区块`

## 新建页面

通过 `CodeToolBox` 生成区块文件，页面的路由需要统一在 `src/package.json` 中添加

```
"pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "uni-app"
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

- 使用

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

// 使用
import { useTestStore } from "./store";

testPinia() {
  const testStore = useTestStore();
  // 查看Storage应该存在了 localStorage
  testStore.testCache = `测试缓存${this.model.test.value}`;
}
```

## 封装 axios

- 安装依赖

`uniapp-axios-adapter` 用于适配小程序，`axios` 版本锁死

```
yarn add axios@0.27.0 axios-miniprogram-adapter
```

- 添加 `/src/utils/request.ts`

```
import { UniAdapter } from "uniapp-axios-adapter";
const instance = axios.create({
  adapter: UniAdapter,
});

其它都为常规配置
```

## 配置 mock

目前好像还不生效，在找原因

[参考我的文章](https://juejin.cn/post/7000343511195189279)

## 使用 `uniapp-router-next` 封装路由

[插件地址](https://socket.dev/npm/package/uniapp-router-next)
