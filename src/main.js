import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

let app = Vue.extend(App)

let router = new VueRouter({
  linkActiveClass: 'active'
})

// 定义路由－组件映射
router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})

router.redirect({
  // 重定向 / 到 /goods
  '/': '/goods',
  // 重定向任意未匹配路径到 /goods
  '*': '/goods'
})

// 挂载路由
router.start(app, '#app')

// 跳转到/goods
// router.go('/goods')
