<template>
  <div class="ratingselect">
    <div class="rating-type border-bottom">
      <span class="btn all active">全部<span class="num"> 22</span></span>
      <span class="btn positive">全部<span class="num"> 22</span></span>
      <span class="btn negative">全部<span class="num"> 22</span></span>
    </div>
    <div class="toggleContent">
      <i class="icon-check_circle toggle-icon" :class="onlyContent"></i>
      <span class="text">只看有评价的内容</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ratingselect',
  props: {

  },
  data () {
    return {
      on
    }
  }
}
</script>

<style lang="stylus" scoped>
.ratingselect >>> .border-bottom:before
  border-color rgba(7,17,27,.2)
.ratingselect
  padding 0 .36rem
  border-bottom .02rem solid #f3f5f7
  .rating-type
    padding .36rem 0
    font-size 0
    .btn
      display inline-block
      padding .16rem .24rem
      margin-right .16rem
      line-height .32rem
      font-size .24rem
      background #f3f5f7
      border-radius .02rem
      color rgb(77,85,93)
      &.active
        color #fff
      &.all,&.positive
        background rgba(0,160,220,.2)
        &.active
          background rgb(0,160,220)
      &.nagetive
        background rgba(77,85,93,.2)
        &.active
          background rgb(77,85,93)
      .num
        font-size .16rem
  .toggleContent
    display inline-block
    padding .24rem 0
    color rgb(147,153,159)
    .toggle-icon
      display inline-block
      line-height .48rem
      font-size .48rem
      &.active
        color green
    .text
      display inline-block
      line-height .48rem
      font-size .24rem
      vertical-align top
</style>