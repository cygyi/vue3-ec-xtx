import request from '@/utils/request'

/**
 * 根据ID获取商品详情
 * @param {*} id
 * @returns
 */
export const getGoodsDetailAPI = (id) => {
  return request('/goods', 'get', {
    id
  })
}

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const reqFindHotGoods = ({ id, type, limit = 3 }) => request('/goods/hot', 'get', { id, type, limit })
