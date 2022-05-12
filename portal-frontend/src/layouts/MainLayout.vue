<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white m-4" color="red">
        <q-btn  class="text-dark" flat dense round icon="menu" aria-label="Menu" @click="toggle" />

        <q-toolbar-title style="font-size: 17px; padding: 10px" class="text-dark" >



              <div class="q-gutter-md row full-width items-center ">
                <span style="margin-right: 30px">
                  Painel de Controles
                </span>
                <!-- <q-select :input-style="{height: '30px'}" class="full-width" style="max-width: 400px; max-heigth:" outlined   label="Selecionar o projeto" /> -->
              </div>

        </q-toolbar-title>
        <q-btn-dropdown color="green" :label="(user || { name: '' }).name">
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="
                () => {
                  saveState();
                  $router.push('/perfil');
                }
              "
            >
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="$emit('logout')">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-brand text-white"
      :width="175"
    >
      <q-list>
        <q-item-label header class="text-white text-center"> <img style="width: 57px " src="../assets/img/bau-avatar2.png" alt=""> </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          content-class="teste"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view
        :jwt="jwt"
        :user="user"
        @refreshInfos="$emit('refreshInfos')"
        @openDrawerRequest="openDrawer"
        @closeDrawerRequest="closeDrawer"
        @blockDrawerRequest="blockDrawer"
        @unblockDrawerRequest="unblockDrawer"
        @saveStateRequest="saveState"
        @recoverStateRequest="recoverState"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  // {
  //   title: "Dashboard",
  //   icon: "home",
  //   link: "/",
  // },
  // {
  //   title: "Clientes",
  //   icon: "groups",
  //   link: "/customers",
  //   groups: ["ADMIN"],
  // },
  // {
  //   title: "Gerentes de Representantes",
  //   icon: "groups",
  //   link: "/gerentes",
  //   groups: ["ADMIN"],
  // },

  {
    title: "Flipbooks",
    icon: "book",
    link: "/",
    // groups: ["ADMIN"],
  },
  {
    title: "Ultimos pedidos",
    icon: "shopping_cart",
    link: "/orders",
    groups: ["ADMIN", "REPRESENTANTE"],
  },
  {
    title: "Usuários",
    icon: "groups",
    link: "/admins",
    groups: ["ADMIN"],
  }
  // {
  //   title: "Produtos",
  //   icon: "groups",
  //   link: "/produtos",
  //   groups: ["ADMIN", "REPRESENTANTE"],
  // },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  props: ["jwt", "user"],
  computed: {
    essentialLinks() {
      return linksData.filter((link) => this.$permit(link.groups, this.user));
    },
  },
  data() {
    return {
      leftDrawerOpen: false,
      blocked: false,
      state: null,
      project: null,
      projects: []
    };
  },
  methods: {
    saveState() {
      this.state = this.leftDrawerOpen;
    },
    recoverState() {
      if (this.state === null) return;
      this.leftDrawerOpen = this.state;
      this.state = null;
    },
    closeDrawer() {
      this.leftDrawerOpen = false;
    },
    openDrawer() {
      this.leftDrawerOpen = true;
    },
    blockDrawer() {
      this.blocked = true;
    },
    unblockDrawer() {
      this.blocked = false;
    },
    toggle() {
      if (!this.blocked) this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
<style>
.bg-brand {
  background-color: #00173a !important;
}
.width {
  width: 0;
  display: flex;
  text-align: center;
  justify-content: center;
}


</style>
<style scoped>
.q-item {
  display: flex;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0;

}

</style>
