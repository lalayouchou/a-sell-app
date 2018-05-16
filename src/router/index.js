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
      name: 'Home',
      component: Home ,
      children: [{
        path: 'Goods',
        name: 'Goods',
        component: Goods
      }, {
        path: 'Ratings',
        name: 'Ratings',
        component: Ratings
      }, {
        path: 'Seller',
        name: 'Seller',
        component: Seller
      }]
    }
  ],
  linkActiveClass: 'active'
})
