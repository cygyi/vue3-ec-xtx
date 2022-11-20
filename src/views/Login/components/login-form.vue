<template>
  <div class="account-box">
    <div class="form">
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <input type="text" placeholder="请输入用户名或手机号" v-model="loginForm.account" />
        </div>
        <!-- 表单验证错误信息提示 -->
        <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-lock"></i>
          <input type="password" placeholder="请输入密码" v-model="loginForm.password" />
        </div>
      </div>
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="flag" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="handleLogin">登录</a>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
// QQ互联 -> qq connection
// import QC from 'qc'

// 登录流程：
// 1. 搭建结构 + 配置路由
// 2. 收集表单的值 -> v-model双向绑定
// 3. 校验
// 4. 通过了、发请求
// 5. 成功了、vuex管理token

import { reactive, ref } from 'vue'
import { message } from '@/components/Message/index.js'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'LoginForm',
  setup () {
    // 注意：use开头的组合式API、只能在setup()中调用，否则会报错
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 登录表单
    const loginForm = reactive({
      account: 'xiaotuxian',
      password: '123456'
    })

    // 复选框是否勾选
    const flag = ref(true)

    // 登录
    const handleLogin = async () => {
      const { account, password } = loginForm
      // 校验用户名
      if (!account) {
        return message({ type: 'error', text: '用户名不能为空' })
      }
      // 校验密码
      if (!password) {
        return message({ type: 'error', text: '密码不能为空' })
      }
      // 是否勾选
      if (!flag.value) {
        return message({ type: 'error', text: '请同意' })
      }
      // 发请求、触发 action 函数
      await store.dispatch('user/setUserProfileAction', loginForm)
      // 成功提示
      message({ type: 'success', text: '登录成功' })
      // 跳转至首页
      // route.query.redirectUrl: 获取跳转至登录携带的路径参数
      // 如果有值，优先回跳这个地址，否则去首页
      router.replace(route.query.redirectUrl || '/')
    }
    return {
      loginForm,
      flag,
      handleLogin
    }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
