// 定义一个函数
import Message from './index.vue'
// createVNode创建虚拟DOM
// render：把虚拟DOM渲染成真实DOM
import { createVNode, render } from 'vue'

// 创建一个容器
const div = document.createElement('div')
document.body.appendChild(div)

// 我们可以像elementui中使用 message()函数
// this.$message({ type: 'success', message: '登录成功' })
// this.$message.success('登录成功')

export function message ({ type, text, time = 2000 }) {
  // 书写以函数形式调用组件的逻辑
  // 1. type text 将来会做为message的prop传入
  //    createVNode(Message, {type, text}) -> VNode对象
  // 2. 最终需要把Message组件显示到真实dom中
  //    render(VNode(Message), body下的直接子元素节点中)
  // 3. 俩秒钟之后消失
  //    setTimeout
  //    render(null,div)

  let timer = null
  const VNode = createVNode(Message, { type, text })
  render(VNode, div)
  clearTimeout(timer)
  timer = setTimeout(() => {
    // 销毁组件
    render(null, div)
  }, time)
}
