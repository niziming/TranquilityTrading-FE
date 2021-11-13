<template>
  <div>
    <div style="margin: 10px 0">
      <el-form ref="form" :model="fund" label-width="80px">
        <el-form-item label="基金编码" style="width: 33%; float: left">
          <el-input @input="getTableData()" v-model="fund.fundCode"/>
        </el-form-item>
        <el-form-item label="基金简称" style="width: 33%;  float: left">
          <el-input @input="getTableData()" v-model="fund.fundIntro"/>
        </el-form-item>
        <el-form-item label="基金类型" style="width: 33%;  float: left">
          <el-input @input="getTableData()" v-model="fund.fundType"/>
        </el-form-item>
      </el-form>
    </div>
    <common-table
      @current-change="page => getTableData(page)"
      :table-data="tableData"
      :table-column="tableColumn"
      :pager="fund"
    />
  </div>
</template>

<script>
import CommonTable from '../common/CommonTable'

export default {
  components: {CommonTable},
  name: 'fundlist',
  data () {
    return {
      fund: {
        fundCode: '',
        fundIntro: '',
        fundType: '',
        page: 1,
        size: 10,
        total: 10
      },
      tableColumn: [
        {
          prop: 'fundCode',
          label: '基金代码'
        },
        {
          prop: 'fundAbbr',
          label: '拼音缩写'
        },
        {
          prop: 'fundIntro',
          label: '基金简称'
        },
        {
          prop: 'fundType',
          label: '基金类型'
        },
        {
          prop: 'fundPinyin',
          label: '拼音全称'
        }
      ],
      tableData: [
        {
          fundCode: '基金代码',
          fundAbbr: '拼音缩写',
          fundIntro: '基金简称',
          fundType: '基金类型',
          fundPinyin: '拼音全称'
        }
      ]
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData (page) {
      this.fund.page = page || this.fund.page
      this.$axios.get('/fundBasicInfo', {params: this.fund}).then(res => {
        this.fund.total = res.data.data.total
        this.tableData = res.data.data.records
      })
    }
  }
}
</script>

<style scoped>

</style>
