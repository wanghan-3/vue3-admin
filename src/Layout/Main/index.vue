<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" :key="~~$store.refresh"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const $store = useStore();
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
