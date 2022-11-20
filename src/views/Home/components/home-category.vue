<template>
  <div class="home-category">
    <!-- 渲染数据的模板 -->
    <template v-if="categoryList.length">
      <ul class="menu">
        <li v-for="item in categoryList" :key="item.id">
          <RouterLink to="/">{{ item.name }}</RouterLink>
          <template v-if="item.children.length > 0">
            <RouterLink v-for="i in item.children" :key="i.id" to="/">{{ i.name }}</RouterLink>
          </template>
          <!-- 弹层layer位置 -->
          <div class="layer">
            <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
            <ul>
              <li v-for="i in item.goods" :key="i.id">
                <RouterLink :to="`/goods/${i.id}`">
                  <img v-lazyload="i.picture" alt="goods" />
                  <div class="info">
                    <p class="name ellipsis-2">
                      {{ i.name }}
                    </p>
                    <p class="desc ellipsis">{{ i.desc }}</p>
                    <p class="price"><i>¥</i>{{ i.price }}</p>
                  </div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </template>
    <!-- 渲染骨架屏的模板 -->
    <template v-else>
      <ul class="menu">
        <li v-for="item in 9" :key="item">
          <xtx-skeleton :width="40" :height="20" bg="rgba(255,255,255,0.2)" />
          <xtx-skeleton :width="50" :height="20" bg="rgba(255,255,255,0.2)" style="margin: 0 10px;" />
          <xtx-skeleton :width="50" :height="20" bg="rgba(255,255,255,0.2)" />
        </li>
      </ul>
    </template>

  </div>
</template>

<script>
// 数据：使用的vuex category中的数据 只不过需要把chilren中的前俩项数据筛选出来
// 基于某些现有的响应式数据经过一定的计算得到新的数据 -> 计算属性

// 骨架屏技术总结：
// 1. 作用：防止在网络慢的情况下，出现用户等待焦虑，就是loading效果的另一种表现形式
// 2. 组件实现原理：设计了一个具有宽高、背景色及帧动画的盒子（帧动画会无限循环执行）
// 3. 使用：准备两套模板、通过 template + v-if做条件渲染
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()
    const categoryList = computed(() => {
      return store.state.category.categoryList.map((item) => {
        return {
          ...item,
          children: item.children.slice(0, 2)
        }
      })
    })
    return {
      categoryList
    }
  }
}
</script>
<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: @xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 1);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: @priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
