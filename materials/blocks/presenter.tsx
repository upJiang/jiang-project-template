import { useModel } from "./model";
import Service from "./service";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  return {
    model,
    service,
  };
};
