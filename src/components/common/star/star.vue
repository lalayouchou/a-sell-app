<template>
  <div class="stars" v-if="starList.length">
    <div
    v-for="(star,index) of starList"
    :key="index"
    :class="[star, starSize]"
    >
    </div>
  </div>
</template>

<script>
const LENGTH = 5
const StarSize = [24,36,48]
export default {
  name: 'CommonStar',
  props: {
    score: Number,
    size: Number
  },
  computed: {
    starSize () {
      if(StarSize.indexOf(this.size) !== -1){
        return 'star-' + this.size
      }else {
        return 'star-24'
      }
    },
    starList () {
      const result = []
      let score = Math.floor(this.score * 2) / 2
      const hasHalfStar = score - (score|0)
      const integer = score - hasHalfStar
      for(let i=0; i < (integer||LENGTH);i++){
        result.push('on')
      }
      if (hasHalfStar) result.push('half')
      while (result.length < LENGTH) {
        result.push('off')
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.stars
  display inline-block
  font-size 0
  .star-24
    display inline-block
    width .2rem
    height .2rem
    margin-right .06rem
    &:last-child
      margin-right 0
    &.on
      bg-image('./star-icon/star24_on')
      background-size 100% 100%
    &.off
      bg-image('./star-icon/star24_off')
      background-size 100% 100%
    &.half
      bg-image('./star-icon/star24_half')
      background-size 100% 100%
  .star-36
    display inline-block
    width .3rem
    height .3rem
    margin-right .12rem
    &:last-child
      margin-right 0
    &.on
      bg-image('./star-icon/star36_on')
      background-size 100% 100%
    &.off
      bg-image('./star-icon/star36_off')
      background-size 100% 100%
    &.half
      bg-image('./star-icon/star36_half')
      background-size 100% 100%
  .star-48
    display inline-block
    width .4rem
    height .4rem
    margin-right .43rem
    &:last-child
      margin-right 0
    &.on
      bg-image('./star-icon/star48_on')
      background-size 100% 100%
    &.off
      bg-image('./star-icon/star48_off')
      background-size 100% 100%
    &.half
      bg-image('./star-icon/star48_half')
      background-size 100% 100%
</style>