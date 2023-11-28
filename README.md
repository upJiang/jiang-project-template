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

## 配置规范

[直接参考我的文章](https://juejin.cn/post/7051512232374435847)

> 网上有许多很好的模板比如 [fast-vue3](https://github.com/tobe-fe-dalao/fast-vue3)，但我还是致力于自己从 0 搭建一个自己熟悉的模板
