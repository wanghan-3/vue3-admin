<template>
  <div class="screen_top">
    <div class="left">
      <div class="l_btn" @click="$router.push('/')">首页</div>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化数据大屏</div>
    </div>
    <div class="right">
      <div class="r_btn">统计报告</div>
      <div class="current_time">当前时间:{{ currentTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
const currentTime = ref(getCurrentTime());
const $router = useRouter();
let timmer: any = null;
function getCurrentTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedTime = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;

  return formattedTime;
}
const mySetTimeout = (cb: any) => {
  timmer = setTimeout(() => {
    cb();
    mySetTimeout(cb);
  }, 1000);
};
mySetTimeout(() => {
  currentTime.value = getCurrentTime();
});
onBeforeUnmount(() => {
  clearTimeout(timmer);
});
</script>
<style scoped lang="scss">
$tColor: #29fcff;
.screen_top {
  height: 40px;
  width: 100%;
  display: flex;
  .left {
    flex: 1.5;
    background: url(@/assets/images/screen/dataScreen-header-left-bg.png)
      no-repeat;
    background-size: cover;
    height: 100%;
    .l_btn {
      width: 135px;
      height: 100%;
      text-align: center;
      float: right;
      background: url(@/assets/images/screen/dataScreen-header-btn-bg-l.png)
        no-repeat;
      background-size: 100% 100%;
      color: $tColor;
      cursor: pointer;
      font-size: 20px;
      &::after {
        content: "";
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .center {
    flex: 2;
    .title {
      background: url(@/assets/images/screen/dataScreen-header-center-bg.png)
        no-repeat;
      background-size: 100% 100%;
      color: $tColor;
      line-height: 74px;
      font-size: 30px;
      text-align: center;
    }
  }
  .right {
    flex: 1.5;
    background: url(@/assets/images/screen/dataScreen-header-right-bg.png)
      no-repeat;
    background-size: 100% 100%;
    font-size: 20px;
    color: $tColor;
    display: flex;
    justify-content: space-between;
    .r_btn {
      height: 100%;
      cursor: pointer;
      width: 135px;
      font-size: 20px;
      background: url(@/assets/images/screen/dataScreen-header-btn-bg-r.png)
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      &::after {
        content: "";
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .current_time {
      font-size: 16px;
      text-align: center;
      padding-right: 10px;
      &::after {
        content: "";
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
