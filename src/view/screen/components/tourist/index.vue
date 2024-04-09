<template>
  <div class="tourist_container">
    <div class="top">
      <div class="left">
        <Title title="实时游客数据统计" />
      </div>
      <div class="right">
        <p>可预约总量<span>1000</span>人</p>
      </div>
    </div>
    <div class="people_num">
      <div v-for="item in peopleNumZero + '人'" :key="item">
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="circle_chart" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
import Title from "../title/index.vue";
const peopleNum = ref(12006);
const echartsRef = ref<HTMLDivElement>();
const peopleNumZero = computed(() => {
  let zero = "";
  for (let i = 0; i < 6 - (peopleNum.value + "").length; i++) {
    zero += "0";
  }
  return zero + peopleNum.value;
});
onMounted(() => {
  // 获取e-chart实例
  let myChart = echarts.init(echartsRef.value);
  myChart.setOption({
    series: [
      {
        type: "liquidFill",
        data: [0.6, 0.5],
        name: "Liquid Fill",
        radius: "85%",
      },
    ],
    tooltip: {
      show: true,
    },
  });
});
</script>
<style scoped lang="scss">
.tourist_container {
  background: url(@/assets/images/screen/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  height: 0;
  .top {
    display: flex;
    justify-content: space-between;
    color: #59b4e6;
    padding-right: 6px;
    .right {
      display: flex;
      align-items: end;
    }
  }
  .people_num {
    display: flex;
    justify-content: space-around;
    margin: 35px 0 20px;
    padding: 0 5px;
    > div {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background: url(@/assets/images/screen/total.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .circle_chart {
    width: 100%;
    flex: 1;
    height: 0;
  }
}
</style>
