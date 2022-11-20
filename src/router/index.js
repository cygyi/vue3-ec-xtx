import { createRouter, createWebHashHistory } from 'vue-router'

// 路由表规则
const routes = [
  {
    path: '/',
    // 路由懒加载
    component: () => import('@/views/Layout'),
    children: [
      { // 空字符串表示默认路由，一进Layout就展示Home页
        path: '',
        component: () => import('@/views/Home')
      }, { // 一级分类
        path: 'category/:id', // 动态路由
        component: () => import('@/views/Category')
      }, { // 二级分类
        path: 'category/sub/:id',
        component: () => import('@/views/Category/Sub')
      }, { // 商品详情
        path: 'goods/:id',
        component: () => import('@/views/Goods')
      }
    ]
  }, { // 测试代码
    path: '/playground',
    component: () => import('@/views/Playground')
  }, { // 登录
    path: '/login',
    component: () => import('@/views/Login')
  }, { // QQ登录成功的回跳界面
    path: '/login/callback',
    component: () => import('@/views/Login/callback.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 路由切换时，路由页面回到顶部
  scrollBehavior: () => ({ top: 0 })
})

export default router
