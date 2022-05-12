<template>
  <modal
    :adaptive="true"
    height="auto"
    @before-close="$emit('before-close')"
    :name="name"
  >
    <div class="q-gutter-md q-pa-lg">
      <div class="column">
        <h6 class="q-ma-none q-mb-lg">Buscar representante</h6>
        <label>Nome:</label>
        <q-select
          v-model="representante"
          use-input
          hide-selected
          fill-input
          :options="options"
          :option-value="optionsValue"
          :option-label="optionsLabel"
          @filter="optionsFilter"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Nenhum representante encontrado!
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="q-mt-lg row justify-end">
        <q-btn
          color="negative"
          class="q-mb-sm q-mr-sm"
          label="Cancelar"
          @click.native="$modal.hide(name)"
        />
        <q-btn
          color="positive"
          class="q-mb-sm"
          label="Adicionar"
          @click.native="add"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import { list, addRepresentante } from "src/services/Auth";
export default {
  props: ["name", "gerente"],
  data: () => ({
    representante: null,
    allOptions: [],
    options: [],
  }),
  methods: {
    add() {
      addRepresentante({
        representante: this.representante,
        gerente: this.gerente,
      })
        .then(() => {
          this.$emit("refresh");
        })
        .catch(console.error);
    },
    optionsValue(option) {
      return option;
    },
    optionsLabel(option) {
      return `${option.name}`;
    },
    optionsFilter(input, update, abort) {
      if (input.length < 2) {
        abort();
        return;
      }
      update(() => {
        this.options = this.allOptions.filter((representante) =>
          representante.name.toLowerCase().includes(input.toLowerCase())
        );
      });
    },
  },
  created() {
    list("?group=REPRESENTANTE&gerente=null")
      .then((res) => {
        this.allOptions = res;
      })
      .catch(console.error);
  },
};
</script>

<style>
</style>