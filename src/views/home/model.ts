import { useState } from "react";

export const useModel = () => {
  const [test, setTest] = useState("测试");
  return {
    test,
    setTest,
  };
};

export type Model = ReturnType<typeof useModel>;
