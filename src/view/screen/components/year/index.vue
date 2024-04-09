<template>
  <div class="year_container">
    <Title title="年度游客量对比" />
    <div class="year_content" ref="yearCharts"></div>
  </div>
</template>

<script setup lang="ts">
import Title from "../title/index.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { getRandomNumber } from "@/utils";
const yearCharts = ref<any>();
onMounted(() => {
  const valueList1 = [];
  const valueList2 = [];
  const valueList3 = [];
  for (let i = 0; i < 12; i++) {
    valueList1.push(getRandomNumber(100, 1000));
    valueList2.push(getRandomNumber(100, 1000));
    valueList3.push(getRandomNumber(100, 1000));
  }

  const dateList = Array.from({ length: 12 }, (_v: any, k) => k + 1);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        label: {
          show: true,
          formatter: "{value} 月",
        },
      },
    },
    legend: {
      data: ["2023年", "2022年", "2021年"],
      right: 0,
      top: 0,
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      data: dateList,
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      boundaryGap: false,
    },

    yAxis: {
      splitLine: {
        //网格线
        show: false,
      },
      name: "人数",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      nameTextStyle: {
        align: "right",
      },
    },

    grid: [
      {
        top: "15%",
        right: "4%",
        bottom: "10%",
        left: "12%",
      },
    ],
    series: [
      {
        name: "2023年",
        type: "line",
        showSymbol: false,
        data: valueList1,
        areaStyle: {},
        smooth: true,
      },
      {
        name: "2022年",
        type: "line",
        showSymbol: false,
        data: valueList2,
        areaStyle: {},
        smooth: true,
      },
      {
        name: "2021年",
        type: "line",
        showSymbol: false,
        data: valueList3,
        areaStyle: {},
        smooth: true,
      },
    ],
  };
  echarts.init(yearCharts.value).setOption(option);
});
</script>
<style scoped lang="scss">
.year_container {
  display: flex;
  flex-direction: column;
  .year_content {
    padding-top: 10px;
    flex: 1;
  }
}
</style>
