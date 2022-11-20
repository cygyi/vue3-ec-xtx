<template>
  <p class="g-name">{{ item.name }}</p>
  <p class="g-desc">{{ item.desc }}</p>
  <p class="g-price">
    <span>{{ item.price }}</span>
    <span>{{ item.oldPrice }}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至</dd>
      <dd>
        <!--
          Vue2中v-model的原理： :value + @input
          Vue3中v-model的原理： :modelValue + @update:modelValue

          vue3中、v-model作用在组件上，需要做啥：
          1. 组件内props接收名为modelValue的属性
          2. 恰当时机、触发名为 update:modelValue 的自定义事件、并携带新值给父组件
          3. v-model内部会偷偷滴做：监听名为 update:modelValue 的事件，把接收到的新值赋值给
             v-model绑定的数据属性（实现了双向绑定）
         -->
        <XtxCity v-model="city" />
        <!-- <XtxCity :modelValue="city" @update:modelValue/> -->
      </dd>
    </dl>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'GoodsInfo',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup () {
    const city = ref('西藏自治区-拉萨市-阿里区')
    return {
      city
    }
  }
}
</script>
<style lang="less" scoped>
.g-name {
  font-size: 22px
}

.g-desc {
  color: #999;
  margin-top: 10px;
}

.g-price {
  margin-top: 10px;

  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }

    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }

    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}

.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;

  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      color: #666;

      &:last-child {
        span {
          margin-right: 10px;

          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }

        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
