<template>
  <div class="ratingselect">
    <div class="rating-type border-bottom">
      <span
      class="btn all"
      :class="{active: type === 2}"
      @click="selectType(2)"
      >
        {{desc.all}}<span class="num"> {{ratings.length}}</span></span>
      <span
      class="btn positive"
      :class="{active: type === 0}"
      @click="selectType(0)"
      >
        {{desc.positive}}<span class="num"> {{positiveNumber}}</span></span>
      <span
      class="btn negative"
      :class="{active: type === 1}"
      @click="selectType(1)"
      >
        {{desc.nagetive}}<span class="num"> {{nagetiveNumber}}</span></span>
    </div>
    <div class="toggleContent"
    @click="toggleContent"
    >
      <i class="icon-check_circle toggle-icon"
      :class="{active: onlyContent}"
      ></i>
      <span class="text">只看有评价的内容</span>
    </div>
  </div>
</template>

<script>
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
  name: 'ratingselect',
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          nagetive: '不满意'
        }
      }
    }
  },
  data () {
    return {
      type: ALL,
      onlyContent: false
    }
  },
  computed: {
    positiveNumber () {
      let positive
      positive = this.ratings.filter((rating) => rating.rateType === POSITIVE)
      return positive.length
    },
    nagetiveNumber () {
      let nagetive
      nagetive = this.ratings.filter((rating) => rating.rateType === NEGATIVE)
      return nagetive.length
    }
  },
  methods: {
    initialize () {
      this.type = ALL
      this.onlyContent = false
    },
    selectType (type) {
      this.type = type
      this.$emit('select', type)
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$emit('toggle', this.onlyContent)
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
      border-radius .02rem
      color rgb(77,85,93)
      &.active
        color #fff
      &.all,&.positive
        background rgba(0,160,220,.2)
        &.active
          background rgb(0,160,220)
      &.negative
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
