<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="userObj.avatar" alt="avatar" />
      <p>Hi，{{ userObj.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" type="text" placeholder="绑定的手机号" v-model="bindForm.mobile" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="短信验证码" v-model="bindForm.code" />
        <span class="code" @click="sendCode">
          {{ count === 0 ? '发送验证码' : `${count}秒后重试` }}
        </span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit" @click="handleBind">立即绑定</a>
  </div>
</template>

<script>
import QC from 'qc'
import { reactive, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

import { postUserBindAPI, getCodeAPI } from '@/api/user'
import { message } from '@/components/Message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'CallbackBind',
  props: {
    openId: {
      type: String,
      requried: true
    }
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()
    // 验证码的表单
    const bindForm = reactive({
      mobile: '13012345679',
      code: '123456'
    })
    // 用户对象
    const userObj = reactive({
      avatar: '',
      nickname: ''
    })
    if (QC.Login.check()) { // QQ登录成功
      // 获取QQ这边的用户信息
      QC.api('get_user_info').success(res => {
        // res: QQ这边给的用户信息
        // 赋值
        // 头像
        userObj.avatar = res.data.figureurl_qq_2
        // 昵称
        userObj.nickname = res.data.nickname
      })
    }
    const count = ref(0)
    // 发送验证码
    const sendCode = async () => {
      // 在请求验证码之前也需要校验手机号格式
      if (!/^1[3-9]\d{9}$/.test(bindForm.mobile)) {
        return message({ type: 'error', text: '请输入正确的手机号' })
      }
      // count.value不为零，说明在倒计时中，按钮不能点击，提前结束
      if (count.value !== 0) return
      // 倒计时
      count.value = 60
      const { pause } = useIntervalFn(() => {
        count.value--
        if (count.value <= 0) {
          pause()
        }
      }, 1000)

      // 请求验证码
      await getCodeAPI(bindForm.mobile)
    }
    // 绑定
    const handleBind = async () => {
      const { mobile, code } = bindForm
      // 1. 校验手机号格式
      if (!/^1[3-9]\d{9}$/.test(mobile)) {
        return message({ type: 'error', text: '请输入正确的手机号' })
      }
      // 2. 校验验证码
      if (!/^\d{6}$/.test(code)) {
        return message({ type: 'error', text: '请输入正确的验证码' })
      }
      // 发送绑定请求、传入参数
      const resp = await postUserBindAPI({
        ...bindForm,
        unionId: props.openId
      })
      // 通过vuex管理用户信息
      store.commit('user/setUserProfile', resp.result)
      // 跳转至首页
      router.push('/')
    }

    // 返回
    return {
      userObj,
      sendCode,
      count,
      handleBind,
      bindForm
    }
  }
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>
