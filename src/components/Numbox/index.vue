<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="decrease">-</a>
      <!--
        readonly: 只读、只能看，不能改
        disabled: 禁用、只能看，不能改、变灰度
       -->
      <input type="text" readonly :value="count">
      <a href="javascript:;" @click="increase">+</a>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxNumbox',
  // 告诉给组件使用的人，这个组件向外发射了哪些事件
  emits: ['update:modelValue'],
  // 告诉给组件使用的人，这个组件向内接收了哪些数据
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    // 控制数量的最小值
    min: {
      type: Number,
      default: 1
    },
    // 控制数量的最大值
    max: {
      type: Number,
      required: true
    }
  },
  setup (props, { emit }) {
    // 数量
    const count = ref(props.modelValue)
    // 点击+
    const increase = () => {
      // 不能高于最大值
      if (count.value >= props.max) return
      count.value++
    }
    // 点击-
    const decrease = () => {
      // 不能低于最小值
      if (count.value <= props.min) return
      count.value--
    }
    // 监视count的变化，变了之后通过事件传给父组件
    watch(count, newVal => {
      emit('update:modelValue', newVal)
    })
    return {
      count,
      increase,
      decrease
    }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    >a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    >input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
