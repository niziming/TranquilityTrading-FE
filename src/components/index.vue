<template>
  <el-container>
<!--    <el-header class="header">十渊佛系量化交易系统</el-header>-->
    <el-container>
      <AsideBar/>
      <el-container>
        <el-main class="main">
          <bread-crumb/>
          <router-view/>
        </el-main>
        <el-footer class="footer">@ 十渊</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from './layout/header'
import AsideBar from './layout/aside'
import BreadCrumb from './layout/breadcrumb'
export default {
  name: 'index',
  components: {Header, AsideBar, BreadCrumb},
  data () {
    return {
      tableColumn: [
        {
          prop: 'asf',
          label: '你好'
        }
      ],
      msg: 'Dynamic Themes',
      theme: 'light'
    }
  },
  computed: {
    themeClass () {
      console.log(`theme-${this.theme}`)
      return `theme-${this.theme}`
    }
  },
  methods: {
    changeTheme (type) {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      // this.$store.commit('upDate', {themeType: type})
      window.document.documentElement.setAttribute('data-theme', this.theme)
      this.$axios.get('/test').then(res => {})
      console.log(this.$config)
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
