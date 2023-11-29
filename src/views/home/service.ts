import { fetchMockTest } from "./api";
import { Model } from "./model";
import { useTestStore } from "./store";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  // 尝试保存 pinia 的缓存
  saveCache() {
    const testStore = useTestStore();
    // 请自行查看浏览器的 localStorage
    testStore.testCache = "测试";
  }

  // 测试 mock 请求
  async mockTest() {
    const res = await fetchMockTest();
    console.log("mock请求结果:", res, this.model.test.value);
  }
}
