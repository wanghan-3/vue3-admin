<template>
  <div class="screen_container">
    <div class="screen_view" ref="screenRef">
      <Top />
      <div class="screen_content">
        <div class="screen_left">
          <Tourist class="tourist" />
          <Sex />
          <Age />
        </div>
        <div class="screen_center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="screen_right">
          <Rank class="rank" />
          <Year />
          <Counter />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Top from "./components/top/index.vue";
import Age from "./components/age/index.vue";
import Sex from "./components/sex/index.vue";
import Tourist from "./components/tourist/index.vue";
import Map from "./components/map/index.vue";
import Line from "./components/line/index.vue";
import Counter from "./components/counter/index.vue";
import Rank from "./components/rank/index.vue";
import Year from "./components/year/index.vue";
const screenRef = ref<HTMLDivElement>();
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
};
onMounted(() => {
  (screenRef.value as HTMLDivElement).style.transform =
    `scale(${getScale()}) translate(-50%,-50%)`;
});
window.onresize = () => {
  (screenRef.value as HTMLDivElement).style.transform =
    `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>
<style scoped lang="scss">
.screen_container {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/screen/bg.png) no-repeat center;
  background-size: cover;
  .screen_view {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    padding-bottom: 20px;
    .screen_content {
      display: flex;
      height: calc(100% - 40px);
      .screen_left {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 50px;
        width: 0;
        .tourist {
          flex: 1.25;
        }
        > * {
          flex: 1;
          margin-top: 20px;
        }
      }
      .screen_center {
        flex: 2.5;
        display: flex;
        flex-direction: column;
        padding: 36px 40px 0;
        .map {
          flex: auto;
        }
        .line {
          height: 295px;
        }
      }
      .screen_right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.25;
        }
        > * {
          background: url(@/assets/images/screen/dataScreen-main-lb.png)
            no-repeat;
          background-size: 100% 100%;
          flex: 1;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
