// 全局 getters
const getters = {
  token: state => state.user.profile.token,
  nickname: state => state.user.profile.nickname,
  account: state => state.user.profile.account
}
export default getters
