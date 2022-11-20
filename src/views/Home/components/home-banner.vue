<template>
  <div class="home-banner">
    <xtx-slider :sliders="bannerList" />
  </div>
</template>

<script>
import { getBannerListAPI } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    // 轮播图列表
    const bannerList = ref([])

    getBannerList()

    // 获取轮播图列表
    async function getBannerList () {
      // 发请求
      const resp = await getBannerListAPI()
      // 赋值
      bannerList.value = resp.result
    }
    return {
      bannerList
    }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
