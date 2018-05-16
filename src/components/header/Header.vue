<template>
  <div>
   <div class="header">
    <div class="content-wrapper">
     <div class="avatar">
       <img :src="seller.avatar" alt="">
     </div>
     <div class="content">
       <div class="content-title">
         <span class="content-brand"></span>{{seller.name}}
       </div>
       <div class="content-description">
         {{seller.description}}/{{seller.deliveryTime}}分钟送达
       </div>
       <div v-if="seller.supports">
         <div class="content-supports">
           <span class="content-supports-icon" :class="iconBgImage">
           </span>{{seller.supports[0].description}}
         </div>
        </div>
       <div
       class="content-supports-number"
       @click="handleShowDetail"
       >{{supportsNumber + '个'}}
          <span class="font_family">&#xe60b;</span>
       </div>
     </div>
     <div class="header-bgImage">
       <img :src="seller.avatar" alt="" class="header-bgImage-content">
     </div>
     <div
     class="bulletin"
     @click="handleShowDetail"
     >
       <div class="bulletin-brand"></div>
       <div class="bulletin-text">{{seller.bulletin}}</div>
       <div class="font_family bulletin-icon">&#xe60b;</div>
     </div>
    </div>
    <header-detail v-show="showDetail" :seller="seller"></header-detail>
   </div>
  </div>
</template>

<script>
import HeaderDetail from './components/HeaderDetail.vue'
export default {
  name: 'HomeHeader',
  props: {
    seller: Object
  },
  components: {
    HeaderDetail
  },
  data () {
    return {
      bgImage: [
        'decrease',
        'discount',
        'guarantee',
        'invoice',
        'special'],
        showDetail: false
    }
  },
  computed: {
    supportsNumber () {
      return this.seller.supports.length
    },
    iconBgImage () {
      const index = this.seller.supports[0].type
      const key = this.bgImage[index]
      return {[key]: true}
    }
  },
  methods: {
    handleShowDetail () {
      this.showDetail = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/styles/mixin.styl'
.header
  position relative
  height 2.68rem
  box-sizing border-box
  padding  .48rem
  background rgba(7,17,27,.5)
  color #fff
  overflow hidden
  .content-wrapper
    display flex
    .avatar
      width 1.28rem
      height 1.28rem
      img
        width 100%
        border-radius .04rem
    .content
      flex 1
      padding 0 0 0 .32rem
      .content-title
        padding-top .04rem
        line-height .36rem
        font-size .32rem
        font-weight bold
        .content-brand
          display inline-block
          width .68rem
          height .36rem
          margin-right .12rem
          bg-image('./icon/brand')
          background-size .68rem .36rem
          vertical-align top
      .content-description
        line-height .56rem
        font-weight 200
        font-size .24rem
      .content-supports
        line-height .32rem
        font-weight 200
        font-size .2rem
        .content-supports-icon
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
      .content-supports-number
        position absolute
        right .24rem
        top 1.15rem
        width 1.16rem
        line-height .6rem
        font-weight 200
        font-size .24rem
        background rgba(0,0,0,.2)
        border-radius .34rem
        text-align center
    .header-bgImage
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      z-index -1
      .header-bgImage-content
        width 100%
        height 100%
        filter:blur(.1rem)//模糊项
    .bulletin
      display flex
      position absolute
      bottom 0
      left 0
      right 0
      height .56rem
      background rgba(7,17,27,.2)
      font-size .2rem
      align-items center
      .bulletin-brand
        width .68rem
        height .36rem
        margin 0 .12rem 0 .4rem
        bg-image('./icon/bulletin')
        background-size .68rem .36rem
      .bulletin-text
        flex 1
        ellipsis()
        padding-top .05rem
      .bulletin-icon
        width .32rem
        padding  0 .24rem 0 .08rem
        background transparent !important
</style>
