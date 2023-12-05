<template>
  <van-cell title="模板" :value="model.test.value" />
  <div class="testStyleLint">测试 vw</div>
  <van-button @click="presenter.handleClick">点击测试弹窗</van-button>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="less" scoped>
@import url("./index.less");
.testStyleLint {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 100px;
  max-height: 100px;
  margin: 20px;

  white-space: nowrap;
}
</style>
