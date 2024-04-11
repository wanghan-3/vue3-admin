<template>
  <div class="not_found_page">
    <div class="center" :class="{ 'fade-in': isShow }">
      <SvgIcon name="404" :color="$store.themeColor" size="500"></SvgIcon>
      <h1>页面走丢了</h1>
      <div>
        <el-button type="primary" size="large" @click="$router.push('/')">
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
const isShow = ref(false);
const $store = useStore();
const $router = useRouter();
onMounted(() => {
  isShow.value = true;
});
</script>
<style scoped lang="scss">
.not_found_page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @include center;
  .center {
    &.fade-in {
      animation: fadeIn 1s forwards;
    }
    h1 {
      text-align: center;
      font-size: 38px;
      font-weight: bold;
      margin-top: 20px;
    }
    > div {
      @include center;
      margin-top: 20px;
      margin-bottom: 150px;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
