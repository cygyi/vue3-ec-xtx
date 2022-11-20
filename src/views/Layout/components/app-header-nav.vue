<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <!-- 渲染导航列表 -->
    <template v-if="categoryList.length">
      <!-- 遍历生成导航分类列表 -->
      <li v-for="item in categoryList" :key="item.id">
        <!-- 根据ID跳转到指定的分类 -->
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
      </li>
    </template>
    <!-- 渲染骨架屏 -->
    <template v-else>
      <li v-for="item in 9" :key="item">
        <xtx-skeleton :width="60" :height="32" bg="rgba(0,0,0,0.5)" style="margin-right:5px" />
      </li>
    </template>
  </ul>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'AppHeaderNav',
  setup () {
    // 调用 useStore() 方法 -> 获取store对象
    const store = useStore()
    // 通过计算属性、获取 vuex中的 categoryList
    const categoryList = computed(() => store.state.category.categoryList)

    // 返回响应式数据和方法
    return {
      categoryList
    }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
  }
}
</style>
