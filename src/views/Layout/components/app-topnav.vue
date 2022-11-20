<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!--
          template: vue的内置容器组件，相当于一个隐形的div，
          只起一个包裹的作用，它不会破坏标签之间的原有结构
         -->
        <template v-if="$store.getters.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>
              {{ $store.getters.nickname || $store.getters.account }}</a></li>
          <li><a href="javascript:;" @click="handleLogout">退出登录</a></li>
        </template>
        <template v-else>
          <!--
              a: 站间跳转  href属性
              router-link: 站内跳转  to属性
           -->
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>

        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // 退出
    const handleLogout = () => {
      // 触发 logoutAction 函数
      store.dispatch('user/logoutAction')
      // 跳转至登录、带上回跳的路径
      router.push(`/login?redirectUrl=${route.path}`)
    }

    return {
      handleLogout
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
