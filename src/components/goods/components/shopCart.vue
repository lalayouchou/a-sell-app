<template>
  <div class="shopcart-wrapper">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo icon-shopping_cart" :class="{pay: totalCount !== 0}"></div>
        <div class="totalCount" v-show="totalCount">{{totalCount}}</div>
      </div>
      <div class="price" :class="{pay: totalCount !== 0}">￥{{totalPrice}}</div>
      <div class="desc">另需配送费￥{{deliveryPrice}}</div>
    </div>
    <div class="content-right" :class="{pay:totalPrice > minPrice}">{{handlePrice}}</div>
  </div>
</template>

<script>
export default {
  name: 'shopCart',
  props: {
    seller: Object,
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 10,
          count: 0
        }]
      }
    }
  },
  computed: {
    minPrice () {
      return this.seller.minPrice ? this.seller.minPrice : 0
    },
    deliveryPrice () {
      return this.seller.deliveryPrice ? this.seller.deliveryPrice : 0
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((v) => {
        total += v.price * v.count
      })
      return total
    },
    totalCount () {
      let total = 0
      this.selectFoods.forEach((v) => {
        total += v.count
      })
      return total
    },
    handlePrice () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = -this.totalPrice + this.minPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.shopcart-wrapper
  display flex
  position fixed
  left 0
  right 0
  bottom 0
  height .94rem
  background #141d27
  z-index 2
  color $cartColor
  .content-left
    flex 1
    color $cartColor
    font-size 0
    display flex
    .logo-wrapper
      display inline-block
      position relative
      top -.22rem
      margin-left .24rem
      height 1.12rem
      width 1.12rem
      border-radius 50%
      background #141d27
      text-align center
      .logo
        display inline-block
        margin .12rem
        height .88rem
        width .88rem
        border-radius 50%
        background rgba(255,255,255,.2)
        line-height .88rem
        font-size .48rem
        color $cartColor
        &.pay
          background #00a0dc
          color #fff
      .totalCount
        position absolute
        top 0
        right 0
        min-width .48rem
        line-height .32rem
        font-size .16rem
        font-weight 700
        color #fff
        background rgb(240,20,20)
        border-radius .16rem
        box-shadow 0 .04rem .08rem 0 rgba(0,0,0,.4)
    .price, .desc
      display inline-block
      margin-left .24rem
      margin-top .24rem
      height .48rem
      vertical-align top
    .price
      padding-right .24rem
      border-right .01rem solid $cartColor
      font-weight 700
      font-size .32rem
      line-height .48rem
      &.pay
        color #fff
    .desc
      font-size .2rem
      font-weight 200
      margin-top .32rem
      line-height .28rem
  .content-right
    width 2.1rem
    height 100%
    line-height .94rem
    text-align center
    font-weight 700
    font-size .24rem
    background #2b333b
    &.pay
      background #1f8f34
      color #fff
</style>
