<template>
  <div>
    <el-form ref="form" :model="fundParam" label-width="80px">
      <el-form-item label="基金编码:" style="margin: 10px 0;  float: left">
        <auto-complete @select="item => handleSelect(item)"/>
      </el-form-item>
      <!--      <el-form-item label="基金简称:" style="margin: 10px 0; width: 13%; float: left">-->
      <!--        <auto-complete @select="item => handleSelect(item)"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="查询参数:" style="margin: 10px 0; width: 13%; float: left">
        <el-dropdown>
          <el-button type="primary">
            {{ fundParam.indicator }}<i class="el-icon-arrow-down el-icon--right"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>单位净值走势</el-dropdown-item>
            <el-dropdown-item>累计净值走势</el-dropdown-item>
            <el-dropdown-item>累计收益率走势</el-dropdown-item>
            <el-dropdown-item>同类排名走势</el-dropdown-item>
            <el-dropdown-item>同类排名百分比</el-dropdown-item>
            <el-dropdown-item>分红送配详情</el-dropdown-item>
            <el-dropdown-item>拆分详情</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <br>
    <div style="text-align: center">({{ fund.fundCode || 167301 }})[{{ fund.fundIntro || '单位净值走势' }}]</div>
    <div ref="draw"/>
    <div style="text-align: left">
      <el-dropdown>
        <el-button type="primary">
          交易策略选择<i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>网格交易策略</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="selectStrategy()"> 执行策略</el-button>
      <div>
        <h6>执行参数</h6>
        <el-form ref="form" :model="backTest" label-width="80px">
          <el-form-item label="加仓阈值:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.add" />
          </el-form-item>

          <el-form-item label="减仓阈值:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.sub" />
          </el-form-item>

          <el-form-item label="初始资金:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.initCash" />
          </el-form-item>

          <el-form-item label="加仓率:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.addRate" />
          </el-form-item>

          <el-form-item label="加仓深度:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.addDepth" />
          </el-form-item>

          <el-form-item label="减仓深度:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.subDepth" />

          </el-form-item>
        </el-form>
      </div>
      <br>
      <div>
        <h6>回测结果</h6>
        <el-form ref="form" :model="backTest" label-width="80px">
          <el-form-item label="初始资金:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.initCash" disabled/>
          </el-form-item>

          <el-form-item label="目前资金:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.usageCash" disabled/>
          </el-form-item>

          <el-form-item label="目前持仓:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.depot" disabled/>
          </el-form-item>

          <el-form-item label="总资产:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.depot * backTest.lastValue + backTest.usageCash" disabled/>
          </el-form-item>

          <el-form-item label="买入次数:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.bueTime" disabled/>
          </el-form-item>

          <el-form-item label="卖出次数:" style="margin: 10px 0;  float: left">
            <el-input v-model="backTest.sellTime" disabled/>
          </el-form-item>

        </el-form>

      </div>

    </div>


  </div>
</template>

<script>
import {createChart} from 'lightweight-charts'
import AutoComplete from '../common/AutoComplete'

export default {
  components: {AutoComplete},
  comments: {AutoComplete},
  name: 'fund',
  data() {
    return {
      backTest: {
        add: -0.015,
        sub: 0.020,
        addRate: 0.15,
        subRate: 0.20,
        addDepth: 4,
        subDepth: 4,
        initCash: 5000
      },
      fundData: [],
      fundParam: {
        fund: '167301',
        indicator: '单位净值走势'
      },
      fund: {
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
    screenWidth(val) { // 监听屏幕宽度变化
      console.log(val)
      this.reDraw()
    },
    screenHeight(val) { // 监听屏幕高度变化
      console.log(val)

      this.reDraw()
    }
  },
  mounted() {
    this.getData(this.fundParam).then(data => {
      this.draw(data)
    })
    this.initScreenMonitor()
  },
  methods: {
    // 输入框选择事件
    handleSelect(item) {
      this.fund = item
      const promise = new Promise((resolve, reject) => {
        resolve();
      });
      let param;
      promise.then(() => {
        param = {
          fund: item.fundCode,
          indicator: '单位净值走势'
        }
      }).then(() => {
        this.getData(param).then(data => {
          this.lineSeries.setData(data)
        })
      })
    },

    selectStrategy() {
      let that = this
      this.$axios.post("/fundBasicInfo/trading/grid", {
        fundParam: that.fundParam,
        backTest: that.backTest
      }).then(res => {
        that.backTest = res.data.data
        this.lineSeries.setMarkers([])
        this.lineSeries.setMarkers(res.data.data.tridings)
      })
    },

    // 初始化窗口监听事件加载
    initScreenMonitor() {
      window.onresize = () => { // 定义窗口大小变更通知事件
        this.screenWidth = document.documentElement.clientWidth // 窗口宽度
        this.screenHeight = document.documentElement.clientHeight // 窗口高度
      }
    },

    // 获取数据
    getData(param) {
      return this.$axios.post('/fundBasicInfo/history', param).then(res => res.data.data)
    },

    // 绘制图标
    draw(data) {
      let dom = this.$refs.draw
      let width = this.$refs.draw.clientWidth
      let height = this.$refs.draw.clientHeight
      this.chart = createChart(dom, {width: width, height: 300})
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
    reDraw(data) {
      let width = this.$refs.draw.clientWidth
      let height = this.$refs.draw.clientHeight
      console.log(width, height)
      this.chart.resize(width, 300)
    }
  }
}
</script>

<style scoped>
</style>
