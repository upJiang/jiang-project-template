## 使用 create-vite 脚手架生成项目

```
# 全局安装 create-vite 脚手架
$ npm install -g create-vite

# 使用脚手架在当前目录生成项目
$ create-vite . --template vue-ts
```

## 介绍搭建过程

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

## 配置项目规范

[直接参考我的文章](https://juejin.cn/post/7051512232374435847)

## 配置路由

有人使用 `vite-plugin-pages` 这个自动添加路由，但赶紧局限性比较多，比如添加 `keep-alive`，添加路由权限设置，添加动态路由设置等等。所以这里我感觉还是采用传统的方式。

直接看 `src/router`，使用 `import.meta.glob` 自动导入各模块路由，添加了进度条

## 配置 vant

[文档地址](https://vant-ui.github.io/vant/#/zh-CN/home)

使用自动导入，无需在 `main.ts` 引入

```
// vite.config.ts
import { VantResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

Components({
    resolvers: [
    VantResolver(),
    ],
}),
```

在 `main.ts` 中引入样式文件解决 toast 那些函数式组件的样式问题

```
import "vant/lib/index.css";
```

## 配置移动端适配 vw,vh

- 安装依赖

```
yarn add postcss-px-to-viewport -D
```

- 配置 `postcss.config.js`

```
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportWidth: 375,
      // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      // viewportHeight: 1334,
      // 指定`px`转换为视窗单位值的小数位数
      unitPrecision: 5,
      // 指定需要转换成的视窗单位，建议使用vw
      viewportUnit: 'vw',
      // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      selectorBlackList: ['.ignore'],
      // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      minPixelValue: 1,
      // 允许在媒体查询中转换`px`
      mediaQuery: false
    }
  }
}
```

## 生成区块文件

- `materials/blocks`，需要提前配置该文件夹内的文件

- 使用我的插件自动在文件夹上生成文件，安装 `CodeToolBox` 插件,在文件夹上右键，`CodeToolBox => 创建区块`

## 配置请求，封装 axios

查看方法 `src/utils/request.ts`，在这里每一个页面都至少由 `materials/blocks` 下的文件组成，包括 `api.ts`，如若需要全局的 `api.ts`可自行创建。

## 配置 pinia，添加缓存

在页面内或者多个页面外的公共的文件中去定义，然后直接导入使用，可配置缓存

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
    persist: {
      key: "test", // 在缓存里面 key 值
      storage: localStorage,
      paths: ["testCache"], // 需要缓存哪些变量
    },
  },
);

// 使用
import { useTestStore } from "./store";

const testStore = useTestStore();
// 请自行查看浏览器的 localStorage
testStore.testCache = "测试";
```

## 配置 mock

[参考我的文章](https://juejin.cn/post/7000343511195189279)

目前该模板已配置：项目规范、`vant`、`axios`、`pinia`、`mock`

已足以满足开发需求，后续需要什么自行添加，其实跟 `vue3-vite-pc` 不同仅在于 `UI` 框架 以及适配问题
