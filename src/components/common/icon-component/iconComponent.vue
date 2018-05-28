<template>
  <span :class="[iconSize,iconImg]"></span>
</template>

<script>
const size = [1, 2, 3, 4]
const image = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
export default {
  name: 'iconComponent',
  props: {
    type: Number,
    iconType: Number
  },
  computed: {
    iconSize () {
      if (size.indexOf(this.type) !== -1) {
        return 'icon-' + this.type
      } else {
        return 'icon-1'
      }
    },
    iconImg () {
      return image[this.iconType]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.icon-1
  display inline-block
  width .24rem
  height .24rem
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
.icon-2
  display inline-block
  width .32rem
  height .32rem
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
.icon-3
  display inline-block
  width .24rem
  height .24rem
  &.decrease
    bg-image('./icon/decrease_3')
    background-size 100% 100%
  &.discount
    bg-image('./icon/discount_3')
    background-size 100% 100%
  &.guarantee
    bg-image('./icon/guarantee_3')
    background-size 100% 100%
  &.invoice
    bg-image('./icon/invoice_3')
    background-size 100% 100%
  &.special
    bg-image('./icon/special_3')
    background-size 100% 100%
.icon-4
  display inline-block
  width .32rem
  height .32rem
  &.decrease
    bg-image('./icon/decrease_4')
    background-size 100% 100%
  &.discount
    bg-image('./icon/discount_4')
    background-size 100% 100%
  &.guarantee
    bg-image('./icon/guarantee_4')
    background-size 100% 100%
  &.invoice
    bg-image('./icon/invoice_4')
    background-size 100% 100%
  &.special
    bg-image('./icon/special_4')
    background-size 100% 100%
</style>
