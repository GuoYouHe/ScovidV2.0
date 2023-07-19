import { log } from "console";
import * as echarts from "echarts";
import {
  ref
} from "vue";

export function useboxechart() {
  type EChartsOption = echarts.EChartsOption;
  // const boxechartref = ref<HTMLDivElement | null>(null);

  function echart(id, datasource, dataname) {
    var chartDom = document.getElementById(id)
    let myChart = echarts.init(chartDom)
    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom)
    } else {
      myChart.dispose();
      myChart = echarts.init(chartDom)
    }

    var option: EChartsOption;

    option = {
      title: [
        {
          // text: 'Michelson-Morley Experiment',
          left: 'center'
        }
      ],
      dataset: [
        {
          source: datasource
        },
        {
          transform: {
            type: 'boxplot',
            config: {
              itemNameFormatter: function (params) {
                if (params.value == 0) {
                  return 'A'
                } else if (params.value == 1) {
                  return 'B'
                };

              }
            }
          }
        },
        {
          fromDatasetIndex: 1,
          fromTransformResult: 1
        }
      ],
      textStyle: {
        fontFamily: 'Times New Roman, serif',
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: 'km/s minus 299,000',
        splitArea: {
          show: true
        }
      },
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          datasetIndex: 1,
          // "data": [
          //       {
          //           "value": [
          //               0.039,
          //               0.058,
          //               0.081,
          //               0.096,
          //               0.131
          //           ],
          //           "itemStyle": {
          //               "borderColor": "#f8889a",
          //               "color": "#f0dbdd"
          //           }
          //       },
          //       {
          //           "value": [
          //               0.042,
          //               0.07375,
          //               0.0995,
          //               0.14175,
          //               0.218
          //           ],
          //           "itemStyle": {
          //               "borderColor": "#3bbbb2",
          //               "color": "#a5ede6"
          //           }
          //       }
          // ],
          "label": {
            "show": true,
            "position": "top",
          },
          "markPoint": {
            "label": {
              "show": true,
              "position": "inside",
              "color": "#fff"
            }
          }

        },
        {
          name: 'outlier',
          type: 'scatter',
          datasetIndex: 2
        }
      ],
      toolbox: {
        feature: {
          // dataView : {readOnly: true, show: true, title: "data view", lang: ["data view", "close"]},
          dataZoom: { show: false },
          magicType: { show: false },
          restore: { title: "restore" },
          saveAsImage: { type: "jpeg", name: dataname, title: "save as picture" },
        },
        itemGap: 10,
        itemSize: 15,
        left: "85%",
        orient: "horizontal",
        show: true
      },

    };

    // myChart.clear();
    myChart.setOption(option, true);
  }

  return {
    echart
  }
}