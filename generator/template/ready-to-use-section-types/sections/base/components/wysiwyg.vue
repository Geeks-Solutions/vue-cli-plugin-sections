<template>
  <div class="input">
    <quill-editor :key="quillKey" ref="myQuillEditor" v-model="settings" :options="editorOption" class="wyzywig"/>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import {quillEditor} from "vue-quill-editor";
import {globalFileUpload} from "@geeks.solutions/nuxt-sections/lib/src/utils";

/* eslint-disable camelcase */

export default {
  components: {
    quillEditor,
  },
  props: {
    html: {
      type: String,
      default: ""
    },
    quillKey: {
      type: String,
      default: "quillKey"
    }
  },
  data() {
    return {
      settings: "",
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['link'],
            ['blockquote', 'code-block'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': ['#03B1C7', '#61035B', '#fff', '#868686', '#00131F']}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],

            ['clean']                                         // remove formatting button
          ]
        }
      },
    };
  },
  watch: {
    settings() {
      this.$emit('settingsUpdate', this.settings)
    },
    html() {
      this.settings = this.html
    }
  },
  mounted() {
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', () => {
      this.uploadFunction();
    });
  },
  methods: {
    validate() {
      return true;
    },
    uploadFunction() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      let imageURL = ''

      // Listen upload local image and save to server
      input.onchange = async () => {
        const file = input.files[0];
        await globalFileUpload(file).then((result) => {
          imageURL = result.data.files[0].url
          const range = this.$refs.myQuillEditor.quill.getSelection();
          this.$refs.myQuillEditor.quill.insertEmbed(range.index, 'image', imageURL);
        })
      };
    },
    sectionHeader(header) {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000000 + 1);
      const header_key = `project-id-${timestamp}-${random}`;
      header[header_key] = "a3b2cd1";
      if (header.origin) {
        header['access-control-request-headers'] = header_key;
      }
      return header
    }
  }
};
</script>
