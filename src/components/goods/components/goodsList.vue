<template>
  <div>
    <div class="nemus">
      <div v-for="(menu,index) of goods" class="menu" :key="index">
        <div class="menu-name border-bottom">
          <span v-if="menu.type !== -1">
          </span>{{menu.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  props: {
    goods: Array
  }
}
</script>

<style lang="stylus" scoped>
.menu >>> .border-bottom:before
  border-bottom-color rgba(7,17,27,.2);
.menu
  display table
  width 100%
  height 1.08rem
  padding 0 .24rem
  box-sizing border-box
  .menu-name
    display table-cell
    vertical-align middle
    line-height .28rem
    font-size .24rem
    font-weight 200
</style>
