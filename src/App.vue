<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import en from "element-plus/dist/locale/en.mjs";
import { computed } from "vue";
import { useStore } from "@/store";
const store = useStore();

let localeList: { [key: string]: any } = { zhCn, en };
// 语言
const locale = computed(() => {
  return localeList[store.currentLocale];
});
store.init();
</script>
<style scoped lang="scss">
h1 {
  background-color: pink;
}
</style>
