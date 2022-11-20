// 插件的使用步骤：
// 1. 定义插件 -> 提供 install() 方法
// 2. 调用插件 -> 调用 install() 方法

// Vue2：
// export default {
//   install (Vue) {
//     // 注册全局组件
//     // Vue.component()
//     // 自定义全局指令
//     // 挂载原型方法
//     // 自定义过滤器
//   }
// }
// Vue.use(插件对象)

// Vue3
// 骨架屏组件
import Skeleton from './Skeleton'
// 轮播图组件
import Slider from './Slider'
// 更多组件
import More from './More'

// 面包屑组件
import Bread from './Bread/index.vue'
import BreadItem from './Bread/Item.vue'

// 图片预览组件
import ImageView from './ImageView'

// 上拉无限加载组件
import InfiniteLoad from './InfiniteLoad'
// 数量控制组件
import Numbox from './Numbox'
// 按钮组件
import Button from './Button'

// 消息提示组件
import Message from './Message/index.vue'
// 复选框组件
import Checkbox from './CheckBox'

// 选择城市组件
import City from './City'

// 图片懒加载指令
import { lazyload } from '@/directive'

export default {
  install (app) {
    // app整个项目的应用实例
    // 1. 注册全局组件
    app.component(Skeleton.name, Skeleton)
    app.component(Slider.name, Slider)
    app.component(More.name, More)
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    app.component(InfiniteLoad.name, InfiniteLoad)
    app.component(ImageView.name, ImageView)
    app.component(City.name, City)
    app.component(Numbox.name, Numbox)
    app.component(Button.name, Button)
    app.component(Message.name, Message)
    app.component(Checkbox.name, Checkbox)
    // 2. 自定义全局指令
    // 图片懒加载指令
    app.directive('lazyload', lazyload)
  }
}
