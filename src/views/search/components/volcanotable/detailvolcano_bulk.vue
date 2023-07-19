<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { emitter } from "@/utils/mitt";
import left from "@iconify-icons/ic/baseline-keyboard-arrow-left";
import right from "@iconify-icons/ic/baseline-keyboard-arrow-right";
import * as echarts from "echarts";
import pagetable from "./pagetable_bulk/index.vue";
import { getbrowsego, getbrowsekegg, getbrowsevolcano } from "@/api/browse";

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
const remarkCaruselUp = ref(null);
const remarkCaruselKegg = ref(null);
const isActive = ref(false);
const isActive2 = ref(false);

async function pan(targetName) {
  loading.value = true;
  switch (targetName.props.name) {
    case "volcano":
      printechart("volcano");
      break;
    case "volcanotable":
      tableload.value = true;
      nextTick(() => {
        const dataset = props.DataSet;
        const type = "bulk";
        const celltype = "bulk";
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
        printechart("go");
      });
      break;
    case "kegg":
      pantablego.value = false;
      pantablekegg.value = true;
      isActive.value = true;
      isActive2.value = !isActive.value;
      nextTick(() => {
        printechart("kegg");
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
    selectoption();
  }
});

async function selectoption() {
  const params: object = {
    dataset: props.DataSet,
    type: "bulk"
  };
  nextTick(() => {
    loading.value = true;
    switch (tabPosition.value) {
      case "volcano":
        printechart("volcano");
        break;
      case "volcanotable":
        tableload.value = true;
        nextTick(() => {
          const dataset = props.DataSet;
          const type = "bulk";
          const celltype = "bulk";
          emitter.emit("volcanotable", {
            dataset,
            type,
            celltype
          });
        });
        break;
      case "go":
        printechart("go");
        break;
      case "kegg":
        printechart("kegg");
        break;
      default:
        break;
    }
  });
}

function printechart(echartname: string) {
  const params: object = {
    dataset: props.DataSet,
    type: "bulk",
    celltype: "bulk",
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
          // console.log("cc", res.resultSet);
          if (
            (
              res.resultSet.upDataList.length > 1) ||
            (
              res.resultSet.downDataList.length > 2)
          ) {
            echartgoupstatus.value = true;
            echartgodownstatus.value = true;
            nextTick(() => {
              echartGo(
                echartgoup,
                res.resultSet.upDataList,
                res.resultSet.upMax,
                res.resultSet.upMin
              );
              echartGo(
                echartgodown,
                res.resultSet.downDataList,
                res.resultSet.downMax,
                res.resultSet.downMin
              );
            });
          } else if (
            (res.resultSet.upDataList == null &&
              res.resultSet.upDataList.length == 0) ||
            (
              res.resultSet.downDataList.length > 2)
          ) {
            echartgoupstatus.value = false;
            echartgodownstatus.value = true;
            nextTick(() => {
              echartGo(
                echartgodown,
                res.resultSet.downDataList,
                res.resultSet.downMax,
                res.resultSet.downMin
              );
            });
          } else if (
            (
              res.resultSet.upDataList.length > 2) ||
            (res.resultSet.downDataList == null &&
              res.resultSet.downDataList.length == 1)
          ) {
            echartgoupstatus.value = true;
            echartgodownstatus.value = false;
            nextTick(() => {
              echartGo(
                echartgoup,
                res.resultSet.upDataList,
                res.resultSet.upMax,
                res.resultSet.upMin
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
            (
              res.resultSet.upDataList.length > 2) ||
            (
              res.resultSet.downDataList.length > 2)
          ) {
            console.log("vvvvvvv", res.resultSet.downDataList.length);
            echartkeggupstatus.value = true;
            echartkeggdownstatus.value = true;
            nextTick(() => {
              echartKegg(
                echartkeggup,
                res.resultSet.upDataList,
                res.resultSet.upMax,
                res.resultSet.upMin
              );
              echartKegg(
                echartkeggdown,
                res.resultSet.downDataList,
                res.resultSet.downMax,
                res.resultSet.downMin
              );
            });
          } else if (
            (res.resultSet.upDataList == null &&
              res.resultSet.upDataList.length == 1) ||
            (
              res.resultSet.downDataList.length > 2)
          ) {
            echartkeggupstatus.value = false;
            echartkeggdownstatus.value = true;
            nextTick(() => {
              echartKegg(
                echartkeggdown,
                res.resultSet.downDataList,
                res.resultSet.downMax,
                res.resultSet.downMin
              );
            });
          } else if (
            (
              res.resultSet.upDataList.length > 2) ||
            (res.resultSet.downDataList == null &&
              res.resultSet.downDataList.length == 1)
          ) {
            console.log("vvvvvvv");

            echartkeggupstatus.value = true;
            echartkeggdownstatus.value = false;
            nextTick(() => {
              echartKegg(
                echartkeggup,
                res.resultSet.upDataList,
                res.resultSet.upMax,
                res.resultSet.upMin
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
// function echartGo(id, DataList, Max, Min) {
//   var option = {
//     textStyle: {
//tooltip: {
  //       position: "bottom",
  //       formatter: function (params) {
  //         // console.log(params);
  //         var str =
  //           "ONTOLOGY:" +
  //           params.data[3] +
  //           "<br /> ID:" +
  //           params.data[4] +
  //           "<br />Description:" +
  //           params.data[2] +
  //           "<br />P-value:" +
  //           params.data[0] +
  //           "<br />Gene:" +
  //           params.data[5];
  //         return str;
  //       }
  //     },
  //     toolbox: {
  //       show: true,
  //       orient: "horizontal",
  //       itemSize: 15,
  //       itemGap: 10,
  //       left: "90%",
  //       feature: {
  //         saveAsImage: {
  //           type: "jpeg",
  //           // name: dataname,
  //           connectedBackgroundColor: "#FFFFFF",
  //           title: "save as picture"
  //         },
  //         dataView: {
  //           readOnly: true,
  //           show: true,
  //           title: "data view",
  //           lang: ["data view", "close"]
  //         },
  //         magicType: {
  //           show: false
  //         },
  //         dataZoom: {
  //           show: false
  //         }
  //       }
  //     },
  //     dataset: {
  //       source: DataList
  //     },
  //     grid: { containLabel: true },
  //     xAxis: {
  //       name: "-log10(P-value)",
  //       nameLocation: "center",
  //       nameTextStyle: {
  //         fontSize: 18,
  //         padding: [20, 0, 0, 0]
  //       },
  //       axisLabel: {
  //         show: true,
  //         textStyle: {
  //           // color: '#c3dbff',  //更改坐标轴文字颜色
  //           fontSize: 12 //更改坐标轴文字大小
  //         }
  //       }
  //     },
  //     yAxis: {
  //       type: "category",
  //       nameLocation: "center",
  //       triggerEvent: true,
  //       nameTextStyle: {
  //         fontSize: 18,
  //         padding: 20
  //       },
  //       axisLabel: {
  //         show: true,
  //         textStyle: {
  //           fontSize: 12 //更改坐标轴文字大小
  //         }
  //       }
  //     },
  //     visualMap: {
  //       orient: "horizontal",
  //       hoverLink: false,
  //       left: "center",
  //       min: Min,
  //       max: Max,
  //       text: ["High p-value", "Low p-value"],
  //       // Map the score column to color
  //       dimension: 0,
  //       inRange: {
  //         color: ["#FD665F", "#FFCE34", "#65B581"]
  //       }
  //     },
  //     dataZoom: [
  //       {
  //         type: "slider",
  //         show: true,
  //         yAxisIndex: [0],
  //         left: "93%",
  //         start: 0, //数据窗口范围的起始百分比
  //         end: 50
  //       },
  //       {
  //         type: "inside",
  //         yAxisIndex: [0],
  //         start: 0,
  //         end: 50
  //       }
  //     ],
  //     series: [
  //       {
  //         type: "bar",
  //         encode: {
  //           // Map the "amount" column to X axis.
  //           x: "amount",
  //           // Map the "product" column to Y axis
  //           y: "product"
  //         }
  //       }
  //     ]
  //   };
  //   let myChart: any = echarts.getInstanceByDom(id.value);
  //   if (myChart == undefined) {
  //     myChart = echarts.init(id.value);
  //   }
  //   myChart.on("mouseover", params => {
  //     if (params.componentType === "yAxis") {
  //       yLabel = params.value;
  //       let offsetX = params.event.offsetX + 10;
  //       let offsetY = params.event.offsetY + 10;
  //       myChart.setOption({
  //         textStyle: {
  //tooltip: {
  //           trigger: "axis",
  //           formatter: formateTooltip,
  //           alwaysShowContent: true
  //         }
  //       });
  //       myChart.dispatchAction({
  //         type: "showTip",
  //         seriesIndex: 0,
  //         dataIndex: 0,
  //         position: [offsetX, offsetY]
  //       });
  //     } else if (params.componentType === "series") {
  //       myChart.setOption({
  //         textStyle: {
  //tooltip: {
  //           trigger: "item",
  //           formatter: function (params) {
  //             var str =
  //               "ONTOLOGY:" +
  //               params.data[3] +
  //               "<br /> ID:" +
  //               params.data[4] +
  //               "<br />Description:" +
  //               params.data[2] +
  //               "<br />P-value:" +
  //               params.data[0] +
  //               "<br />Gene:" +
  //               params.data[5];
  //             return str;
  //           },
  //           alwaysShowContent: true,
  //           position: "bottom"
  //         }
  //       });
  //       myChart.dispatchAction({
  //         type: "showTip",
  //         seriesIndex: params.seriesIndex,
  //         dataIndex: params.dataIndex
  //       });
  //     }
  //   });
  //   myChart.on("mouseout", params => {
  //     myChart.setOption({
  //       textStyle: {
 //tooltip: {
  //         alwaysShowContent: false
  //       }
  //     });
  //     if (params.componentType === "yAxis") {
  //       yLabel = "";
  //     }
  //   });
  //   var yLabel = "";
  //   function formateTooltip(params) {
  //     return yLabel;
  //   }
  //   myChart.clear();
  //   myChart.setOption(option, true);
  // }
  // function echartKegg(id, DataList, Max, Min) {
  //   var option = {
  //     textStyle: {
  //tooltip: {
  //       position: "top",
  //       formatter: function (params) {
  //         var str =
  //           "ONTOLOGY:" +
  //           params.data[3] +
  //           "<br /> ID:" +
  //           params.data[4] +
  //           "<br />Description:" +
  //           params.data[2] +
  //           "<br />P-value:" +
  //           params.data[0] +
  //           "<br />Gene:" +
  //           params.data[5];
  //         return str;
  //       }
  //     },
  //     toolbox: {
  //       show: true,
  //       orient: "horizontal",
  //       itemSize: 15,
  //       itemGap: 10,
  //       left: "90%",
  //       feature: {
  //         saveAsImage: {
  //           type: "jpeg",
  //           // name: dataname,
  //           connectedBackgroundColor: "#FFFFFF",
  //           title: "save as picture"
  //         },
  //         dataView: {
  //           readOnly: true,
  //           show: true,
  //           title: "data view",
  //           lang: ["data view", "close"]
  //         },
  //         magicType: {
  //           show: false
  //         },
  //         dataZoom: {
  //           show: false
  //         }
  //       }
  //     },
  //     dataset: {
  //       source: DataList
  //     },
  //     grid: { containLabel: true },
  //     xAxis: {
  //       name: "-log10(P-value)",
  //       nameLocation: "center",
  //       nameTextStyle: {
  //         fontSize: 18,
  //         padding: [20, 0, 0, 0]
  //       },
  //       axisLabel: {
  //         show: true,
  //         textStyle: {
  //           // color: '#c3dbff',  //更改坐标轴文字颜色
  //           fontSize: 12 //更改坐标轴文字大小
  //         }
  //       }
  //     },
  //     yAxis: {
  //       type: "category",
  //       nameLocation: "center",
  //       nameTextStyle: {
  //         fontSize: 18,
  //         padding: 20
  //       },
  //       axisLabel: {
  //         show: true,
  //         textStyle: {
  //           // color: '#c3dbff',  //更改坐标轴文字颜色
  //           fontSize: 12 //更改坐标轴文字大小
  //         }
  //       }
  //     },
  //     visualMap: {
  //       orient: "horizontal",
  //       hoverLink: false,
  //       left: "center",
  //       min: Min,
  //       max: Max,
  //       text: ["High p-value", "Low p-value"],
  //       // Map the score column to color
  //       dimension: 0,
  //       inRange: {
  //         color: ["#FD665F", "#FFCE34", "#65B581"]
  //       }
  //     },
  //     dataZoom: [
  //       {
  //         type: "slider",
  //         show: true,
  //         yAxisIndex: [0],
  //         left: "93%",
  //         start: 0, //数据窗口范围的起始百分比
  //         end: 100
  //       },
  //       {
  //         type: "inside",
  //         yAxisIndex: [0],
  //         start: 0,
  //         end: 100
  //       }
  //     ],
  //     series: [
  //       {
  //         type: "bar",
  //         encode: {
  //           // Map the "amount" column to X axis.
  //           x: "amount",
  //           // Map the "product" column to Y axis
  //           y: "product"
  //         }
  //       }
  //     ]
  //   };
  //   let myChart: any = echarts.getInstanceByDom(id.value);
  //   if (myChart == undefined) {
  //     myChart = echarts.init(id.value);
  //   }
  //   myChart.clear();
  //   myChart.setOption(option, true);
  // }

  function echartGo(id, DataList, Max, Min) {
    var option = {
      textStyle: {
        fontFamily: 'Times New Roman, serif',
      },
      tooltip: {
        position: "top",
        with: 500,
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
            name: "go",
            connectedBackgroundColor: "#FFFFFF",
            title: "save as picture"
          },
          // restore: {
          //   title: 'restore'
          // },
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
      grid: { containLabel: true, bottom: "6%" },
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
            // color: '#c3dbff',  //更改坐标轴文字颜色
            fontSize: 12 //更改坐标轴文字大小
          },
          formatter: function (value) {
            //[str.split(',').length - 1]
            var ret = ""; //拼接加\n返回的类目项
            var maxLength = 20; //每项显示文字个数
            var valLength = value.length; //y轴类目项的文字个数
            var valspace = value.split(" ").length; //监控字段中的空格数
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowN > 1) {
              //如果类目项的文字大于20,
              // for (var i = 0; i < rowN; i++) {
              //       var temp = "";//每次截取的字符串
              //       var start = i * maxLength;//开始截取的位置
              //       var end = start + maxLength;//结束截取的位置
              //   //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              //       temp = value.substring(start, end) + "\n";
              //       ret += temp; //凭借最终的字符串
              //   }
              ret =
                value.split(" ")[0] +
                " " +
                value.split(" ")[1] +
                " ... " +
                value.split(" ")[valspace - 1];
              return ret;
            } else {
              return value;
            }
          }
        }
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          yAxisIndex: [0],
          left: "93%",
          start: 80, //数据窗口范围的起始百分比
          end: 100
        },
        {
          type: "inside",
          yAxisIndex: [0],
          start: 80,
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
            alwaysShowContent: true
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
            "ID:" +
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
            name: "kegg",
            connectedBackgroundColor: "#FFFFFF",
            title: "save as picture"
          },
          // restore: {
          //   title: 'restore'
          // },
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
            config: [{ dimension: "amount", order: "asc" }]
          }
        }
      ],
      grid: { containLabel: true, bottom: "6%" },
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
        left: "center",
        top: 10,
        min: Max,
        max: Min,
        text: ["Low Score", "High Score"],
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
          datasetIndex: 1
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
      <el-row :gutter="10">
        <el-col :span="14" style="line-height: 32px">
          <span class="cardheardtitle" style="font-weight: bold">Detailed description</span>
        </el-col>
      </el-row>
    </template>
    <template #default>
      <div class="Con-table">
        <el-tabs type="border-card" v-model="tabPosition" @tab-click="pan">
          <el-tab-pane label="Volcano" name="volcano">
            <div v-loading="loading" element-loading-text="Loading..." class="echart-img">
              <div ref="volcanoref" style="width: 100%; height: 700px" />
              <div class="con-leftCon-titleone-pic">
                <span>Figure 2. The volcano plot that shows the statistically
                  significant DEGs between COVID-19 and control in Alveolar
                  pneumocytes.</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Table" name="volcanotable">
            <pagetable v-if="tableload" :DataSet="props.DataSet" />
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
            <el-carousel ref="remarkCaruselUp" trigger="click" @change="changegoplot" height="680px"
              indicator-position="outside" :autoplay="false" v-if="pantablego">
              <el-carousel-item>
                <div v-if="echartgoupstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                  <div ref="echartgoup" style="width: 100%; height: 600px" />
                  <div class="con-leftCon-titleone-pic">
                    <span>Figure 3. GO classifications of up-regulated genes.
                    </span>
                  </div>
                </div>
                <el-empty v-else style="height: 90%" description="Not GO Up plot data" />
              </el-carousel-item>
              <el-carousel-item>
                <div v-if="echartgodownstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                  <div ref="echartgodown" style="width: 100%; height: 600px" />
                  <div class="con-leftCon-titleone-pic">
                    <span>Figure 3. GO classifications of down-regulated genes.
                    </span>
                  </div>
                </div>
                <el-empty v-else style="height: 90%" description="Not GO Down plot data" />
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
                    <span>Figure 4. KEGG classifications of up-regulated genes.
                    </span>
                  </div>
                </div>
                <el-empty v-else style="height: 90%" description="Not KEGG Up plot data" />
              </el-carousel-item>
              <el-carousel-item>
                <div v-if="echartkeggdownstatus" v-loading="loading" element-loading-text="Loading..." class="echart-img">
                  <div ref="echartkeggdown" style="width: 100%; height: 600px" />
                  <div class="con-leftCon-titleone-pic">
                    <span>Figure 4. KEGG classifications of down-regulated genes.
                    </span>
                  </div>
                </div>

                <el-empty v-else style="height: 90%" description="Not KEGG Dowm plot data" />
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </el-card>
</template>
<style lang="scss" scoped>
.el-card__header {
  padding: 6px 10px !important;
}

button {
  background-color: white;
  color: rgb(12, 0, 0);
}

button.active {
  background-color: #79bbff;
  color: white;
}

.umap-img {
  width: 80%;
  height: 700px;
  margin: 0 10%;
}

.con-leftCon-titleone-pic {
  text-align: center;
}

.m-2 {
  margin: 0px 5px;
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
