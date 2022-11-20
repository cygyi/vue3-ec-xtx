import request from '@/utils/request'

/**
 * 登录
 * @param {*} loginForm
 * @returns
 */
export const loginAPI = (loginForm) => {
  return request('/login', 'post', loginForm)
}

/**
 * 根据openID获取用户信息
 * @param {*} uniodId
 * @param {*} source
 * @returns
 */
export const getUserInfoAPI = (unionId, source = 6) => {
  return request('/login/social', 'post', {
    unionId,
    source
  })
}

/**
 * 提交用户手机号绑定
 * @param {*} unionId
 * @param {*} mobile
 * @param {*} code
 * @returns
 */
export const postUserBindAPI = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', {
    unionId,
    mobile,
    code
  })
}

/**
 * 获取验证码
 * @param {*} mobile
 * @returns
 */
export const getCodeAPI = (mobile) => {
  return request('/login/social/code', 'get', {
    mobile
  })
}
