<template>
  <div>
    <transition name="list">
      <div class="list-wrapper" v-show="show">
        <div class="list-header border-bottom">
          <h2 class="header-title">购物车</h2>
          <div class="header-empty" @click="handleEmpty">清空</div>
        </div>
        <div class="list-content-wrapper">
          <div class="list-content">
            <div class="content" v-for="(food, index) of selectFoods" :key="index">
              <div class="food border-bottom">
                <h2 class="title">{{food.name}}</h2>
                <div class="price"><i class="symbol">￥</i>{{totalPrice(food)}}</div>
                <cart-control :food="food" class="control"></cart-control>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="list-mask"
      v-show="show"
      @click.stop.prevent="handleClickMask"></div>
    </transition>
  </div>
</template>

<script>
import cartControl from 'components/common/cartControl/cartControl.vue'
export default {
  name: 'shopcartList',
  components: {
    cartControl
  },
  props: {
    selectFoods: Array,
    show: Boolean
  },
  methods: {
    totalPrice (food) {
      return food.price * food.count
    },
    handleClickMask () {
      this.$emit('close')
    },
    handleEmpty () {
      this.$emit('empty')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.list-wrapper >>> .border-bottom::before
  border-bottom .04rem solid rgba(7,17,27,.1)
  .list-content-wrapper >>> .border-bottom::before
    border-color rgba(7,17,27,.1)

.list-wrapper
  position absolute
  top 0
  left 0
  right 0
  z-index 10
  transform translate3d(0,-100%,0)
  &.list-enter,&.list-leave-to
    transform translate3d(0,0,0)
  &.list-enter-active,&.list-leave-active
    transition all .5s
  .list-header
    display flex
    height .8rem
    line-height .8rem
    background #f3f5f7
    .header-title
      flex 1
      padding-left .36rem
      font-size .28rem
      font-weight 200
      color #000
    .header-empty
      padding 0 .36rem
      color rgb(0,160,220)
      font-size .24rem
  .list-content-wrapper
    max-height 4.35rem
    overflow hidden
    padding 0 .36rem
    color #000
    background #fff
    .list-content
      .food
        display flex
        line-height .96rem
        height .96rem
        .title
          flex 1
          font-size .28rem
          color rgb(7,17,27)
          font-weight 500
        .price
          padding-right .24rem
          font-size .28rem
          font-weight 700
          color rgb(240,20,20)
          .symbol
            font-weight normal
            font-size .2rem
        .control
          margin-top .18rem
          height .6rem
          line-height .3rem
.list-mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 5
  filter:blur(10px)
  background rgba(7,17,27,.6)
  &.mask-enter,&.mask-leave-to
    opacity 0
  &.mask-enter-active,&.mask-leave-active
    transition all .5s
</style>
