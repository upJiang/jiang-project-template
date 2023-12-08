import { ref } from "vue";

export const useModel = () => {
  const test = ref("关于");
  return { test };
};

export type Model = ReturnType<typeof useModel>;
