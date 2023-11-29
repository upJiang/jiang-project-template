<template>
  <a-config-provider :locale="zhCN">
    <router-view v-if="isRouterAlive" />
  </a-config-provider>
</template>

<script setup lang="ts">
import "dayjs/locale/zh-cn";

import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs"; // ant-design-vue自带的
import { nextTick, provide, ref } from "vue";

// 提供一个局部组件刷新
const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);

dayjs.locale("zhCN");
</script>
