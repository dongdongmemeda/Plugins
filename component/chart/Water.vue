<template>
    <div class="water">
        <div class="main"></div>
    </div>
</template>
<script>
export default {
    props: ['water'],
    data(){
        return {}
    },
    mounted(){
        let chart = this.$echarts.init(document.querySelector(this.water.node+' .main'), 'chalk')
        this.chartLoad(chart)
        const option = {
            series: [{
                name: this.water.name,
                type: 'liquidFill',
                data: this.water.data,
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
        chart.setOption(option)
    },
    methods:{
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
