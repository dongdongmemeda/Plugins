<template>
    <div class="geo">
        <div class="main"></div>
    </div>
</template>
<script>
export default {
    props: ["geo"],
    data(){
        return {}
    },
    mounted(){
        let chart = this.$echarts.init(document.querySelector(this.geo.node+' .main'), 'chalk')
        this.chartLoad(chart)
        const option = {
                title : {
                    text: '中国地图',
                    subtext: '东东么么哒',
                    sublink: 'http://dongdongmemeda.com',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2];
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#bda29a',    //  地图上的默认颜色
                            borderColor: '#404a59'   //  地图之外的颜色
                        },
                        emphasis: {
                            areaColor: '#61a0a8'   //  鼠标移到地图上的颜色
                        }
                    }
                },
                series: [
                    {
                    name: 'PM2.5',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'top',
                            color: '#334455'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#d53a35'
                        }
                    },
                    data: this.convert(this.geo.obj)
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            color: '#fff',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#d53a35',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1,
                    data: this.convert(this.geo.obj.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                }
                ]
            }
        chart.setOption(option)
    },
    methods: {
        convert: function(data){
            let res = []
            for(let i=0;i<data.length;i++){
                let geoCoord = this.geo.geo[data[i].name]
                if(geoCoord){
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    })
                }
            }
            return res
        },
        chartLoad: function(chart){
            this.$emit('chart', chart)
        }
    }
}
</script>
<style lang="less" scoped>
.geo{
    .main{
        width: 100%;
        height: 100%;
    }
}
</style>