import ElementUI from 'element-ui'

// 内存中正在请求的数量
let loading
let loadingNum = 0

const startLoading = function () {
  ++loadingNum
  // console.log(`全局加载开始`, loadingNum)
  if (loadingNum !== 0) {
    // console.log(`执行loading`, loadingNum)
    loading = ElementUI.Loading.service({
      lock: true,
      text: '拼命加载中...',
      background: 'rgba(0,0,0,0.2)',
      fullscreen: true
    })
    // console.log(`loading`, loading)
  }
  // 请求数量加1
  console.log(loadingNum)
}

const endLoading = function () {
  // 请求数量减1
  loadingNum--
  console.log(loadingNum)
  // console.log(`全局加载结束`, loadingNum)
  if (loadingNum === 0) {
    loading.close()
  }
}

export default {
  startLoading,
  endLoading
}
