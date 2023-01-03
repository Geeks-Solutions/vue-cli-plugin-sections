# vue-cli-plugin-sections

A Vue js plugin to install and configure [@geeks-solutions/vue-sections](https://www.npmjs.com/package/@geeks-solutions/vue-sections) library.

### How to install vue-cli-plugin-sections plugin:

 - npm i @geeks.solutions/vue-cli-plugin-sections

### How to run the plugin:

 - vue invoke @geeks.solutions/vue-cli-plugin-sections

The plugin will prompt you to answer three questions:

````
? What is your project url: http://localhost:8000
? What is your project ID: 1d23few45rw213qd6
? Add vue-sections configuration with first sections page Yes
````

### What does the plugin perform:

 * Add "@geeks-solutions/vue-sections" to you package.json + its required dependencies and install them:
    - "bootstrap-vue"
    - "cookie-universal-nuxt"
    - "nuxt-i18n"

 * Update nuxt.config.js with plugin and modules required by vue-sections.

 * Create file configuration with your project url and id under /plugins/sections.js.

 * Create file configuration for i18n required by the library under /lang/en.js

 * Create a configured first page with sections under /pages/Sections.vue only if answered yes on the third question
``? Add vue-sections configuration with first sections page Yes``

 * Add 2 fully customizable and ready to use section types only if answered yes on the fourth question
``? Add 2 ready to use section types to your project Yes``

