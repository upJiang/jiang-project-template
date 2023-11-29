import { message } from "ant-design-vue";

import { useModel } from "./model";
import Service from "./service";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  const handleClick = () => {
    message.success("测试");
    //  测试 pinia
    service.saveCache();
    // 测试 mock
    service.mockTest();
  };

  return {
    model,
    service,
    handleClick,
  };
};
