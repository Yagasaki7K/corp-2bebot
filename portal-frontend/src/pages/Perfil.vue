<template>
  <div class="q-pa-xl">
    <h4 class="q-ma-none q-mb-lg">Editar perfil</h4>
    <div>
      <div class="row justify-evenly q-mb-lg">
        <div class="col col-xs-12 col-md-5">
          <h6 class="q-ma-none q-mb-md">Dados cadastrais</h6>
          <div class="q-mb-lg">
            <label>Nome completo:</label>
            <q-input v-model="perfil.name" dense />
          </div>
          <div class="q-mb-lg">
            <label>Email:</label>
            <q-input v-model="perfil.email" dense />
          </div>
          <div class="q-mb-lg">
            <label>CPF:</label>
            <q-input v-model="perfil.cpf" dense />
          </div>
          <div class="q-mb-lg">
            <label>Telefone celular:</label>
            <q-input v-model="perfil.phone" dense />
          </div>
        </div>
        <div class="col col-xs-12 col-md-5">
          <h6 class="q-ma-none q-mb-md">Endereço</h6>
          <div class="q-mb-lg">
            <label>Endereço Completo:</label>
            <q-input v-model="perfil.address.complete" dense />
          </div>
          <div class="row q-mb-lg justify-between">
            <div class="col col-xs-12 col-sm-3 col-md-3 q-mb-lg">
              <label>CEP:</label>
              <q-input v-model="perfil.address.cep" dense />
            </div>
            <div class="col col-xs-12 col-sm-8 col-md-8">
              <label>Complemento:</label>
              <q-input v-model="perfil.address.complement" dense />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-end">
        <q-btn
          @click.native="
            () => {
              $emit('recoverStateRequest');
              $router.back();
            }
          "
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
import { read, update } from "src/services/Auth";
export default {
  props: ["user"],
  data: () => ({
    perfil: {
      address: {},
    },
  }),
  mounted() {
    this.perfil = { ...this.user };
    if (!this.perfil.address) this.perfil.address = {};
    this.$nextTick(() => {
      this.$emit("closeDrawerRequest");
    });
  },
  methods: {
    save() {
      update(this.perfil)
        .then(() => {
          this.$emit("refreshInfos");
          this.$emit("recoverStateRequest");
          this.$router.back();
        })
        .catch(console.error);
    },
  },
};
</script>

<style>
</style>