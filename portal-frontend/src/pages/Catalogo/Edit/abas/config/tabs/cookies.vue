<template>
  <div class="my-card">
    <div class="text-h6">Cookies</div>
    <div class="text-subtitle2">
      Edite a política de cookies do catálogo.
    </div>
    <q-separator />

    <div class="q-gutter-x-xs row q-mt-md">
      <q-input
        class="col-6 column items-center"
        outlined
        label="Política de cookies"
        type="textarea"
        v-model="cookie"
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
    cookie: instance.catalog.cookie,
  }),
  methods: {
    handleSave() {
      if (this.cookie) {
        const { _id } = this.catalog;
        const cookie = this.cookie;
        update({ _id, cookie }).then(() => {
          this.$q.notify({
            type: "positive",
            message: "Catálogo atualizado com sucesso.",
          });
          this.$emit('refreshCatalog')
        })
        .catch(err => {
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
