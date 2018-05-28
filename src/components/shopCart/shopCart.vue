<template>
  <div class="shopcart-wrapper">
    <div class="shopcart" @click.stop.prevent="handleClick">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo icon-shopping_cart" :class="{pay: totalCount !== 0}"></div>
          <div class="totalCount" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{pay: totalCount !== 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" ref="button"
      :class="{pay:totalPrice >= minPrice && totalPrice !== 0}">{{handlePrice}}</div>
      <shopcart-list
      :selectFoods="selectFoods"
      :show="show"
      ref="list"
      @close="handleClose"
      @empty="handleEmpty"
      ></shopcart-list>
    </div>
    <div class="ball-container">
      <div v-for="(ball, index) of balls" :key="index">
        <transition name="drop"
        @before-enter="beforeDrop"
        @enter="Dropping"
        @after-enter="afterDrop"
        >
          <div class="ball"
          v-show="ball.show"
          >
            <div class="inner"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/bus.js'
import shopcartList from './components/shopcartList.vue'
import BScroll from 'better-scroll'
export default {
  name: 'shopCart',
  components: {
    shopcartList
  },
  props: {
    seller: Object,
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 0,
          count: 0
        }]
      }
    }
  },
  data () {
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [],
      flod: true
    }
  },
  computed: {
    minPrice () {
      return this.seller.minPrice ? this.seller.minPrice : 0
    },
    deliveryPrice () {
      return this.seller.deliveryPrice ? this.seller.deliveryPrice : 0
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((v) => {
        total += v.price * v.count
      })
      return total
    },
    totalCount () {
      let total = 0
      this.selectFoods.forEach((v) => {
        total += v.count
      })
      return total
    },
    handlePrice () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = -this.totalPrice + this.minPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    show () {
      if (!this.totalCount) {
        /* eslint-disable no-unused-vars */
        this.flod = true
        return false
      }
      let show = !this.flod
      /* eslint-disable no-unused-vars */
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            let el = this.$refs.list.$el
            el = el.getElementsByClassName('list-content-wrapper')[0]
            this.scroll = new BScroll(el, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    drop (target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.target = target
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.target.getBoundingClientRect()
          let x = rect.left - 30
          let y = -(document.documentElement.clientHeight - rect.top - 20)
          el.style.display = ''
          el.style.transform = `translate3d(0,${y}px,0)`
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.transform = `translate3d(${x}px,0,0)`
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
        }
      }
    },
    Dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)'
        el.style.webkitTransform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = 'translate3d(0,0,0)'
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    handleClick (event) {
      if (!this.totalCount) {
        return
      }
      const el = this.$refs.button
      if (event.target === el) {
        if (this.totalPrice >= this.minPrice) {
          return alert('去支付')
        }
      }
      this.flod = !this.flod
    },
    handleClose () {
      this.flod = true
    },
    handleEmpty () {
      this.$emit('empty')
    }
  },
  mounted () {
    Bus.$on('addfood', (target) => {
      this.drop(target)
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.shopcart-wrapper
  .shopcart
    display flex
    position fixed
    left 0
    right 0
    bottom 0
    height .94rem
    background #141d27
    color $cartColor
    .content-left
      flex 1
      color $cartColor
      font-size 0
      display flex
      background #141d27
      z-index 20
      .logo-wrapper
        display inline-block
        position relative
        top -.22rem
        margin-left .24rem
        height 1.12rem
        width 1.12rem
        border-radius 50%
        text-align center
        background #141d27
        .logo
          display inline-block
          margin .12rem
          height .88rem
          width .88rem
          border-radius 50%
          background rgba(255,255,255,.2)
          line-height .88rem
          font-size .48rem
          color $cartColor
          &.pay
            background #00a0dc
            color #fff
        .totalCount
          position absolute
          top 0
          right 0
          min-width .48rem
          line-height .32rem
          font-size .16rem
          font-weight 700
          color #fff
          background rgb(240,20,20)
          border-radius .16rem
          box-shadow 0 .04rem .08rem 0 rgba(0,0,0,.4)
      .price, .desc
        display inline-block
        margin-left .24rem
        margin-top .24rem
        height .48rem
        vertical-align top
      .price
        padding-right .24rem
        border-right .01rem solid $cartColor
        font-weight 700
        font-size .32rem
        line-height .48rem
        &.pay
          color #fff
      .desc
        font-size .2rem
        font-weight 200
        margin-top .32rem
        line-height .28rem
    .content-right
      width 2.1rem
      height 100%
      line-height .94rem
      text-align center
      font-weight 700
      font-size .24rem
      background #2b333b
      z-index 20
      &.pay
        background #1f8f34
        color #fff
  .ball-container
    .ball
      position fixed
      left .6rem
      bottom .4rem
      z-index 9
      &.drop-enter-active
        transition all .4s cubic-bezier(.46,-0.61,.83,.67)
        .inner
          transition all .4s linear
      .inner
        width .4rem
        height .4rem
        border-radius 50%
        background rgb(0,160,220)
</style>
