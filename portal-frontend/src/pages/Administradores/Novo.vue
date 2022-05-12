<template>
  <div class="q-pa-xl">

    <h4 class="q-ma-none q-mb-lg">Novo Usuário</h4>
    <div>
      <div class="row justify-evenly q-mb-lg">
        <div class="col col-xs-12 col-md-5">
          <h6 class="q-ma-none q-mb-md">Dados cadastrais</h6>
          <div class="q-mb-lg">
            <label>Nome:</label>
            <q-input v-model="admin.name" dense />
          </div>
          <div class="q-mb-lg">
            <label>Email:</label>
            <q-input v-model="admin.email" dense />
          </div>
          <div class="q-mb-lg">
            <label>Senha:</label>
            <q-input v-model="admin.password" dense />
          </div>
        </div>
      </div>
      <div class="row justify-end">
        <q-btn
          @click.native="$router.back()"
          color="negative"
          class="q-mr-md"
          label="Cancelar"
        />
        <q-btn @click.native="save" color="positive" class="" label="Salvar" />
      </div>
    </div>
  </div>
</template>

<script>
import { create } from "src/services/Auth";
export default {
  data: () => ({
    admin: {
      address: {},
      type: "PF",
      password: "123456",
      group: "ADMIN",
    },
  }),
  mounted() {
    this.$nextTick(() => {
      this.$emit("closeDrawerRequest");
    });
  },
  methods: {
    save() {
      create(this.admin)
        .then(() => {
          this.$router.back();
        })
        .catch(console.error);
    },
  },
};
</script>

<style>
</style>
