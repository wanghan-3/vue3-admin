<template>
  <el-button icon="Refresh" circle @click="refresh"></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button icon="Setting" circle @click="drawer = true"></el-button>
  <el-button circle @click="runGitub" class="gitub_btn">
    <svg-icon name="gitub"></svg-icon>
  </el-button>
  <el-drawer v-model="drawer" title="设置" size="20%">
    <el-form label-width="80">
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="$store.themeColor"
          :predefine="predefineColors"
          @change="colorChange"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="$store.isDark"
          inline-prompt
          active-icon="Moon"
          style="--el-switch-on-color: #2c2c2c"
          inactive-icon="Sunny"
          @change="darkChane"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";
const $store = useStore();
const drawer = ref<boolean>(false);
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
const predefineColors = ref([
  "#409eff",
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
// 暗黑模式
const darkChane = (val: boolean) => {
  document.documentElement.className = val ? "dark" : "";
};
// 主题颜色改变
const colorChange = (val: string) => {
  document.documentElement.style.setProperty("--el-color-primary", val);
};
</script>
<style scoped lang="scss">
// 按钮样式
.gitub_btn svg {
  fill: var(--el-button-text-color);
}
.gitub_btn:hover svg {
  fill: var(--el-button-hover-text-color);
}
</style>
