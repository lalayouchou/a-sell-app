<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="line"></div>
      <div class="text">商家公告</div>
      <div class="line"></div>
    </div>
    <div class="content">
      {{bulletin}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'sellerInfo',
  props: {
    bulletin: String
  }
}
</script>

<style lang="stylus" scoped>
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
  .content
    padding .48rem .24rem 0 .24rem
    line-height .48rem
    font-size .24rem
    font-weight 200
</style>
