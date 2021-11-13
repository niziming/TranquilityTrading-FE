import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('@/components/index.vue')
const error = () => import('@/components/404.vue')
const GlobalTable = () => import('@/components/common/GlobalTable')

Vue.use(Router)

Router.prototype.goBack = () => {
  merchantwallet.rountisBack = true
  window.history.go(-1)
}

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/global-table',
          name: 'GlobalTable',
          component: GlobalTable
        }
      ]
    },
    {
      path: '*',
      name: 'error',
      meta: { msg: '404-页面不存在' },
      component: error
    }
  ]
})

/**
 *  路由拦截
 *  所有需要鉴权的页面,如果存储登录态的cookie不存在就跳登录页
 */
router.beforeEach((to, from, next) => {
  // 遍历 $route.matched 来检查路由记录中的 meta 字段
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getCookie('session')) {
      next() // 进行路由管道中的下一个钩子
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
