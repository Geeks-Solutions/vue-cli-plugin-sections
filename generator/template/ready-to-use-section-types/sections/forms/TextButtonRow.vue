<template>
  <div>

    <TranslationComponent @enSet="siteLang = 'en'" @frSet="siteLang = 'fr'" />

    <div v-if="siteLang === 'en'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("Title") }}</label>
      <wysiwyg :html="settings.en.title" @settingsUpdate="updateTitleDescription"/>
      <span v-show="errors.title" class="text-error text-sm pt-2 pl-2">{{ $t('requiredField') }}</span>
    </div>
    <div v-else-if="siteLang === 'fr'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("Title_FR") }}</label>
      <wysiwyg :html="settings.fr.title" @settingsUpdate="updateTitleFRDescription"/>
    </div>

    <div v-if="siteLang === 'en'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("button_text_1") }}</label>
      <input
        v-model="settings.en.text1"
        type="text"
        value=""
        :placeholder="$t('button_text_1')"
        class="
            py-4
            pl-6
            border border-FieldGray
            rounded-xl
            h-48px
            w-344px
            focus:outline-none
          "
      />
      <span v-show="errors.text1" class="text-error text-sm pt-2 pl-2">{{ $t('requiredField') }}</span>
    </div>
    <div v-else-if="siteLang === 'fr'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("button_text_1") }}</label>
      <input
        v-model="settings.fr.text1"
        type="text"
        value=""
        :placeholder="$t('button_text_1')"
        class="
            py-4
            pl-6
            border border-FieldGray
            rounded-xl
            h-48px
            w-344px
            focus:outline-none
          "
      />
    </div>

    <div v-if="siteLang === 'en'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("button_text_2") }}</label>
      <input
        v-model="settings.en.text2"
        type="text"
        value=""
        :placeholder="$t('button_text_2')"
        class="
            py-4
            pl-6
            border border-FieldGray
            rounded-xl
            h-48px
            w-344px
            focus:outline-none
          "
      />
      <span v-show="errors.text2" class="text-error text-sm pt-2 pl-2">{{ $t('requiredField') }}</span>
    </div>
    <div v-else-if="siteLang === 'fr'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("button_text_2") }}</label>
      <input
        v-model="settings.fr.text2"
        type="text"
        value=""
        :placeholder="$t('button_text_2')"
        class="
            py-4
            pl-6
            border border-FieldGray
            rounded-xl
            h-48px
            w-344px
            focus:outline-none
          "
      />
    </div>

    <div v-if="siteLang === 'en'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("Link") }}</label>
      <input
        v-model="settings.en.link"
        type="text"
        value=""
        :placeholder="$t('Link')"
        class="
            py-4
            pl-6
            border border-FieldGray
            rounded-xl
            h-48px
            w-344px
            focus:outline-none
          "
      />
      <span v-show="errors.link" class="text-error text-sm pt-2 pl-2">{{ $t('requiredField') }}</span>
    </div>
    <div v-else-if="siteLang === 'fr'" class="flex flex-col items-start justify-start mt-8">
      <label class="mr-4 font-bold">{{ $t("Link") }}</label>
      <input
        v-model="settings.fr.link"
        type="text"
        value=""
        :placeholder="$t('Link')"
        class="
            py-4
            pl-6
            border border-FieldGray
            rounded-xl
            h-48px
            w-344px
            focus:outline-none
          "
      />
    </div>

    <div class="flex flex-col items-start justify-start mt-8">
      <div class="form-check form-switch flex justify-center items-center" style="padding: 0 !important;">
        <label class="form-check-label font-bold inline-block text-gray-800 mr-3" for="flexSwitchCheckChecked">{{ $t('linkNewPage') }}</label>
        <input id="flexSwitchCheckChecked" v-model="settings.newPageLink" type="checkbox" role="switch" class="w-20px h-20px">
      </div>
    </div>

  </div>
</template>

<script>
import wysiwyg from "@/sections/base/components/wysiwyg";
import {getFormsKeysTranslation} from "@/utils/constants";

export default {
  name: 'TitleTextMedia',
  components: {
    wysiwyg
  },
  data() {
    return {
      settings: {
        en: {
          title: '',
          text1: '',
          text2: '',
          link: '',
        },
        fr: {
          title: '',
          text1: '',
          text2: '',
          link: '',
        },
        newPageLink: false
      },
      previewMedia: '',
      file: '',
      errors: {
        title: false,
        text1: false,
        text2: false,
        link: false
      },
      isInProgress: false,
      siteLang: 'en'
    }
  },
  watch: {
    settings(val) {
      if(!this.settings.en && !this.settings.fr) {
        Object.assign(this.settings, {
          en: {
            title: '',
            text1: '',
            text2: '',
            link: '',
          },
          fr: {
            title: '',
            text1: '',
            text2: '',
            link: '',
          },
        })
      }
      getFormsKeysTranslation(val)
    }
  },
  methods: {
    updateTitleDescription(content) {
      this.settings.en.title = content
    },
    updateTitleFRDescription(content) {
      this.settings.fr.title = content
    },
    validate() {
      let valid = true;
      this.errors.title = false;
      this.errors.text1 = false;
      this.errors.text2 = false;
      this.errors.link = false;
      if (!this.settings.en.title) {
        this.errors.title = true;
        valid = false;
      }
      if (!this.settings.en.text1) {
        this.errors.text1 = true;
        valid = false;
      }
      if (!this.settings.en.text2) {
        this.errors.text2 = true;
        valid = false;
      }
      if (!this.settings.en.link) {
        this.errors.link = true;
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
