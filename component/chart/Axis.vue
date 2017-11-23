<template>
    <div class="axis">
        <div class="main"></div>
    </div>
</template>
<script>
export default {
    props: ['axis'],
    data(){
        return {
            jsond: {},
            chart: null
        }
    },
    beforeCreated(){
    },
    mounted(){
        this.chart = this.$echarts.init(document.querySelector(this.axis.node+' .main'), 'purple-passion')
        this.chartLoad(this.chart)
        this.initChart()
    },
    methods: {
        initChart: function(){
            var _ = this
            this.$http.get(_.axis.url).then((res)=>{
                var axisData = res.body.axis
                var name = [], val = []
                for(let i=0;i<axisData.obj.length;i++){
                    name.push('')
                    val.push(axisData.obj[i].value)
                }
                _.jsond =  {
                    name: name,
                    val: val
                }
                _.runChart()
            })
        },
        runChart(){
            var option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                },
                legend: {
                    data:['PM2.5','PM']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.jsond.name,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name: 'PM2.5',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: 'PM',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'PM2.5',
                        type:'bar',
                        data: this.jsond.val
                    },
                    {
                        name:'PM',
                        type:'line',
                        yAxisIndex: 1,
                        data: this.jsond.val
                    }
                ]
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
.axis{
    width: 100%;
    height: 100%;
    .main{
        width: 100%;
        height: 100%;
    }
}
</style>
