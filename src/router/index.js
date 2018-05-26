import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Goods from '@/components/goods/Goods.vue'
import Ratings from '@/components/ratings/Ratings.vue'
import Seller from '@/components/seller/Seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/goods',
      children: [{
        path: 'goods',
        name: 'Goods',
        component: Goods,
        props: true
      }, {
        path: 'ratings',
        name: 'ratings',
        component: Ratings
      }, {
        path: 'seller',
        name: 'seller',
        component: Seller
      }]
    }
  ],
  linkActiveClass: 'active'
})
