<template>
  <a-descriptions title="模板测试">
    <a-descriptions-item label="模板测试">
      {{ model.test.value }}
    </a-descriptions-item>
  </a-descriptions>

  <a-button @click="presenter.handleClick">点击测试弹窗</a-button>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
