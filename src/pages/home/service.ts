import { fetchMockTest } from "./api";
import { Model } from "./model";
import { useTestStore } from "./store";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  // 测试 pinia 缓存，自行查看Storage
  testPinia() {
    const testStore = useTestStore();
    testStore.testCache = `测试缓存${this.model.test.value}`;
  }
  // 测试请求
  async testRequset() {
    await fetchMockTest();
  }
}
