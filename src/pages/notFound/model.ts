import { ref } from "vue";

export const useModel = () => {
  const test = ref("404");
  return { test };
};

export type Model = ReturnType<typeof useModel>;
