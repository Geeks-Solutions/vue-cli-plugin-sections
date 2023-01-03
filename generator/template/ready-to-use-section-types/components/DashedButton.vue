<template>
  <div class="relative cursor-pointer" @mouseover="mouseOver" @mouseout="mouseOut" @click="buttonClicked">
    <img v-if="img" :src="rectSrc" width="340" alt=""/>

    <div class="absolute top-2 right-2">
      <TopRightArrow :color="arrowColor" size="35" />
    </div>

    <div class="absolute bottom-4 left-4">
      <div class="flex flex-col">
        <div :class="titleStyle">
          {{ title }}
        </div>
        <div :class="subTitleStyle">
          {{ subTitle }}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import TopRightArrow from "~/components/icons/TopRightArrow";
export default {
  name: "DashedButton",
  components: {TopRightArrow},
  props: {
    img: {
      type: Boolean,
      default: true
    },
    hoverArrowColor: {
      type: String,
      default: '#00131F'
    },
    unHoverArrowColor: {
      type: String,
      default: '#03B1C7'
    },
    rectSrcProp: {
      type: String,
      default: require('@/assets/icons/dashedRectBlue.svg')
    },
    hoverRectSrcProp: {
      type: String,
      default: require('@/assets/icons/rectBlue.svg')
    },
    unHoverRectSrcProp: {
      type: String,
      default: require('@/assets/icons/dashedRectBlue.svg')
    },
    borderHoverColorProp: {
      type: String,
      default: 'white'
    },
    titleStyle: {
      type: String,
      default: 'text-2xl'
    },
    title: {
      type: String,
      default: ''
    },
    subTitleStyle: {
      type: String,
      default: 'text-xl text-Blue pr-1'
    },
    subTitle: {
      type: String,
      default: ''
    },
    buttonClicked: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      arrowColor: '#03B1C7',
      rectSrc: require('@/assets/icons/dashedRectBlue.svg'),
      hoverRectSrc: require('@/assets/icons/rectBlue.svg'),
      unHoverRectSrc: require('@/assets/icons/dashedRectBlue.svg'),
      borderHoverColor: 'white'
    }
  },
  mounted() {
    this.rectSrc = this.rectSrcProp
  },
  methods: {
    mouseOver() {
      this.borderHoverColor = 'white'
      this.arrowColor = this.hoverArrowColor
      this.rectSrc = this.hoverRectSrcProp
    },
    mouseOut() {
      this.arrowColor = this.unHoverArrowColor
      this.rectSrc = this.unHoverRectSrcProp
    }
  }
}
</script>

<style scoped>

</style>
