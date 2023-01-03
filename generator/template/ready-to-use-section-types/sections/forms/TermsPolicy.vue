<template>
  <div>

    <TranslationComponent @enSet="siteLang = 'en'" @frSet="siteLang = 'fr'" />

    <div v-if="siteLang === 'en'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("Terms Policy") }}</label>
      <wysiwyg :html="settings.en.termsPolicy" @settingsUpdate="updatePolicy"/>
    </div>
    <div v-else-if="siteLang === 'fr'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("Terms Policy") }}</label>
      <wysiwyg :html="settings.fr.termsPolicy" @settingsUpdate="updateFRPolicy"/>
    </div>

  </div>
</template>

<script>
import wysiwyg from "@/sections/base/components/wysiwyg";
import {getFormsKeysTranslation} from "@/utils/constants";

export default {
  name: 'TermsPolicy',
  components: {
    wysiwyg
  },
  data() {
    return {
      settings: {
        en: {
          termsPolicy: '',
        },
        fr: {
          termsPolicy: ''
        }
      },
      errors: {
        termsPolicy: false
      },
      siteLang: 'en'
    }
  },
  watch: {
    settings(val) {
      if(!this.settings.en && !this.settings.fr) {
        Object.assign(this.settings, {
          en: {
            termsPolicy: '',
          },
          fr: {
            termsPolicy: ''
          }
        })
      }
      getFormsKeysTranslation(val)
    }
  },
  methods: {
    updatePolicy(content) {
      this.settings.en.termsPolicy = content
    },
    updateFRPolicy(content) {
      this.settings.fr.termsPolicy = content
    },
    validate() {
      let valid = true;
      if (!this.settings.en.termsPolicy) {
        this.errors.termsPolicy = true;
        valid = false;
      }
      if (!valid) {
        this.$root.$emit("toast", {
          type: "Error",
          message: this.$t("fill-required-fields")
        });
      }
      return valid;
    },
  },
}
</script>

<style>
.shadow {
  box-shadow: 4px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
