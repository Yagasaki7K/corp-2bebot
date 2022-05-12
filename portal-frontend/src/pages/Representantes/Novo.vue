<template>
  <div class="q-pa-xl">
    <h4 class="q-ma-none q-mb-lg">Novo representante</h4>
    <div>
      <div class="row justify-evenly q-mb-lg">
        <div class="col col-xs-12 col-md-5">
          <h6 class="q-ma-none q-mb-md">Dados cadastrais</h6>
          <div class="q-mb-lg">
            <label class="row">Tipo Pessoa:</label>
            <q-btn-toggle
              class="q-mt-sm"
              v-model="representante.type"
              toggle-color="primary"
              :options="[
                { label: 'Física', value: 'PF' },
                { label: 'Jurídica', value: 'PJ' },
              ]"
            />
          </div>
          <div class="q-mb-lg">
            <label
              >{{
                representante.type == "PJ" ? "Razão Social" : "Nome completo"
              }}:</label
            >
            <q-input v-model="representante.name" dense />
          </div>
          <div class="q-mb-lg">
            <label>Email:</label>
            <q-input v-model="representante.email" dense />
          </div>
          <div class="q-mb-lg">
            <label>{{ representante.type == "PJ" ? "CNPJ" : "CPF" }}:</label>
            <q-input v-model="representante.documento" dense />
          </div>
          <div class="q-mb-lg">
            <label>Telefone celular:</label>
            <q-input v-model="representante.phone" dense />
          </div>
        </div>
        <div class="col col-xs-12 col-md-5">
          <h6 class="q-ma-none q-mb-md">Endereço</h6>
          <div class="q-mb-lg">
            <label>Endereço Completo:</label>
            <q-input v-model="representante.address.complete" dense />
          </div>
          <div class="row q-mb-lg justify-between">
            <div class="col col-xs-12 col-sm-3 col-md-3 q-mb-lg">
              <label>CEP:</label>
              <q-input v-model="representante.address.cep" dense />
            </div>
            <div class="col col-xs-12 col-sm-8 col-md-8">
              <label>Complemento:</label>
              <q-input v-model="representante.address.complement" dense />
            </div>
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
    representante: {
      address: {},
      type: "PF",
      password: "123456",
      group: "REPRESENTANTE",
    },
  }),
  mounted() {
    this.$nextTick(() => {
      this.$emit("closeDrawerRequest");
    });
  },
  methods: {
    save() {
      create(this.representante)
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