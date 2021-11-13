<template>
  <div ref="draw">
    <el-form ref="form" :model="fundParam" label-width="80px">
      <el-form-item label="基金编码:" style="margin: 10px 0; width: 13%; float: left">
        <auto-complete @select="item => handleSelect(item)" />
      </el-form-item>
      <el-form-item label="基金简称:" style="margin: 10px 0; width: 13%; float: left">
        <auto-complete/>
      </el-form-item>
    </el-form>
    <br>
    <div style="text-align: center">({{fund.fundCode}})[{{fund.fundIntro}}]</div>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
import AutoComplete from '../common/AutoComplete'
export default {
  components: {AutoComplete},
  comments: { AutoComplete },
  name: 'fund',
  data () {
    return {
      fundParam: {
        fund: '167301',
        indicator: '累计净值走势'
      },
      fund: 	{
        fundAbbr: "",
        fundCode: "基金代码",
        fundIntro: "基金简称",
        fundPinyin: "",
        fundType: ""
      },
      chart: undefined,
      lineSeries: undefined,
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
    this.getData(this.fundParam).then(data => {
      this.draw(data)
    })
    this.initScreenMonitor()
  },
  methods: {
    // 输入框选择事件
    handleSelect (item) {
      this.fund = item
      const promise = new Promise((resolve, reject) => {
        resolve();
      });
      let param;
      promise.then(() => {
        param =  {
          fund: item.fundCode,
          indicator: '累计净值走势'
        }
      }).then(() => {
        this.getData(param).then(data => {
          this.lineSeries.setMarkers(data)
        })
      })
    },

    // 初始化窗口监听事件加载
    initScreenMonitor () {
      window.onresize = () => { // 定义窗口大小变更通知事件
        this.screenWidth = document.documentElement.clientWidth // 窗口宽度
        this.screenHeight = document.documentElement.clientHeight // 窗口高度
      }
    },

    // 获取数据
    getData (param) {
      return this.$axios.post('/fundBasicInfo/history', param).then(res => res.data.data)
    },

    // 绘制图标
    draw (data) {
      let dom = this.$refs.draw
      let width = this.$refs.draw.clientWidth
      let height = this.$refs.draw.clientHeight
      this.chart = createChart(dom, { width: width, height: 300 })
      this.lineSeries = this.chart.addLineSeries()
      this.lineSeries.setData(data)
      // lineSeries.setData([
      //   { time: '2019-04-11', value: 80.01 },
      //   { time: '2019-04-12', value: 96.63 },
      //   { time: '2019-04-13', value: 76.64 },
      //   { time: '2019-04-14', value: 81.89 },
      //   { time: '2019-04-15', value: 74.43 },
      //   { time: '2019-04-16', value: 80.01 },
      //   { time: '2019-04-17', value: 96.63 },
      //   { time: '2019-04-18', value: 76.64 },
      //   { time: '2019-04-19', value: 81.89 },
      //   { time: '2019-04-20', value: 74.43 }
      // ])
    },
    reDraw (data) {
      let width = this.$refs.draw.clientWidth
      let height = this.$refs.draw.clientHeight
      console.log(width, height)
      this.chart.resize(width, 300  )
    }
  }
}
</script>

<style scoped>
</style>
