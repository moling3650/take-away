<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return `star-${this.size}`
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        for (let i = Math.floor(score); i--;) {
          result.push(CLS_ON)
        }
        Number.isInteger(score) || result.push(CLS_HALF)
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'

  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        star-items(48, 22)
    &.star-36
      .star-item
        star-items(36, 6)
    &.star-24
      .star-item
        star-items(24, 3)

</style>
