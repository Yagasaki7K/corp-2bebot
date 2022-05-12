<template>
  <div class="q-pa-md" style="border-top: 1px solid #d3d0d0">
    <div style="display: flex; align-items: center">
      <img
        v-if="catalog"
        style="max-width: 220px"
        :src="catalog.path[0]"
        alt=""
      />
      <div style="display: flex; flex-direction: column; margin-left: 20px">
        <span class="sub-title">
          <q-btn
            color="primary"
            size="sm"
            icon="link"
            @click.prevent="redirectCatalog()"
          >
            Acessar catálogo
          </q-btn>
          <q-badge
            v-if="catalog.isBlock"
            disabled
            style="margin-left: 10px; height: 20px; font-weight: bold"
            color="green"
            align="middle"
            >Senha: {{ catalog.password ? catalog.password : "" }}</q-badge
          >
        </span>
        <!-- <span>Venha conhecer nosso catálogo digital hoje e surpreende-se com nossos produtos!</span> -->
        <span style="display: flex; grid-gap: 30px; margin-top: 30px">
          <!-- <span disabled style="display: flex; flex-direction: column">
            <span class="title">Criado Por</span>
            <span class="sub-title">Gabriel Mussolini</span>
          </span> -->
          <span style="display: flex; flex-direction: column">
            <span class="title">Data de criação</span>
            <span class="sub-title">{{
              new Date(catalog.createdAt).toLocaleDateString("pt-BR")
            }}</span>
          </span>
          <span style="display: flex; flex-direction: column">
            <span class="title">Última atualização</span>
            <span class="sub-title">{{
              new Date(catalog.updatedAt).toLocaleDateString("pt-BR")
            }}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import urls from "src/services/base_urls";
export default {
  props: ["catalog"],
  data: () => ({
    catalogUrl: "",
  }),
  mounted() {
    this.catalogUrl = urls.catalog;
  },
  methods: {
    redirectCatalog() {
      if (this.catalog.slug)
        return window.open(`${this.catalogUrl}/${this.catalog.slug}`, "_blank");
      return this.$q.notify({
        message: "Esse catálogo ainda não possui URL.",
        color: "negative",
        position: "top-right",
        progress: true,
      });
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  color: rgb(41, 41, 41);
}
.sub-title {
  font-weight: 500;
  color: rgb(83, 82, 82);
}
.link {
  font-weight: bold;
  color: rgb(83, 82, 82);
  text-decoration: none;
}
</style>

