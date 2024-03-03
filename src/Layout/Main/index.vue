<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" appear>
      <div :key="$route.path" style="height: 100%">
        <!-- 用div包裹一个子组件， -->
        <component :is="Component" :key="~~$store.refresh"></component>
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { useRoute } from "vue-router";
const $store = useStore();
const $route = useRoute();
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
