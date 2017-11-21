<template>
    <div class="pie">
        <div class="main"></div>
    </div>
</template>
<script>
export default {
    props: ["pie"],
    data(){
        return {}
    },
    mounted(){
        let chart = this.$echarts.init(document.querySelector(this.pie.node+' .main'), 'purple-passion')
        this.chartLoad(chart)
        const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['0%', '30%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        data: this.pie.inData,
                    },
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '55%'],
                        label: {
                            normal: {
                                formatter: '{a|{a}}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                       data: this.pie.outData
                    },
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
.pie{
    .main{
        width: 100%;
        height: 100%;
    }
}
</style>