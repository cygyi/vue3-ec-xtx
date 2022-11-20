import { getCategoryListAPI } from '@/api/home'

const state = () => {
  return {
    // 分类列表
    categoryList: []
  }
}
const mutations = {
  setCategoryList: (state, newList) => {
    state.categoryList = newList
  }
}
const actions = {
  setCategoryListAction: async ({ commit }) => {
    // 1. 调接口、发请求
    const resp = await getCategoryListAPI()
    // 2. 提交mutation、完成赋值
    commit('setCategoryList', resp.result)
    // 组件只需触发这个action函数即可
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
