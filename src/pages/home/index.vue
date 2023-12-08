<template>
  <up-button
    type="primary"
    :text="model.test.value"
    @click="presenter.handleTestPinia"
    :customStyle="{
      marginBottom: '10px',
      marginTop: '10px',
    }"
  />
  <up-button
    type="primary"
    text="测试请求"
    @click="presenter.handleTestMock"
    :customStyle="{
      marginBottom: '10px',
    }"
  />

  <up-button
    type="primary"
    text="测试跳转about"
    @click="presenter.handleToAbout"
  />
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="scss">
@import url("./index.scss");
</style>
