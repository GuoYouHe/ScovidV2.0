import * as echarts from "echarts";

export function useboxechart() {
  // type EChartsOption = echarts.EChartsOption;

  function echart(id, data, dataname) {
    var chartDom = document.getElementById(id)
    let myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
    } else {
      myChart.dispose();
      myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
    }

    var option;

    run(data.boxresult);

    function run(_rawData) {
      option = {
        dataset: [
          {
            id: 'raw',
            source: _rawData
          },
          {
            id: 'metaclass_normal',
            fromDatasetId: 'raw',
            transform: [
              {
                type: 'filter',
                config: {
                  dimension: 'metaclass',
                  '=': 'Healthy'
                }
              }
            ]
          },
          {
            id: 'metaclass_case',
            fromDatasetId: 'raw',
            transform: [
              {
                type: 'filter',
                config: {
                  dimension: 'metaclass',
                  '=': 'COVID-19'
                }
              }
            ]
          },
        ],
        title: {
          // text: 'Income since 1950'
        },
        tooltip: {
          trigger: 'axis',
          confine: true
        },
        xAxis: {
          type: 'category',
          nameGap: 10,
          axisLabel: {
            rotate: 45,
            fontSize: 10,
          },
          "data": [
            "Healthy",
            "COVID-19"
          ]
        },
        yAxis: {
          name: 'value',
          nameLocation: 'middle',
          nameGap: 20,
          scale: true,
        },
        grid: {
          "show": false,
          "zlevel": 0,
          "z": 2,
          "left": "15%",
          "right": "20%",
          "bottom": "20%",
          "top": "20%",
          "containLabel": false,
          "backgroundColor": "transparent",
          "borderColor": "#ccc",
          "borderWidth": 1
        },
        legend: {
          top: "10%",
          selected: {
            "Healthy": false,
            "COVID-19": false,
          }
        },
        series: [
          {
            name: 'BoxPlot',
            type: 'boxplot',
            "data": [
              {
                name: 'Healthy',
                "value": data.normalbox,
                "itemStyle": {
                  "borderColor": "#3bbbb2",
                  "color": "#a5ede6"
                }
              },
              {
                name: 'COVID-19',
                "value": data.casebox,
                "itemStyle": {
                  "borderColor": "#f8889a",
                  "color": "#f0dbdd"
                }
              }
            ],
          },
          {
            name: 'Healthy',
            type: 'scatter',
            datasetId: 'metaclass_normal',
            symbolSize: 5,
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {
              color: '#3bbbb2',
            },
            encode: {
              y: 'expression',
              x: 'metaclass',
              label: 'sample',
              itemName: 'sample',
              tooltip: ['expression', 'metaclass', 'value']
            }
          },
          {
            name: 'COVID-19',
            type: 'scatter',
            datasetId: 'metaclass_case',
            symbolSize: 5,
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {
              color: '#f8889a',
            },
            // symbolOffset : ['230%',0],
            encode: {
              y: 'expression',
              x: 'metaclass',
              label: 'sample',
              itemName: 'sample',
              tooltip: ['expression', 'metaclass', 'value']
            }
          }
        ],
        toolbox: {
          show: true,
          orient: 'horizontal',
          itemSize: 15,
          itemGap: 10,
          left: '85%',
          feature: {
            saveAsImage: {
              type: 'svg',
              name: dataname,
              connectedBackgroundColor: '#FFFFFF',
              title: 'save as picture'
            },
            // restore: {
            //   title: 'restore'
            // },
            // dataView: {
            //   readOnly: true,
            //   show: true,
            //   title: 'data view',
            //   lang: [
            //     'data view',
            //     'close'
            //   ]
            // },
            magicType: {
              show: false
            },
            dataZoom: {
              show: false
            }
          }
        },
      };
      myChart.setOption(option);
    }
  }

  return {
    echart
  }
}