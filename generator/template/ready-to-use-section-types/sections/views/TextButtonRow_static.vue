<template>
  <div v-if="settings">

    <div class="flex flex-wrap bg-Dark justify-between py-6 md:px-16 md:pb-6 pb-8 md:pr-72 relative z-10 items-center">
      <div class="flex w-full md:w-max justify-center">
        <div class="ql-editor ql-snow font-bold text-2xl md:text-4xl" v-html="getCurrentTranslation(settings, lang, 'title', 'title_fr')">
        </div>
      </div>

      <div class="flex justify-center w-full md:w-max">
        <dashed-button :rect-src-prop="require('@/assets/icons/dashedRect.svg')" :hover-rect-src-prop="require('@/assets/icons/rectBlue.svg')" :un-hover-rect-src-prop="require('@/assets/icons/dashedRect.svg')" :hover-arrow-color="'white'" :title="getCurrentTranslation(settings, lang, 'text1', 'text1_fr')" :title-style="'text-2xl text-white'" :sub-title="getCurrentTranslation(settings, lang, 'text2', 'text2_fr')" :button-clicked="openURL" />
      </div>

    </div>

  </div>
</template>

<script>
import {getTranslation} from "@/utils/constants";

export default {
  name: 'TextButtonRow',
  props: {
    section: {
      type: Object,
      default: () => {},
    },
    lang: {
      type: String,
      default: "en"
    }
  },
  data() {
    return {
      percenInViewPort: 0,
      addOpacity: false,
      isVisible: false,
    };
  },
  computed: {
    settings() {
      return this.section.settings;
    },
  },
  methods: {
    viewHandler(e) {
      this.percenInViewPort = e.percentInView === 0 ? 1 : e.percentInView;
      const percenInViewPort = e.percentInView;
      if (percenInViewPort > 0) {
        this.isVisible = true;
      }
      if (percenInViewPort === 1) {
        this.addOpacity = true;
      }
    },
    openURL() {
      if(this.settings.newPageLink === true) {
        if(this.settings[this.lang]) {
          if(this.lang === 'fr') {
            this.settings[this.lang].link === '' ? window.open(this.settings.link_fr, '_blank') : window.open(this.settings[this.lang].link, '_blank')
          } else this.settings[this.lang].link === '' ? window.open(this.settings.link, '_blank') : window.open(this.settings[this.lang].link, '_blank')
        } else return this.lang === 'fr' ? window.open(this.settings.link_fr, '_blank') : window.open(this.settings.link, '_blank')
      } else if(this.settings[this.lang]) {
          if(this.lang === 'fr') {
            this.settings[this.lang].link === '' ? this.$router.push(this.settings.link_fr) : this.$router.push(this.settings[this.lang].link)
          } else this.settings[this.lang].link === '' ? this.$router.push(this.settings.link) : this.$router.push(this.settings[this.lang].link)
        } else return this.lang === 'fr' ? this.$router.push(this.settings.link_fr) : this.$router.push(this.settings.link)
    },
    getCurrentTranslation(settings, lang, primaryKey, frKey) {
      return getTranslation(settings, lang, primaryKey, frKey)
    }
  }
};
</script>

<style>
.wys-wrapper {
  width: 87%;
  margin: 0 auto;
}
.wys-wrapper .title {
  max-width: 470px;
}
.ql-editor .ql-size-huge {
  font-size: 60px !important;
  letter-spacing: 6px;
}

.view-component {
  overflow: initial !important;
}

@media only screen and (max-width: 640px) {
  .ql-editor .ql-size-large {
    font-size: 28px !important;
  }
}
</style>
