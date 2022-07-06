<template>
  <mdb-navbar class="py-50" color="unique-color" dark position="top">
    <mdb-navbar-brand>
      <router-link class="tag-a" to="/" @click.native="activeItem = 1">
        <img
          class="mr-5"
          src="../assets/logo-jeunesse-branco.png"
          height="45"
          alt=""
      /></router-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <!-- <li
          :class="activeItem === 1 && 'active-item'"
          class="d-flex align-items-center"
        >
          <router-link class="tag-a" to="/" @click.native="activeItem = 1"
            >Dashboard</router-link
          >
        </li> -->
        <li
          :class="activeItem === 4 && 'active-item'"
          class="d-flex align-items-center"
        >
          <router-link
            class="tag-a"
            to="/campaign"
            @click.native="activeItem = 4"
            >Campanhas</router-link
          >
        </li>
        <li
          :class="activeItem === 5 && 'active-item'"
          class="d-flex align-items-center"
        >
          <router-link class="tag-a" to="/users" @click.native="activeItem = 5"
            >Usuários</router-link
          >
        </li>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <mdb-dropdown tag="li" split class="nav-item">
          <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed
            ><img
              :src="`https://avatar.oxro.io/avatar.svg?name=${name}`"
              class="image-avatar rounded-circle mr-2"
              height="40"
          /></mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <!-- <mdb-dropdown-item disabled>Alterar perfil</mdb-dropdown-item> -->
            <mdb-dropdown-item @click.prevent="handleLogout"
              >Sair</mdb-dropdown-item
            >
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbDropdownItem,
} from "mdbvue";
export default {
  name: "NavbarPage",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
  },
  computed: {
    name() {
      return encodeURI(this.user);
    },
  },
  data() {
    return {
      activeItem: 1,
      user: JSON.parse(localStorage.getItem("user")).name,
    };
  },
  beforeMount() {
    this.activeItem = this.$route.matched[0].props.default.page;
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.py-50 {
  padding: 5px 70px;
}
.mr-5 {
  margin-right: 50px;
}
.font-color {
  color: #367988;
  font-weight: 500;
}
.active-item {
  border-radius: 8px;
  background: #234663;
  font-weight: 400;
}
.tag-a {
  color: white;
}

li {
  padding: 10px;
  margin-left: 10px;
  transition: all 0.3s;
  font-weight: 400;
}

li:hover {
  border-radius: 8px;
  background: #234663;
  font-weight: 400;
}
</style>