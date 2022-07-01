<template>
  <div id="app">
    <Sections
      :admin="admin"
      :pageName="pageName"
      :variations="[]"
      @finishLoad="sectionsLoaded"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      admin: false,
      pageName: "home"
    };
  },
  methods: {
    sectionsLoaded() {
      this.admin = !!this.$cookies.get("sections-auth-token");
    }
  }
};
</script>