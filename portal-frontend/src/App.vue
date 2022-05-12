<template>
  <div id="q-app">
    <router-view
      @login="login"
      @logout="logout"
      @refreshInfos="refreshInfos"
      :jwt="jwt"
      :user="user"
    />
  </div>
</template>
<script>
import { readJwt } from "src/services/Auth";
export default {
  name: "App",
  data: () => ({
    jwt: localStorage.getItem("token"),
    user: null,
  }),
  methods: {
    login({ token }) {
      localStorage.setItem("token", token);
      this.jwt = token;
      this.refreshInfos();
    },
    logout() {
      localStorage.removeItem("token");
      this.jwt = null;
      this.user = null;
      this.$router.push("/login");
    },
    refreshInfos() {
      readJwt(this.jwt)
        .then((res) => {
          this.user = res;
        })
        .catch(console.error);
    },
  },
  mounted() {
    this.refreshInfos();
  },
};
</script>
<style>
.anychart-credits {
  display: none !important;
}
#anychart-menu-wrapper {
  display: none !important;
}

.clickable {
  cursor: pointer;
}
</style>