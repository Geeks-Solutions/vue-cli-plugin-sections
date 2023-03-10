<template>

  <div>
    <div class="flex flex-row mt-8">

      <div class="columnStyle">

        <fieldset class="fieldSetStyle border border-solid border-gray-300 p-3">
          <legend style="width: 50%">{{ $t('contractSetTitle') }}</legend>

          <div class="mb-4 flex items-center">
            <label class="input-label">{{ $t("Title") }}</label>
            <input v-model="settings.title" :class="errors.title ? errorInputClass : inputClass" type="text" :placeholder="$t('Title')">
          </div>

          <div class="mb-4 flex items-center">
            <label class="input-label">{{ $t("contractAddr") }}</label>
            <input v-model="settings.contract_addr" :class="errors.contractAddr ? errorInputClass : inputClass" type="text" :placeholder="$t('contractAddr')">
          </div>

          <div class="flex flex-row justify-center mb-4">
            <div class="input-label pr-2">{{ $t("contractABI") }}</div>
            <textarea v-model="settings.contract_abi" :class="errors.contractABI ? errorInputAreaClass : inputAreaClass" type="text" :placeholder="$t('contractABI')"/>
          </div>

          <div class="mb-4 flex items-center">
            <label class="input-label">{{ $t("Token ID*") }}</label>
            <span class="text-sm py-1 text-grayText">{{ $t('The token ID must match the token id in your smart contract') }}</span>
            <input v-model="settings.token_id" :class="errors.token_id ? errorInputClass : inputClass" type="text" :placeholder="$t('Token ID*')">
          </div>

        </fieldset>

      </div>

      <div class="columnStyle">
        <fieldset class="fieldSetStyle border border-solid border-gray-300 p-3">
          <legend style="width: 50%">{{ $t('imageSetTitle') }}</legend>

          <div class="mb-4 flex flex-row">
            <label class="input-label">{{ $t("imageURL") }}</label>
            <div class="flex flex-row">
              <div class="flex-col">
                <p class="mr-4 text-TextGray">{{ title }}</p>
                <p class="mr-4 text-xs w-190px text-TextGray">{{ description }}</p>
              </div>
              <div class="flex items-center">
                <div class="mr-2" @click="$refs.imagePick.click()">
                  <div
                    class="
                      w-112px
                      h-99px
                      border border-BorderGray
                      rounded-xl
                      shadow
                      p-2
                      text-center
                      cursor-pointer
                    "
                  >
                    <div class="w-95px h-63px">
                      <EmptyImage v-if="settings.image.files[0].url === '' && !isInProgress"
                                  alt="empty"
                                  class="w-95px h-63px object-contain"/>
                      <div v-if="settings.image.files && !isInProgress">
                        <img
                          v-if="settings.image.files[0].url"
                          :src="settings.image.files[0].url"
                          alt="image"
                          class="w-95px h-63px object-contain"
                        />
                      </div>
                      <div v-if="isInProgress" class="pl-4 p-2">
                        <img
                          :src="require('assets/icons/loadingCircle.svg')"
                          width="100"
                          alt="progress"
                        />
                      </div>
                    </div>
                    <div>
                      <span v-if="!settings.image.files[0].url" class="text-sm text-TextGray">{{ uploadText }}</span>
                      <span v-else class="text-sm text-TextGray">{{ changeText }}</span>
                    </div>
                  </div>
                </div>
                <input
                  ref="imagePick"
                  type="file"
                  :accept="extensions"
                  style="visibility: hidden; width: 0"
                  @change="onFileSelected"
                />
                <div @click="removeImage">
                  <Cross v-if="settings.image.files[0].url !== ''" alt="" class="cursor-pointer pl-2"/>
                </div>
              </div>
            </div>
          </div>

          <span class="flex text-error py-2 text-xs">{{ mediaError }}</span>

          <div v-show="settings.image.files" class="flex flex-row mb-4">
            <div class="input-label pr-2">{{ $t("imageDesc") }}</div>
            <wysiwyg :html="settings.image_description" @settingsUpdate="updateDescription"/>
          </div>
        </fieldset>
      </div>

    </div>

  </div>

</template>
<script>
import {deleteMedia, globalFileUpload} from "@geeks.solutions/vue-sections";

import EmptyImage from "../base/icons/emptyImage";
import Cross from "../base/icons/cross";
import wysiwyg from "@/sections/base/components/wysiwyg";
export default {
  components: {Cross, EmptyImage, wysiwyg},
  props: {
    uploadText: {
      type: String,
      default: 'Upload',
    },
    changeText: {
      type: String,
      default: 'Changer',
    },
    imageUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    extensions: {
      type: String,
      default: ''
    },
    fileSize: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      settings: {
        title: '',
        contract_addr: '',
        contract_abi: '',
        image: {
          id: "",
          files: [
            {
              filename: "",
              url: ""
            }
          ]
        },
        image_description: '',
        token_id: ""
      },
      inputClass: 'sections-input p-2 font-sm ml-4 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-full px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
      errorInputClass: 'sections-input p-2 font-sm ml-4 appearance-none block bg-gray-200 text-gray-700 border border-error rounded-full px-4 leading-tight focus:outline-none focus:bg-white focus:border-error',
      inputClass2: 'sections-input p-2 font-sm ml-1 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-full px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
      inputAreaClass: 'sections-input p-8 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
      errorInputAreaClass: 'sections-input p-8 appearance-none block bg-gray-200 text-gray-700 border border-error rounded px-4 leading-tight focus:outline-none focus:bg-white focus:border-error',
      previewImage: '',
      file: '',
      errors: {
        title: false,
        contractAddr: false,
        contractABI: false,
        tokenType: false,
        payWhatYouCan: false,
        token_id: false,
        setErrors: []
      },
      isInProgress: false,
      mediaError: ''
    };
  },
  watch: {
    imageUrl(src) {
      this.previewImage = src
    }
  },
  methods: {
    async onFileSelected(e) {
      this.isInProgress = true
      this.file = this.$refs.imagePick.files[0]

      const image = {
        id: "",
        files: [
          {
            filename: "",
            url: ""
          }
        ]
      };
      this.mediaError = ''
      await globalFileUpload(this.file, this.settings.image.id).then(
        (result) => {
          if(result.success) {
            this.isInProgress = false
            image.files[0].url = result.data.files[0].url;
            image.files[0].filename = result.data.files[0].filename;
            image.id = result.data.id;
            this.settings.image = image;
            this.previewImage = result.data.files[0].url
          } else {
            this.isInProgress = false
            this.mediaError = `${result.error.response.data.error}. ${result.error.response.data.message}`
          }
        }
      )
    },
    showMobile() {
      this.mobileHide = !this.mobileHide
    },
    async removeImage() {
      if(this.settings.image.id) {
        await deleteMedia(this.settings.image.id)
      }
      this.settings.image.files[0].url = ''
      this.settings.image.id = null
      this.previewImage = ''
      this.file = ''
    },
    validate() {
      let valid = true;
      if (!this.settings.title) {
        this.errors.title = true;
        valid = false;
      }
      if (!this.settings.contract_addr) {
        this.errors.contractAddr = true;
        valid = false;
      }
      if (!this.settings.contract_abi) {
        this.errors.contractABI = true;
        valid = false;
      }
      if (!this.settings.token_id) {
        this.errors.token_id = true;
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
    updateDescription(content) {
      this.settings.image_description = content
    }
  }
};
</script>

<style lang="css" scoped>
.sections-input {
  height: 38px;
}
.in-error {
  border: solid 1px red;
}
.errorSpan{
  color: red;
}
.input-label {
  width: 30% !important;
  display: flex;
  text-align: start;
}
.submit-btn-set {
  border: none;
  font-size: 24px;
  padding: 7px;
  background: #31a9db;
  color: #fff;
  border-radius: 16px;
  transition: .2s;
  width: 300px;
  height: 60px;
  text-align: center;
}
.contract-set-form {
  border: solid;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
}
.remove-btn {
  height: 30px;
  border: none;
  font-size: 25px;
  font-family: sans-serif;
  padding: 7px;
  line-height: 14px;
  background: #31a9db;
  color: #fff;
  border-radius: 16px;
  transition: .2s;
  text-align: center;
}
.firstElement {
  margin-left: 40px;
}
.columnStyle {
  margin-right: 20px;
  width: 50%;
}
input {
  font-size: 16px;
  width: 100%;
}
textarea {
  font-size: 16px;
  width: 100%;
  height: 140px !important;
}
:root {
  --vs-border-radius: 10px;
}

.vs--searchable .vs__dropdown-toggle {
  cursor: text;
  height: 48px;
}
label {
  width: 100% !important;
}
.select .vs__selected, .select .vs__search, li {
  font-size: small !important;
}
</style>
