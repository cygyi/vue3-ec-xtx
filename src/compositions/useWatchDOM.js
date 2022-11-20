
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const useWatchDOM = (apiFn) => {
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    // target是监视的目标DOM元素、既可以是个ref对象，也可以是个原生DOM
    target,
    ([{ isIntersecting }]) => {
      // isIntersecting: 布尔值，表示监视的DOM元素是否出现在了可视区；
      // 如果是，值是true；否则是false
      if (isIntersecting) {
        // 调用传入的接口方法、获取相应的数据
        apiFn()
        // 停止监视
        stop()
      }
    }
  )
  // 返回监听的DOM元素
  return target
}
