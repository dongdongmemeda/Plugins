<template>
    <div class="axis">
        <div class="main"></div>
    </div>
</template>
<script>
export default {
    props: ['axis'],
    data(){
        return {}
    },
    mounted(){
        const chart = this.$echarts.init(document.querySelector(this.axis.node +' .main'), 'purple-passion')
        this.chartLoad(chart)
        let name = [], val = []
        for(let i=this.axis.obj.length-1;i>=0;i--){
            name.push('')
            val.push(this.axis.obj[i].value)
        }
        console.log(val)
        const option = {
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
                    data : name,
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
                    data: val
                },
                {
                    name:'PM',
                    type:'line',
                    yAxisIndex: 1,
                    data: val
                }
            ]
        }
        chart.setOption(option)
    },
    methods: {
        chartLoad: function(chart){
            this.$emit('chart', chart)
        }
    }
}
</script>
<style lang="less" scoped>
.axis{
    .main{
        width: 100%;
        height: 100%;
    }
}
</style>
