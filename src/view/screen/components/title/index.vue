<template>
  <div class="title_container">
    <p>{{ props.title }}</p>
    <p class="bg"></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
});
</script>
<style scoped lang="scss">
.title_container {
  color: #59b4e6;
  font-size: 20px;
  .bg {
    margin-top: 10px;
    background: url(@/assets/images/screen/dataScreen-title.png) no-repeat;
    width: 70px;
    height: 20px;
  }
}
</style>
