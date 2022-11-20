import axios from 'axios'
import store from '@/store'
import router from '@/router'

// baseURL设置/超时时间设置
const instance = axios.create({
  // 配置基地址的最好方式：通过环境变量的配置来动态获取
  // .env.development   VUE_APP_BASE_API = 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 1. 获取token
  const { token } = store.state.user.profile
  // 2. 请求头设置token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 3. 返回请求信息给后台
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // 判断openID是否绑定过
  if (error.response.data.code === '501') { // 未绑定
    // 提前返回一个对象，不走失败态的Promise
    return {
      code: 10086, // 自定义
      message: '未绑定', // 错误消息
      result: null// 数据
    }
  }
  // token过期处理
  if (error.response && error.response.status === 401) {
    const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + redirectUrl)
  }
  return Promise.reject(error)
})

/**
 * @param {String} - url  请求地址
 * @param {String} - method  请求类型
 * @param {Object} - submitData  对象类型，提交数据
 */

const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
