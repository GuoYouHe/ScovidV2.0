<script setup lang="ts">
import { ref, nextTick, computed, onMounted, watch } from "vue";
import { emitter } from "@/utils/mitt";
import * as echarts from "echarts";
import { getbrowsescabundance } from "@/api/browse";

interface PropsType {
  DataSet: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "" // 默认值
});

const loading = ref<boolean>(true);
const abundanceChartRef1 = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  if (props.DataSet != "") {
    loading.value = true;
    const params: object = {
      dataset: props.DataSet,
      abundancetype: "bulk"
    };
    const { resultSet } = await getbrowsescabundance(params);
    nextTick(() => {
      setTimeout(() => {
        useechart(abundanceChartRef1, resultSet.third);
      }, 550);
    });
  }
});

function useechart(id: any, data: any) {
  // 定义比较函数，比较每个字符串的后数字
  function compareByLastTwoChars(a, b) {
    let lastTwoA = parseInt(a.split(".")[1]);
    let lastTwoB = parseInt(b.split(".")[1]);
    return lastTwoA - lastTwoB;
    // lastTwoA.localeCompare(lastTwoB); //用于字母
  }
  // 定义比较函数，比较每个字符串的后数字
  function compareByfirstChars(a, b) {
    let lastTwoA = a[0];
    let lastTwoB = b[0];
    return lastTwoA.localeCompare(lastTwoB); //用于字母
  }

  var legendData = [];
  var seriess = [];
  for (var item of data.dataList) {
    legendData.push(item.name);
    seriess.push({
      name: item.name,
      type: "bar",
      stack: "total",
      emphasis: {
        focus: "series"
      },
      blur: {
        itemStyle: {
          color: "rgb(255,255,255)"
        }
      },
      data: item.data
    });
  }
  let myChart: any = echarts.getInstanceByDom(id.value);
  if (myChart == undefined) {
    myChart = echarts.init(id.value);
  }
  myChart.clear();
  var option = {
    textStyle: {
      fontFamily: 'Times New Roman, serif',
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    toolbox: {
      show: true,
      orient: "horizontal",
      itemSize: 15,
      itemGap: 10,
      left: "90%",
      feature: {
        saveAsImage: {
          type: "jpeg",
          // name: dataname,
          connectedBackgroundColor: "#FFFFFF",
          title: "save as picture"
        },
        dataView: {
          readOnly: true,
          show: true,
          title: "data view",
          lang: ["data view", "close"]
        },
        magicType: {
          show: false
        },
        dataZoom: {
          show: false
        }
      }
    },
    legend: {
      type: "scroll",
      top: "6%",
      // top: '10%',
      // orient: 'vertical',
      // right: 'right',
      data: legendData
    },
    color: data.color,
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      // name: "x轴",
      data: data.sampleList
        .sort(compareByLastTwoChars)
        .sort(compareByfirstChars), // 使用比较函数对字符串数组进行排序
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 0,
        rotate: "45"
      }
    },
    yAxis: {
      type: "value"
      // name: "y轴",
    },
    series: seriess
  };
  myChart.setOption(option, true);
  loading.value = !loading.value;
}
</script>

<template>
  <el-card shadow="never" class="min-h-[780px]">
    <template #header>
      <span class="cardheardtitle">Cell proportion</span>
    </template>
    <template #default>
      <div class="Con-table">
        <div v-loading="loading" element-loading-text="Loading..." class="umap-img">
          <div ref="abundanceChartRef1" style="width: 100%; height: 100%" />
        </div>
        <!-- echart图底部标题 -->
        <div class="con-leftCon-titleone-pic">
          <span>Figure 1. Cell proportion plot that displays the proportion of each
            cell types per sample in the selected dataset.</span>
        </div>
      </div>
    </template>
  </el-card>
</template>
<style lang="scss" scoped>
.umap-img {
  width: 80%;
  height: 700px;
  margin: 0 10%;
}

.con-leftCon-titleone-pic {
  text-align: center;
}
</style>
