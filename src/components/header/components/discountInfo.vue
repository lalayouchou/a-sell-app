<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="line"></div>
      <div class="text">优惠信息</div>
      <div class="line"></div>
    </div>
    <div v-if="seller.supports">
      <div class="content-supports" v-for="(item, index) of seller.supports">
        <span class="content-supports-icon" :class="bgImage[item.type]">
        </span>{{item.description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'discountInfo',
  props: {
    seller: Object
  },
  data () {
    return {
      bgImage: [
        'decrease',
        'discount',
        'guarantee',
        'invoice',
        'special']
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/styles/mixin.styl'
.wrapper
  padding-top .56rem
  .title-wrapper
    display flex
    .line
      flex 1
      border-bottom .02rem solid rgba(255,255,255,.2)
      transform translateY(-.13rem)
    .text
      line-height .28rem
      font-size .28rem
      font-weight bold
      padding 0 .24rem
  .content-supports
    padding .24rem 0 0 .24rem
    line-height .24rem
    font-weight 200
    font-size .24rem
    &:first-child
      padding-top .48rem
    .content-supports-icon
      display inline-block
      width .32rem
      height .32rem
      vertical-align -35%
      margin-right .12rem
      &.decrease
        bg-image('./icon/decrease_2')
        background-size 100% 100%
      &.discount
        bg-image('./icon/discount_2')
        background-size 100% 100%
      &.guarantee
        bg-image('./icon/guarantee_2')
        background-size 100% 100%
      &.invoice
        bg-image('./icon/invoice_2')
        background-size 100% 100%
      &.special
        bg-image('./icon/special_2')
        background-size 100% 100%
</style>