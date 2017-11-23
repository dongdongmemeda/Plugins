<template>
    <div class="water">
        <div class="main"></div>
    </div>
</template>
<script>
export default {
    props: ['water'],
    data(){
        return {
            jsond: {},
            chart: null
        }
    },
    beforeCreated(){
    },
    mounted(){
        this.chart = this.$echarts.init(document.querySelector(this.water.node+' .main'), 'chalk')
        this.chartLoad(this.chart)
        this.initChart()
    },
    methods:{
        initChart: function(){
            var _ = this
            this.$http.get(_.water.url).then((res)=>{
                var waterData = res.body.water
                _.jsond = {
                    name: waterData.name,
                    data: waterData.data
                }
                _.runChart()
            })
        },
        runChart: function(){
            var option = {
                series: [{
                    name: this.jsond.name,
                    type: 'liquidFill',
                    data: this.jsond.data,
                    label: {
                        normal: {
                            formatter: function(param) {
                                return param.seriesName
                            },
                            fontSize: 20
                        }
                    }
                }]
            }
            this.chart.setOption(option)
        },
        chartLoad: function(chart){
            this.$emit('chart', chart)
        }
    }
}
</script>
<style lang="less" scoped>
.water{
    width: 100%;
    height: 100%;
    .main{
        width: 100%;
        height: 100%;
    }
}
</style>
