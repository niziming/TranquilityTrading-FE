<template>
    <div class='error'>
      <h1>
        {{ msg }}
      </h1>
    </div>
</template>

<script>
export default {
  name: 'error',
  data () {
    return {
      msg: 'Not Found 404'
    }
  },
  computed: {},
  methods: {
    resertPage () {
      this.$message.warning('页面不存在3S后返回')
      setTimeout(() => {
        window.history.go(-1)
      }, 3000)
    }
  },
  mounted () {
    this.resertPage()
  }

}
</script>

<style lang="scss" scoped>
  /*.block {*/
  /*  width: 1000px;*/
  /*  @include base-background();*/
  /*}*/
    /*.error {*/
      /*width: 100vw;*/
      /*height: 100vh;*/
      /*color: #fff;*/
    /*}*/
</style>
