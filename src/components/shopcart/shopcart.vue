<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
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
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div class="ball" transition="drop" v-for="ball in balls" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </div>
    <div v-show="listShow" class="shopcart-list" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" v-el:list-content>
        <ul>
          <li v-for="food in selectFoods" class="food">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>¥ {{food.price * food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-show="listShow" class="list-mask" transition="fade" @click="hideList"></div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'

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
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
    components: {
      cartcontrol
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
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$els.listContent, {
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
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.map((food) => {
          food.count = 0
        })
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.minPrice <= this.totalPrice) {
          window.alert(`支付${this.totalPrice}元`)
        }
      }
    },
    transitions: {
      drop: {
        beforeEnter (el) {
          for (let i = this.balls.length; i--;) {
            let ball = this.balls[i]
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect()
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
              el.style.transform = `translate3d(0, ${y}px, 0)`
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
              inner.style.transform = `translate3d(${x}px, 0, 0)`
            }
          }
        },
        enter (el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0, 0, 0)'
            el.style.transform = 'translate3d(0, 0, 0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(0, 0, 0)'
            inner.style.transform = 'translate3d(0, 0, 0)'
          })
        },
        afterEnter (el) {
          let ball = this.dropBalls.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'

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
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-transition
          transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            transition all 0.4s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      &.fold-transition
        transition all 0.5s
        transform translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size: 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    z-index 40
    width 100%
    height 100%
    backdrop-filter blur(10px)
    &.fade-transition
      transition all 0.5s
      opacity 1
      background rgba(7, 17, 27, 0.6)
    &.fade-enter, &.fade-leave
      opacity 0
</style>
