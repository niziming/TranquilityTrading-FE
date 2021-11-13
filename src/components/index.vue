<template>
  <div class="app-root" :data-theme="theme">
    <div class="app-container">
      <p>{{ theme }}</p>
      <label>
        <select v-model="theme">
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>
      <router-view/>
      <CommonTable :tableColumn="tableColumn" />
      <el-button @click="changeTheme">
        click
      </el-button>
    </div>
  </div>
</template>

<script>
import CommonTable from './common/CommonTable';
export default {
  name: 'index',
  components: {CommonTable},
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
