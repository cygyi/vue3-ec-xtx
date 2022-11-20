import { createStore, createLogger } from 'vuex'
// 导入对vuex数据做持久化的插件
import createPersistedstate from 'vuex-persistedstate'
// 导入子模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
// 导入全局 getters
import getters from './getters'
export default createStore({
  // 添加getters选项
  getters,
  // 注册子模块
  modules: {
    user,
    cart,
    category
  },
  // 给 store 配置插件的地方
  plugins: [
    // 数据持久化
    createPersistedstate({
      // 指明持久化到本地的 键名
      key: 'erabbit-client-pc-store',
      // 指明模块名、持久化哪些模块下的数据
      paths: ['user', 'cart', 'category']
    }),
    // 控制台打印日志
    createLogger()
  ]
})
