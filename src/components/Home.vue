<template>
  <div>
    <home-header :seller="seller"></home-header>
    <home-nav></home-nav>
    <keep-alive>
      <router-view :seller="seller" :ratings="ratings"></router-view>
    </keep-alive>
    <shop-cart
    :seller="seller"
    :selectFoods="selectFoods"
    @empty="handleEmpty"
    ></shop-cart>
  </div>
</template>

<script>
import HomeHeader from './header/Header.vue'
import HomeNav from './nav/Nav.vue'
import shopCart from './shopCart/shopCart.vue'
import Bus from '../bus.js'
import axios from 'axios'

let FIRST = true

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeNav,
    shopCart
  },
  data () {
    return {
      seller: {},
      ratings: [],
      goods: [],
      selectFoods: []
    }
  },
  mounted () {
    this.getmsg()
    Bus.$on('selectFoods', (v) => {
      this.selectFoods = v
    })
  },
  methods: {
    getmsg () {
      axios.get('/api/data.json')
        .then(this.getDataSucc)
        .catch(this.getDataFail)
    },
    getDataSucc (res) {
      res = res.data
      if (res.ret && res) {
        this.seller = res.seller
        this.ratings = res.ratings
        this.goods = res.goods
      }
    },
    getDataFail (err) {
      console.log(err)
    },
    handleEmpty () {
      Bus.$emit('empty')
    }
  },
  watch: {
    goods () {
      if (this.goods.length) {
        Bus.$emit('goods', this.goods, this.seller)
      }
    },
/*    '$route' () {
      if (this.$route.name ===  "ratings" && FIRST) {
        this.getmsg ()
        FIRST = false
      }
    }*/
  }
}
</script>

<style>
</style>
