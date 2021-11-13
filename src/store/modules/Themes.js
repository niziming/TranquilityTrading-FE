const state = {
  nowThemeInfo: 'default-theme', // 当前主题
  themes: ['default', 'red'] // 所有主题
}

const mutations = {
  SET_THEMEINFO (state, theme) {
    state.nowThemeInfo = `${theme}-theme`
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
