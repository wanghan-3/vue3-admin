<template>
  <div class="home_container">
    <el-card shadow="hover">
      <div class="user_box">
        <el-avatar :size="85" :src="$store.userInfo.avatar"></el-avatar>
        <h1 style="font-size: 35px; margin-left: 20px">
          {{ $store.userInfo.name + " , " + getTimeOfDay() }}好~
        </h1>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { getTimeOfDay } from "@/utils";
const $store = useStore();
</script>
<style scoped lang="scss">
.home_container {
  .user_box {
    display: flex;
    align-items: center;
  }
}
</style>
