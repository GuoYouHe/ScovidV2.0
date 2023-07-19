<script setup lang="ts">
import {
  ref,
  nextTick,
  onMounted,
} from "vue";
import { emitter } from "@/utils/mitt";
import * as echarts from "echarts";
import pagetable from "./pagetable/index.vue";
import left from "@iconify-icons/ic/baseline-keyboard-arrow-left";
import right from "@iconify-icons/ic/baseline-keyboard-arrow-right";
import {
  getbrowsevolcanoselect,
  getbrowsego,
  getbrowsekegg,
  getbrowsevolcano,
  getbrowsevolcanotable
} from "@/api/browse";

interface PropsType {
  DataSet: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  DataSet: "" // 默认值
});
const tableload = ref(false);
let DataList = {};
const loading = ref<boolean>(true);
const tabPosition = ref("volcano");
const volcanoref = ref<HTMLDivElement | null>(null);
const pantablego = ref(false);
const pantablekegg = ref(false);
const echartgoupstatus = ref<boolean>(false);
const echartgodownstatus = ref<boolean>(false);
const echartgoup = ref<HTMLDivElement | null>(null);
const echartgodown = ref<HTMLDivElement | null>(null);
const echartkeggupstatus = ref<boolean>(false);
const echartkeggdownstatus = ref<boolean>(false);
const echartkeggup = ref<HTMLDivElement | null>(null);
const echartkeggdown = ref<HTMLDivElement | null>(null);
const selectvalue1 = ref("celltype");
const selectvalue2 = ref("");
const tissue = ref("");
const dataset = ref(props.DataSet);
const type = ref("");
const celltype = ref("");
const remarkCaruselUp = ref(null);
const remarkCaruselKegg = ref(null);
const isActive = ref(false);
const isActive2 = ref(false);

const selectoptions1 = [
  {
    value: "celltype",
    label: "cell type"
  },
  {
    value: "subtype",
    label: "cell subtype"
  }
];
const selectoptions2 = ref<Array<any>>([]);

async function pan(targetName) {
  loading.value = true;
  switch (targetName.props.name) {
    case "volcano":
      printechart(
        "volcano",
        selectvalue1.value,
        selectvalue2.value,
        tissue.value
      );
      break;
    case "volcanotable":
      tableload.value = true;
      nextTick(() => {
        // dataset.value = props.DataSet;
        // type.value = selectvalue1.value;
        // celltype.value = selectvalue2.value;
        const dataset = props.DataSet;
        const type = selectvalue1.value;
        const celltype = selectvalue2.value;
        emitter.emit("volcanotable", {
          dataset,
          type,
          celltype
        });
      });
      break;
    case "go":
      pantablego.value = true;
      pantablekegg.value = false;
      isActive.value = true;
      isActive2.value = !isActive.value;
      nextTick(() => {
        printechart("go", selectvalue1.value, selectvalue2.value, tissue.value);
      });
      break;
    case "kegg":
      pantablego.value = false;
      pantablekegg.value = true;
      isActive.value = true;
      isActive2.value = !isActive.value;
      nextTick(() => {
        printechart(
          "kegg",
          selectvalue1.value,
          selectvalue2.value,
          tissue.value
        );
      });
      break;
    default:
      break;
  }
}

onMounted(() => {
  if (props.DataSet != "") {
    loading.value = true;
    // tableload.value = true;
    selectoption(selectvalue1.value);
  }
});

function selectchange(var1: string) {
  selectoption(var1);
}

function selectchange2(var1: string) {
  selectvalue2.value = var1;
  loading.value = true;
  switch (tabPosition.value) {
    case "volcano":
      printechart(
        "volcano",
        selectvalue1.value,
        selectvalue2.value,
        tissue.value
      );
      break;
    case "volcanotable":
      tableload.value = true;
      // nextTick(() => {
      const dataset = props.DataSet;
      const type = selectvalue1.value;
      const celltype = selectvalue2.value;
      emitter.emit("volcanotable", {
        dataset,
        type,
        celltype
        // });
      });
      break;
    case "go":
      printechart("go", selectvalue1.value, selectvalue2.value, tissue.value);
      break;
    case "kegg":
      printechart("kegg", selectvalue1.value, selectvalue2.value, tissue.value);
      break;
    default:
      break;
  }
}

async function selectoption(var1: string) {
  const params: object = {
    dataset: props.DataSet,
    type: var1
  };
  const { resultSet } = await getbrowsevolcanoselect(params);
  nextTick(() => {
    selectoptions2.value = resultSet.fourth.dropList;
    selectvalue2.value = selectoptions2.value[0].value;
    tissue.value = resultSet.fourth.tissue;
    loading.value = true;
    switch (tabPosition.value) {
      case "volcano":
        printechart(
          "volcano",
          selectvalue1.value,
          selectvalue2.value,
          tissue.value
        );
        break;
      case "volcanotable":
        tableload.value = true;
        nextTick(() => {
          const dataset = props.DataSet;
          const type = selectvalue1.value;
          const celltype = selectvalue2.value;
          emitter.emit("volcanotable", {
            dataset,
            type,
            celltype
          });
        });
        break;
      case "go":
        printechart("go", selectvalue1.value, selectvalue2.value, tissue.value);
        break;
      case "kegg":
        printechart(
          "kegg",
          selectvalue1.value,
          selectvalue2.value,
          tissue.value
        );
        break;
      default:
        break;
    }
  });
}

function printechart(
  echartname: string,
  var1: string,
  var2: string,
  var3: string
) {
  const params: object = {
    dataset: props.DataSet,
    type: var1,
    celltype: var2,
    tissue: var3,
    pageSize: 5,
    currentPage: 1
  };

  switch (echartname) {
    case "volcano":
      getbrowsevolcano(params)
        .then(res => {
          // console.log(res.resultSet.searchList[0].legendData);

          echartvolcano(
            volcanoref,
            res.resultSet.searchList[0].legendData,
            res.resultSet.searchList[0].color,
            res.resultSet.searchList[0].series
          );
        })
        .finally(() => {
          loading.value = false;
        });
      break;
    case "go":
      getbrowsego(params)
        .then(res => {
          if (
            res.resultSet.upDataList != null &&
            res.resultSet.upDataList.length > 1
          ) {
            echartgoupstatus.value = true;
            nextTick(() => {
              echartGo(
                echartgoup,
                res.resultSet.upDataList,
                res.resultSet.upMax,
                res.resultSet.upMin
              );
            });
          } else if (
            res.resultSet.downDataList != null &&
            res.resultSet.downDataList.length > 1
          ) {
            echartgodownstatus.value = true;
            nextTick(() => {
              echartGo(
                echartgodown,
                res.resultSet.downDataList,
                res.resultSet.downMax,
                res.resultSet.downMin
              );
            });
          } else {
            echartgoupstatus.value = false;
            echartgodownstatus.value = false;
          }
        })
        .finally(() => {
          loading.value = false;
        });
      break;
    case "kegg":
      getbrowsekegg(params)
        .then(res => {
          if (
            res.resultSet.upDataList != null &&
            res.resultSet.upDataList.length > 1
          ) {
            echartkeggupstatus.value = true;
            nextTick(() => {
              echartKegg(
                echartkeggup,
                res.resultSet.upDataList,
                res.resultSet.upMax,
                res.resultSet.upMin
              );
            });
          } else if (
            res.resultSet.downDataList != null &&
            res.resultSet.downDataList.length > 1
          ) {
            echartkeggdownstatus.value = true;
            nextTick(() => {
              echartKegg(
                echartkeggdown,
                res.resultSet.downDataList,
                res.resultSet.downMax,
                res.resultSet.downMin
              );
            });
          } else {
            echartkeggupstatus.value = false;
            echartkeggdownstatus.value = false;
          }
        })
        .finally(() => {
          loading.value = false;
        });
      break;
    default:
      break;
  }
}
function echartvolcano(id, legendData, color, series) {
  var option = {
    title: {
      text: ""
    },

    markLine: {
      silent: true,
      data: [{ xAxis: 1 }],
      lineStyle: {
        normal: {
          type: "solid"
        }
      }
    },
    color: color,
    legend: {
      top: 10,
      data: legendData,
      textStyle: {
        fontSize: 16
      }
    },
    textStyle: {
      fontFamily: 'Times New Roman, serif',
    },
    tooltip: {
      position: "top",
      // formatter:'(Gene:){a} <br/>(log2FC:){b} <br/>(-log10(P-value):){c} <br/>(Status:){d}'
      // formatter:'(系列名称：){a}<br/> (数值数组：){c}'
      formatter: function (params) {
        var str =
          "Gene: " +
          params.data.value[2] +
          "<br/>log2FC:" +
          params.data.value[0] +
          "<br/>P-value:" +
          params.data.value[4] +
          "<br/>Status:" +
          params.data.value[3];
        return str;
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
    xAxis: {
      name: "log2(fold change)",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 18,
        padding: [20, 0, 0, 0]
      },
      axisLabel: {
        show: true,
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize: 16 //更改坐标轴文字大小
        }
      }
    },
    yAxis: {
      name: "-log10(p-value)",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 18,
        padding: 20
      },
      axisLabel: {
        show: true,
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize: 16 //更改坐标轴文字大小
        }
      }
    },
    series: series
  };
  let myChart: any = echarts.getInstanceByDom(id.value);
  if (myChart == undefined) {
    myChart = echarts.init(id.value);
  }
  myChart.clear();
  myChart.setOption(option, true);
}
function echartGo(id, DataList, Max, Min) {
  var option = {
    textStyle: {
      fontFamily: 'Times New Roman, serif',
    },
    tooltip: {
      position: "bottom",
      formatter: function (params) {
        // console.log(params);
        var str =
          "ONTOLOGY:" +
          params.data[3] +
          "<br /> ID:" +
          params.data[4] +
          "<br />Description:" +
          params.data[2] +
          "<br />P-value:" +
          params.data[0] +
          "<br />Gene:" +
          params.data[5];
        return str;
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
    dataset: {
      source: DataList
    },
    grid: { containLabel: true },
    xAxis: {
      name: "-log10(P-value)",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 18,
        padding: [20, 0, 0, 0]
      },
      axisLabel: {
        show: true,
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize: 12 //更改坐标轴文字大小
        }
      }
    },
    yAxis: {
      type: "category",
      nameLocation: "center",
      triggerEvent: true,
      nameTextStyle: {
        fontSize: 18,
        padding: 20
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: 12 //更改坐标轴文字大小
        }
      }
    },
    visualMap: {
      orient: "horizontal",
      hoverLink: false,
      left: "center",
      min: Min,
      max: Max,
      text: ["High p-value", "Low p-value"],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#FD665F", "#FFCE34", "#65B581"]
      }
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        yAxisIndex: [0],
        left: "93%",
        start: 0, //数据窗口范围的起始百分比
        end: 50
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 50
      }
    ],
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product"
        }
      }
    ]
  };
  let myChart: any = echarts.getInstanceByDom(id.value);
  if (myChart == undefined) {
    myChart = echarts.init(id.value);
  }
  myChart.on("mouseover", params => {
    if (params.componentType === "yAxis") {
      yLabel = params.value;
      let offsetX = params.event.offsetX + 10;
      let offsetY = params.event.offsetY + 10;
      myChart.setOption({
        textStyle: {
          fontFamily: 'Times New Roman, serif',
        },
        tooltip: {
          trigger: "axis",
          formatter: formateTooltip,
          alwaysShowContent: true
        }
      });
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: 0,
        position: [offsetX, offsetY]
      });
    } else if (params.componentType === "series") {
      myChart.setOption({
        textStyle: {
          fontFamily: 'Times New Roman, serif',
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            var str =
              "ONTOLOGY:" +
              params.data[3] +
              "<br /> ID:" +
              params.data[4] +
              "<br />Description:" +
              params.data[2] +
              "<br />P-value:" +
              params.data[0] +
              "<br />Gene:" +
              params.data[5];
            return str;
          },
          alwaysShowContent: true,
          position: "bottom"
        }
      });
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: params.seriesIndex,
        dataIndex: params.dataIndex
      });
    }
  });
  myChart.on("mouseout", params => {
    myChart.setOption({
      textStyle: {
        fontFamily: 'Times New Roman, serif',
      },
      tooltip: {
        alwaysShowContent: false
      }
    });
    if (params.componentType === "yAxis") {
      yLabel = "";
    }
  });
  var yLabel = "";
  function formateTooltip(params) {
    return yLabel;
  }
  myChart.clear();
  myChart.setOption(option, true);
}
function echartKegg(id, DataList, Max, Min) {
  var option = {
    textStyle: {
      fontFamily: 'Times New Roman, serif',
    },
    tooltip: {
      position: "top",
      formatter: function (params) {
        var str =
          "ONTOLOGY:" +
          params.data[3] +
          "<br /> ID:" +
          params.data[4] +
          "<br />Description:" +
          params.data[2] +
          "<br />P-value:" +
          params.data[0] +
          "<br />Gene:" +
          params.data[5];
        return str;
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
    dataset: {
      source: DataList
    },
    grid: { containLabel: true },
    xAxis: {
      name: "-log10(P-value)",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 18,
        padding: [20, 0, 0, 0]
      },
      axisLabel: {
        show: true,
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize: 12 //更改坐标轴文字大小
        }
      }
    },
    yAxis: {
      type: "category",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 18,
        padding: 20
      },
      axisLabel: {
        show: true,
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize: 12 //更改坐标轴文字大小
        }
      }
    },
    visualMap: {
      orient: "horizontal",
      hoverLink: false,
      left: "center",
      min: Min,
      max: Max,
      text: ["High p-value", "Low p-value"],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#FD665F", "#FFCE34", "#65B581"]
      }
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        yAxisIndex: [0],
        left: "93%",
        start: 0, //数据窗口范围的起始百分比
        end: 100
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product"
        }
      }
    ]
  };
  let myChart: any = echarts.getInstanceByDom(id.value);
  if (myChart == undefined) {
    myChart = echarts.init(id.value);
  }
  myChart.clear();
  myChart.setOption(option, true);
}
function changekeggplot(value) {
  if (value == 0) {
    isActive.value = true;
    isActive2.value = false;
  } else {
    isActive2.value = true;
    isActive.value = false;
  }
}
function changegoplot(value) {
  if (value == 0) {
    isActive.value = true;
    isActive2.value = false;
  } else {
    isActive2.value = true;
    isActive.value = false;
  }
}
function goup() {
  remarkCaruselUp.value.setActiveItem(0);
}
function godown() {
  remarkCaruselUp.value.setActiveItem(1);
}
function keggup() {
  remarkCaruselKegg.value.setActiveItem(0);
}
function keggdown() {
  remarkCaruselKegg.value.setActiveItem(1);
}
</script>

<template>
  <el-card shadow="never" class="min-h-[780px]">
    <template #header>
      <el-row :gutter="24">
        <el-col :span="12" style="line-height: 32px">
          <span class="cardheardtitle" style="font-weight: bold">Detailed description</span>
        </el-col>
        <el-col :span="12">
          <el-form :inline="true" class="demo-form-inline" style="position: absolute;right: -1%;">
            <el-form-item label="attributes">
              <el-select v-model="selectvalue1" class="m-2" placeholder="Select" @change="selectchange">
                <el-option v-for="item in selectoptions1" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="attributes">
              <el-select v-model="selectvalue2" class="m-2" placeholder="Select" @change="selectchange2">
                <el-option v-for="item in selectoptions2" :key="item.key" :label="item.value" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
    <template #default>
      <div class="Con-table">
        <el-tabs type="border-card" v-model="tabPosition" @tab-click="pan">
          <el-tab-pane label="Volcano" name="volcano">
            <div v-loading="loading" element-loading-text="Loading..." class="echart-img">
              <div ref="volcanoref" style="width: 100%; height: 700px" />
              <!-- echart图底部标题 -->
              <div class="con-leftCon-titleone-pic">
                <span>Figure 1. Two-dimensional UMAP plot.</span>
                <span>
                  The colors of points represent the cell types which cells
                  belong to.
                </span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Table" name="volcanotable">
            <pagetable v-if="tableload" :DataSet="dataset" :Type="type" :Celltype="celltype" />
          </el-tab-pane>
          <el-tab-pane label="GO" name="go">
            <div style="display: flex; justify-content: center">
              <el-button-group>
                <el-button type="primary" :class="{ active: isActive }" @click="goup">
                  <IconifyIconOffline :icon="left" />
                  GO up plot
                </el-button>
                <el-button type="primary" :class="{ active: isActive2 }" @click="godown">
                  GO down plot
                  <IconifyIconOffline :icon="right" />
                </el-button>
              </el-button-group>
            </div>
            <el-carousel ref="remarkCaruselUp" trigger="click" @change="changegoplot" indicator-position="outside"
              height="680px" :autoplay="false" v-if="pantablego">
              <el-carousel-item>
                <div v-if="echartgoupstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                  <div ref="echartgoup" style="width: 100%; height: 600px" />
                  <!-- echart图底部标题 -->
                  <div class="con-leftCon-titleone-pic">
                    <span>Figure 1. Two-dimensional GO UP plot.The colors of points
                      represent the cell types which cells belong to.
                    </span>
                  </div>
                </div>
                <el-empty v-else style="height: 90%" description="Not GO Up plot data please select other celltype" />
              </el-carousel-item>
              <el-carousel-item>
                <div v-if="echartgodownstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                  <div ref="echartgodown" style="width: 100%; height: 600px" />
                  <!-- echart图底部标题 -->
                  <div class="con-leftCon-titleone-pic">
                    <span>Figure 2. Two-dimensional GO DOWN plot. The colors of
                      points represent the cell types which cells belong to.
                    </span>
                  </div>
                </div>
                <el-empty v-else style="height: 90%" description="Not GO Down plot data please select other celltype" />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <el-tab-pane label="KEGG" name="kegg">
            <div style="display: flex; justify-content: center">
              <el-button-group>
                <el-button type="primary" :class="{ active: isActive }" @click="keggup">
                  <IconifyIconOffline :icon="left" />
                  KEGG up plot
                </el-button>
                <el-button type="primary" :class="{ active: isActive2 }" @click="keggdown">
                  KEGG down plot
                  <IconifyIconOffline :icon="right" />
                </el-button>
              </el-button-group>
            </div>
            <el-carousel ref="remarkCaruselKegg" trigger="click" height="680px" :autoplay="false" v-if="pantablekegg"
              indicator-position="outside" @change="changekeggplot">
              <el-carousel-item>
                <div v-if="echartkeggupstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                  <div ref="echartkeggup" style="width: 100%; height: 600px" />
                  <div class="con-leftCon-titleone-pic">
                    <span>Figure 1. Two-dimensional KEGG UP plot.The colors of
                      points represent the cell types which cells belong to.
                    </span>
                  </div>
                </div>
                <el-empty v-else style="height: 90%" description="Not KEGG Up plot data please select other celltype" />
              </el-carousel-item>
              <el-carousel-item>
                <div v-if="echartkeggdownstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                  <div ref="echartkeggdown" style="width: 100%; height: 600px" />
                  <div class="con-leftCon-titleone-pic">
                    <span>Figure 2. Two-dimensional KEGG DOWN plot. The colors of
                      points represent the cell types which cells belong to.
                    </span>
                  </div>
                </div>

                <el-empty v-else style="height: 90%" description="Not KEGG Dowm plot data please select other celltype" />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </el-card>
</template>
<style lang="scss" scoped>
button {
  background-color: white;
  color: rgb(12, 0, 0);
}

button.active {
  background-color: #79bbff;
  color: white;
}

.el-card__header {
  padding: 6px 10px !important;
}

.umap-img {
  width: 80%;
  height: 700px;
  margin: 0 10%;
}

.con-leftCon-titleone-pic {
  margin-top: 10%;
  width: 60%;
  margin: auto;
}

.m-2 {
  margin: 0px 5px !important;
  width: 150px;
}

:deep(.carousel-indicator) {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 6px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
}
</style>
