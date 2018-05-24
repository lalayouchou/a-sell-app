<template>
  <div>
  <div class="foods-wrapper">
    <div class="Foods">
      <div class="good" v-for="(item,index) of goods" :key="index">
        <div ref="hook">
          <div class="good-name">{{item.name}}</div>
          <div
          class="food border-bottom"
          v-for="(food,index) of item.foods"
          :key="index"
          @click="selectFood(food)"
          >
            <div class="icon">
              <img :src="food.icon" alt="" class="icon-content">
            </div>
            <div class="content">
              <h2 class="content-name">{{food.name}}</h2>
              <p class="description" v-if="food.description">{{food.description}}</p>
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
            </div>
            <cart-control
            class="control"
            :food="food"
            @addfood="handleAddFood"
            ></cart-control>
          </div>
        </div>
      </div>
    </div>
  </div>
  <food-detail :food="selectedFood" ref="foodDetail"></food-detail>
  </div>
</template>

<script>
import cartControl from 'components/common/cartControl/cartControl.vue'
import foodDetail from './childComponents/FoodDetail.vue'
import Bus from '@/bus.js'
export default {
  name: 'foodsList',
  props: {
    goods: Array,
    scrollY: Number,
    clickIndex: [Number, String],
    scrollfood: [Object, String]
  },
  components: {
    cartControl,
    foodDetail
  },
  data () {
    return {
      HeightList: [],
      lastIndex: '',
      selectedFood: {}
    }
  },
  watch: {
    scrollY () {
      for (let i = 0; i < this.HeightList.length; i++) {
        const height1 = this.HeightList[i]
        const height2 = this.HeightList[i + 1]
        if (this.scrollY >= height1 && (this.scrollY < height2 || !height2)) {
          if (this.lastIndex !== i) {
            this.$emit('index', i)
            this.lastIndex = i
          }
        }
      }
    },
    clickIndex () {
      let index = this.clickIndex
      this.scrollfood.scrollToElement(this.$refs.hook[index], 300)
    }
  },
  updated () {
    if (!this.HeightList.length) {
      this.calculate()
    }
  },
  methods: {
    calculate () {
      let foodList = this.$refs.hook
      let height = 0
      this.HeightList.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.HeightList.push(height)
      }
    },
    handleAddFood (target) {
      this.$nextTick(() => {
        Bus.$emit('addfood', target)
      })
    },
    selectFood (food) {
      this.selectedFood = food
      this.$refs.foodDetail.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
.good >>> .border-bottom::before
  border-bottom-color rgba(7,17,27,.2)
.good >>> .border-bottom:last-child::before
  border-bottom none
.foods-wrapper
  position absolute
  left 0
  right 0
  bottom 0
  top 0
  .good
    .good-name
      padding-left .28rem
      box-sizing border-box
      border-left .05rem solid #d9dde1
      line-height .52rem
      background #f3f5f7
      font-size .24rem
      color rgb(147,153,159)
    .food
      display flex
      margin 0 .36rem
      padding .36rem 0
      position relative
      .icon
        width 1.15rem
        height 1.15rem
        .icon-content
          width 100%
          border-radius .05rem
      .content
        flex 1
        padding-left .2rem
        .content-name
          margin-top .04rem
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
      .control
        position absolute
        bottom .18rem
        right 0
</style>
