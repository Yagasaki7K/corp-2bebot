<template>
  <modal
    :adaptive="true"
    height="auto"
    @before-close="$emit('before-close')"
    :name="name"
  >
    <div class="q-gutter-md q-pa-lg">
      <h5>Preencha todos campos para adicionar um produto</h5>
      <div class="column">
        <label>Nome do produto:</label>
        <q-input outlined v-model="product.name" dense />
      </div>
      <div class="column">
        <label>Descrição:</label>
        <q-input outlined type="textarea" v-model="product.description" dense />
      </div>
      <div class="column">
        <label>SKU:</label>
        <q-input outlined v-model="product.sku" dense />
      </div>
      <div class="column">
        <label>Preço:</label>
        <q-input outlined v-model="product.price" dense />
      </div>

      <!-- <div class="column">
        <label>Estoque</label>
        <q-input v-model="product.stock" dense />
      </div> -->
      <div class="row justify-end">
        <q-btn
          color="negative"
          class="q-mb-sm q-mr-sm"
          label="Cancelar"
          @click.native="$modal.hide(name)"
        />
        <q-btn
          color="positive"
          class="q-mb-sm"
          label="Novo Produto"
          @click.native="handleSave"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import { create } from "../services/Products";
export default {
  props: ["name"],
  data: () => ({
    product: {},
  }),
  methods: {
    handleSave() {
      if (!this.product._id)
        create({ ...this.product, catalog: this.$route.params.id })
          .then(this.saved)
          .catch(console.error);
    },
    saved() {
      this.$emit("saved");
    },
  },
};
</script>

<style>
</style>
