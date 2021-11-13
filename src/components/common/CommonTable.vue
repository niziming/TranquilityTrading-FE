<template>
  <div class="CommonTable">
    <el-table
      ref="CommonTable"
      :highlight-current-row='tableConfig.currentRow'
      :height="tableConfig.height"
      :data="tableData"
      :row-style="_rowStyle"
      @row-click="(row) => $emit('row-click', row)"
      style="width: 100%">
      <el-table-column label="序号" type="index" width="50" />
      <slot name="head" />
      <slot
        :name="col.prop"
        v-for="(col, index) in tableColumn">
        <el-table-column
          :width="col.width ? col.width : tableConfig.columnWidth"
          show-overflow-tooltip
          :key="index"
          :prop="col.prop"
          :label="col.label">
          <template slot-scope="scope">
            <span  :style="col.style">
              {{scope.row[col.prop]}}
            </span>
          </template>
        </el-table-column>
      </slot>
      <slot name="end" >
        <template slot-scope="scope">

        </template>
      </slot>
    </el-table>
    <div class="pager" v-if="tableConfig.hasPager">
      <br>
      <el-pagination
        @current-change="(page) => $emit('current-change', page)"
        :current-page.sync="pager.page"
        :page-size.sync="pager.size"
        layout="jumper, prev, pager, next "
        prev-text="上一页"
        next-text="下一页"
        :total="pager.total?pager.total:null"
        :page-count="pager.totalPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    tableConfig: {
      type: Object,
      default: function () {
        return {
          hasPager: true,
          hasIndex: true,
          currentRow: true
        }
      }
    },
    // data
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 栏目
    tableColumn: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 分页
    pager: {
      type: Object,
      default: function () {
        return {
          size: 10,
          page: 1,
          total: 10
        }
      }
    }
  },
  data  () {
    return {}
  },
  computed: {
  },
  methods: {
    _rowStyle (rowData) {
      let { row } = rowData
      return {
        height: '20px',
        'color': row.rowColor || ''
      }
    },
    _updateDom () {
      // this.$refs.CommonTable.doLayout()
      // console.log(this.$refs.CommonTable.setCurrentRow())
      // console.log(this.$refs.CommonTable.setCurrentRow(this.tableData[0]))
    }
  },
  mounted () {
    this._updateDom()
  }
}
</script>

<style lang='scss' scoped>
 .CommonTable {
    /*height: 100%;*/
    .pager {
      height: 0;
      position: sticky;
      bottom: 4px;
    }

  }
  .el-tree{
    font-size: 16px;
  }
//   /deep/.CommonTable{
// /deep/.el-table__header-wrapper{
//   background-color: #d0dae5 !important;
//   // z-index: 9999999999;
// }
// }
</style>
