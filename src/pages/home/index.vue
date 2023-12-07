<template>
  <up-button
    type="primary"
    :text="model.test.value"
    @click="presenter.handleClick"
  />
  <u-cell-group>
    <u-cell icon="setting-fill" title="个人设置" />
    <u-cell icon="integral-fill" title="会员等级" value="新版本" />
  </u-cell-group>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="scss">
@import url("./index.scss");
</style>
