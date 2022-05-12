<template>
  <div>
    <VincularModal
      v-if="showModal"
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
      @refresh="refresh"
      :gerente="gerente"
      :name="'vincular'"
    />
    <div class="row justify-between q-pa-md items-center">
      <h5 class="q-ma-none">{{ gerente.name }}</h5>
      <q-btn
        @click.native="
          () => {
            $emit('saveStateRequest');
            $emit('closeDrawerRequest');
            $emit('blockDrawerRequest');
            $modal.show('vincular');
          }
        "
        color="primary"
        class=""
        label="Vincular Novo Representante"
      />
    </div>
    <Table
      :title="`Representantes de ${gerente.name}`"
      :columns="columns"
      :data="gerente.representantes || []"
      :empty="'Nenhum representante encontrado.'"
      :actions="actions"
      @action="actionHandler"
    />
  </div>
</template>

<script>
import Table from "src/components/Table.vue";
import { read } from "src/services/Auth";
import VincularModal from "./VincularModal.vue";
export default {
  components: { Table, VincularModal },
  data: () => ({
    showModal: false,
    filter: "",
    gerente: {},
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
        name: "cpf",
        required: true,
        label: "CPF",
        align: "center",
        field: (row) => row.cpf,
        format: (val) => `${val ? val : ""}`,
      },
      {
        name: "contact",
        required: true,
        label: "Contato",
        align: "center",
        field: (row) => row.contact,
        format: (val) => `${val ? val : ""}`,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    actions: [
      {
        id: 1,
        icon: "delete_outline",
        name: "representantes",
        color: "negative",
      },
    ],
  }),
  methods: {
    actionHandler(name, obj) {
      this[name](obj);
    },
    refresh() {
      this.$modal.hide("vincular");
      this.showModal = false;
      this.$nextTick(this.init);
    },
    init() {
      this.showModal = true;
      read(this.$route.params.id)
        .then((res) => {
          this.gerente = res;
        })
        .catch(console.error);
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped>
</style>
