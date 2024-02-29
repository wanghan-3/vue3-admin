<template>
  <!-- 没有子路由 渲染父级 -->

  <template v-if="!menuData.children">
    <el-menu-item :index="menuData.path" v-if="!menuData.meta.hidden">
      <el-icon v-if="menuData.meta.icon"
        ><component :is="menuData.meta.icon"></component
      ></el-icon>
      <template #title>{{ menuData?.meta?.title }}</template>
    </el-menu-item>
  </template>

  <!-- 有子路由 但是只有一个 -->

  <template v-else-if="menuData.children && menuData.children.length === 1">
    <el-menu-item
      :index="menuData.children[0].path"
      v-if="!menuData.children[0].meta.hidden"
    >
      <el-icon v-if="menuData.children[0].meta.icon"
        ><component :is="menuData.children[0].meta.icon"></component
      ></el-icon>
      <template #title>{{ menuData.children[0]?.meta?.title }}</template>
    </el-menu-item>
  </template>

  <!-- 有子路由 但是只有一个 -->

  <template v-else-if="menuData.children.length > 0">
    <el-sub-menu :index="menuData.path" v-if="!menuData.meta.hidden">
      <template #title>
        <el-icon v-if="menuData.meta.icon"
          ><component :is="menuData.meta.icon"></component
        ></el-icon>
        <span>{{ menuData?.meta?.title }}</span>
      </template>
      <template v-for="cItem in menuData.children" :key="cItem.path">
        <subMenu :menu-data="cItem"></subMenu>
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps({
  menuData: { type: Object, default: () => ({}) },
});
</script>
