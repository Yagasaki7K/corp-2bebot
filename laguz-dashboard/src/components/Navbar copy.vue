<template>
  <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <mdb-navbar-toggler class="ml-4">
        <mdb-navbar-nav left>
          <mdb-nav-item
            active
            class="active"
            href="#"
            waves-fixed
            >{{$route.name}}</mdb-nav-item
          >
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <span class="navbar-text mr-3 grey-text font-weight-bolder">
            {{$store.getters['auth/user'].name}}
          </span>
          <mdb-nav-item
            @click.prevent="handleLogout"
            href="#"
            waves-fixed
            class="blue lighten-5 px-3 border rounded"
            target="_blank"
            ><p class="m-0 p-0 cyan-text font-weight-bold">Sair</p>
          </mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
</template>

<script>

import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
    waves,

} from "mdbvue";

export default {
  name: "NavbarComponent",
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
  },
  mixins: [waves],
  methods: {
    handleLogout(){
      this.$store.dispatch('auth/logout');
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 220px;
}

@media (max-width: 1199.98px) {
.flexible-navbar {
    padding-left: 10px;
  }
}

</style>