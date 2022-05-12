<template>
  <modal
    :centered="true"
    :scrollable="true"
    :adaptive="true"
    height="auto"
    width="70%"
    @before-close="$emit('before-close')"
    :name="name"
  >
    <div class="q-pa-lg">
      <div v-if="success">
        <h4 class="text-center">Pedido criado com sucesso</h4>
      </div>
      <div v-else>
        <div class="row justify-between q-pa-md items-center">
          <h4 class="q-ma-none">Carrinho</h4>
          <h5 class="q-ma-none">Valor total: {{ total }}</h5>
        </div>
        <Table
          :title="'Produtos'"
          :columns="columns"
          :data="items"
          :empty="'Nenhum produto encontrado.'"
          :actions="actions"
          @action="actionHandler"
        />
        <div class="row justify-end">
          <div class="q-pr-md q-pb-md">
            <q-btn
              color="negative"
              class="q-mr-md"
              label="Cancelar"
              @click="$modal.hide(name)"
            />
            <q-btn
              @click.native="saved"
              color="primary"
              class=""
              label="Criar pedido"
            />
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Table from "src/components/Table";
import { create } from "src/services/Orders";

export default {
  props: ["name", "items", "user"],
  components: {
    Table,
  },
  computed: {
    total() {
      return this.items.reduce(
        (sum, val) => sum + val.product.price * val.quantity,
        0
      );
    },
  },
  data: () => ({
    columns: [
      {
        name: "produto",
        required: true,
        label: "Produto",
        align: "left",
        field: (row) => row.product.name,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "quantity",
        required: true,
        label: "Quantidade",
        align: "center",
        field: (row) => row.quantity,
        format: (val) => `${val ? val : ""}`.padStart(2, "0"),
      },
      {
        name: "unit",
        required: true,
        label: "Valor Unitário",
        align: "center",
        field: (row) => row.product.price,
        format: (val) => `${val ? val : ""}`,
      },
      {
        name: "subtotal",
        required: true,
        label: "Subtotal",
        align: "center",
        field: (row) => row.product.price * row.quantity,
        format: (val) => `${val ? val : ""}`,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    actions: [],
    success: false,
  }),
  methods: {
    saved() {
      let mapped = this.items.map((item) => {
        delete item.product._id;
        return item;
      });
      create({
        catalog: mapped[0].product.catalog,
        items: mapped,
        representante: this.$route.params.representante,
        customer: this.user._id,
      })
        .then(() => {
          this.success = true;
          this.$emit("resetCart");
          setTimeout(() => {
            this.success = false;
            this.$modal.hide(this.name);
          }, 2000);
        })
        .catch(console.error);
    },
    actionHandler(name, obj) {
      this[name](obj);
    },
  },
};
</script>

<style>
</style>