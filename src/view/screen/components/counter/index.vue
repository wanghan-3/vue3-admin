<template>
  <div class="counter_container">
    <Title title="渠道预约数据统计" />
    <div class="counter" ref="counterCharts"></div>
  </div>
</template>

<script setup lang="ts">
import Title from "../title/index.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const counterCharts = ref<any>();
onMounted(() => {
  function Pie() {
    let dataArr = [];
    for (let i = 0; i < 150; i++) {
      if (i % 3 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 10,
          itemStyle: {
            color: "#fff",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        });
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 25,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)",
          },
        });
      }
    }
    return dataArr;
  }
  const option = {
    legend: {
      orient: "vertical",
      icon: "circle",
      top: "center",
      left: "2%",
      x: "center",
      textStyle: {
        color: "#fff",
      },
      data: ["智慧文旅平台", "携程", "飞猪", "其他渠道"],
    },
    series: [
      {
        type: "pie",
        center: ["65%", "47%"],
        radius: ["60%", "85%"],
        color: [
          "#0E7CE2",
          "#FF8352",
          "#E271DE",
          "#F8456B",
          "#00FFFF",
          "#4AEAB0",
        ],
        itemStyle: {
          borderColor: "#031845",
          borderWidth: 10,
        },
        data: [
          {
            value: 335,
            name: "智慧文旅平台",
          },
          {
            value: 310,
            name: "携程",
          },
          {
            value: 251,
            name: "飞猪",
          },
          {
            value: 200,
            name: "其他渠道",
          },
        ],
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
      {
        type: "pie",
        radius: ["22%", "24%"],
        center: ["65%", "47%"],

        color: ["#ffffff", "red"],
        startAngle: 115,
        data: [
          {
            value: 30,
            itemStyle: {
              color: "transparent",
            },
          },
          {
            value: 10,
            itemStyle: {
              color: "transparent",
            },
          },
          {
            value: 60,
            itemStyle: {
              color: "#ffffff",
              borderWidth: 6,
              borderColor: "#ffffff",
            },
          },
        ],
        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
      {
        type: "pie",
        radius: ["0%", "26%"],
        center: ["65%", "47%"],

        startAngle: 90,
        name: "232",
        data: [
          {
            value: 25,
            itemStyle: {
              color: "transparent",
              borderWidth: 4,
              borderColor: "#ffffff",
            },
          },
          {
            value: 75,
            itemStyle: {
              color: "transparent",
            },
          },
        ],

        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
      {
        type: "pie",
        radius: ["93%", "94%"],
        center: ["65%", "47%"],
        color: [
          "blue",
          "transparent",
          "blue",
          "transparent",
          "blue",
          "transparent",
        ],
        data: [
          {
            value: 17,
            name: "11",
          },
          {
            value: 17,
            name: "22",
          },
          {
            value: 17,
            name: "33",
          },
          {
            value: 17,
            name: "44",
          },
          {
            value: 17,
            name: "55",
          },
          {
            value: 17,
            name: "66",
          },
        ],

        labelLine: {
          show: false,
        },
        label: {
          show: false,
        },
      },
      {
        type: "pie",
        zlevel: 0,
        silent: true,
        center: ["65%", "47%"],
        radius: ["40%", "41%"],
        z: 10,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: Pie(),
      },
      {
        type: "pie",
        zlevel: 0,
        silent: true,
        center: ["65%", "47%"],
        radius: ["54%", "56%"],
        z: 10,
        startAngle: 90,
        label: {
          show: false,
        },
        color: ["red", "blue", "red", "blue"],

        labelLine: {
          show: false,
        },

        data: [
          {
            name: "r1",
            value: 25,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(51,149,191,0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(51,149,191,0)",
                },
              ]),
            },
          },
          {
            name: "r2",
            value: 25,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(0,0,0,0)",
                },
                {
                  offset: 1,
                  color: "rgba(51,149,191,0.5)",
                },
              ]),
            },
          },
          {
            name: "r3",
            value: 25,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(51,149,191,0)",
                },
                {
                  offset: 1,
                  color: "rgba(51,149,191,0.5)",
                },
              ]),
            },
          },
          {
            name: "r4",
            value: 25,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(51,149,191,0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(0,0,0,0)",
                },
              ]),
            },
          },
        ],
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        return params.name
          ? `${params.marker + params.name} : ${params.percent}%`
          : "";
      },
    },
  };
  echarts.init(counterCharts.value).setOption(option);
});
</script>
<style scoped lang="scss">
.counter_container {
  display: flex;
  flex-direction: column;
  .counter {
    flex: 1;
  }
}
</style>
