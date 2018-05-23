<template>
  <div class="wrapper">
    <transition name="move">
      <div
      class="decrease"
      v-show="food.count"
      @click.stop.prevent="handleDec"
      >
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="count" v-show="food.count">{{food.count}}</div>
    <div
    class="add icon-add_circle"
    @click.stop.prevent="handleAdd"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'cartControl',
  props: {
    food: Object
  },
  methods: {
    handleAdd (event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('addfood', event.target)
    },
    handleDec () {
      this.food.count--
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  color rgb(0,160,220)
  font-size 0
  .decrease
    display: inline-block
    .inner
      display inline-block
      padding .06rem
      font-size .48rem
      line-height .48rem
    &.move-enter-to, &.move-leave
      opacity 1
      transform translate3d(0, 0, 0)
      .inner
        transform rotate(0deg)
    &.move-enter-active, &.move-leave-active
      transition all .3s linear
      .inner
        transition all .3s linear
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(.48rem, 0, 0)
      .inner
        transform: rotate(180deg)
  .count
    display inline-block
    width .36rem
    height .36rem
    margin-top .15rem
    vertical-align top
    text-align center
    font-size .2rem
    color #000
  .add
    display inline-block
    padding .06rem
    font-size .48rem
    line-height .48rem
</style>
