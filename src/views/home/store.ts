import { defineStore } from "pinia";
import { ref } from "vue";

export const useTestStore = defineStore(
  "test",
  () => {
    const testCache = ref();
    return {
      testCache,
    };
  },
  {
    persist: {
      key: "test", // 在缓存里面 key 值
      storage: localStorage,
      paths: ["testCache"], // 需要缓存哪些变量
    },
  },
);
