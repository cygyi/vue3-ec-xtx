<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" subtitle="新鲜出炉 品质靠谱">
      <!-- 右侧内容 -->
      <template #right>
        <XtxMore />
      </template>
      <!-- 主体数据模板 -->
      <template #default v-if="newList.length">
        <ul ref="pannel" class="goods-list">
          <li v-for="item in newList" :key="item.id">
            <RouterLink to="/">
              <img v-lazyload="item.picture" alt="" />
              <p class="name">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
      </template>
      <!-- 骨架屏占位模版 -->
      <template #default v-else>
        <ul ref="pannel" class="goods-list">
          <li v-for="item in 4" :key="item">
            <xtx-skeleton :width="306" :height="406" />
          </li>
        </ul>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import { getNewListAPI } from '@/api/home'
import { ref } from 'vue'
import { useWatchDOM } from '@/compositions/useWatchDOM'

export default {
  name: 'XtxHomeNew',
  components: {
    HomePanel
  },
  setup () {
    // 新鲜好物列表
    const newList = ref([])
    // 调用自己的监视DOM方法
    // target是个ref对象、用来关联监视的DOM元素
    const target = useWatchDOM(getNewList)
    async function getNewList () {
      const resp = await getNewListAPI()
      newList.value = resp.result
    }
    // 返回响应式数据
    return {
      newList,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
