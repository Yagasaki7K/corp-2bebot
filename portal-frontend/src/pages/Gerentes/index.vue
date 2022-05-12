<template>
  <div>
    <div class="row justify-end">
      <div class="q-pa-md">
        <q-btn
          @click.native="
            () => {
              $emit('saveStateRequest');
              $router.push('/gerentes/novo');
            }
          "
          color="primary"
          class=""
          label="Novo Gerente"
        />
      </div>
    </div>
    <Table
      :title="'Gerentes'"
      :columns="columns"
      :data="data"
      :empty="'Nenhum gerente encontrado.'"
      :actions="actions"
      @action="actionHandler"
    />
  </div>
</template>

<script>
import Table from "src/components/Table.vue";
import { list } from "src/services/Auth";
export default {
  components: { Table },
  data: () => ({
    filter: "",
    representante: {},
    columns: [
      {
        name: "nome",
        required: true,
        label: "Nome",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "email",
        required: true,
        label: "Email",
        align: "center",
        field: (row) => row.email,
        format: (val) => `${val ? val : ""}`,
      },
      {
        name: "contact",
        required: true,
        label: "Contato",
        align: "center",
        field: (row) => row.phone,
        format: (val) => `${val ? val : ""}`,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    data: [],
    actions: [
      {
        id: 1,
        icon: "edit",
        name: "edit",
        color: "primary",
      },
    ],
  }),
  methods: {
    edit(gerente) {
      this.$emit("saveStateRequest");
      this.$router.push(`/gerentes/${gerente._id}`);
    },
    actionHandler(name, obj) {
      this[name](obj);
    },
  },
  created() {
    list("?group=GERENTE")
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