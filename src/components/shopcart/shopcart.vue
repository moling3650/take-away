<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" :class="{'hightlight': totalCount > 0}">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
          <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
        </div>
        <div class="price">¥ {{totalPrice}}元</div>
        <div class="desc">另需配送费¥ {{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.map((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.map((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalCount === 0) {
          return `¥ ${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差¥ ${this.minPrice - this.totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        return (this.totalPrice < this.minPrice) ? 'not-enough' : 'enough'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        &.hightlight
          .logo-wrapper
            .logo
              background rgb(0, 160, 220)
              .icon-shopping_cart
                color #fff
          .price
            color #fff
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          text-align center
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 1
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff

</style>
