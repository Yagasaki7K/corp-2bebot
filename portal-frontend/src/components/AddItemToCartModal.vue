<template>
  <modal
    :centered="true"
    :scrollable="true"
    :adaptive="true"
    height="auto"
    @before-close="$emit('before-close')"
    name="addItemToCartModal"
  >
    <q-card class="">
      <q-card-section class="q-pb-none">
        <div class="text-h6">{{ item.product.name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <div class="col col-9">
          {{ item.product.description }}
        </div>
        <div class="col col-3">
          <label class="text-bold">Quantidade:</label>
          <q-input dense v-model="item.quantity"> </q-input>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="justify-between q-pl-lg q-pr-lg q-pb-lg">
        <div class="text-h4">Valor: {{ total }}</div>
        <div>
          <q-btn
            color="negative"
            class="q-mr-md"
            @click="$modal.hide('addItemToCartModal')"
            label="Cancelar"
          />
          <q-btn
            @click.native="$emit('addToCart', item)"
            color="primary"
            class=""
            label="Adicionar ao carrinho"
          />
        </div>
      </q-card-actions>
    </q-card>
  </modal>
</template>

<script>
import { update } from "src/services/Orders";
export default {
  components: {},
  computed: {
    total() {
      return this.item?.quantity * this.item?.product?.price || 0;
    },
  },
  props: ["product"],
  data: () => ({
    item: { product: {}, quantity: 1 },
  }),
  mounted() {
    this.item.product = { ...this.product };
  },
  methods: {},
};
</script>

<style>
</style>