<template>
   <div class="pie">
       <div class="main"></div>
   </div>
</template>
<script>
import echarts from 'echarts'
export default {
    props: ["pie"],
    data(){
        return {
            chart: {}
        }
    },
    mounted(){
        //  使用canvas或者svg引擎渲染
        this.chart = echarts.init(document.querySelector('.pie'+this.pie.node+' .main'), null, {renderer: 'canvas'})
        this.chart.showLoading()
        this.init()
        this.chart.hideLoading()
    },
    methods: {
        init: function(){
            
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 0,
                    data: this.pie.legend
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
            this.chart.setOption(option)
            this.chart.on('click', function (params) {
                console.log(params);
            });
        }
    }
}
</script>
<style lang="less" scoped>
.pie{
    width: 100%;
    height: 100%;
    .main{
        width: 100%;
        height: 100%;
    }
}
</style>