import { useImmer as useState } from "use-immer";

export const useModel = () => {
  const [test, setTest] = useState({
    name: "",
    age: 0,
  });
  return {
    test,
    setTest,
  };
};

export type Model = ReturnType<typeof useModel>;
