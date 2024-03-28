<template>
  <div class="menu_container">
    <Logo></Logo>
    <el-menu
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      :collapse="store.menuFlex"
      @open="handleOpen"
      @close="handleClose"
      background-color="rgb(0, 20, 44)"
      text-color="rgb(207, 211, 220)"
      active-text-color="#409eff"
      router
    >
      <template v-for="item in store.menuRouteList" :key="item.path">
        <subMenu :menuData="item"></subMenu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import Logo from "../Logo/index.vue";
import subMenu from "./subMenu.vue";
import { useRoute } from "vue-router";
const store = useStore();
const $router = useRoute();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="scss">
.menu_container {
  .el-menu {
    border: 0;

    ::v-deep .el-sub-menu.is-active {
      .el-sub-menu__title {
        color: #409eff;
      }
    }
  }

  .el-menu-item:has(.is-active) {
    background-color: #f0f0f0;
    /* 设置父级菜单的背景色 */
    color: #fff;
    /* 设置父级菜单的文本颜色 */
  }
}
</style>
