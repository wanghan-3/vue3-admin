<template>
  <svg :style="{ ...sizeStyle }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: "",
  },
  //svg宽度
  width: {
    type: String,
    default: "16px",
  },
  //svg高度
  height: {
    type: String,
    default: "16px",
  },
  size: {
    type: String,
    default: "",
  },
});
const sizeStyle = computed(() => {
  return {
    width: props.size || props.width,
    height: props.size || props.height,
  };
});
</script>
<style scoped></style>
