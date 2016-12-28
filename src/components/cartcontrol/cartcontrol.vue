<template>
  <div class="cartcontrol">
    <div v-show="food.count > 0" class="cart-decrease icon-remove_circle_outline" @click="decreaseCart($event)"></div>
    <div v-show="food.count > 0" class="cart-count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        this.food.count && this.food.count--
      },
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease, .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size: 24px
      color rgb(0, 160, 220)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)



</style>
