<template>
  <div v-if="$route.name !== 'Login' && $route.name !== 'Reset'">
    <portal-target name="notification-outlet" multiple></portal-target>
    <!--Navbar-->
    <NavbarComponent />

    <!--/.Navbar-->
    <!-- Sidebar -->
    <!-- <SidebarComponent /> -->

    <!-- /Sidebar  -->
    <mdb-container fluid class="mt-5 p-5">
      <router-view></router-view>
    </mdb-container>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import { waves, mdbContainer } from "mdbvue";
// import SidebarComponent from './components/Sidebar'
import NavbarComponent from "./components/Navbar";
export default {
  name: "AdminTemplate",
  components: {
    NavbarComponent,
    mdbContainer,
    // SidebarComponent,
  },
  data() {
    return {
      activeItem: 1,
    };
  },
  beforeMount() {
    this.activeItem = this.$route.matched[0].props.default.page;
  },
  mixins: [waves],
};
</script>

<style>
@import url("https://static.2bebot.com.br/fonts/gotham/gotham2.css");
* :not(.fa, .fas, .far) {
  font-family: "Gotham" !important;
}
.modal-content {
  margin-top: 68px;
}
.bg-color-table {
  background: #588cb8;
}
.first-text {
  color: #464e5f;
}
.justify-content-evenly {
  justify-content: space-evenly;
}
</style>
<style scoped>
main {
  background-color: #ededee;
  min-height: 94vh;
}

@media (max-width: 1199.98px) {
  .flexible-content {
    padding-left: 0;
  }
}
</style>
<style>
/* Extra small devices (portrait phones, less than 576px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>