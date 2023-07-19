import * as echarts from "echarts";

export function usenetworkechart() {

  function echart(id, series, dataname) {
    var links = [];
    for (var item of series.links) {
        links.push({
        source: item.source,
        target: item.target,
        value: item.value,
          lineStyle: {
          width:(item.value-series.valuelist[1])/(series.valuelist[0]-series.valuelist[1])*10,
          // width:Math.abs((item.value-series.valuelist[2])/(series.valuelist[3])*10),
          // curveness: 0.3,
          //z_core 归一化
          opacity:0.6
          
          // {
          //   formatter: function (params) {
          //   if (item.value>0.4) {
          //   return  (item.value - series.valuelist[2]) / (series.valuelist[3]) - 0.3
          //   } else {
          //   return  (item.value - series.valuelist[2]) / (series.valuelist[3])
          //   }
          // }}
        },
      });
    }
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
        // formatter: '{b0}: {c0}<br />{b1}: {c1}'
      },
      series: [{
        type: "graph",
        top: '10%',
        roam: true,
        focusNodeAdjacency: false,
        layout: "force",
        draggable: true,
        force: {
                initLayout: 'circular',
                repulsion: 1000, // 节点之间的斥力
                gravity: 0.5, // 节点之间的引力
                edgeLength: [400, 400], // 边的两个节点之间的距离，这个距离会受 repulsion 影响
                friction:0.1,
            },
        symbol: 'circle',
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        label: {      
          show: true,                 
          position: "right",         // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
          textStyle: {               
              fontSize: 16
          }
        },
        edgeLabel: {
          show:false,
          textStyle: {
              fontSize: 14
          },
          formatter: function(param) {        // 标签内容
              return param.data.category;
          }
        },
        data: series.data,
        links: links,
        categories:series.categories,
      }],
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