import { fetchGetTest } from "./api";
import { Model } from "./model";
import { useTestStore } from "./store";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  testPinia() {
    const testStore = useTestStore();
    // 查看Storage应该存在了 localStorage
    testStore.testCache = `测试缓存${this.model.test.value}`;
  }

  async testRequset() {
    const res = await fetchGetTest();

    console.log("res", res);
  }
}
