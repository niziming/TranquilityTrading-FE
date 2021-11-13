<template>
  <div ref="draw">
    welcome to fund
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
export default {
  name: 'fund',
  data () {
    return {
      chart: undefined,
      screenWidth: document.body.clientWidth, // 屏幕宽度
      screenHeight: document.body.clientHeight // 屏幕高度
    }
  },
  watch: {
    screenWidth (val) { // 监听屏幕宽度变化
      console.log(val)
      this.reDraw()
    },
    screenHeight (val) { // 监听屏幕高度变化
      console.log(val)

      this.reDraw()
    }
  },
  mounted () {
    this.initDraw()
    this.initScreenMonitor()
  },
  methods: {
    initScreenMonitor () {
      window.onresize = () => { // 定义窗口大小变更通知事件
        this.screenWidth = document.documentElement.clientWidth // 窗口宽度
        this.screenHeight = document.documentElement.clientHeight // 窗口高度
      }
    },
    initDraw () {
      let dom = this.$refs.draw
      let width = this.$refs.draw.clientWidth
      let height = this.$refs.draw.clientHeight
      this.chart = createChart(dom, { width: width, height: height })
      const lineSeries = this.chart.addLineSeries()
      lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 }
      ])
    },
    reDraw () {
      let width = this.$refs.draw.clientWidth
      let height = this.$refs.draw.clientHeight
      console.log(width, height)
      this.chart.resize(width, height)
    }
  }
}
</script>

<style scoped>
#draw {
  width: 100%;
  height: 100%;
}

</style>
