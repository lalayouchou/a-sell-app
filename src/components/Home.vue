<template>
  <div>
    <home-header :seller="seller"></home-header>
    <home-nav></home-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from './header/Header.vue'
import HomeNav from './nav/Nav.vue'
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
      ratings: {},
      goods: {}
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
      console.log(res)
      if (res.ret && res) {
        this.seller = res.seller
        this.ratings = res.ratings
        this.goods = res.goods
        console.log(this.seller)
      }
    },
    getDataFail (err) {
      console.log(err)
    }
  }
}
</script>

<style>
</style>
