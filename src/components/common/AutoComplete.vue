<template>
  <div>
    <el-autocomplete
      v-model="fund.fundCode"
      value-key="fundIntro"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="(item) => $emit('select', item)"/>
  </div>
</template>

<script>
export default {
  name: "AutoComplete",
  data() {
    return {
      restaurants: [
        {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
        {"value": "阳阳麻辣烫", "address": "天山西路389号"},
        {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
      ],
      fund: {
        fundCode: '',
        fundIntro: ''
      },
      timeout: null
    };
  },
  mounted() {
    this.init(this.fund).then(data => {
      this.restaurants = data
    })
  },
  methods: {
    init (param) {
      return this.$axios.get('/fundBasicInfo', {params: param}).then(res => {
        return res.data.data.records
      })
    },
    querySearchAsync(queryString, cb) {
      let param
      let promise = new Promise((resolve, reject) => {
        resolve();
      });
      promise.then(() => {
        param = {fundIntro: queryString}
      }).then(() => {
        this.init(param).then(data => {
          cb(data)
        })
      })
    },
    // createStateFilter(queryString) {
    //   return (state) => {
    //     return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //   };
    // },
    // handleSelect(item) {
    //   console.log(item);
    // }
  }
}
</script>

<style scoped>

</style>
