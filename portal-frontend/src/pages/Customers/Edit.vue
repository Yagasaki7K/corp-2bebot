<template>
  <div class="q-pa-xl">
    <h4 class="q-ma-none q-mb-lg">Editar cliente</h4>
    <div>
      <div class="row justify-evenly q-mb-lg">
        <div class="col col-xs-12 col-md-5">
          <h6 class="q-ma-none q-mb-md">Dados cadastrais</h6>
          <div class="q-mb-lg">
            <label class="row">Tipo Pessoa:</label>
            <q-btn-toggle
              class="q-mt-sm"
              v-model="cliente.type"
              toggle-color="primary"
              :options="[
                { label: 'Física', value: 'PF' },
                { label: 'Jurídica', value: 'PJ' },
              ]"
            />
          </div>
          <div class="q-mb-lg">
            <label>Nome completo:</label>
            <q-input v-model="cliente.name" dense />
          </div>
          <div class="q-mb-lg">
            <label>Email:</label>
            <q-input v-model="cliente.email" dense />
          </div>
          <div class="q-mb-lg">
            <label>{{ cliente.type == "PJ" ? "CNPJ" : "CPF" }}:</label>
            <q-input v-model="cliente.documento" dense />
          </div>
          <div class="q-mb-lg">
            <label>Telefone celular:</label>
            <q-input v-model="cliente.phone" dense />
          </div>
        </div>
        <div class="col col-xs-12 col-md-5">
          <h6 class="q-ma-none q-mb-md">Endereço de cobrança</h6>
          <div class="q-mb-lg">
            <label>Endereço Completo:</label>
            <q-input v-model="cliente.addressCharge.complete" dense />
          </div>
          <div class="row q-mb-lg justify-between">
            <div class="col col-xs-12 col-sm-3 col-md-3 q-mb-lg">
              <label>CEP:</label>
              <q-input v-model="cliente.addressCharge.cep" dense />
            </div>
            <div class="col col-xs-12 col-sm-8 col-md-8">
              <label>Complemento:</label>
              <q-input v-model="cliente.addressCharge.complement" dense />
            </div>
          </div>
          <h6 class="q-ma-none q-mb-md">Endereço de entrega</h6>
          <div class="q-mb-lg">
            <label>Endereço Completo:</label>
            <q-input v-model="cliente.addressDelivery.complete" dense />
          </div>
          <div class="row q-mb-lg justify-between">
            <div class="col col-xs-12 col-sm-3 col-md-3 q-mb-lg">
              <label>CEP:</label>
              <q-input v-model="cliente.addressDelivery.cep" dense />
            </div>
            <div class="col col-xs-12 col-sm-8 col-md-8">
              <label>Complemento:</label>
              <q-input v-model="cliente.addressDelivery.complement" dense />
            </div>
          </div>
          <h6 class="q-ma-none q-mb-md">Endereço de correspondência</h6>
          <div class="q-mb-lg">
            <label>Endereço Completo:</label>
            <q-input v-model="cliente.addressMailing.complete" dense />
          </div>
          <div class="row q-mb-lg justify-between">
            <div class="col col-xs-12 col-sm-3 col-md-3 q-mb-lg">
              <label>CEP:</label>
              <q-input v-model="cliente.addressMailing.cep" dense />
            </div>
            <div class="col col-xs-12 col-sm-8 col-md-8">
              <label>Complemento:</label>
              <q-input v-model="cliente.addressMailing.complement" dense />
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
import { update, read } from "src/services/Auth";
export default {
  data: () => ({
    cliente: {
      addressCharge: {},
      addressDelivery: {},
      addressMailing: {},
      type: "PF",
      password: "123456",
      group: "CLIENTE",
    },
  }),
  created() {
    read(this.$route.params.id)
      .then((res) => {
        if (!res.addressCharge) res.addressCharge = {};
        if (!res.addressDelivery) res.addressDelivery = {};
        if (!res.addressMailing) res.addressMailing = {};
        this.cliente = res;
      })
      .catch(console.error);
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("closeDrawerRequest");
    });
  },
  methods: {
    save() {
      update(this.cliente)
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