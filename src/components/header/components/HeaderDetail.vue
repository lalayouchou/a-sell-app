<template>
  <div class="container">
   <div class="detail">
     <div class="content">
      <h1 class="content-name">{{seller.name}}</h1>
      <common-star :store="seller.score"></common-star>
     </div>
     <div class="footer"></div>
   </div>
  </div>
</template>

<script>
import commonStar from 'components/common/star/star.vue'
export default {
  name: 'HeaderDetail',
  props: {
    seller: Object
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
.container
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
    .footer
      text-align center
      line-height 2rem
      height 2rem
</style>