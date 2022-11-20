import { loginAPI } from '@/api/user'

const state = () => {
  return {
    // 用户资料
    profile: {
      token: ''
    }
  }
}
const mutations = {
  setUserProfile: (state, profile) => {
    state.profile = profile
  }
}
const actions = {
  // 登录
  setUserProfileAction: async ({ commit }, loginForm) => {
    // 1. 发请求
    const resp = await loginAPI(loginForm)
    // 2. 提交mutation
    commit('setUserProfile', resp.result)
  },
  // 退出登录
  logoutAction: ({ commit }) => {
    // 清空vuex中的profile
    commit('setUserProfile', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
