import * as echarts from "echarts";
import $ from 'jquery'
import { emitter } from "@/utils/mitt";
// import Veins_Medical from "@/assets/svg/tissuebody/Veins_Medical_Diagram_clip_art1.svg?url";
import Veins_Medical from "@/assets/svg/tissuebody/humtiss.svg?url";

export function usepiechart() {
  function echart(id, data, legend_data) {
    var chartDom = document.getElementById(id)
    let myChart = echarts.init(chartDom, null, { renderer: 'canvas' })

    if (chartDom == null) {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(chartDom, null, { renderer: 'canvas' })
    } else {
      myChart.dispose();
      myChart = echarts.init(chartDom, null, { renderer: 'canvas' })
    }

    var option;

    $.get(
      `${Veins_Medical}`,
      function (svg) {
        echarts.registerMap('organ_diagram', { svg: svg });
        option = {
          tooltip: {
            formatter: function (params) {
              // console.log(params);
              return '<span style=\color:' + params.color + ';\>' + params.marker + ' ' + params.name + '</span><br>' +
                'total: <span style=\color:' + params.color + ';\>' + params.value + '</span>';
            },
          },
          geo: {
            left: '20%',
            // right: '50%',
            top: '1%',
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
                opacity: 0.6,
              },
              label: {
                show: false,
                textBorderColor: '#fff',
                textBorderWidth: 2
              }
            },
            regions: [{
              name: 'lymph node',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'brain',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'nose',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'kidney',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'pancreas',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'liver',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'heart',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'spleen',
              itemStyle: {
                borderColor: '#A53750',
                opacity:0.6
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'stomach',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'lung',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'blood',

              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'intestinal',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'placenta',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'adipose',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'kidney',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'airway',
              selected: 'true',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }, {
              name: 'urine',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }],
          },
        };

        myChart.setOption(option);
        var expandstatus
        var expandname


        const status = {
          'lymph node': false
          ,
          'brain': false
          ,
          'nose': false
          ,
          'kidney': false
          ,
          'pancreas': false
          ,
          'liver': false
          ,
          'heart': false
          ,
          'spleen': false
          ,
          'lung': false
          ,
          'blood': false
          ,
          'intestinal': false
          ,
          'placenta': false
          ,
          'airway': true
          ,
          'adipose': false
          ,
          'urine': false
        }

        myChart.on('click', function (event) {
          // 判断是否点击到了地图上的区域
          if (event.componentType === 'geo' && event.name) {
            // 执行点击触发函数
            yourClickFunction(event);
          }


        });

        // 点击触发函数的示例
        function yourClickFunction(event) {
          var ss = status[event.name]
          expandstatus = !ss
          status[event.name] = expandstatus
          var str = event.name.slice(0, 1).toUpperCase() + event.name.slice(1).toLowerCase();
          expandname = str
          emitter.emit("sctreeexpand", {
            expandname,
            expandstatus
          });
        }
      }
    );
  }
  return {
    echart
  }
}