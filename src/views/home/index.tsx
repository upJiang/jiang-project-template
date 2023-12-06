import "./index.less";

import { Button } from "antd";
import { observer } from "mobx-react-lite";

import { usePresenter } from "./presenter";
import useMobxStore from "./store";

// 在此处实例化
const mobxStoreInstance = new useMobxStore();
export default observer(() => {
  const presenter = usePresenter();
  const { model } = presenter;

  return (
    <>
      <div>{model.test.age}</div>
      <Button onClick={presenter.handleClickChangeState}>点击修改变量</Button>
      <br />
      <Button onClick={presenter.handleToMock}>测试mock请求</Button>
      <br />
      <Button onClick={presenter.handleToAbout}>测试跳转路由</Button>
      <br />
      <div>{mobxStoreInstance.count}</div>
      <Button onClick={mobxStoreInstance.addCount}>测试 mobx：点击+1</Button>
      {/* 计算属性 */}
      <div>{mobxStoreInstance.filterList.join("~")}</div>
      <button onClick={mobxStoreInstance.addList}>
        测试 mobx 计算属性：点我数组添加内容
      </button>
    </>
  );
});
