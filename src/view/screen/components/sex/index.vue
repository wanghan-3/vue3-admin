<template>
  <div class="sex_container">
    <Title title="男女比例" />
    <div class="sex_content">
      <div class="man">
        <p>男士</p>
        <img src="@/assets/images/screen/man.png" />
      </div>
      <div class="woman">
        <p>女士</p>
        <img src="@/assets/images/screen/woman.png" />
      </div>
    </div>
    <div class="rate">
      <div class="rate_title">
        <span>男士：{{ manRate }}%</span>
        <span>女士：{{ womanRate }}%</span>
      </div>
      <div class="rate_box" ref="rateBox"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "../title/index.vue";
import { ref, computed, onMounted } from "vue";
import * as echarts from "echarts";
const rateBox = ref<HTMLDivElement>();
const manRate = ref(50);
const womanRate = computed(() => {
  return 100 - manRate.value;
});
onMounted(() => {
  const rateChart = echarts.init(rateBox.value);
  rateChart.setOption({
    //组件标题
    title: {
      textStyle: {
        //主标题颜色
        color: "skyblue",
      },
      left: "40%",
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        type: "bar",
        data: [manRate.value + 2.5],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: "#007afe",
          borderRadius: 20,
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: "-100%",
        itemStyle: {
          color: "#ff4b7a",
          borderRadius: 20,
        },
      },
    ],
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
.sex_container {
  background: url(@/assets/images/screen/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .sex_content {
    display: flex;
    justify-content: center;
    > div {
      margin: 20px;
      width: 100px;
      height: 112px;
      display: flex;
      flex-direction: column;
      align-items: center;
      > p {
        font-size: 14px;
        line-height: 17px;
      }
      > img {
        margin-top: 20px;
      }
      &.man {
        background: url(@/assets/images/screen/man-bg.png) no-repeat;
        background-size: 100% 100%;
        color: rgb(0, 122, 254);
      }
      &.woman {
        background: url(@/assets/images/screen/woman-bg.png) no-repeat;
        background-size: 100% 100%;
        color: rgb(255, 75, 122);
      }
    }
  }
  .rate {
    flex: 1;
    width: 100%;
    padding: 0 60px 20px;
    display: flex;
    flex-direction: column;
    .rate_title {
      display: flex;
      justify-content: space-between;
      color: #ff4b7a;
      > span:first-child {
        color: #007afe;
      }
    }
    .rate_box {
      flex: 1;
    }
  }
}
</style>
