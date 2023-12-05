import "./index.less";

import { usePresenter } from "./presenter";

export default function () {
  const presenter = usePresenter();
  const { model } = presenter;
  return (
    <div id="footer" className="aa">
      测试 {model.test}
    </div>
  );
}
