<template>
  <div>
    <home-header :seller="seller"></home-header>
    <home-nav ></home-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HomeHeader from './header/Header.vue'
import HomeNav from './nav/Nav.vue'
import Bus from '../bus.js'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeNav
  },
  data () {
    return {
      seller: {},
      ratings: '',
      goods: ''
    }
  },
  mounted () {
    axios.get('/api/data.json')
      .then(this.getDataSucc)
      .catch(this.getDataFail)
  },
  methods: {
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
    }
  },
  watch: {
    goods () {
      if (Array.isArray(this.goods)) {
        Bus.$emit('goods', this.goods, this.seller)
      }
    }
  }
}
</script>

<style>
</style>
