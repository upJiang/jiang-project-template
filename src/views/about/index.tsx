import "./index.less";

import { usePresenter } from "./presenter";

export default function () {
  const presenter = usePresenter();
  const { model } = presenter;
  return <div>{model.test}</div>;
}
