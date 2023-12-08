import { useRouter } from "uniapp-router-next";

import { useModel } from "./model";
import Service from "./service";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  const router = useRouter();
  const handleTestPinia = () => {
    service.testPinia();
  };
  const handleTestMock = () => {
    service.testRequset();
  };

  const handleToAbout = () => {
    router.navigateTo({
      path: "/pages/about/index",
      //参数
      query: {
        name: "name",
      },
    });
  };
  return {
    model,
    service,
    handleTestPinia,
    handleTestMock,
    handleToAbout,
  };
};
