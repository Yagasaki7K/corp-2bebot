<template>
  <div>
    <import-modal @imported="$emit('imported')" :exists="data" />
    <automap-modal :catalog="catalog" />
    <div class="row justify-end q-mt-md q-pa-md">
      <q-btn
        @click.native="$modal.show('automap')"
        color="primary"
        class="q-mr-sm"
        label="Mapear Automaticamente"
      />
      <q-btn
        @click.native="$emit('exportXlsx')"
        color="primary"
        class="q-mr-sm"
        label="Exportar"
      />
      <q-btn
        @click.native="$modal.show('importmodal')"
        color="primary"
        class="q-mr-sm"
        label="Importar"
      />
      <q-btn
        @click.native="$emit('openModal')"
        color="primary"
        class=""
        label="Novo Produto"
      />
    </div>
    <Table
      :title="'Produtos'"
      :columns="columns"
      :data="data || []"
      :empty="'Nenhum produto encontrado.'"
      :actions="actions"
      @action="actionHandler"
    />
  </div>
</template>

<script>
import ImportModal from "src/components/ImportModal";
import AutomapModal from "src/components/AutomapModal";
import Table from "src/components/Table";
import { remove } from "src/services/Products";
export default {
  props: ["data", "catalog"],
  components: {
    Table,
    ImportModal,
    AutomapModal,
  },
  data: () => ({
    actions: [
      { id: 1, color: "negative", name: "remove", icon: "delete_outline" },
    ],
    columns: [
      {
        name: "sku",
        required: true,
        label: "SKU",
        align: "left",
        field: (row) => row.sku,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        required: true,
        label: "Nome",
        align: "center",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "price",
        required: true,
        label: "Preço",
        align: "center",
        field: (row) => row.price,
        format: (val) => `R$${val}`,
        sortable: true,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
  }),
  methods: {
    actionHandler(name, obj) {
      this[name](obj);
    },
    remove(obj) {
      remove(obj).then(this.$emit("refreshData")).catch(console.error);
    },
  },
};
</script>

<style>
</style>
