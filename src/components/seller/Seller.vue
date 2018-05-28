<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="name">{{seller.name}}</div>
        <div class="desc">
          <star :size="36" :score="seller.serviceScore" class="star"></star>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
         <div class="remark">
           <div class="block border-right">
             <h2>起送价</h2>
             <div class="content">
               <span class="stress">{{seller.minPrice}}</span>元
             </div>
           </div>
           <div class="block border-right">
             <h2>商家配送</h2>
             <div class="content">
               <span class="stress">{{seller.deliveryPrice}}</span>元
             </div>
           </div>
           <div class="block">
             <h2>平均配送时间</h2>
             <div class="content">
               <span class="stress">{{seller.deliveryTime}}</span>分钟
             </div>
           </div>
         </div>
         <div class="favorite" @click="toggleFavorite">
           <div class="icon-favorite" :class="{'active': favorite}"></div>
           <span class="text">{{favoriteText}}</span>
         </div>
      </div>
      <split v-if="seller.supports"></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content">{{seller.bulletin}}</div>
        <ul class="supports" v-if="seller.supports">
          <li class="item border-top" v-for="(item,index) of seller.supports" :key="index">
            <icon :type="4" :iconType="item.type"></icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pics-wrapper" ref="picsWrapper">
          <ul class="pics-list" v-if="seller.pics" ref="picsList">
            <li class="pic-item border-top" v-for="(pic,index) of seller.pics" :key="index">
              <img :src="pic" alt="" class="pic">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos-wrapper">
        <div class="title">商家信息</div>
        <ul class="infos" v-if="seller.supports">
          <li class="info border-top" v-for="(info,index) of seller.infos" :key="index">{{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/common/star/star.vue'
import split from 'components/common/split/split.vue'
import icon from 'components/common/icon-component/iconComponent.vue'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '@/common/js/store.js'
export default {
  name: 'HomeSeller',
  props: {
    seller: Object
  },
  components: {
    split,
    star,
    icon
  },
  data () {
    return {
      favorite: (() => loadFromLocal(this.seller.id, 'favorite', false))()
    }
  },
  mounted () {
    let length = this.seller.pics.length
    this.$nextTick(() => {
      this._initScroll()
      this.picsWidth(length)
    })
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  methods: {
    picsWidth (length) {
      const Picwidth = 2.4
      const right = 0.12
      let width = (Picwidth + right) * length - right
      this.$refs.picsList.style.width = width + 'rem'
      this.$nextTick(() => {
        this._initPicsScroll()
      })
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      })
    },
    _initPicsScroll () {
      this.picsScroll = new BScroll(this.$refs.picsWrapper, {
        scrollX: true,
        eventPassthrough: 'vertical'
      })
    },
    toggleFavorite () {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  }
}
</script>

<style lang="stylus" scoped>
.seller
  position fixed
  left 0
  right 0
  top 3.48rem
  bottom 0.94rem
  overflow hidden
  .overview
    position relative
    padding-top .36rem
    .name
      margin 0 .36rem .16rem
      font-size .28rem
      line-height .28rem
      color rgb(7,17,27)
    .desc
      margin 0 .36rem
      padding-bottom .36rem
      font-size 0
      .star
        margin-right .16rem
      .ratingCount,.sellCount
        margin-right .24rem
        font-size .2rem
        line-height .36rem
        color rgb(7,17,27)
        vertical-align top
    .remark
      display flex
      margin .36rem 0
      .block
        flex 1
        text-align center
        font-size .2rem
        line-height .2rem
        color rgb(147,153,159)
        .content
          margin-top .08rem
          font-size .2rem
          font-weight 200
          line-height .48rem
          color rgb(7,17,27)
          .stress
            font-size .48rem
    .favorite
      position absolute
      top .36rem
      right .29rem
      width 1rem
      text-align center
      .icon-favorite
        font-size .48rem
        line-height .48rem
        margin-bottom .08rem
        color rgba(7,17,27,.1)
        &.active
          color rgb(240,20,20)
      .text
        font-size .2rem
        line-height .2rem
        color rgb(77,85,93)
  .bulletin
    padding .36rem .36rem 0 .36rem
    .title
      margin-bottom .16rem
      font-size .28rem
      line-height .28rem
      color rgb(7,17,27)
    .content
      padding 0 .24rem .32rem
      font-size .24rem
      line-height .48rem
      font-weight 200
      color rgb(240,20,20)
    .supports
      .item
        padding .32rem .24rem
        font-size 0
        .text
          display inline-block
          margin-left .12rem
          font-size .24rem
          line-height .32rem
          font-weight 200
          color rgb(7,17,27)
          vertical-align top
  .infos-wrapper
    padding .36rem .36rem 0 .36rem
    .title
      margin-bottom .24rem
      font-size .28rem
      line-height .28rem
      color rgb(7,17,27)
    .info
      padding .32rem .24rem
      font-size .24rem
      line-height .32rem
      font-weight 200
      color rgb(7,17,27)
  .pics
    padding .36rem 0 .36rem .36rem
    .title
      margin-bottom .24rem
      font-size .28rem
      line-height .28rem
      color rgb(7,17,27)
    .pics-wrapper
      white-space nowrap
      .pic-item
        display inline-block
        margin-right .12rem
        &:last-child
          margin 0
        .pic
          width 2.4rem
          height 1.8rem
</style>
