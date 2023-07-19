import * as echarts from "echarts";

export function useheatmapechart() {

  function echart(id, series, dataname) {
    var chartDom = document.getElementById(id)
    let myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
    } else {
      myChart.dispose();
      myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
    }

    myChart.clear();

    var option = {
      textStyle: {
        fontFamily: 'Times New Roman, serif',
      },
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '70%',
        width: "70%",
        left: "center",
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
          fontSize: 10,
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
          fontSize: 10,
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
        left: '90%',
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