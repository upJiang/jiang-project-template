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

## 配置 ant-design-vue

使用自动导入，无需在 main.ts 引入

```
// vite.config.ts
Components({
    resolvers: [
    AntDesignVueResolver({
        importStyle: false, // css in js
     }),
    ],
}),
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

目前该模板已配置：项目规范、ant-design-vue、axios、pinia、mock

已足以满足开发需求，后续需要什么自行添加
