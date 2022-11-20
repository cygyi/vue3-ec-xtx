<template>
  <div class='xtx-goods-page'>
    <!--
      技巧：因为这里的goodsObj是通过发请求回来赋的值
      刚开始，goodsObj是个空对象，空对象取属性是undefined，如果继续访问属性，会报错
      解决方式：v-if对外层盒子做条件判断（检测对象中是否存在某个属性，如果有，说明后台数据赋值成功，
      这时才继续渲染后续内容）
     -->
    <div class="container" v-if="goodsObj.id">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem v-for="item in categories" :key="item.id">
          {{ item.name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ goodsObj.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片预览区 -->
          <xtx-image-view :imageList="goodsObj.mainPictures" />
          <!-- 销售信息 -->
          <goods-sale :item="goodsObj" />
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <!-- 信息组件 -->
          <goods-info :item="goodsObj" />
          <!-- 规格组件 -->
          <goods-sku :goods="goodsObj" @finish="f" />
          <!-- 控制数量组件 -->
          <xtx-numbox v-model="num" :max="goodsObj.inventory" />
          <!-- 加入购物车按钮 -->
          <xtx-button type="primary" size="middle" style="margin-top:20px;">加入购物车</xtx-button>
        </div>
      </div>
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <!-- 商品详情 -->
            <GoodsDetail :goods="goodsObj" />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getGoodsDetailAPI } from '@/api/goods'
import {
  useRoute
} from 'vue-router'
// useRoute() => route => this.$route =>    获取路由参数
// useRouter() => router => this.$router => 路由跳转

import { ref, computed } from 'vue'

import GoodsSale from './components/goods-sale.vue'
import GoodsInfo from './components/goods-info.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetail from './components/goods-detail.vue'
import GoodsHot from './components/goods-hot'

export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsSale,
    GoodsInfo,
    GoodsSku,
    GoodsDetail,
    GoodsHot
  },
  setup () {
    // 商品对象
    const goodsObj = ref({})
    const route = useRoute()
    getGoodsDetail()
    // 获取商品详情
    async function getGoodsDetail () {
      // route.params.id: 获取动态路由参数
      // 1. 发请求
      const resp = await getGoodsDetailAPI(route.params.id)
      // 2. 赋值
      goodsObj.value = resp.result
    }
    // 计算属性得到分类列表
    const categories = computed(() => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return goodsObj.value.categories.sort((o1, o2) => o1.layer - o2.layer)
    })

    // 当子组件 goods-sku 选择完毕了规则之后，需要把对应的数据传过来
    const f = (skuObj) => {
      if (skuObj) {
        // 更新goodsObj原价和现价（规格不同，价格不同）
        goodsObj.value.oldPrice = skuObj.oldPrice
        goodsObj.value.price = skuObj.price
        // 更新库存
        goodsObj.value.inventory = skuObj.inventory
        // goodsObj.value = {
        //   ...goodsObj.value,
        //   ...skuObj
        // }
      } else {
        console.log('请选择完整规格')
      }
    }
    // 收集数量，默认值是1
    const num = ref(1)
    return {
      goodsObj,
      categories,
      f,
      num
    }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
