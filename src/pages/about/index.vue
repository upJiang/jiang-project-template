<template>
  <div>{{ model.test.value }}</div>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
