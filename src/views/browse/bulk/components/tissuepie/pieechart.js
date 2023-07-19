import * as echarts from "echarts";
import { emitter } from "@/utils/mitt";
import $ from 'jquery'
import Veins_Medical from "@/assets/svg/tissuebody/Veins_Medical_Diagram_clip_art1.svg?url";

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

    var name

    var status 
    
    $.get(
    `${Veins_Medical}`,
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
            left: '20%',
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
                opacity: 0.6,
              },
              label: {
                show: false,
                textBorderColor: '#fff',
                textBorderWidth: 2
              }
            },
            regions: [{
              name: 'eye',
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
              name: 'intestine',
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
              name: 'airway',
              selected:'true',
              itemStyle: {
                borderColor: '#ffb5b6'
              },
              label: {
                fontSize: 0,
              },
            }]
          },
          // grid: {
          //   left: '60%',
          //   top: '20%',
          //   bottom: '20%'
          // },
          // legend: {
          //   type: "scroll",
          //   orient: "vertical",
          //   right: "1%",
          //   top: "7%",
          //   bottom: 20,
          //   height: '40%',
          //   data:legend_data
          // },
          // series: [
          //   {
          //     name: "Access From",
          //     type: "pie",
          //     radius: ["30%", "60%"],
          //     left: "30%",
          //     height: '60%',
          //     width: '80%',
          //     // radius: ['20%', '70%'],
          //     // roseType: 'radius',
          //     avoidLabelOverlap: false,
          //     itemStyle: {
          //       borderRadius: 10,
          //       borderColor: "#fff",
          //       borderWidth: 2
          //     },
          //     label: {
          //       show: false,
          //       position: "center"
          //     },
          //     emphasis: {
          //       label: {
          //         show: true,
          //         fontSize: 40,
          //         fontWeight: "bold"
          //       }
          //     },
          //     labelLine: {
          //       show: false
          //     },
          //     data: data
          //   }
          // ]
        };

        myChart.setOption(option);
        // myChart.on('mouseover', { seriesIndex: 0 }, function (event) {
        //   myChart.dispatchAction({
        //     type: 'highlight',
        //     geoIndex: 0,
        //     name: event.name.toLowerCase()
        //   });
        // });
        // myChart.on('mouseout', { seriesIndex: 0 }, function (event) {
        //   myChart.dispatchAction({
        //     type: 'downplay',
        //     geoIndex: 0,
        //     name: event.name.toLowerCase()
        //   });
        // });
        var expandstatus = false
        var expandname
        var i = 1
        // myChart.on('click', { seriesIndex: 0 }, function (event) {
        //   expandstatus = true
        //   expandname = event.name
        //   if (expandname != event.name) {
        //     i=1
        //   } else {
        //     i=i+1
        //   }
        //   if (i % 2 == 0) {
        //     expandstatus = false
        //   } else {
        //     expandstatus = true
        //   }
        //   emitter.emit("bulktreeexpand", {
        //     expandname,
        //     expandstatus
        //   });
        // });

        const status = {
              'eye':false
            ,
              'brain':false
            ,
              'nose':false
            ,
              'kidney':false
            ,
              'pancreas':false
            ,
              'liver':false
            ,
              'heart':false
            ,
              'stomach':false
            ,
              'lung':false
            ,
              'blood':false
            ,
              'intestine':false
            ,
              'placenta':false
            ,
              'airway':true
        }
        
        myChart.on('click', function (event) {
          // 判断是否点击到了地图上的区域
          if (event.componentType === 'geo' && event.name) {
            // console.log(event);
            // console.log(event.expanded);
            // 执行点击触发函数
            yourClickFunction(event);
          }
          
          
        });

        // 点击触发函数的示例
        function yourClickFunction(event) {
          var ss = status[event.name]
          expandstatus = !ss
          status[event.name]=expandstatus
          console.log('cc',expandstatus);
          var str = event.name.slice(0,1).toUpperCase() +event.name.slice(1).toLowerCase();
          expandname = str
          emitter.emit("bulktreeexpand", {
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


