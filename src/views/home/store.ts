import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export interface IUseMobxStore {
  count: number;
}
export default class useMobxStore {
  count: number = 0; // 初始化状态数据

  // 定义一个原始数组，用于测试computed计算属性
  list = [1, 2, 3, 4, 5, 6];

  constructor() {
    // 对初始化数据进行响应式处理
    makeAutoObservable(this);

    // makePersistable 数据持久化存储，跟 pinia 配置类似
    makePersistable(this, {
      name: "mobxDemo", // 存储到localStorage当中的key值是什么，此处为字符串string；
      properties: ["count"], // 需要持久化的数据是什么，此数据需要为上面声明了的变量，并且传值方式为[string]
      storage: window.localStorage, // 你的数据需要用那种方式存储，常见的就是localStorage
    });
  }

  // 定义一个计算属性
  get filterList() {
    return this.list.filter((item) => item > 4);
  }

  //增加list数据内容
  addList = () => {
    this.list.push(7);
  };

  // 设置改变初始化数据方法
  addCount = () => {
    console.log(this.count);
    this.count++;
    console.log(this.count);
  };
}
