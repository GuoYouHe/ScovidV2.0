<script setup lang="ts">
import {
  ref,
  nextTick,
  computed,
  onMounted,
  watch,
  defineComponent,
  h
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
const tabPosition1 = ref(true);
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
    label: "Cell type"
  },
  {
    value: "subtype",
    label: "Sub type"
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
        emitter.emit("volcanotablesc", {
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

async function pan1(val) {
  // console.log('pan1', val);
  loading.value = true;
  switch (val) {
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
        emitter.emit("volcanotablesc", {
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
      // console.log(tabPosition1.value);

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
    nextTick(() => { loading.value = true; })
    // 
    selectoption(selectvalue1.value);
    // loading.value = false;
  }
});

async function goandkegg() {
  const params: object = {
    dataset: props.DataSet,
    type: selectvalue1.value,
    celltype: selectvalue2.value,
    tissue: tissue.value,
    pageSize: 5,
    currentPage: 1
  };
  await getbrowsego(params)
    .then(res => {
      echartgoupstatus.value = false;
      echartgodownstatus.value = false;
      if (
        res.resultSet.upDataList != null &&
        res.resultSet.upDataList.length > 1
      ) {
        echartgoupstatus.value = true;
      }
      if (
        res.resultSet.downDataList != null &&
        res.resultSet.downDataList.length > 1
      ) {
        echartgodownstatus.value = true;
      }
    })
    .finally(() => {
      loading.value = false;
    });
  await getbrowsekegg(params)
    .then(res => {
      echartkeggupstatus.value = false;
      echartkeggdownstatus.value = false;
      if (
        res.resultSet.upDataList != null &&
        res.resultSet.upDataList.length > 1
      ) {
        echartkeggupstatus.value = true;
      }
      if (
        res.resultSet.downDataList != null &&
        res.resultSet.downDataList.length > 1
      ) {
        echartkeggdownstatus.value = true;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

async function goandkeggstatus() {
  if (echartgoupstatus.value || echartgodownstatus.value) {
    if (tabPosition.value == 'go') {
      pan1('go')
    }
    if (!(echartkeggupstatus.value || echartkeggdownstatus.value)) {
      nextTick(() => {
        tabPosition.value = 'go'
        pan1('go')
      })
    }
  } else {
    if (echartkeggupstatus.value || echartkeggdownstatus.value) {
      if (tabPosition.value == 'go') {
        nextTick(() => {
          tabPosition.value = 'kegg'
          pan1('kegg')
        })
      }
    } else {
      if (tabPosition.value == 'go' || tabPosition.value == 'kegg') {
        nextTick(() => {
          tabPosition.value = 'volcano'
          pan1('volcano')
        })
      }
    }
  }
}

function selectchange(var1: string) {
  selectoption(var1);
}

async function selectchange2(var1: string) {
  selectvalue2.value = var1;
  loading.value = true;
  // console.log(tabPosition.value);

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
      // tableload.value = false;
      // tableload.value = true;
      const dataset = props.DataSet;
      const type = selectvalue1.value;
      const celltype = selectvalue2.value;
      setTimeout(() => {
        emitter.emit("volcanotablesc", {
          dataset,
          type,
          celltype
        });
      }, 50);
      break;
    case "go":
      isActive.value = true;
      isActive2.value = false;
      await printechart("go", selectvalue1.value, selectvalue2.value, tissue.value);
      // await goandkegg()
      // await goandkeggstatus()
      break;
    case "kegg":
      isActive.value = true;
      isActive2.value = false;
      await printechart("kegg", selectvalue1.value, selectvalue2.value, tissue.value);
      // console.log(selectvalue2.value);
      // await goandkegg()
      // await goandkeggstatus()
      break;
    default:
      break;
  }
  tabPosition1.value = false

  nextTick(() => {
    goandkegg()
    tabPosition1.value = true
  })

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
        goandkegg()
        break;
      case "volcanotable":
        tableload.value = true;
        nextTick(() => {
          const dataset = props.DataSet;
          const type = selectvalue1.value;
          const celltype = selectvalue2.value;
          emitter.emit("volcanotablesc", {
            dataset,
            type,
            celltype
          });
        });
        break;
      case "go":
        printechart("go", selectvalue1.value, selectvalue2.value, tissue.value);
        goandkegg()
        goandkeggstatus()
        break;
      case "kegg":
        printechart("kegg", selectvalue1.value, selectvalue2.value, tissue.value);
        goandkegg()
        goandkeggstatus()
        break;
      default:
        break;
    }
    // goandkegg()
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
          echartgoupstatus.value = false;
          echartgodownstatus.value = false;
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
          }
          if (
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
          } if (
            !(res.resultSet.upDataList != null &&
              res.resultSet.upDataList.length > 1) && !(
                res.resultSet.downDataList != null &&
                res.resultSet.downDataList.length > 1
              )
          ) {
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
          echartkeggupstatus.value = false;
          echartkeggdownstatus.value = false;
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
          }
          if (
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
          }
          if (
            !(res.resultSet.upDataList != null &&
              res.resultSet.upDataList.length > 1) && !(
                res.resultSet.downDataList != null &&
                res.resultSet.downDataList.length > 1
              )
          ) {
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
          type: "svg",
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
    myChart = echarts.init(id.value, null, { renderer: 'svg', useDirtyRect: false });
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
          type: "svg",
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
    // dataset: {
    //   source: DataList
    // },
    dataset: [
      {
        dimensions: ["score", "amount", "product", "a", "b", "c"],
        source: DataList
      },
      {
        transform: {
          type: "sort",
          config: [
            { dimension: "a", order: "asc" },
            { dimension: "amount", order: "asc" }
          ]
        }
      }
    ],
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
    // visualMap: {
    //   orient: "horizontal",
    //   hoverLink: false,
    //   left: "center",
    //   min: Min,
    //   max: Max,
    //   text: ["High p-value", "Low p-value"],
    //   // Map the score column to color
    //   dimension: 0,
    //   inRange: {
    //     color: ["#FD665F", "#FFCE34", "#65B581"]
    //   }
    // },
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
        },
        datasetIndex: 1,
        itemStyle: {
          color: function (params) {
            return {
              BP: "#5470c6",
              CC: "#91cc75",
              MF: "#fac858"
            }[params.value[3]];
          }
        }
      }
    ]
  };
  let myChart: any = echarts.getInstanceByDom(id.value);
  if (myChart == undefined) {
    myChart = echarts.init(id.value, null, { renderer: 'svg', useDirtyRect: false });
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
          type: "svg",
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
    dataset: [
      {
        dimensions: ["score", "amount", "product", "a", "b", "c"],
        source: DataList
      },
      {
        transform: {
          type: "sort",
          config: [
            { dimension: "a", order: "asc" },
            { dimension: "amount", order: "asc" }
          ]
        }
      }
    ],
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
        },
        datasetIndex: 1,
        itemStyle: {
          color: function (params) {
            return {
              aa: "#5470c6",
            }[params.value[3]];
          }
        }
      }
    ]
  };
  let myChart: any = echarts.getInstanceByDom(id.value);
  if (myChart == undefined) {
    myChart = echarts.init(id.value, null, { renderer: 'svg', useDirtyRect: false });
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
          <span class="cardheardtitle" style="font-weight: bold">DEGs description</span>
        </el-col>
        <el-col :span="12">
          <el-form :inline="true" class="demo-form-inline" style="position: absolute; right: -1%">
            <el-form-item label="attributes:">
              <el-select v-model="selectvalue1" class="m-2" placeholder="Select" @change="selectchange">
                <el-option v-for="item in selectoptions1" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
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
        <el-tabs type="border-card" v-model="tabPosition" @tab-click="pan" v-if="tabPosition1">
          <el-tab-pane label="Volcano" name="volcano">
            <div v-loading="loading" element-loading-text="Loading..." class="echart-img">
              <div ref="volcanoref" style="width: 100%; height: 700px" />
              <!-- echart图底部标题 -->
              <div class="con-leftCon-titleone-pic" style="text-align: center;">
                <span>Figure 3.The volcano plot that shows the statistically significant DEGs between COVID-19 and
                  control.
                </span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Table" name="volcanotable">
            <pagetable v-if="tableload" :DataSet="dataset" :Type="type" :Celltype="celltype" />
            <div class="con-leftCon-titleone-pic" style="text-align: center;">
              <span>Table 1. Statistically significant DEGs between COVID-19 and control
              </span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="GO" name="go" v-if="echartgoupstatus || echartgodownstatus">
            <div v-if="echartgoupstatus && echartgodownstatus">
              <div style="display: flex; justify-content: center">
                <el-button-group>
                  <el-button v-if="echartgoupstatus" type="primary" :class="{ active: isActive }" @click="goup">
                    <IconifyIconOffline :icon="left" />
                    GO up plot
                  </el-button>
                  <el-button v-if="echartgodownstatus" type="primary" :class="{ active: isActive2 }" @click="godown">
                    GO down plot
                    <IconifyIconOffline :icon="right" />
                  </el-button>
                </el-button-group>
              </div>
              <el-carousel ref="remarkCaruselUp" trigger="click" @change="changegoplot" height="680px" :autoplay="false"
                v-if="pantablego">
                <el-carousel-item v-if="echartgoupstatus">
                  <div v-loading="loading" element-loading-text="Loading..." class="echart-img">
                    <div ref="echartgoup" style="width: 100%; height: 600px" />
                    <!-- echart图底部标题 -->
                    <div class="con-leftCon-titleone-pic1">
                      <span>
                        Figure 4A. GO classifications of up-regulated genes. The vertical axis shows the names of clusters
                        of GO
                        terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as a
                        threshold to select significant GO terms. </span>
                    </div>
                  </div>
                  <!-- <el-empty
                  v-else
                  style="height: 90%"
                  description="Not GO Up plot data please select other celltype"
                /> -->
                </el-carousel-item>
                <el-carousel-item v-if="echartgodownstatus">
                  <div v-loading="loading" element-loading-text="Loading..." class="echart-img">
                    <div ref="echartgodown" style="width: 100%; height: 600px" />
                    <!-- echart图底部标题 -->
                    <div class="con-leftCon-titleone-pic1">
                      <span>Figure 4B. GO classifications of down-regulated genes. The vertical axis shows the names of
                        clusters of
                        GO terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as a
                        threshold to select significant GO terms. </span>
                    </div>
                  </div>
                  <!-- <el-empty
                  v-else
                  style="height: 90%"
                  description="Not GO Down plot data please select other celltype"
                /> -->
                </el-carousel-item>
              </el-carousel>
            </div>
            <div v-else>
              <div v-if="echartgoupstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                <div ref="echartgoup" style="width: 100%; height: 600px" />
                <!-- echart图底部标题 -->
                <div class="con-leftCon-titleone-pic1">
                  <span>
                    Figure 4A. GO classifications of up-regulated genes. The vertical axis shows the names of clusters
                    of GO
                    terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as a
                    threshold to select significant GO terms. </span>
                </div>
              </div>
              <div v-if="echartgodownstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                <div ref="echartgodown" style="width: 100%; height: 600px" />
                <!-- echart图底部标题 -->
                <div class="con-leftCon-titleone-pic1">
                  <span>Figure 4B. GO classifications of down-regulated genes. The vertical axis shows the names of
                    clusters of
                    GO terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as a
                    threshold to select significant GO terms. </span>
                </div>
              </div>
              <el-empty v-if="!echartgoupstatus && !echartgodownstatus" style="height: 600px" description="No data" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="KEGG" name="kegg" v-if="echartkeggupstatus || echartkeggdownstatus">
            <div v-if="echartkeggupstatus && echartkeggdownstatus">
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
                @change="changekeggplot">
                <el-carousel-item v-if="echartkeggupstatus">
                  <div v-loading="loading" element-loading-text="Loading..." class="echart-img">
                    <div ref="echartkeggup" style="width: 100%; height: 600px" />
                    <div class="con-leftCon-titleone-pic1">
                      <span>Figure 5A. KEGG classifications of up-regulated genes. The vertical axis shows the names of
                        clusters of
                        KEGG terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as
                        a
                        threshold to select significant KEGG terms.
                      </span>
                    </div>
                  </div>
                  <!-- <el-empty
                      v-else
                      style="height: 90%"
                      description="Not KEGG Up plot data please select other celltype"
                    /> -->
                </el-carousel-item>
                <el-carousel-item v-if="echartkeggdownstatus">
                  <div v-loading="loading" element-loading-text="Loading..." class="echart-img">
                    <div ref="echartkeggdown" style="width: 100%; height: 600px" />
                    <div class="con-leftCon-titleone-pic1">
                      <span>Figure 5B. KEGG classifications of down-regulated genes. The vertical axis shows the names of
                        clusters of
                        KEGG terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as
                        a
                        threshold to select significant KEGG terms.
                      </span>
                    </div>
                  </div>

                  <!-- <el-empty
                      v-else
                      style="height: 90%"
                      description="Not KEGG Dowm plot data please select other celltype"
                    /> -->
                </el-carousel-item>
              </el-carousel>
            </div>
            <div v-else>
              <div v-if="echartkeggupstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                <div ref="echartkeggup" style="width: 100%; height: 600px" />
                <div class="con-leftCon-titleone-pic1">
                  <span>Figure 5A. KEGG classifications of up-regulated genes. The vertical axis shows the names of
                    clusters of
                    KEGG terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as
                    a
                    threshold to select significant KEGG terms.
                  </span>
                </div>
              </div>
              <div v-if="echartkeggdownstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                <div ref="echartkeggdown" style="width: 100%; height: 600px" />
                <div class="con-leftCon-titleone-pic1">
                  <span>Figure 5B. KEGG classifications of down-regulated genes. The vertical axis shows the names of
                    clusters of
                    KEGG terms, and the horizontal axis displays the −Log10 (p-value). A p-value &lt; 0.05 was used as
                    a
                    threshold to select significant KEGG terms.
                  </span>
                </div>
              </div>
              <!-- <el-empty v-if="!echartkeggupstatus && !echartkeggdownstatus" style="height: 600px" description="No data" /> -->
            </div>
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

.con-leftCon-titleone-pic1 {
  text-align: center;
  margin: 0 10%;
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

:deep(.el-input__inner) {
  font-family: 'Times New Roman', Times !important;
  ;
}

:deep(.el-form-item__label) {
  font-family: "Times New Roman", Times, serif !important;
}
</style>
