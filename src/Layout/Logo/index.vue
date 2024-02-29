<template>
  <div class="logo_container">
    <Svg-icon class="icon" :name="logo" size="30px"></Svg-icon>
    <span v-if="!store.menuFlex">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
const store = useStore();
const title = import.meta.env.VITE_APP_TITLE;
const logo = import.meta.env.VITE_APP_LOGO;
</script>
<style scoped lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.logo_container {
  padding: 17px;
  display: flex;
  color: #fff;
  align-items: center;
  overflow: hidden;
  > .icon {
    animation: rotate 2s linear infinite;
  }
  > span {
    padding-left: 10px;
    white-space: nowrap;
  }
}
.el-menu-vertical-demo {
  border: 0;
}
</style>
