import axios from 'axios'
import config from './sync-config'
// import config from '../../../static/config/config.json'
import router from '@/router/index.js'
import ElementUI from 'element-ui'
import globalLoading from './globalLoading.js'
import qs from 'qs'

// 配置请求超时时间
axios.defaults.timeout = config.axios.timeout.value
// 配置axios基本请求地址
axios.defaults.baseURL = config.axios.baseURL.value

// 全局请求拦截处理
axios.interceptors.request.use(config => {
  if (config.headers.loading !== false) globalLoading.startLoading()
  return config
}, (err) => {
  globalLoading.endLoading()
  // 对请求错误的处理
  return Promise.reject(err)
})

// 全局响应拦截处理
axios.interceptors.response.use(
  (config) => {
    globalLoading.endLoading()
    switch (config.data.code) {
      case 200:
        return config
      case 500:
        ElementUI.Message.error(config.data.msg)
        return config
      default:
        return config
    }
  },
  (err) => {
    globalLoading.endLoading()
    // const { config, code, message } = err
    console.log(`响应错误处理`)
    // if (code === 'ECONNABORTED') ElementUI.Message.warning(`请求超时,请稍后重试`)
    if (err.response) {
      switch (err.response.status) {
        case 401:
          ElementUI.Message.error(err.response.data)
          sessionStorage.removeItem('Authorization')
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          })
          return Promise.reject(err)
      }
    }
    return Promise.reject(err)
  }
)

export default axios
