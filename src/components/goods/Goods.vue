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
  </div>
</template>

<script>
import GoodsList from './components/goodsList.vue'
import FoodsList from './components/foodsList.vue'
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
      clickIndex: ''
    }
  },
  components: {
    GoodsList,
    FoodsList
  },
  mounted () {
    Bus.$on('goods', (res) => {
      this.goods = res
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
