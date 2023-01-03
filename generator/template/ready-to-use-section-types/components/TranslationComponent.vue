<template>
  <div>
    <div class="flex w-full justify-center ml-2 md:ml-0">
      <div class="bg-Blue px-2 h-45px flex justify-center items-center rounded-tl-lg" :class="siteLang === 'en' ? 'bg-Blue' : 'bg-white border border-Blue'">
        <div
          class="font-light cursor-pointer"
          :class="siteLang === 'en' ? 'text-white' : 'text-Blue'"
          @click="siteLang = 'en'; $emit('enSet')"
        >
          {{ $t('enTranslation') }}
        </div>
      </div>
      <div class="bg-Blue px-2 h-45px flex justify-center items-center rounded-br-lg" :class="siteLang === 'fr' ? 'bg-Blue' : 'bg-white border border-Blue'">
        <div
          class="font-light cursor-pointer"
          :class="siteLang === 'fr' ? 'text-white' : 'text-Blue'"
          @click="siteLang = 'fr'; $emit('frSet')"
        >
          {{ $t('frTranslation') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TranslationComponent",
  data() {
    return {
      siteLang: 'en'
    }
  }
}
</script>

<style scoped>

</style>
