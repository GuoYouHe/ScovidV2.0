<script setup lang="ts">
import { ref, nextTick, computed, onMounted, watch } from "vue";
import { emitter } from "@/utils/mitt";
import * as echarts from "echarts";
import { getbrowsescumap } from "@/api/browse";

interface PropsType {
  DataSet: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "" // 默认值
});

const loading = ref<boolean>(true);
const loadumap = ref<boolean>(false);
const loadtab = ref<boolean>(true);
const tabPositionumap = ref("celltype");
const browseload = ref<boolean>(true);
const dataset = ref();
let echartoption: any = {
  title: {
    // text: "未来一周气温变化",
  },
  progressive: 0,
  grid: {
    top: "15%"
  },
  toolbox: {
    show: true,
    orient: "horizontal",
    itemSize: 15,
    itemGap: 10,
    left: "90%",
    feature: {
      saveAsImage: {
        type: "png",
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
  textStyle: {
    fontFamily: 'Times New Roman, serif',
  },
  tooltip: {
    position: "top",
    formatter: function (params) {
      var str =
        "Cell:" +
        params.data.value[2] +
        "<br/>tSNE_1:" +
        params.data.value[0] +
        "<br/>tSNE_2:" +
        params.data.value[1] +
        "<br/>Cell type:" +
        params.data.value[3];
      return str;
    }
  },
  xAxis: {
    name: "tSNE_1",
    nameLocation: "center",
    nameTextStyle: {
      fontSize: 18,
      padding: [20, 0, 0, 0]
    },
    axisLabel: {
      show: true,
      // textStyle: {
      // color: '#c3dbff',  //更改坐标轴文字颜色
      fontSize: 16 //更改坐标轴文字大小
      // }
    }
  },
  yAxis: {
    name: "tSNE_2",
    nameLocation: "center",
    nameTextStyle: {
      fontSize: 18,
      padding: 20
    },
    axisLabel: {
      show: true,
      // textStyle: {
      fontSize: 16 //更改坐标轴文字大小
      // }
    }
  }
};
const umapChartRef1 = ref<HTMLDivElement | null>(null);
const umapChartRef2 = ref<HTMLDivElement | null>(null);
const umapstatus = ref<boolean>(false);
const emit = defineEmits(["getData"]);

async function umappan(targetName) {
  loading.value = false;
  loadtab.value = true;
  let params: object = {};
  if (targetName.paneName == "subtype") {
    params = {
      dataset: props.DataSet,
      umaptype: targetName.paneName
    };
  } else {
    params = {
      dataset: props.DataSet,
      umaptype: targetName.paneName
    };
  }
  const { resultSet } = await getbrowsescumap(params);
  (echartoption.color = JSON.parse(JSON.stringify(resultSet.second.color))),
    (echartoption.legend = JSON.parse(
      '{"type":"scroll","orient":"horizontal","width":"80%","top":"50","data":' +
      JSON.stringify(resultSet.second.legendData) +
      "}"
    )),
    (echartoption.series = resultSet.second.series);
  nextTick(() => {
    useechart(umapChartRef2, echartoption);
  });
}

onMounted(async () => {
  loadumap.value = false;
  loading.value = true;
  const params: object = {
    dataset: props.DataSet,
    umaptype: "celltype"
  };
  const { resultSet } = await getbrowsescumap(params);
  (echartoption.color = JSON.parse(JSON.stringify(resultSet.second.color))),
    (echartoption.legend = JSON.parse(
      '{"type":"scroll","orient":"horizontal","width":"80%","top":"50","data":' +
      JSON.stringify(resultSet.second.legendData) +
      "}"
    )),
    (echartoption.series = resultSet.second.series),
    setTimeout(() => {
      loadumap.value = true;
      loadtab.value = true;
      nextTick(() => {
        useechart(umapChartRef1, echartoption);
      });
    }, 3000);
});

// function aaa(data) {
//   for (var i = 0; i < data.length; i++) {
//     (data[i].emphasis = JSON.parse('{"focus":"series"}')),
//       (data[i].blur = JSON.parse(
//         '{"itemStyle":' + '{"color":"rgb(255,255,255)"}' + "}"
//       ));
//   }
//   return data;
// }

function useechart(id: any, series: any) {
  let myChart: any = echarts.getInstanceByDom(id.value);
  if (myChart == undefined) {
    myChart = echarts.init(id.value);
  } else {
    myChart.clear();
  }
  myChart.setOption(series);
  loading.value = false;
  loadtab.value = false;
}
</script>

<template>
  <el-card shadow="never" class="min-h-[780px]">
    <template #header>
      <span class="cardheardtitle">tSNE</span>
    </template>
    <template #default>
      <div class="Con-table" v-loading="loading" element-loading-text="Loading...">
        <el-tabs type="border-card" v-model="tabPositionumap" @tab-click="umappan">
          <!-- umap-->
          <el-tab-pane label="Cell type" name="celltype">
            <div v-if="loadumap">
              <div v-loading="loadtab" element-loading-text="Loading..." class="umap-img">
                <div ref="umapChartRef1" style="width: 100%; height: 95%" />
                <!-- echart图底部标题 -->
                <div class="con-leftCon-titleone-pic">
                  <span>Figure 1A. Two-dimensional tSNE plot.</span>
                  <span>
                    The colors of points represent the cell types which cells
                    belong to.
                  </span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Sub type" name="subtype">
            <div v-if="loadumap">
              <div v-loading="loadtab" element-loading-text="Loading..." class="umap-img">
                <div ref="umapChartRef2" style="width: 100%; height: 95%" />
                <!-- echart图底部标题 -->
                <div class="con-leftCon-titleone-pic">
                  <span>Figure 1B. Two-dimensional tSNE plot.</span>
                  <span>The colors of points represent the sub types which cells
                    belong to.</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
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

.Con-table {
  min-height: 650px;
}

.con-leftCon-titleone-pic {
  text-align: center;
}
</style>
