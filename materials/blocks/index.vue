<template>
  <div>vue-mvp</div>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
