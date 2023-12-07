import { useModel } from "./model";
import Service from "./service";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  const handleClick = () => {
    service.testPinia();
    service.testRequset();
  };
  return {
    model,
    service,
    handleClick,
  };
};
