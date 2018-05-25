<template>
  <transition name="move">
  <div class="food-detail" v-show="showFlag" ref="food">
    <div>
      <div class="header-image">
        <div class="back"
        @click.stop.prevent="hide"
        >
          <i class="icon-arrow_lift back-icon"></i>
        </div>
        <img :src="food.image" alt="" class="food-image">
      </div>
      <div class="content">
        <h2 class="content-name">{{food.name}}</h2>
        <p class="description">
          <span class="sellCount">{{"月售" + food.sellCount + "份"}}
          </span><span class="rating">好评率{{food.rating + '%'}}
          </span>
        </p>
        <p class="content-price">
          <span class="price"><span class="price-symbol">￥</span>{{food.price}}
          </span><span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}
          </span>
        </p>
        <div class="control-wrapper">
          <cart-control
          :food="food"
          @addfood="addfood"
          ></cart-control>
        </div>
        <transition name="fade">
          <div class="buy"
          v-show="hasFood"
          @click.stop.prevent="addFirst"
          >加入购物车</div>
        </transition>
      </div>
      <split v-show="food.info"></split>
      <div class="food-info" v-show="food.info">
        <div class="title">商品信息</div>
        <div class="text">{{food.info}}</div>
      </div>
      <split></split>
      <div class="food-rating">
        <div class="title">商品评价</div>
      </div>
      <ratingselect
      :ratings="food.ratings"
      :desc="desc"
      ref="ratingselect"
      ></ratingselect>
      <div class="list-wrapper">
        <ul v-show="food.ratings&&food.ratings.length">
          <li
          v-for="(rating,index) of food.ratings"
          :key="index"
          v-show="showRatings(rating.rateType,rating.text)"
          class="rating border-bottom"
          >
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img :src="rating.avatar" alt="" class="avatar">
            </div>
            <div class="time">{{rating.rateTime}}</div>
            <div class="text">
              <i
              :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down' :rating.rateType === 1}"
              class="icon"
              ></i>{{rating.text ||'暂无评论'}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import cartControl from 'components/common/cartControl/cartControl.vue'
import split from 'components/common/split/split.vue'
import ratingselect from 'components/common/ratingselect/ratingselect.vue'
import BScroll from 'better-scroll'
import Bus from '@/bus.js'

const ALL = 2

export default {
  name: 'foodDetail',
  props: {
    food: Object
  },
  components: {
    cartControl,
    split,
    ratingselect
  },
  data () {
    return {
      showFlag: false,
      desc: {
        all: '全部',
        positive: '推荐',
        nagetive: '吐槽'
      }
    }
  },
  computed: {
    hasFood () {
      if (!this.food.count) {
        return true
      }
      return false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      let com = this.$refs.ratingselect
      com.initialize()
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (this.food.count !== 0) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count = 1
      }
      Bus.$emit('addfood', event.target)
      // 这里如果直接消失，会导致小球动画计算错误，因为小球动画需要计算点击目标的位置，如果直接消失就获取不到了，可以添加一个缓动动画，解决这个bug
    },
    addfood (target) {
      Bus.$emit('addfood', target)
    },
    showRatings (type,text) {
      let com = this.$refs.ratingselect
      let showContent = true
      let showType = true
      if (com.onlyContent) {
        showContent = Boolean(text)
      }
      if (com.type === ALL) {
        showType = true
      } else {
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
.food-detail
  position fixed
  top 0
  right 0
  left 0
  bottom .96rem
  background #fff
  transform translate3d(0,0,0)
  &.move-enter,&.move-leave-to
    transform translate3d(100%,0,0)
  &.move-enter-active,&.move-leave-active
    transition all .3s
  .header-image
    position relative
    padding-bottom 100%
    height 0
    .food-image
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      width 100%
    .back
      position absolute
      top .5rem
      left .5rem
      width .8rem
      height .8rem
      font-size .32rem
      color #fff
      background rgba(7,17,27,.6)
      border-radius 50%
      text-align center
      z-index 1
      .back-icon
        line-height .8rem
  .content
    position relative
    margin .36rem
    .content-name
      font-weight bold
      font-size .28rem
      color rgb(7,17,27)
    .description
      margin .16rem 0
      font-size .2rem
      line-height .28rem
      color rgb(147,153,159)
      .sellCount
        margin-right .24rem
    .content-price
      line-height .48rem
      vertical-align top
      .price
        color #f01414
        font-size .28rem
        font-weight bold
        .price-symbol
          font-size .2rem
          font-weight normal
      .oldPrice
        color rgb(147,153,159)
        font-size .2rem
        font-weight bold
        text-decoration line-through
    .control-wrapper,.buy
      position absolute
      right 0
      bottom 0
    .buy
      padding 0 .24rem
      line-height .52rem
      color #fff
      background rgb(0,160,240)
      font-size .2rem
      border-radius .26rem
      text-align center
      &.fade-enter,&.fade-leave-to
        opacity 0
      &.fade-enter-active,&.fade-leave-active
        transition all .2s
  .food-info
    margin .36rem
    .title
      font-size .28rem
      line-height .28rem
      padding-bottom .16rem
      color rgb(7,17,27)
    .text
      padding 0 .16rem
      line-height .48rem
      color rgb(77,85,93)
      font-size .24rem
      font-weight 200
  .food-rating
    margin .36rem
    margin-bottom 0
    .title
      font-size .28rem
      line-height .28rem
      color rgb(7,17,27)
  .list-wrapper
    margin 0 .36rem
    .rating
      position relative
      padding .32rem 0
      .user
        position absolute
        right 0
        font-size 0
        .name
          font-size .2rem
          color rgb(147,153,159)
          line-height .24rem
          margin-right .12rem
          height .3rem
        .avatar
          width .24rem
          height .24rem
          border-radius 50%
          vertical-align top
      .time
        font-size .2rem
        color rgb(147,153,159)
        line-height .24rem
        padding-bottom .12rem
      .text
        font-size .24rem
        color rgb(7,17,27)
        line-height .32rem
        .icon
          margin-right .08rem
          font-size .24rem
          line-height .48rem
          color rgb(147,153,159)
          &.icon-thumb_up
            color rgb(0,160,220)
</style>
