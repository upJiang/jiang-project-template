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

## 添加 ant-design

[官网](https://ant-design.antgroup.com/index-cn)

- 下载依赖

```
yarn add antd less
```

- 配置 `main.tsx`，并设置中文

```
import "./index.css";
import "dayjs/locale/zh-cn";

import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

dayjs.locale("zh-cn");

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

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
