import * as echarts from "echarts";

export function useheatmapechart() {

  function echart(id, series, dataname) {
    var chartDom = document.getElementById(id)
    let  myChart = echarts.init(chartDom)
    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom)
    }else{
      myChart.dispose();
      myChart = echarts.init(chartDom)
    }

    myChart.clear();
      
    var option = {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '70%',
        width:"70%",
        left:"center",
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: series.xaxis,
        splitArea: {
          show: true
        },
        axisLabel: {
          rotate: 45,
          fontSize:10,
        }
      },
      yAxis: {
        type: 'category',
        data: series.yaxis,
        splitArea: {
          show: true
        },
        axisLabel: {
          // rotate: 30,
          fontSize:10,
        }
      },
      visualMap: {
        min: series.valuelist[1],
        max: series.valuelist[0],
        calculable: true,
        orient: 'vertical',
        left: 'right',
        bottom: '55%',
        // color: ['#bf444c', '#f6efa6', '#d88273']
      },
      series: [
        {
          name: 'Punch Card',
          type: 'heatmap',
          data: series.datalist,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      toolbox: {
          show: true,
          orient: 'horizontal',
          itemSize: 15,
          itemGap: 10,
          left: '93%',
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
    }
    myChart.setOption(option, true);
  }
  return {
   echart
  }
}