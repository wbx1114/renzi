<template>
  <div id="main">雷达图</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'RadirEchars',
  mounted() {
    this.initRandr()
  },
  methods: {
    initRandr() {
      var myChart = echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        legend: {
          data: ['我不是彭于晏', '我不是刘德华']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '摸鱼', max: 100 },
            { name: '加班', max: 100 },
            { name: '干饭', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '学习', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [99, 99, 99, 99, 99, 99],
                name: '我不是彭于晏'
              },
              {
                value: [50, 80, 100, 88, 100, 80],
                name: '我不是刘德华'
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang='scss'>
#main{
    width: 500px;
    height: 500px;
}
</style>
