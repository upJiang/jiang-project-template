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

## 添加 ant design

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
