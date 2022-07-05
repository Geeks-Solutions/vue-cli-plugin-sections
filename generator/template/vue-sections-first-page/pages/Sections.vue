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
      // The following line of code checks for the token presence in the cookies, if found then you are logged in as admin
      // When admin is true you will see the Edit Page button in the top right corner of your page
      this.admin = !!this.$cookies.get("sections-auth-token");
    }
  }
};
</script>