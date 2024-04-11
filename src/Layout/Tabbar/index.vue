<template>
  <div class="toolbar_container">
    <div class="toolbar_left">
      <!-- 左侧展开按钮及 面包屑 -->
      <div class="menu_flex">
        <el-icon
          @click="$store.menuFlex = !$store.menuFlex"
          color="rgb(48, 49, 51)"
          size="24"
          ><Expand v-if="$store.menuFlex" /><Fold v-else
        /></el-icon>
      </div>
      <Breadcrumb />
    </div>
    <!-- 右侧工具 按钮 及 用户信息等 -->
    <div class="toolbar_right">
      <Setting />
      <div>
        <el-dropdown @command="handleClick">
          <span class="el-dropdown-link">
            <el-avatar :src="$store.userInfo.avatar" />
            <p class="user_name">{{ $store.userInfo.name }}</p>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Fold, Expand } from "@element-plus/icons-vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import Breadcrumb from "./Breadcrumb/index.vue";
import Setting from "./Setting/index.vue";
const $router = useRouter();
const $store = useStore();
const logout = () => {
  $store.userLogoutAction().then(() => {
    $router.replace({ path: "/login" });
  });
};

const handleClick = (key: string) => {
  switch (key) {
    case "logout":
      logout();
      break;

    default:
      break;
  }
};
</script>

<style scoped lang="scss">
.toolbar_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 2px soild rgb(220, 223, 230);
  .toolbar_left {
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 10px;
    }
    .menu_flex {
      display: flex;
      align-items: center;
    }
  }
  .toolbar_right {
    display: flex;
    align-items: center;
    .el-dropdown {
      margin-left: 10px;
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
      .user_name {
        margin: 0 2px 0 2px;
      }
    }
  }
}
</style>
