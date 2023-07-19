import * as echarts from "echarts";

export function usepie2echart() {
  function echart2(id, data, legend_data, pietitle) {
    var chartDom = document.getElementById(id)
    let myChart = echarts.init(chartDom, null, { renderer: 'canvas', useDirtyRect: false })
    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom, null, { renderer: 'canvas', useDirtyRect: false })
    } else {
      myChart.dispose();
      myChart = echarts.init(chartDom, null, { renderer: 'canvas', useDirtyRect: false })
    }

    var option =
    {
      textStyle: {
        fontFamily: 'Times New Roman, serif',
      },
      title: {
        text: pietitle,
        left: 'center',
        bottom: 10,
        textStyle: {
          fontSize: 15
        }
      },
      legend: {
        top: '7%',
        right: '0%',
        orient: 'vertical',
        textStyle: {
          fontSize: 12
        },
        itemWidth: 14,
        itemHeight: 10,
        // left: 'right'
      },
      tooltip: {
        formatter: function (params) {
          return '<span style=\color:' + params.color + ';\>' + params.marker + ' ' + params.name + '</span><br>' +
            'total: <span style=\color:' + params.color + ';\>' + params.value + '</span>';
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["30%", "60%"],
          left: "1%",
          bottom: 20,
          height: '90%',
          width: '90%',
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ],
      // "toolbox": {
      //   "show": true,
      //   "orient": "horizontal",
      //   "itemSize": 15,
      //   "itemGap": 10,
      //   "left": "93%",
      //   "feature": {
      //     "saveAsImage": {
      //       "type": "svg",
      //       "connectedBackgroundColor": "#FFFFFF",
      //       "title": "save as picture"
      //     },
      //   }
      // }
    };

    myChart.setOption(option);
  }
  return {
    echart2
  }
}