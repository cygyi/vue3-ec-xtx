import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 normalize.css 重置样式
import 'normalize.css'
// 导入 common.less 公共样式
import './styles/common.less'

// 导入自定义插件对象
import Components from './components'

const app = createApp(App)
// 注册插件
app.use(Components)

// 链式调用、注册插件
app.use(store)
  .use(router)
  .mount('#app')
