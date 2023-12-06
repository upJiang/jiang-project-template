import "./index.less";

import { Button } from "antd";

import { usePresenter } from "./presenter";

export default () => {
  const presenter = usePresenter();
  const { model } = presenter;
  return (
    <>
      <div className="test">{model.test}</div>
      <Button onClick={presenter.handleToMock}>测试mock请求</Button>
      <br />
      <Button onClick={presenter.handleToAbout}>测试跳转路由</Button>
    </>
  );
};
