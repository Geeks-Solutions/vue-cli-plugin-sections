<template>
  <div>

    <TranslationComponent @enSet="siteLang = 'en'" @frSet="siteLang = 'fr'" />

    <div class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("Terms Policy") }}</label>
      <wysiwyg :html="settings[siteLang].termsPolicy" @settingsUpdate="siteLang === 'en' ? updatePolicy : updateFRPolicy"/>
      <span v-show="errors.termsPolicy && siteLang === 'en'" class="text-error text-sm pt-2 pl-2">{{ $t('requiredField') }}</span>
    </div>

    <span v-show="!Object.values(errors).every((v) => v === false) && siteLang === 'fr'" id="required-fields" class="text-error text-sm pt-2 pl-2">{{ $t('checkRequiredField') }}</span>

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
        setTimeout(() => document.getElementById('required-fields').scrollIntoView(), 1000)
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
