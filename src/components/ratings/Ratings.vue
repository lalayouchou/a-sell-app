<template>
  <div class="ratings" ref="rate">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left border-right">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="service">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="food">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="time">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
      :ratings="ratings"
      ref="ratingselect"
      ></ratingselect>
      <div class="ratings-list">
        <ul v-show="ratings&&ratings.length">
          <li
          v-for="(rating,index) of ratings"
          :key="index"
          class="rating border-bottom"
          v-show="showNeed(rating.rateType,rating.text)"
          >
            <div class="avatar">
                <img :src="rating.avatar" alt="" class="avatar-img">
              </div>
              <div class="time">{{rating.rateTime}}</div>
              <div class="content">
                <div class="name">{{rating.username}}</div>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score" class="star"></star>
                  <span class="deliveryTime"
                  v-show="rating.deliveryTime"
                  >{{rating.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">
                  {{rating.text ||'暂无评论'}}
                </div>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <i
                  class="icon icon-thumb_up"
                  ></i>
                  <span v-for="(item,index) of rating.recommend"
                  :key="index"
                  class="item border" 
                  >
                  {{item}}
                  </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import split from 'components/common/split/split.vue'
import star from 'components/common/star/star.vue'
import ratingselect from 'components/common/ratingselect/ratingselect.vue'
import BScroll from 'better-scroll'

const ALL = 2

export default {
  name: 'HomeRatings',
  components: {
    split,
    ratingselect,
    star
  },
  props: {
    seller: Object,
    ratings: Array
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.rate, {
          click: true
        })
      }
    })
  },
  methods: {
    showNeed (type, text) {
      let com = this.$refs.ratingselect
      if (!com) {
        this.$nextTick(() => {
          com = this.$refs.ratingselect
          com.initialize()
        })
      } else {
        return this.showRatings (type, text)
      }
    },
    showRatings (type, text) {
      let com = this.$refs.ratingselect
      let showContent = true
      let showType = true
      /* if (com.onlyContent) {
        showContent = Boolean(text)
      } */
      if (com.onlyContent && !text) {
        showContent = false
      }

      if (com.type !== ALL) {
        showType = type === com.type
      }

      this.$nextTick(() => {
        this.scroll.refresh()
      })

      return showContent && showType
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.ratings >>> border::before
  border-color rgba(7,17,27,.1)
.ratings
  position fixed
  left 0
  right 0
  top 3.48rem
  bottom 0.94rem
  overflow hidden
  .overview
    display flex
    padding .36rem 0
    .overview-left
      width 2.75rem
      text-align center
      @media only screen and (max-width:320px)
        width 2.40rem
      .score
        padding-bottom .12rem
        color rgb(255,153,0)
        font-size .48rem
        line-height .56rem
      .title
        padding-bottom .16rem
        color rgb(7,17,27)
        font-size .24rem
        line-height .24rem
      .rank
        padding-bottom .16rem
        color rgb(147,153,159)
        font-size .2rem
        line-height .2rem
    .overview-right
      padding 0 .48rem
      flex 1
      @media only screen and (max-width:320px)
        padding 0 .12rem
      .service,.food
        font-size 0
        padding-bottom .16rem
        .title
          display inline-block
          title()
          vertical-align top
          margin-right .24rem
        .score
          display inline-block
          score()
          vertical-align top
        .star
          display inline-block
          margin-top .015rem
          margin-right .24rem
      .time
        font-size 0
        .title
          margin-right .24rem
          title()
        .deliveryTime
          font-size .24rem
          color rgb(147,153,159)
          line-height .36rem
  .ratings-list
    padding 0 .36rem
    .rating
      position relative
      display flex
      padding .36rem 0
      .avatar
        width .56rem
        height .56rem
        .avatar-img
          width 100%
          height 100%
          border-radius 50%
      .time
        position absolute
        right 0
        font-size .2rem
        font-weight 200
        color rgb(147,153,159)
        line-height .24rem
      .content
        margin-left .24rem
        flex 1
        .name
          font-size .2rem
          color rgb(7,17,27)
          line-height .24rem
          padding-bottom .08rem
        .star-wrapper
          font-size 0
          padding-bottom .12rem
          .star
            display inline-block
            margin-right .12rem
            line-height .24rem
            vertical-align top
          .deliveryTime
            display inline-block
            font-size .2rem
            font-weight 200
            color rgb(147,153,159)
            line-height .24rem
        .text
          padding-bottom .16rem
          font-size .24rem
          color rgb(7,17,27)
          line-height .36rem
        .recommend
          font-size 0
          .icon
            display inline-block
            margin-right .12rem
            margin-top .06rem
            font-size .24rem
            line-height .32rem
            color rgb(0,160,220)
          .item
            display inline-block
            padding .08rem .12rem
            margin 0 .16rem .1rem 0
            max-width 1.2rem
            font-size .18rem
            color rgb(147,153,159)
            line-height .32rem
            vertical-align top
            ellipsis()
</style>
