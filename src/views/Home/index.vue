<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomeNew />
        <!-- 人气推荐 -->
        <HomeHot />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot.vue'
export default {
  name: 'XtxHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot
  }
}
</script>
