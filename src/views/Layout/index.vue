<template>
  <!-- 顶部导航组件 -->
  <app-topnav />
  <!-- 头部组件 -->
  <app-header />
  <!-- 吸顶组件 -->
  <app-header-sticky :class="{ 'show': y >= 78 }" />
  <!-- 主体区域 -->
  <div>
    <!-- 二级路由出口 -->
    <!--
      消除路由缓存，强制切换
      $route.path: 每个路由的路径肯定不是不同的
     -->
    <router-view :key="$route.path" />
  </div>
  <!-- 底部组件 -->
  <app-footer />
</template>–

<script>
// Layout是一个架子、由4部分组成：
//  app-topnav:  顶部导航组件
//  app-header:  头部组件
//    app-header-nav: 头部导航
//  router-view: 二级路由出口
//  app-footer:  底部组件
// 导入 Layout 相关的组件
import AppTopnav from './components/app-topnav.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'
// 头部吸顶组件
import AppHeaderSticky from './components/app-header-sticky.vue'
// @vueuse/core: 第3方的模块包，提供了很多vue3中可以用的组合式API
// 1. 下包
// 2. 按需导入需要用到的方法
import { useWindowScroll } from '@/compositions/useWindowScroll'
// 3. 在setup()中调用方法

import { useStore } from 'vuex'
export default {
  name: 'XtxLayout',
  // 局部注册组件
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    // 触发 store/cart模块下 action方法
    store.dispatch('category/setCategoryListAction')
    // y就是滚动高的响应式数据，是个ref对象
    const { y } = useWindowScroll()
    // 返回响应式数据
    return {
      y
    }
  }
}
</script>

<style scoped lang='less'>

</style>
