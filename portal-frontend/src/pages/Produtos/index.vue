<template>
  <div>
    <Table
      :title="'Pedidos'"
      :columns="columns"
      :data="data"
      :empty="'Nenhum pedido encontrado.'"
      :actions="actions"
      @action="actionHandler"
    />
  </div>
</template>

<script>
import Table from "src/components/Table.vue";
export default {
  components: { Table },
  data: () => ({
    filter: "",
    columns: [
      {
        name: "item",
        required: true,
        label: "Item",
        align: "left",
        field: (row) => row.status,
        format: (val) => `${val ? orderStatus(val) : ""}`,
        sortable: true,
      },
      {
        name: "price",
        required: true,
        label: "Cliente",
        align: "left",
        field: (row) => row.customer,
        format: (val) => `${val ? formatCustomer(val) : ""}`,
        sortable: true,
      },
      {
        name: "stock",
        required: true,
        label: "Estoque",
        align: "left",
        field: (row) => row.representante?.name,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "status",
        required: true,
        label: "Statis de vendas",
        align: "left",
        field: (row) => row.catalog.name,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    actions: [
      {
        id: 1,
        icon: "visibility",
        name: "view",
        color: "primary",
      },
    ],
    data: [],
  }),
  methods: {
    actionHandler(name, obj) {
      this[name](obj);
    },
    view({ _id }) {
      this.$router.push(`/order/${_id}`);
    },
  },
  created() {
    this.data = [
      { name: 'Batom Duo Jequiti' }
    ]

  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("unblockDrawerRequest");
      this.$emit("recoverStateRequest");
    });
  },
};
</script>

<style>
</style>
