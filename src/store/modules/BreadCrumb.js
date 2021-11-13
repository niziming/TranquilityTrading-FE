const state = {
  // 搜索文本
  breadCrumb: [
    {
      name: '首页',
      path: '/'
    },
    {
      name: '搜索',
      path: '/search'
    }
  ]
}

const mutations = {
  SET_BREAD_CRUMB: (state, payload) => {
    state.searchText = payload
  }
}

const actions = {
  SET_BREAD_CRUMB ({commit}) {
    let param = ''
    commit('SET_BREAD_CRUMB', param)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
