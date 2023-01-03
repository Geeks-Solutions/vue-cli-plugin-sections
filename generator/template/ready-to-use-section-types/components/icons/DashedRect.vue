<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" :width="width-1" :height="height-1" :stroke="color" stroke-dasharray="10 10"/>
  </svg>
</template>

<script>
export default {
  name: 'DashedRect',
  props: {
    color: {
      type: String,
      default: 'black'
    },
    width: {
      type: String,
      default: '310'
    },
    height: {
      type: String,
      default: '84'
    }
  }
}
</script>
