<template>
  <div class="my-card">
    <div class="text-h6">Nome e URL</div>
    <div class="text-subtitle2">
      Edite a URL de redirecionamento do catálogo, assim como seu nome e
      descrição.
    </div>
    <q-separator />

    <div class="q-gutter-x-xs row q-mt-md">
      <q-input
        class="col-6 column items-center"
        outlined
        label="Nome do catálogo"
        v-model="name"
      />
    </div>
    <div class="q-gutter-x-xs row q-mt-md">
      <q-input
        class="col-6"
        outlined
        label="Url do catálogo"
        v-model="url"
        @keyup="url = (url || '').replace(/[^a-zA-Z0-9\-\_]+/g, '')"
        @keydown="url = (url || '').replace(/[^a-zA-Z0-9\-\_]+/g, '')"
        @keypress="url = (url || '').replace(/[^a-zA-Z0-9\-\_]+/g, '')"
      />
    </div>
    <div class="q-gutter-x-xs row q-mt-md">
      <q-input
        class="col-6"
        outlined
        label="Descrição do catálogo"
        v-model="description"
      />
    </div>
    <div class="q-gutter-x-xs row q-mt-md">
      <q-btn
        class="col-6"
        @click.native="handleSave"
        color="primary"
        stack
        icon="save"
        label="Alterar"
      />
    </div>
  </div>
</template>

<script>
import { update } from "src/services/Catalogs.js";

export default {
  props: ["catalog"],
  data: (instance) => ({
    name: instance.catalog.name,
    description: instance.catalog.description,
    url: instance.catalog.slug,
  }),
  methods: {
    handleSave() {
      if (this.url && this.description && this.name) {
        const { _id } = this.catalog;
        const name = this.name;
        const description = this.description;
        const slug = this.url;
        update({ _id, name, description, slug })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: "Catálogo atualizado com sucesso.",
            });
            this.$emit("refreshCatalog");
          })
          .catch((err) => {
            this.$q.notify({
              type: "negative",
              message: "Erro ao atualizar o catálogo.",
            });
          });
      } else {
      }
    },
  },
};
</script>

<style>
.m0p0 {
  margin: 0;
  padding: 0;
}
</style>
