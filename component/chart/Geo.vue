<template>
    <div class="geo">
        <div class="main"></div>
    </div>
</template>
<script>
export default {
    props: ["geo"],
    data(){
        return {
            jsond: {},
            chart: null
        }
    },
    beforeCreated(){
    },
    mounted(){
        this.chart = this.$echarts.init(document.querySelector(this.geo.node+' .main'), 'chalk')
        this.chartLoad(this.chart)
        this.initChart()
    },
    methods: {
        initChart: function(){
            var _ = this
            this.$http.get(_.geo.url).then((res)=>{
                var geoData = res.body.geo
                _.jsond = {
                    objOne: _.convert(geoData.obj, geoData.geo),
                    objTwo: _.convert(_.sortNum(_.copyObj(geoData).obj, 0, 6), geoData.geo)
                }
                _.runChart()
            })
        },
        runChart: function(){
            var option = {
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
                        data: this.jsond.objOne
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
                        data: this.jsond.objTwo
                    }
                    ]
                }
            this.chart.setOption(option)
        },
        convert: function(arr, geo){
            let res = []
            for(let i=0;i<arr.length;i++){
                let geoCoord = geo[arr[i].name]
                if(geoCoord){
                    res.push({
                        name: arr[i].name,
                        value: geoCoord.concat(arr[i].value)
                    })
                }
            }
            return res
        },
        copyObj: function(obj){
            return JSON.parse(JSON.stringify(obj))
        },
        sortNum: function(arr, start, end){
            return arr.sort(this.compare).slice(start, end)
        },
        compare: function (a, b) {
            return b.value - a.value;
        },
        chartLoad: function(chart){
            this.$emit('chart', chart)
        }
    }
}
</script>
<style lang="less" scoped>
.geo{
    width: 100%;
    height: 100%;
    .main{
        width: 100%;
        height: 100%;
    }
}
</style>