<template>
  <van-cell title="模板" :value="model.test.value" />
  <div class="main-container">测试</div>
  <van-button @click="presenter.handleClick">点击测试弹窗</van-button>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="less" scoped>
@import url("./index.less");

.main-container {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
}
</style>
