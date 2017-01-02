<template>
  <span class="icon" :class="pic"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      pic: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  bg-image($pic, $width, $height)
    width $width
    height $height
    background-size $width $height
    background-image url($pic + '@2x.png')
    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
      background-image url($pic + '@3x.png')

  .icon
    display inline-block
    background-repeat no-repeat
    &.brand
      bg-image('brand', 30px, 18px)
    &.bulletin
      bg-image('bulletin', 22px, 12px)
    for $pic in decrease discount guarantee invoice special
      for $index in 1 2 3 4
        &.{$pic}_{$index}
          if $index % 2 == 1
            bg-image(s('%s_%s', $pic, $index), 12px, 12px)
          else
            bg-image(s('%s_%s', $pic, $index), 16px, 16px)
</style>
