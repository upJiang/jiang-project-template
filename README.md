## 使用 create-vite 脚手架生成项目

```
# 全局安装 create-vite 脚手架
$ npm install -g create-vite

# 使用脚手架在当前目录生成项目
$ create-vite . --template react-ts
```

## 搭建规范

按照[我的文章](https://juejin.cn/post/7051512232374435847)，来一遍

## 配置区块

`materials/blocks`，需要提前配置该文件夹内的文件

使用我的插件自动在文件夹上生成文件，安装 `CodeToolBox` 插件,在文件夹上右键，`CodeToolBox => 创建区块`

## 配置路由 react-router

[官网](https://reactrouter.com/en/main)

```
yarn add react-router-dom
```

- 使用 `import.meta.glob` 直接读取模块下的所有的路由，直接看 `src/router`

- 修改 `app.tsx`

```
import "./App.css";

import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import routers from "@/router/index";

function App() {
  const elements = useRoutes(routers);
  return <Suspense>{elements}</Suspense>;
}

export default App;

```

- 修改 `main.tsx`

```
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

- 跳转路由使用

```
import { useNavigate } from "react-router-dom";
const router = useNavigate();

router("/about");
```

## 配置 react-vant

[文档地址](https://react-vant.3lang.dev/guide/quickstart)

```
yarn add react-vant
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

## 配置请求，封装 axios

查看方法 `src/utils/request.ts`，在这里每一个页面都至少由 `materials/blocks` 下的文件组成，包括 `api.ts`，如若需要全局的 `api.ts` 可自行创建。

## 配置 mock

[参考我的文章](https://juejin.cn/post/7000343511195189279)

## 添加 mobx 作为状态管理

[文档地址](https://zh.mobx.js.org/installation.html)

[配置文章](https://juejin.cn/post/7119037768109391908?searchId=20231206154239C96AD6FF5C29A1728C7E#heading-3)

对数据共享，其实很多只需要用全局变量即可，为了更好的封装，以及持久化，也为了模块之间的更好分离，这里我选择了使用更为简单轻量的 `mobx`

```
yarn add mobx mobx-react-lite mobx-persist-store
```

使用直接看 `home` 页面中的 `store.ts`。

如果需要全局创建，直接提出去即可

## 使用 use-immer 替代 useState

```
yarn add immer use-immer
```

用法

```
import { useImmer as useState } from "use-immer";

const [person, updatePerson] = useImmer({
    name: "Michel",
    age: 33
  });

  function updateName(name) {
    updatePerson(draft => {
      draft.name = name;
    });
  }

```

目前该模板已配置：`项目规范、vant、react-router、axios、mobx、mock、use-immer`

已足以满足开发需求，后续需要什么自行添加
