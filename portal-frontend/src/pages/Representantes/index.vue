<template>
  <div>
    <block-modal
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
      @blockRequest="blockRequest"
    />
    <div class="row justify-end">
      <div class="q-pa-md">
        <q-btn
          @click.native="
            () => {
              $emit('saveStateRequest');
              $router.push('/representantes/novo');
            }
          "
          color="primary"
          class=""
          label="Novo Representante"
        />
      </div>
    </div>
    <Table
      :title="'Representantes'"
      :columns="columns"
      :data="data"
      :empty="'Nenhum representante encontrado.'"
      :actions="actions"
      :altActions="altActions"
      @action="actionHandler"
    />
  </div>
</template>

<script>
import Table from "src/components/Table.vue";
import { list, update } from "src/services/Auth";
import BlockModal from "./BlockModal";
export default {
  components: { Table, BlockModal },
  data: () => ({
    representanteBlock: {},
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
        name: "lastsend",
        required: true,
        label: "Último envio",
        align: "center",
        field: (row) => row.lastSend,
        format: (val) => {
          if (!val) return "Não há registros";
          let tempo = Math.floor((Date.now() - Date.parse(val)) / (36e5 * 24));
          return `${tempo} dia${tempo == 1 ? "" : "s"}`;
        },
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
      // {
      //   name: "gerente",
      //   required: true,
      //   label: "Gerente",
      //   align: "center",
      //   field: (row) => row.gerente?.name,
      //   format: (val) => `${val ? val : ""}`,
      // },
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
      {
        id: 2,
        icon: "block",
        name: "block",
        color: "negative",
        hide: "block",
      },
    ],
    altActions: {
      2: {
        id: 2,
        icon: "play_arrow",
        name: "unblock",
        color: "positive",
      },
    },
  }),
  methods: {
    edit(representante) {
      this.$emit("saveStateRequest");
      this.$router.push(`/representantes/${representante._id}`);
    },
    unblock(representante) {
      update({ _id: representante._id, block: false })
        .then(this.init)
        .catch(console.error);
    },
    block(representante) {
      this.representanteBlock = representante;
      this.$emit("saveStateRequest");
      this.$emit("closeDrawerRequest");
      this.$emit("blockDrawerRequest");
      this.$modal.show("blockModal");
    },
    blockRequest() {
      update({ _id: this.representanteBlock._id, block: true })
        .then(this.init)
        .catch(console.error);
    },
    actionHandler(name, obj) {
      this[name](obj);
    },
    init() {
      this.$modal.hide("blockModal");
      list("?group=REPRESENTANTE")
        .then((res) => {
          this.data = res;
        })
        .catch(console.error);
    },
  },
  created() {
    this.init();
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