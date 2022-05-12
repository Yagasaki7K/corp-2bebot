<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      :title="title"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :no-data-label="empty"
      no-results-label="A pesquisa não retornou nenhum resultado."
      :selection="selection"
      @update:selected="update"
      :selected.sync="selected"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Filtro"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center">
            <div v-for="action in actions" :key="action.id">
              <q-btn
                v-if="processAction(action, props.row)"
                :color="action.color"
                no-caps
                size="sm"
                class="q-mr-xs"
                @click="$emit('action', action.name, props.row)"
                ><q-icon :name="action.icon"
              /></q-btn>
              <q-btn
                v-else
                :color="altActions[action.id].color"
                no-caps
                size="sm"
                class="q-mr-xs"
                @click="$emit('action', altActions[action.id].name, props.row)"
                ><q-icon :name="altActions[action.id].icon"
              /></q-btn>
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    selection: {
      type: String,
      default: "none",
    },
    initialSelection: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    empty: {
      type: String,
      default: "Não possui dados.",
    },
    actions: {
      type: Array,
      default: () => [],
    },
    altActions: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    filter: "",
    selected: [],
  }),
  mounted() {
    this.selected = this.initialSelection;
  },
  methods: {
    update(a) {
      this.$emit("update", a);
    },
    processAction(action, obj) {
      if (action.hide) return !obj[action.hide];
      return true;
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
  },
};
</script>

<style>
</style>
