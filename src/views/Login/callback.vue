<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <!-- 切换的按钮 -->
    <nav class="tab">
      <a href="javascript:;" @click="compName = 'CallbackBind'" :class="{ active: compName === 'CallbackBind' }">
        <i class="iconfont icon-bind"/>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a href="javascript:;" @click="compName = 'CallbackPatch'" :class="{ active: compName === 'CallbackPatch' }">
        <i class="iconfont icon-edit"/>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <!-- 显示的内容 -->
    <div class="tab-content">
      <!-- <CallbackBind v-if="compName === 'CallbackBind'" />
      <CallbackPatch v-else /> -->
      <!-- 动态组件，通过is属性实现组件切换 -->
      <component :is="compName" :open-id="unionID"/>
    </div>
  </section>
  <LoginFooter/>
</template>

<script>

import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'

import {ref} from 'vue'

import {getUserInfoAPI} from '@/api/user'

import QC from 'qc'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

// 小兔仙项目可以在简历上体现的点：
// 1. 数据懒加载 + 图片懒加载自定义指令
// 2. 骨架屏组件优化（多模板+条件渲染）
// 3. sku组件（如何选中、如何禁用、如何回显、如何收集选中的sku）
// 4. v-model的原理及作用在组件上
// 5. 第三方登录流程

export default {
  name: 'PageCallback',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackBind,
    CallbackPatch
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    // 动态切换的组件
    const compName = ref('CallbackBind')
    const unionID = ref('')
    // QC.Login.check(): 检测用户是否QQ成功，是则是true；否则是false
    // QC.Login.getMe(): 获取QQ分配的openID,标识QQ登录成功的凭证
    if (QC.Login.check()) { // QQ认证成功
      // 获取QQ分配的openID
      QC.Login.getMe(async openID => {
        // 保存openID
        // 基于openID请求当前用户信息
        // 有两种情况，如果绑定了，会得到用户信息对象；否则未绑定
        const resp = await getUserInfoAPI(openID)
        console.log(resp)

      }
      return {
        compName,
        unionID
      }
    }
  }
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
