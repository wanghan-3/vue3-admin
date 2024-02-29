<template>
  <div class="layout_container">
    <el-container>
      <el-aside :width="$store.menuFlex ? '64px' : '200px'">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <Tabbar></Tabbar>
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Tabbar from "./Tabbar/index.vue";
import Menu from "./Menu/index.vue";
import { useStore } from "@/store";
import Main from "./Main/index.vue";

const $store = useStore();
</script>
<style scoped lang="scss">
.layout_container {
  height: 100vh;
  > .el-container {
    height: 100%;
    > .el-aside {
      background-color: rgb(0, 20, 44);
      transition: 0.5s;
      // .el-menu {
      //   background-color: rgb(0, 20, 44);
      // }
    }
    .el-header {
      border-bottom: 2px solid rgb(220, 223, 230);
    }
  }
}
</style>
