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
import { list } from "src/services/Orders";
import { orderStatus } from "src/utils/translate";
import { formatCustomer } from "src/utils/formatters";
export default {
  components: { Table },
  props: ["user"],
  data: () => ({
    filter: "",
    columns: [
      {
        name: "date",
        required: true,
        label: "Data",
        align: "left",
        field: (row) => row.createdAt,
        format: (val) => `${new Date(val).toLocaleDateString("pt-BR")}`,
        sortable: true,
      },
      {
        name: "orderid",
        required: true,
        label: "Id do Pedido",
        align: "left",
        field: (row) => row.order_id,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "codigoBarras",
        required: true,
        label: "Código de Barras",
        align: "left",
        field: (row) => row.codigoBarras,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "catalog",
        required: true,
        label: "Catálogo",
        align: "left",
        field: (row) => row.paper.name,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "value",
        required: true,
        label: "Valor Total",
        align: "center",
        field: (row) => row.value,
        format: (val) => `${val ? val : ""}`,
      },
      // { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    // actions: [
    //   {
    //     id: 1,
    //     icon: "visibility",
    //     name: "view",
    //     color: "primary",
    //   },
    // ],
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
    list("", {
      useBody: true,
    })
      .then((res) => {
        this.data = res;
      })
      .catch(console.error);
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("unblockDrawerRequest");
      this.$emit("recoverStateRequest");
    });
  },
};
</script>

<style scoped>
</style>
