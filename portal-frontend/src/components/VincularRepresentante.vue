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
    <div class="q-pt-lg q-pr-lg q-pl-lg q-pb-none">
      <Table
        :title="'Vincular representantes e gerentes'"
        :columns="columns"
        :data="data"
        :empty="'Nenhum representante ou gerentes encontrado.'"
        :actions="actions"
        @action="actionHandler"
        @update="selectionHandle"
        :selection="'multiple'"
        :initialSelection="data"
      />
    </div>
    <div class="row justify-end q-pr-lg q-pb-lg">
      <div class="q-pr-md q-pb-md">
        <q-btn color="negative" class="q-mr-md" label="Cancelar" />
        <q-btn
          @click.native="saved"
          color="primary"
          class=""
          label="Atualizar"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import { list } from "src/services/Auth";
import { update } from "src/services/Catalogs";
import Table from "src/components/Table";

export default {
  props: ["name"],
  components: {
    Table,
  },
  data: () => ({
    product: {},
    selected: [],
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
        field: (row) => row.contact,
        format: (val) => `${val ? val : ""}`,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    data: [],
    actions: [],
  }),
  created() {
    list("", {
      useBody: true,
      $or: [{ group: "REPRESENTANTE" }, { group: "GERENTE" }],
    })
      .then((res) => {
        this.data = res;
        this.selected = this.data;
      })
      .catch(console.error);
  },
  methods: {
    saved() {
      update({
        _id: this.$route.params.id,
        representantes: this.selected,
      })
        .then(() => {
          this.$emit("saved");
        })
        .catch(console.error);
    },
    actionHandler(name, obj) {
      this[name](obj);
    },
    selectionHandle(objects) {
      this.selected = objects;
    },
  },
};
</script>

<style>
</style>