<template>
  <div class="age_container">
    <Title title="年龄比例"></Title>
    <div class="charts" ref="pieChart"></div>
  </div>
</template>

<script setup lang="ts">
import Title from "../title/index.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const pieChart = ref<HTMLDivElement>();
onMounted(() => {
  echarts.init(pieChart.value).setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      right: 10,
      top: 10,
      orient: "vertical", //图例组件方向的设置
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "80%"],
        avoidLabelOverlap: false,
        left: "-30%",
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          formatter: "{d}",
          color: "#fff",
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 735, name: "10岁以下" },
          { value: 580, name: "10-20岁" },
          { value: 1048, name: "20-40岁" },
          { value: 484, name: "40-60岁" },
          { value: 300, name: "60岁以上" },
        ],
      },
    ],
    //调整图形图标的位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>
<style scoped lang="scss">
.age_container {
  background: url(@/assets/images/screen/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .charts {
    flex: 1;
  }
}
</style>
