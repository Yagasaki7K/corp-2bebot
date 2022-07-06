<template>
  <div class="sidebar-fixed position-fixed">
    <div class="bg-logo mb-5">
      <a class="logo-wrapper"
        ><img alt="" class="img-fluid" src="../assets/logo-mdb-vue-small.png"
      /></a>
    </div>
    <mdb-list-group class="list-group-flush">
      <router-link v-if="role.name == 'corporate' || role.name == 'analytics'" to="/dashboard" @click.native="activeItem = 1">
        <mdb-list-group-item
          :action="true"
          class="bg-color text-center p-2 mb-4"
          :class="activeItem === 1 && 'active'"
        >
          <mdb-icon
            icon="chart-line"
            class="d-block text-center mb-2 icon-size"
            :class="activeItem === 1 && 'activeIcon'"
          />
          Relatório
        </mdb-list-group-item>
      </router-link>

      <router-link v-if="role.name == 'corporate' || role.name == 'analytics'" to="/distributors" @click.native="activeItem = 2">
        <mdb-list-group-item
          :action="true"
          class="bg-color text-center p-2 mb-4"
          :class="activeItem === 2 && 'active'"
          ><mdb-icon
            icon="list"
            class="d-block text-center mb-2 icon-size"
            :class="activeItem === 2 && 'activeIcon'"
          />Distribuidores</mdb-list-group-item
        >
      </router-link>
      <router-link to="/candidates" @click.native="activeItem = 3">
        <mdb-list-group-item
          :action="true"
          class="bg-color text-center p-2 mb-4"
          :class="activeItem === 3 && 'active'"
          ><mdb-icon
            icon="list"
            class="d-block text-center mb-2 icon-size"
            :class="activeItem === 3 && 'activeIcon'"
          />Candidatos</mdb-list-group-item
        >
      </router-link>
      <router-link v-if="role.name == 'corporate' || role.name == 'analytics'" to="/campaign" @click.native="activeItem = 4">
        <mdb-list-group-item
          :action="true"
          class="bg-color text-center p-2 mb-4"
          :class="activeItem === 4 && 'active'"
          ><mdb-icon
            icon="list"
            class="d-block text-center mb-2 icon-size"
            :class="activeItem === 4 && 'activeIcon'"
          />Campanhas</mdb-list-group-item
        >
      </router-link>
      <router-link v-if="role.name == 'corporate' || role.name == 'analytics'" to="/dumpingcsv" @click.native="activeItem = 6">
        <mdb-list-group-item
          :action="true"
          class="bg-color text-center p-2 mb-4"
          :class="activeItem === 6 && 'active'"
          ><mdb-icon
            icon="list"
            class="d-block text-center mb-2 icon-size"
            :class="activeItem === 6 && 'activeIcon'"
          />CSVs</mdb-list-group-item
        >
      </router-link>
      <router-link v-if="role.name == 'corporate'" to="/users" @click.native="activeItem = 5">
        <mdb-list-group-item
          :action="true"
          class="bg-color text-center p-2 mb-4"
          :class="activeItem === 5 && 'active'"
          ><mdb-icon
            icon="list"
            class="d-block text-center mb-2 icon-size"
            :class="activeItem === 5 && 'activeIcon'"
          />Usuários</mdb-list-group-item
        >
      </router-link>
    </mdb-list-group>
  </div>
</template>
<script>
import { mdbIcon, mdbListGroup, mdbListGroupItem, waves } from "mdbvue";

export default {
  name: "SidebarComponent",
  components: {
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon,
  },

  data() {
    return {
      activeItem: 1,
      role: JSON.parse(localStorage.getItem("user")).role,
    };
  },
  beforeMount() {
    this.activeItem = this.$route.matched[0].props.default.page;
  },
  mixins: [waves],
};
</script>




<style scoped>
main {
  background-color: #f3f6f9;
}

.bg-color {
  background: #1f1e2e;
  border: none;
  color: white;
}

.icon-size {
  font-size: 20px;
}

.bg-logo {
  background: #181824;
  margin-left: -20px;
  margin-right: -20px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 200px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #1f1e2e;
  padding: 1.5rem;
  padding-top: 0;
  overflow: auto;
}

.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 3rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); */
  border-bottom: 1px solid #3699ff;
  padding-bottom: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
}

.activeIcon {
  color: #3699ff;
}
</style>
