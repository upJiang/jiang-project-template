import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { Toast } from "vant";

import { delCookie, getCookie } from "./cookie";

// 设置超时时间
const instance = axios.create({
  timeout: 30 * 1000,
});

const token = getCookie("access_token");

const transformFromData = (data: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in data) {
    data[key] && formData.append(key, data[key]);
  }
  return formData;
};

// 请求拦截
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
    if (
      res.data.code !== undefined &&
      res.data.code !== 0 &&
      res.data.code !== 200 &&
      !(res.config as AxiosRequestConfig & { skipErrorHandler?: boolean })
        .skipErrorHandler
    ) {
      Toast.fail(res.data.msg || res.data.message);
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  },
  (error: AxiosError<{ code: number; message?: string; msg?: string }>) => {
    const skipErrorHandler = (
      error.config as AxiosRequestConfig & { skipErrorHandler?: boolean }
    ).skipErrorHandler;
    if (error.response?.status === 401 && !skipErrorHandler) {
      Toast.fail("登录信息过期");
      delCookie("access_token");
      // 下面自行处理未登录情况
      return;
    }
    if (!skipErrorHandler) {
      Toast.fail(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message,
      );
    }
    return Promise.reject(error);
  },
);

type Request = <T = unknown>(
  config: AxiosRequestConfig & { skipErrorHandler?: boolean },
) => Promise<T>;

export const request = instance.request as Request;
