<template>
  <div class="line_container">
    <Title title="未來30天游客趋势图" />
    <div class="line_chart" ref="lineChart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Title from "../title/index.vue";
import * as echarts from "echarts";
import { getRandomNumber } from "@/utils";
const lineChart = ref<any>();

onMounted(() => {
  const dateArr: string[] = [];
  const data: number[] = [];
  for (let i = 0; i < 30; i++) {
    let time;
    if (i == 0) {
      time = new Date().getTime();
    } else {
      time = new Date(dateArr[i - 1]).getTime();
    }

    dateArr.push(getNextDay(time));
    data.push(getRandomNumber());
  }
  echarts.init(lineChart.value).setOption({
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false, // 坐标轴两边留白策略
      data: dateArr,
      axisLabel: {
        show: true,
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        // 网格线
        show: false,
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置
        show: true,
        color: "#fff",
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    series: [
      {
        data,
        type: "line",
        areaStyle: {
          // 区域填充样式
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(69, 92, 175)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        title: "访问量",
        smooth: true, // 平滑曲线
      },
    ],
    grid: {
      left: "5%",
      top: "12%",
      right: "2%",
      bottom: "15%",
    },
  });
});
// 获取下一天的日期
const getNextDay = (dateString: string | number) => {
  // 将日期字符串转换为日期对象
  const date = new Date(dateString);

  // 获取当前日期的时间戳
  const timestamp = date.getTime();

  // 增加一天的毫秒数（24小时 * 60分钟 * 60秒 * 1000毫秒）
  const nextDayTimestamp = timestamp + 24 * 60 * 60 * 1000;

  // 创建下一天的日期对象
  const nextDay = new Date(nextDayTimestamp);

  // 获取月份和日期
  const month = String(nextDay.getMonth() + 1).padStart(2, "0"); // 使用 padStart 补零
  const day = String(nextDay.getDate()).padStart(2, "0");

  // 格式化为月份-日期的形式
  const formattedDate = `${month}-${day}`;

  return formattedDate;
};
</script>
<style scoped lang="scss">
.line_container {
  background: url(@/assets/images/screen/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .line_chart {
    flex: auto;
  }
}
</style>
