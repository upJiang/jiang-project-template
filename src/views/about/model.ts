import { useImmer as useState } from "use-immer";

export const useModel = () => {
  const [test, setTest] = useState("about");
  return {
    test,
    setTest,
  };
};

export type Model = ReturnType<typeof useModel>;
