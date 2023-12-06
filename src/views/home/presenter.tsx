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

  const handleToMock = () => {
    service.mockTest();
  };

  const handleClickChangeState = () => {
    // 两种修改方式
    model.setTest((state) => {
      state.age++;
    });
    // model.setTest({
    //   name: "haha",
    //   age: 100,
    // });
  };
  return {
    model,
    service,
    handleToAbout,
    handleToMock,
    handleClickChangeState,
  };
};
