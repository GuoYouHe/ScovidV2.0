import * as echarts from "echarts";
import $ from 'jquery'
import { emitter } from "@/utils/mitt";
import Veins from "./svg/others.svg?src";

export function usepiechart() {
  function echart(id, data, legend_data) {
    var chartDom = document.getElementById(id)
    let myChart = echarts.init(chartDom, null, {renderer: 'canvas'})
    
    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom, null, {renderer: 'canvas'})
    }else{
      myChart.dispose();
      myChart = echarts.init(chartDom, null, {renderer: 'canvas'})
    }

    var option;
    
    $.get(
    `${Veins}`,
      function (svg) {
        echarts.registerMap('organ_diagram', { svg: svg });
        option = {
          tooltip: {
            formatter: function(params) {
              // console.log(params);
              return '<span style=\color:' + params.color + ';\>' + params.marker + ' ' + params.name +'</span><br>'+
                'total: <span style=\color:' + params.color + ';\>' + params.value + '</span>';
            },
          },
          geo: {
            left: '3%',
            // right: '50%',
            top:'5%',
            height: '700',
            width: '600',
            map: 'organ_diagram',
            selectedMode: 'multiple',
            emphasis: {
              focus: 'self',
              itemStyle: {
                color: null
              },
              label: {
                position: 'bottom',
                distance: 0,
                textBorderColor: '#fff',
                textBorderWidth: 2
              }
            },
            blur: {},
            select: {
              itemStyle: {
                color: '#e06343',
                borderColor: '#fff',
              },
              label: {
                show: false,
                textBorderColor: '#fff',
                textBorderWidth: 2
              }
            },
            // regions: [{
            //   name: 'eye',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'brain',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'nose',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'kidney',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'pancreas',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'liver',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'heart',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'stomach',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'lung',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'blood',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'intestines',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'placenta',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // },{
            //   name: 'airway',
            //   itemStyle: {
            //     borderColor:'#ffb5b6'
            //   },
            //   label: {
            //     fontSize:0,
            //   },
            // }]
          },
        };

        myChart.setOption(option);
        myChart.on('mouseover', { seriesIndex: 0 }, function (event) {
          myChart.dispatchAction({
            type: 'highlight',
            geoIndex: 0,
            name: event.name.toLowerCase()
          });
        });
        myChart.on('mouseout', { seriesIndex: 0 }, function (event) {
          myChart.dispatchAction({
            type: 'downplay',
            geoIndex: 0,
            name: event.name.toLowerCase()
          });
        });
        var expandstatus 
        var expandname 
        var i = 1
        myChart.on('click', { seriesIndex: 0 }, function (event) {
          expandstatus = true
          expandname = event.name
          if (expandname != event.name) {
            i=1
          } else {
            i=i+1
          }
          if (i % 2 == 0) {
            expandstatus = false
          } else {
            expandstatus = true
          }
          emitter.emit("othertreeexpand", {
            expandname,
            expandstatus
          });
        });
      }
    );
  }
  return {
   echart
  }
}