import { useIntersectionObserver }
  from '@vueuse/core'

// 图片懒加载指令
export const lazyload = {
  // 指令钩子，mounted 指令表示所在DOM元素插入到真实DOM中自动触发一次
  mounted (el, binding) {
    // el：指令所在的DOM元素 -> img
    // binding.value: 指令绑定的表达式的值 -> 图片的网络路径
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) { // 说明图片在可视区
          // 这时再去加载对应图片
          el.src = binding.value
          stop()// 停止监视
        }
      })
  }
}
