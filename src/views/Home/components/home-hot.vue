<template>
  <div class="home-hot" ref="target">
    <HomePanel title="人气推荐" subtitle="人气爆款 不容错过">
      <!-- 主体内容 -->
      <!-- 主体数据模板 -->
      <template #default v-if="hotList.length">
        <ul class="goods-list">
          <li v-for="item in hotList" :key="item.id">
            <RouterLink to="/">
              <img v-lazyload="item.picture">
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
      </template>
      <!-- 骨架屏占位模版 -->
      <template #default v-else>
        <ul class="goods-list">
          <li v-for="item in 4" :key="item">
            <!--
              表达式：
                1. 所有字面量
                2. 对象.属性
                3. 函数的调用
                4. 加减乘除三元等
                5. setup()返回的属性名
             -->
            <xtx-skeleton :width="306" :height="406" />
          </li>
        </ul>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import { ref } from 'vue'
import { getHotListAPI } from '@/api/home'
import { useWatchDOM } from '@/compositions/useWatchDOM'

export default {
  name: 'HomeHot',
  components: {
    HomePanel
  },
  setup () {
    // 人气推荐列表
    const hotList = ref([])

    const target = useWatchDOM(getHotList)

    async function getHotList () {
      const resp = await getHotListAPI()
      hotList.value = resp.result
    }
    // 返回响应式数据
    return {
      hotList,
      target
    }
  }
}
</script>
<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
