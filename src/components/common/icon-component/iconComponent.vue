<template>
  <span class="icon" :class="bgImage[type]">
</template>

<script>
export default {
  name: 'iconComponent'
  props: {
    type: Number,
    iconType: Number
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
@import '~styles/mixin.styl'
.icon
  display inline-block
  width .32rem
  height .32rem
  vertical-align top
  margin-right .08rem
  &.decrease
    bg-image('./icon/decrease_1')
    background-size 100% 100%
  &.discount
    bg-image('./icon/discount_1')
    background-size 100% 100%
  &.guarantee
    bg-image('./icon/guarantee_1')
    background-size 100% 100%
  &.invoice
    bg-image('./icon/invoice_1')
    background-size 100% 100%
  &.special
    bg-image('./icon/special_1')
    background-size 100% 100%
</style>
