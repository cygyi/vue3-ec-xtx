// 导入公共的请求函数
import request from '@/utils/request'

/**
 * 获取头部导航分类列表
 */
export const getCategoryListAPI = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取轮播图列表
 * @returns
 */
export const getBannerListAPI = () => {
  return request('/home/banner', 'get')
}

/**
 * 获取新鲜好物列表
 * @returns
 */
export const getNewListAPI = () => {
  return request('/home/new', 'get', {
    limit: 20
  })
}

/**
 * 获取人气推荐列表
 * @returns
 */
export const getHotListAPI = () => {
  return request('/home/hot', 'get')
}
