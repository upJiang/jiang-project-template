import { fetchMockTest } from "./api";
import { Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  // 测试 mock 请求
  async mockTest() {
    const res = await fetchMockTest();
    console.log("mock请求结果:", res, this.model.test);
  }
}
