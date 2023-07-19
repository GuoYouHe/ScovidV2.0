import * as echarts from "echarts";

export function useboxechart() {

  function echart(id, data, dataname) {
    var chartDom = document.getElementById(id)
    let  myChart = echarts.init(chartDom)
    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom)
    }else{
      myChart.dispose();
      myChart = echarts.init(chartDom)
    }

    var option;

    run(data.boxresult);

    function run(_rawData) {
      let legendname = []
      for (var i = 0; i < _rawData.length; i++){
        let legend = _rawData[i][2]
        if (legendname.indexOf(legend)==-1 && legend!='metaclass') {
          legendname.push(legend)
        }
      }

      const leg  = {healthy:"Healthy",casename:""}
      
      for (var i = 0; i < legendname.length; i++) {
        if (legendname[i] != 'Healthy') {
          leg.casename = legendname[i]
        }
      }

      let legendselecte = {}
      legendselecte[leg.healthy] = false
      legendselecte[leg.casename] = false
      
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
                  '!=': 'Healthy'
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
            fontSize:10,
          },
          "data": [leg.healthy,leg.casename]
        },
        yAxis: {
          name: 'value',
          nameLocation: 'middle',
          nameGap: 40,
          scale: true,
        },
        grid:{
            "show": false,
            "zlevel": 0,
            "z": 2,
            "left": "15%",
            "right": "20%",
            "bottom": "20%",
            "top":"20%",
            "containLabel": false,
            "backgroundColor": "transparent",
            "borderColor": "#ccc",
            "borderWidth": 1
        },
        legend: {
          top:"10%",
          selected: legendselecte
        },
        series: [
          {
            name: 'BoxPlot',
            type: 'boxplot',
            "data": [
              {
                name:leg.healthy,
                "value": data.normalbox,
                "itemStyle": {
                  "borderColor": "#3bbbb2",
                  "color": "#a5ede6"
                }
              },
              {
                name: leg.casename,
                "value": data.casebox,
                "itemStyle": {
                  "borderColor": "#f8889a",
                  "color": "#f0dbdd"
                }
              }
            ],
          },
          {
            name: leg.healthy,
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
            name: leg.casename,
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
        left: '90%',
        feature: {
            saveAsImage: {
              type: 'jpeg',
              name: dataname,
              connectedBackgroundColor: '#FFFFFF',
              title: 'save as picture'
            },
            // restore: {
            //   title: 'restore'
            // },
            dataView: {
              readOnly: true,
              show: true,
              title: 'data view',
              lang: [
                'data view',
                'close'
              ]
            },
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