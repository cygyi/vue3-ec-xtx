<template>
  <div>
    <p>{{ count }}</p>
    <button @click="zt">暂停</button>
    <button @click="hf">恢复</button>
    <button @click="cxks">重新开始</button>
  </div>
</template>

<script>
// useIntervalFn:
// 内部也是基于setInterval()封装的
// clearInterval()关闭setInterval()
import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'
export default {
  name: 'XtxPlaygound',
  setup () {
    // useIntervalFn(回调，时间间隔)
    // pause: 暂停定时器的执行
    // resume: 恢复定时器
    const count = ref(5)
    const { pause, resume } = useIntervalFn(() => {
      count.value--
      if (count.value <= 0) {
        pause()
        count.value = 5
        if (count.value === 5) {
          resume()
        }
      }
    }, 1000)

    // 暂停
    const zt = () => {
      if (count.value === 0) {
        pause()
      }
    }
    // 恢复
    const hf = () => {
      resume()
    }
    // 重新开始
    const cxks = () => {
      count.value = 5
      resume()
    }
    return {
      zt,
      hf,
      cxks,
      count
    }
  }
}
</script>

<style>

</style>
