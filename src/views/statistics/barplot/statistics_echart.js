// 引入echarts
import * as echarts from "echarts";
import statisticdata from './statistics.json'


export function usebarechart() {
    function echart(id) {
        var chartDom = document.getElementById(id)
        let myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
        if (chartDom == null) {
            // 基于准备好的dom，初始化echarts实例
            myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
        } else {
            myChart.dispose();
            myChart = echarts.init(chartDom, null, { renderer: 'svg', useDirtyRect: false })
        }

        var option =
        {
            "animation": true,
            "animationThreshold": 2000,
            "animationDuration": 1000,
            "animationEasing": "cubicOut",
            "animationDelay": 0,
            "animationDurationUpdate": 300,
            "animationEasingUpdate": "cubicOut",
            "animationDelayUpdate": 0,
            "color": [
                "#1f77b4",
                "#ff7f0e",
                "#2ca02c",
                "#d62728",
                "#9467bd",
                "#8c564b",
                "#e377c2",
                "#7f7f7f",
                "#bcbd22",
                "#17becf"
            ],
            textStyle: {
                fontFamily: 'Times New Roman, serif',
            },
            "series": [
                {
                    "type": "bar",
                    "name": "Health",
                    "xAxisIndex": 0,
                    "yAxisIndex": 0,
                    "legendHoverLink": true,
                    "data": statisticdata.health_sc,
                    "showBackground": false,
                    "barMinHeight": 0,
                    "barCategoryGap": "20%",
                    "barGap": "30%",
                    "large": false,
                    "largeThreshold": 400,
                    "seriesLayoutBy": "column",
                    "datasetIndex": 0,
                    "clip": true,
                    "zlevel": 0,
                    "z": 2,
                    "label": {
                        "show": true,
                        "position": "top",
                        "margin": 8
                    },
                    "rippleEffect": {
                        "show": true,
                        "brushType": "stroke",
                        "scale": 2.5,
                        "period": 4
                    }
                },
                {
                    "type": "bar",
                    "name": "COVID-19",
                    "xAxisIndex": 0,
                    "yAxisIndex": 0,
                    "legendHoverLink": true,
                    "data": statisticdata.coronavirus_sc,
                    "showBackground": false,
                    "barMinHeight": 0,
                    "barCategoryGap": "20%",
                    "barGap": "30%",
                    "large": false,
                    "largeThreshold": 400,
                    "seriesLayoutBy": "column",
                    "datasetIndex": 0,
                    "clip": true,
                    "zlevel": 0,
                    "z": 2,
                    "label": {
                        "show": true,
                        "position": "top",
                        "margin": 8
                    },
                    "rippleEffect": {
                        "show": true,
                        "brushType": "stroke",
                        "scale": 2.5,
                        "period": 4
                    }
                },
                {
                    "type": "bar",
                    "name": "Health",
                    "xAxisIndex": 1,
                    "yAxisIndex": 1,
                    "legendHoverLink": true,
                    "data": statisticdata.health_bulk,
                    "showBackground": false,
                    "barMinHeight": 0,
                    "barCategoryGap": "20%",
                    "barGap": "30%",
                    "large": false,
                    "largeThreshold": 400,
                    "seriesLayoutBy": "column",
                    "datasetIndex": 0,
                    "clip": true,
                    "zlevel": 0,
                    "z": 2,
                    "label": {
                        "show": true,
                        "position": "bottom",
                        "margin": 8
                    },
                    "rippleEffect": {
                        "show": true,
                        "brushType": "stroke",
                        "scale": 2.5,
                        "period": 4
                    }
                },
                {
                    "type": "bar",
                    "name": "COVID-19",
                    "xAxisIndex": 1,
                    "yAxisIndex": 1,
                    "legendHoverLink": true,
                    "data": statisticdata.coronavirus_bulk,
                    "showBackground": false,
                    "barMinHeight": 0,
                    "barCategoryGap": "20%",
                    "barGap": "30%",
                    "large": false,
                    "largeThreshold": 400,
                    "seriesLayoutBy": "column",
                    "datasetIndex": 0,
                    "clip": true,
                    "zlevel": 0,
                    "z": 2,
                    "label": {
                        "show": true,
                        "position": "bottom",
                        "margin": 8
                    },
                    "rippleEffect": {
                        "show": true,
                        "brushType": "stroke",
                        "scale": 2.5,
                        "period": 4
                    }
                }
            ],
            "legend": [
                {
                    "data": [
                        "Health",
                        "COVID-19"
                    ],
                    "selected": {
                        "Health": true,
                        "COVID-19": true
                    },
                    "show": true,
                    "left": "42%",
                    "top": "00%",
                    "padding": 5,
                    "itemGap": 10,
                    "itemWidth": 25,
                    "itemHeight": 14,
                    "textStyle": {
                        "fontWeight": "bold",
                        "fontFamily": "Times New Roman",
                        "fontSize": 18
                    }
                },
                {
                    "data": [
                        "Health",
                        "COVID-19"
                    ],
                    "selected": {
                        "Health": true,
                        "COVID-19": true
                    },
                    "show": false,
                    "padding": 5,
                    "itemGap": 10,
                    "itemWidth": 25,
                    "itemHeight": 14
                }
            ],
            "tooltip": {
                "show": true,
                "trigger": "axis",
                "triggerOn": "mousemove|click",
                "axisPointer": {
                    "type": "shadow"
                },
                "showContent": true,
                "alwaysShowContent": false,
                "showDelay": 0,
                "hideDelay": 100,
                "textStyle": {
                    "fontSize": 14
                },
                "borderWidth": 0,
                "padding": 5
            },
            "xAxis": [
                {
                    "show": true,
                    "scale": false,
                    "nameLocation": "center",
                    "nameGap": 43,
                    "nameTextStyle": {
                        "fontWeight": "bold",
                        "fontSize": 16
                    },
                    "gridIndex": 0,
                    "axisLabel": {
                        "show": true,
                        "position": "top",
                        "rotate": 30,
                        "margin": 30,
                        "interval": 0,
                        "fontWeight": "bold",
                        "align": "center",
                        "verticalAlign": "middle"
                    },
                    "inverse": false,
                    "offset": 0,
                    "splitNumber": 5,
                    "minInterval": 0,
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "show": true,
                            "width": 1,
                            "opacity": 1,
                            "curveness": 0,
                            "type": "dashed"
                        }
                    },
                    "data": statisticdata.sc_name,
                },
                {
                    "show": true,
                    "scale": false,
                    "nameLocation": "center",
                    "nameGap": 43,
                    "nameTextStyle": {
                        "fontWeight": "bold",
                        "fontSize": 16
                    },
                    "gridIndex": 1,
                    "axisTick": {
                        "show": true,
                        "alignWithLabel": false,
                        "inside": true
                    },
                    "axisLabel": {
                        "show": false,
                        "position": "top",
                        "margin": 8
                    },
                    "inverse": false,
                    "offset": 0,
                    "splitNumber": 5,
                    "minInterval": 0,
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "show": true,
                            "width": 1,
                            "opacity": 1,
                            "curveness": 0,
                            "type": "dashed"
                        }
                    },
                    "data": statisticdata.bulk_name,
                }
            ],
            "yAxis": [
                {
                    "name": "Single-cell Sample Number",
                    "show": true,
                    "scale": false,
                    "nameLocation": "center",
                    "nameGap": 43,
                    "nameTextStyle": {
                        "fontWeight": "bold",
                        "fontSize": 16
                    },
                    "gridIndex": 0,
                    "axisTick": {
                        "show": true,
                        "alignWithLabel": false,
                        "inside": true
                    },
                    "axisLabel": {
                        "show": true,
                        "position": "top",
                        "margin": 20
                    },
                    "inverse": false,
                    "offset": 5,
                    "splitNumber": 5,
                    "minInterval": 0,
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "show": true,
                            "width": 1,
                            "opacity": 1,
                            "curveness": 0,
                            "type": "dashed"
                        }
                    }
                },
                {
                    "name": "Bulk Sample Number",
                    "show": true,
                    "scale": false,
                    "nameLocation": "center",
                    "nameGap": 43,
                    "nameTextStyle": {
                        "fontWeight": "bold",
                        "fontSize": 16
                    },
                    "gridIndex": 1,
                    "axisTick": {
                        "show": true,
                        "alignWithLabel": false,
                        "inside": true
                    },
                    "axisLabel": {
                        "show": true,
                        "position": "top",
                        "margin": 20,
                        "align": "center",
                        "verticalAlign": "bottom"
                    },
                    "inverse": true,
                    "offset": 5,
                    "splitNumber": 5,
                    "minInterval": 0,
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "show": true,
                            "width": 1,
                            "opacity": 1,
                            "curveness": 0,
                            "type": "dashed"
                        }
                    }
                }
            ],
            "title": [
                {
                    "padding": 5,
                    "itemGap": 10
                },
                {
                    "padding": 5,
                    "itemGap": 10
                }
            ],
            "toolbox": {
                "show": true,
                "orient": "horizontal",
                "itemSize": 15,
                "itemGap": 10,
                "left": "93%",
                "feature": {
                    "saveAsImage": {
                        "type": "svg",
                        "connectedBackgroundColor": "#FFFFFF",
                        "title": "save as picture"
                    },
                    "restore": {
                        "title": "restore"
                    },
                    "dataView": {
                        "readOnly": true,
                        "show": true,
                        "title": "data view",
                        "lang": [
                            "data view",
                            "close",
                            "refresh"
                        ]
                    },
                    "magicType": {
                        "show": false,
                        "type": [
                            "line",
                            "bar",
                            "stack",
                            "tiled"
                        ],
                        "title": {
                            "line": "\u5207\u6362\u4e3a\u6298\u7ebf\u56fe",
                            "bar": "\u5207\u6362\u4e3a\u67f1\u72b6\u56fe",
                            "stack": "\u5207\u6362\u4e3a\u5806\u53e0",
                            "tiled": "\u5207\u6362\u4e3a\u5e73\u94fa"
                        },
                        "icon": {}
                    }
                }
            },
            // "dataZoom": [
            //     {
            //         "show": true,
            //         "type": "inside",
            //         "realtime": true,
            //         "start": 0,
            //         "end": 100,
            //         "orient": "horizontal",
            //         "xAxisIndex": [
            //             0,
            //             1
            //         ],
            //         "zoomLock": false,
            //         "filterMode": "filter"
            //     },
            //     {
            //         "show": true,
            //         "type": "slider",
            //         "realtime": true,
            //         "start": 0,
            //         "end": 100,
            //         "orient": "horizontal",
            //         "xAxisIndex": [
            //             0,
            //             1
            //         ],
            //         "zoomLock": false,
            //         "filterMode": "filter"
            //     }
            // ],
            "grid": [
                {
                    "show": false,
                    "zlevel": 0,
                    "z": 2,
                    "right": "1%",
                    "bottom": "53.5%",
                    "containLabel": false,
                    "backgroundColor": "transparent",
                    "borderColor": "#ccc",
                    "borderWidth": 1
                },
                {
                    "show": false,
                    "zlevel": 0,
                    "z": 2,
                    "top": "53.5%",
                    "right": "1%",
                    "containLabel": false,
                    "backgroundColor": "transparent",
                    "borderColor": "#ccc",
                    "borderWidth": 1
                }
            ]
        };

        myChart.setOption(option);
    }
    return {
        echart
    }
}