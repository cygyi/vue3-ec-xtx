// 导出 useWindowScroll() 方法
// 返回值是一个对象，包含x（滚动宽）, y（滚动高）属性
// x、y都是ref对象

import { ref, onMounted } from 'vue'
export function useWindowScroll () {
  const x = ref(0)
  const y = ref(0)
  // 当DOM挂载完毕后
  onMounted(() => {
    // 监听滚动事件
    window.addEventListener('scroll', () => {
      // 赋值
      x.value = window.scrollX
      y.value = window.scrollY
    })
  })
  return {
    x,
    y
  }
}
