<template>
  <div class="my-card">
    <modal
      :clickToClose="false"
      :adaptive="true"
      height="auto"
      name="alter-pdf-modal"
    >
      <div v-if="uploading" class="q-gutter-md q-pa-lg">
        <div class="column items-center justify-center">
          <h5 class="q-ma-none q-mb-md">Fazendo upload do PDF</h5>
          <q-spinner color="primary" size="5em" :thickness="2" />
        </div>
      </div>
      <div v-else class="q-gutter-md q-pa-lg">
        <h5 class="q-ma-none q-ml-md q-mt-md">Alterar PDF</h5>
        <div class="row q-col-gutter-sm q-mt-xs">
          <q-file
            outlined
            class="col-md-12"
            @input="errorAddCatalogFile = false"
            :error="errorAddCatalogFile"
            error-message="Arquivo é obrigatório"
            v-model="file"
            label="Selecione um arquivo PDF"
            accept="application/pdf"
          />
        </div>

        <div class="q-mt-lg row justify-end">
          <q-btn
            color="negative"
            class="q-mb-sm q-mr-sm"
            label="Cancelar"
            @click.native="$modal.hide('alter-pdf-modal')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            label="Alterar"
            @click.native="alterPdf"
          />
        </div>
      </div>
    </modal>
    <div class="text-h6">Download do PDF</div>
    <div class="text-subtitle2 row justify-between">
      <span
        >Altere qual o catálogo em formato pdf que será baixado quando o usuário
        clicar em "Baixar Catálogo"</span
      >
    </div>
    <q-separator class="q-mb-md" />

    <q-btn
      icon="download"
      color="primary"
      class="q-mb-md q-mr-md"
      @click.prevent="download"
      >Fazer download do atual</q-btn
    >
    <q-btn
      icon="upload"
      color="primary"
      class="q-mb-md"
      @click.prevent="() => $modal.show('alter-pdf-modal')"
      >Alterar pdf</q-btn
    >
  </div>
</template>

<script>
import { alterPdf } from "src/services/Catalogs";

export default {
  props: {
    catalog: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    file: null,
    errorAddCatalogFile: false,
    uploading: false,
    pathPdf: "",
  }),
  mounted() {
    this.pathPdf = this.catalog.pathPdf;
  },
  methods: {
    download() {
      const link = document.createElement("a");
      link.href = this.pathPdf;
      link.download = this.catalog.name + Date.now() + ".pdf";
      link.click();
      link.remove();
    },
    alterPdf() {
      if (!this.file) return (this.errorAddCatalogFile = true);
      this.errorAddCatalogFile = false;
      const formData = new FormData();
      formData.append("catalog", this.file);
      this.uploading = true;
      alterPdf(this.catalog._id, formData)
        .then(({ pathPdf }) => {
          this.pathPdf = pathPdf;
        })
        .catch((error) => {
          console.error(error);
          this.$q.notify({
            message: `Ocorreu um erro ao processar a solicitação.`,
            color: "negative",
            textColor: "white",
            multiline: true,
            position: "top-right",
          });
        })
        .finally(() => {
          this.$nextTick(() => {
            this.$modal.hide("alter-pdf-modal");
            this.file = null;
            this.uploading = false;
          });
        });
    },
  },
};
</script>

<style scoped>
</style>