module.exports = {
  env: {
    browser: true,
    commonjs: true, // ADD, 支持对commonjs全局变量的识别
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended", // import 插件规则，可自动合并重复导入
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
  },
  plugins: ["react", "@typescript-eslint", "eslint-plugin-simple-import-sort"],
  rules: {
    "react/jsx-uses-react": "off", // 必须增加对import React from 'react',jsx 的页面已经不再需要引入 React了，所以我们去掉这条 lint 规则
    "react/react-in-jsx-scope": "off", // 同上
    "@typescript-eslint/no-var-requires": "off", // 关闭 禁用使用 require 来定义
    "react/display-name": "off", // 关闭组件定义缺少显示名称
    "simple-import-sort/imports": "error", // import 自动排序，eslint-plugin-simple-import-sort 自动修正
    "simple-import-sort/exports": "error",
    "no-duplicate-imports": ["off", { includeExports: true }], // import不能重复重复，自动合并插件 eslint-plugin-import，添加extends：plugin:import/recommended
    "import/no-unresolved": "off", // 关闭 eslint 无法解析的导入
  },
};
