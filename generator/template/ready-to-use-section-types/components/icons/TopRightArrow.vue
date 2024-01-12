<template>
  <svg :width="size" :height="size" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66504 20.3467L19.7588 7.25288" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.66504 7.25293H19.7588V20.3467" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
  name: "TopRightArrow",
  props: {
    color: {
      type: String,
      default: '#03B1C7'
    },
    size: {
      type: String,
      default: '27'
    }
  }
}
</script>

<style scoped>

</style>
