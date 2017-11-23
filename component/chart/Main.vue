<template>
   <div id="echarts">
        <div class="big">
            <div id="one">
                <Geo :geo='Data1' @chart='getCharts'/>
            </div>
        </div>
        <div class="small">
            <div id="two">
                <Pie :pie='Data2' @chart='getCharts'/>
            </div>
            <div id="three">
                <Water :water='Data3' @chart='getCharts'/>
            </div>
            <div id="four">
                <Axis :axis='Data4' @chart='getCharts'/>
            </div>
        </div>
   </div>
</template>
<script>
import Geo from './Geo.vue'
import Pie from './Pie.vue'
import Water from './Water.vue'
import Axis from './Axis.vue'
export default {
    data(){
        return {
            charts: [],
            Data1: {
                node: '#one',
                url: '/src/json/geo.json'
            },
            Data2: {
                node: '#two',
                url: '/src/json/pie.json'
            },
            Data3: {
                node: '#three',
                url: '/src/json/water.json'
            },
            Data4: {
                node: '#four',
                url: '/src/json/geo.json'
            }
        }
    },
    components: {
        Geo,
        Pie,
        Water,
        Axis
    },
    mounted(){
        var charts = this.charts
        charts[2].on('click', function(){
            window.open('/dev', '_blank')
        })
        window.onresize = function(){
            for(var i=0;i<charts.length;i++){
                charts[i].resize()
            }
        }
    },
    methods: {
        getCharts: function(data){
            this.charts.push(data)
        }
    }
}
</script>
<style lang="less" scoped>
#echarts{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    background-color: #eee;
    .big{
        width: 60%;
        height: 100%;
        float: left;
        #one{
            width: 100%;
            height: 100%;
        }
    }
    .small{
        width: 40%;
        height: 100%;
        float: left;
        #two, #three, #four{
            width: 100%;
            height: 33.33%;
        }
    }
    @media screen and (max-width: 1050px){
        .big{
            width: 100%;
            height: 60%;
            #one{
                width: 100%;
                height: 100%;
            }
        }
        .small{
            width: 100%;
            height: 40%;
            #two, #three, #four{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>