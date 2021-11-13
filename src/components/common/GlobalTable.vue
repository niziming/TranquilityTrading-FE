<template>
    <div class='GlobalTable'>
        {{ msg }}
    </div>
</template>

<script>
export default {
  name: 'GlobalTable',
  data () {
    return {
      msg: 'GlobalTable'
    }
  },
  mounted () {},
  computed: {},
  methods: {}
}
</script>

<style lang='less' scoped>
    .GlobalTable {
      height: 100px;
      @include themify {
        border: 1px solid themed('border-color');
        background-color: themed('sb-bg');
      }
    }
</style>
