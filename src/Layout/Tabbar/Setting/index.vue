<template>
  <el-button icon="Refresh" circle @click="refresh"></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button icon="Setting" circle></el-button>
  <el-button circle @click="runGitub" class="gitub_btn">
    <svg-icon name="gitub"></svg-icon>
  </el-button>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
const $store = useStore();
// 此处设置刷新状态
const refresh = () => {
  $store.refresh = !$store.refresh;
};

// 全屏展示方法
const fullScreen = () => {
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen();
};
const runGitub = () => {
  window.open("https://github.com/wanghan-3/vue3-admin", "_blank");
};
</script>
<style scoped lang="scss">
// 按钮样式
.gitub_btn:hover svg {
  fill: var(--el-button-hover-text-color);
}
</style>
