<template>
  <div class="Goods">
   <div class="goods-wraper" ref="goods">
     <goods-list :goods="goods"
     :currentIndex="currentIndex"
     @handleClick="handleClick"
     ></goods-list>
   </div>
   <div class="foods-wraper" ref="foods">
     <foods-list
     :goods="goods"
     :scrollY="scrollY"
     @index="handleIndex"
     :clickIndex="clickIndex"
     :scrollfood="scrollfood"
     ></foods-list>
   </div>
   <shop-cart
   :seller="seller"
   :selectFoods="selectFoods"
   @empty="handleEmpty"
   ></shop-cart>
  </div>
</template>

<script>
import GoodsList from './components/goodsList.vue'
import FoodsList from './components/foodsList.vue'
import shopCart from './components/shopCart.vue'
import BScroll from 'better-scroll'
import Bus from '@/bus.js'
export default {
  name: 'HomeGoods',
  data () {
    return {
      goods: [],
      scrollfood: '',
      scrollgood: '',
      scrollY: 0,
      currentIndex: 0,
      clickIndex: '',
      seller: {}
    }
  },
  components: {
    GoodsList,
    FoodsList,
    shopCart
  },
  computed: {
    selectFoods () {
      let selectfoods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            selectfoods.push(food)
          }
        })
      })
      return selectfoods
    }
  },
  mounted () {
    Bus.$on('goods', (goods, seller) => {
      this.goods = goods
      this.seller = seller
    })
    this.$nextTick(() => {
      this.scrollgood = new BScroll(this.$refs.goods, {
        click: true
      })
      this.scrollfood = new BScroll(this.$refs.foods, {
        click: true,
        probeType: 3
      })
      this.scrollfood.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.floor(pos.y))
      })
    })
  },
  methods: {
    handleIndex (num) {
      this.currentIndex = num
    },
    handleClick (num) {
      this.clickIndex = num
    },
    handleEmpty () {
      this.selectFoods.forEach((food) => { food.count = 0 })
    }
  }
}
</script>

<style lang="stylus" scoped>
.Goods
  position fixed
  left 0
  right 0
  top 3.48rem
  bottom 0.94rem
  display flex
  overflow hidden
  z-index -1
  .goods-wraper
    width 1.6rem
    background #f3f5f7
  .foods-wraper
    flex 1
</style>
