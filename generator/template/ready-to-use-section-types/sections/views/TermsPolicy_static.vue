<template>
  <div v-if="settings">

    <div class="flex md:ml-40 md:justify-start justify-around border-b border-BorderGray show drop-shadow-2xl py-4">
      <u class="hover:text-Blue hover:underline md:pr-40 cursor-pointer" :class="selected === 0 ? 'text-Blue underlineStyle' : 'text-TextGray no-underline'" @click="() => {selected = 0; $router.push(localePath('/PrivacyPolicy'))}">
        {{ $t('privacyPolicy') }}
      </u>
      <u class="hover:text-Blue hover:underline cursor-pointer" :class="selected === 1 ? 'text-Blue underlineStyle' : 'text-TextGray no-underline'" @click="() => {selected = 1; $router.push(localePath('/TermsConditions'))}">
        {{ $t('termsConditions') }}
      </u>
    </div>

    <div class="flex flex-col justify-center py-6 md:px-40 mb-14 relative z-10 items-center">

      <div class="flex justify-center text-3xl">
        {{ selected === 0 ? $t('privacyPolicy') : $t('termsConditions') }}
      </div>

      <div class="flex w-full px-4 md:px-0">
        <div class="ql-editor ql-snow font-light text-xl pl-0" v-html="getCurrentTranslation(settings, lang, 'termsPolicy', 'termsPolicy_fr')">
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import {getTranslation} from "@/utils/constants";

export default {
  name: 'TermsPolicy',
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
      selected: 0
    };
  },
  computed: {
    settings() {
      return this.section.settings;
    },
  },
  mounted() {
    if(this.$route.path.substring(this.$route.path.lastIndexOf('/')) === '/PrivacyPolicy') {
      this.selected = 0
    } else {
      this.selected = 1
    }
  },
  methods: {
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

strong {
  font-weight: bold;
}

h3 {
  font-size: larger;
}

.underlineStyle {
  text-decoration-color: #61035B !important;
  text-underline-offset: 12px;
}

.ql-editor ol, .ql-editor ul {
  padding-left: 0;
}

.ql-editor ol li:not(.ql-direction-rtl), .ql-editor ul li:not(.ql-direction-rtl) {
  padding-left: 15px;
}

ul {
  list-style: none;
}

ul li::before {
  content: "\2022";
  color: #03B1C7;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
  font-size: 1.1em;
}

</style>
