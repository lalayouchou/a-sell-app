<template>
  <div>
    <div class="detail">
      <div class="content">
        <h1 class="content-name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <common-star :score="seller.score" :size="48"></common-star>
        </div>
        <discount-info :seller="seller"></discount-info>
        <seller-info :bulletin="seller.bulletin"></seller-info>
      </div>
      <div class="footer">
        <div class="icon-close" @click="handleClick"></div>
      </div>
    </div>
  </div>
</template>

<script>
import commonStar from 'components/common/star/star.vue'
import discountInfo from './discountInfo.vue'
import sellerInfo from './sellerInfo.vue'
export default {
  name: 'HeaderDetail',
  props: {
    seller: Object
  },
  components: {
    commonStar,
    discountInfo,
    sellerInfo
  },
  methods: {
    handleClick () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 99
  overflow auto
  display flex
  flex-flow column
  background rgba(7,17,27,.8)
  font-size .4rem
  .content
    flex 1
    padding 0 .72rem
    .content-name
      padding-top 1.28rem
      padding-bottom .32rem
      line-height .32rem
      font-size .32rem
      font-weight bold
      text-align center
    .star-wrapper
      text-align center
  .footer
    text-align center
    line-height 2rem
    height 2rem
    .icon-close
      display inline-block
      height .8rem
      width .8rem
      border-radius 50%
      border .03rem solid #fff
      line-height .8rem
      font-weight bold
</style>
