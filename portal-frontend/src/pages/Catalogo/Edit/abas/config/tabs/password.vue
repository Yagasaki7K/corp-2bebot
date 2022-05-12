<template>
  <div class="my-card">
    <div class="text-h6">Senha</div>
    <div class="text-subtitle2">
      Ao abrir o catálogo via slug/link caso a proteção por senha estiver habilitada será necessária digita-la.
    </div>
    <q-separator />

    <div class="q-gutter-sm">
      <q-checkbox v-model="isBlock" label="Habilitar a proteção por senha do catálogo." />
    </div>

    <div class="q-gutter-x-xs row q-mt-md">
      <q-input class="col-6" outlined v-model="password"  :type="isPwd ? 'password' : 'text'" label="Senha">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
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
    isPwd: true,
    password: instance.catalog.password,
    isBlock: instance.catalog.isBlock
  }),
  methods: {
    handleSave() {
      if (this.password != this.catalog.password || this.isBlock != this.catalog.isBlock) {
        const { _id } = this.catalog;
        const password = this.password;
        const isBlock = this.isBlock;
        update({ _id, password, isBlock })
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
  }
}
</script>

<style>

</style>
