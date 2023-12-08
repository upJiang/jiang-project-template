import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { UniAdapter } from "uniapp-axios-adapter";

import { handleMockDataReturn } from "./commom";

const token = uni.getStorageSync("access_token");

const instance = axios.create({
  baseURL: "",
  timeout: 30 * 1000,
  adapter: UniAdapter,
});

const transformFromData = (data: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in data) {
    data[key] && formData.append(key, data[key]);
  }
  return formData;
};

// 请求拦截
instance.interceptors.request.use(
  (config: AxiosResponse) => {
    // 根据参数判断是否是文件上传，修改 Content-Type
    if (config?.data?.fileUploadRequset) {
      config.data = transformFromData(config.data);
      config.headers["Content-Type"] = "multipart/form-data;charset=utf-8";
    }
    config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    console.log("res", res);

    if (
      res.data.code !== undefined &&
      res.data.code !== 0 &&
      res.data.code !== 200 &&
      !(res.config as AxiosRequestConfig & { skipErrorHandler?: boolean })
        .skipErrorHandler
    ) {
      uni.showToast({
        title: res.data.msg || res.data.message || "",
        icon: "none",
      });
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  },
  (error: AxiosError<{ code: number; message?: string; msg?: string }>) => {
    // 处理mock，直接返回数据
    if (error.config?.url?.includes("/mock")) {
      const returnData = handleMockDataReturn(error.config.url || "") || "";
      console.log("mock 数据结果：", returnData);
      return Promise.resolve(returnData);
    }

    const skipErrorHandler = (
      error.config as AxiosRequestConfig & { skipErrorHandler?: boolean }
    ).skipErrorHandler;
    if (error.response?.status === 401 && !skipErrorHandler) {
      uni.showToast({
        title: "登录信息过期",
        icon: "none",
      });

      uni.removeStorageSync("access_token");
      // 下面自行处理未登录情况
      return;
    }
    if (!skipErrorHandler) {
      uni.showToast({
        title:
          error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message ||
          "",
        icon: "none",
      });
    }
    return Promise.reject(error);
  },
);

type Request = <T = unknown>(
  config: AxiosRequestConfig & { skipErrorHandler?: boolean },
) => Promise<T>;

export const request = instance.request as Request;
