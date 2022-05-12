<template>
  <modal :adaptive="true" height="auto" name="automap">
    <div v-if="waiting" class="q-gutter-md q-pa-lg text-center">
      <div class="text-h5">Aguarde</div>
      <q-spinner color="primary" size="5em" :thickness="2" />
    </div>
    <div v-else class="q-gutter-md q-pa-lg">
      <div class="text-h5 q-mb-sm">Atenção!</div>
      <div class="q-mt-sm">
        Essa função irá tentar mapear automaticamente os produtos listados na
        tabela. Caso já tenha sido feito algum mapeamento, as alterações serão
        perdidas. Essa ação não pode ser desfeita.
      </div>
      <div class="q-mt-sm">Deseja continuar?</div>
      <div class="q-mt-lg row justify-end">
        <q-btn
          color="negative"
          class="q-mb-sm q-mr-sm"
          label="Cancelar"
          @click.native="$modal.hide('automap')"
        />
        <q-btn
          color="positive"
          class="q-mb-sm"
          label="Confirmar"
          @click.native="automap"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import { automap } from "src/services/Catalogs";
export default {
  props: ["catalog"],
  data: () => ({ waiting: false }),
  methods: {
    automap() {
      this.waiting = true;
      automap(this.catalog._id)
        .then(() => {
          this.$q.notify({
            message: `Operação realizada com sucesso!`,
            color: "positive",
            textColor: "white",
            multiline: true,
            position: "top-right",
          });
          this.$modal.hide("automap");
        })
        .catch((err) => {
          this.$q.notify({
            message: `Ocorreu um erro ao processar a solicitação.`,
            color: "negative",
            textColor: "white",
            multiline: true,
            position: "top-right",
          });
        })
        .finally(() => {
          this.waiting = false;
        });
    },
  },
};
</script>

<style>
</style>
