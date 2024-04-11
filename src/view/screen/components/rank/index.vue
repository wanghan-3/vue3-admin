<template>
  <div class="rank_container">
    <Title title="热门景区排行" />
    <div class="charts_header">
      <span>景区</span>
      <span>预约量</span>
    </div>
    <div class="rank_list" ref="rankCharts"></div>
  </div>
</template>

<script setup lang="ts">
import Title from "../title/index.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const rankCharts = ref<any>();
onMounted(() => {
  const data2 = [
    { lab: "都江堰", lab2: "7.5w", count: 70, count2: 100 },
    { lab: "峨眉山", lab2: "8.9w", count: 34, count2: 100 },
    { lab: "武侯祠", lab2: "1w", count: 60, count2: 100 },
    { lab: "三圣乡", lab2: "2w", count: 78, count2: 100 },
    { lab: "熊猫基地", lab2: "1.5w", count: 69, count2: 100 },
    // { lab: "社交", count: 320, count2: 700 },
  ].sort((a, b) => b.count - a.count);
  // 柱状图3
  const option3 = {
    grid: {
      left: "10%",
      right: "10%",
      bottom: "0%",
      top: "0%",
      containLabel: true,
    },
    xAxis: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        const str =
          params.componentIndex === 0
            ? `${params.marker}${params.name}:<br>预约量：${params.value}%`
            : "";
        // 修改tooltip显示的内容
        return str;
      },
    },
    yAxis: [
      {
        type: "category",
        data: data2.map((m) => m.lab),
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fff",
        },
      },
      {
        type: "category",
        data: data2.map((m) => m.lab2),
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fff",
        },
      },
    ],
    series: [
      {
        name: "条",
        type: "bar",
        data: data2.map((m) => m.count),
        yAxisIndex: 0,
        barWidth: 10, // 柱子宽度
        barCategoryGap: 50, // 设置柱子间距
        itemStyle: {
          color: function ({ dataIndex }: any) {
            return ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"][
              dataIndex
            ];
          },
          borderRadius: [20, 20, 20, 20], // 圆柱圆角
        },
        label: {
          show: true,
          color: "#fff",
          position: "inside",
          formatter: "{c}%",
        },
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        data: data2.map((m) => m.count2),
        barWidth: 15,
        barCategoryGap: 50,
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          borderRadius: [15, 15, 15, 15], // 圆柱圆角
        },
      },
    ],
  };
  echarts.init(rankCharts.value).setOption(option3);
});
</script>
<style scoped lang="scss">
.rank_container {
  display: flex;
  flex-direction: column;
  .charts_header {
    margin: 30px 10px 0 10px;
    width: calc(100% - 20px);
    height: 40px;
    background: url(@/assets/images/screen/rankingChart-bg.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;
    line-height: 40px;
    > span:first-child {
      padding-left: 40px;
    }
    > span:nth-child(2) {
      padding-left: 70px;
    }
  }
  .rank_list {
    flex: 1;
  }
}
</style>
