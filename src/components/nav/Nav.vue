<template>
  <div>
    <div class="nav-wrapper-hook">
      <div class="nav-wrapper border-bottom">
        <router-link to="/goods" class="nav">商品</router-link>
        <router-link to="/ratings" class="nav">评价</router-link>
        <router-link to="/seller" class="nav">商家</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNav'
}
</script>

<style lang="stylus" scoped>
.nav-wrapper-hook >>> .border-bottom:before
  border-bottom .1rem solid rgba(7,17,27,.2);
  height 0
.active
  color rgb(240, 20, 20) !important
.nav-wrapper
  line-height .8rem
  display flex
  text-align center
  z-index -1
  .nav
    flex 1
    color rgb(77, 85, 93)
    font-size .28rem
</style>
