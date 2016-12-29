<template>
  <div v-show="foodShow" class="food"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.foodShow = true
      }
    },
    data () {
      return {
        foodShow: false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    top 0
    left 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
</style>
