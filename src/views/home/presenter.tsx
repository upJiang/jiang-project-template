import { useNavigate } from "react-router-dom";

import { useModel } from "./model";
import Service from "./service";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  // 路由跳转
  const router = useNavigate();

  const handleToAbout = () => {
    router("/about");
  };
  return {
    model,
    service,
    handleToAbout,
  };
};
