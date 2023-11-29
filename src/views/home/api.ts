import { request } from "@/utils/request";

const VITE_MAIN_HOST = import.meta.env.VITE_MAIN_HOST;

interface IFetchXXResult {
  code: number;
  message: string;
  result: string;
}
interface IfetchXXParams {
  name: string;
}
// POST 请求示例
export function fetchPostTest(data: IfetchXXParams) {
  return request<IFetchXXResult>({
    url: `${VITE_MAIN_HOST}/xxx`,
    method: "POST",
    data,
  });
}

// GET 请求示例
export function fetchGetTest(params: IfetchXXParams) {
  return request<IFetchXXResult>({
    url: `${VITE_MAIN_HOST}/xxx`,
    method: "GET",
    params,
  });
}

// 文件上传 请求示例
export function fetchFilePostTest(params: IfetchXXParams) {
  return request<IFetchXXResult>({
    url: `${VITE_MAIN_HOST}/xxx`,
    method: "POST",
    params: {
      fileUploadRequset: true,
      ...params,
    },
  });
}

// mock 请求示例
export function fetchMockTest() {
  return request<IFetchXXResult>({
    url: `/mock/getMockData`,
    method: "GET",
  });
}
