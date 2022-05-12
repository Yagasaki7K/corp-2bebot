<template>
  <div>
    <div class="row justify-end">
      <div class="q-pa-md">
        <q-btn
          @click.native="
            () => {
              $emit('saveStateRequest');
              $emit('closeDrawerRequest');
              $emit('blockDrawerRequest');
              $modal.show('publish-catalog');
            }
          "
          color="secondary"
          class="q-mr-sm"
          label="Publicar Catálogo"
        />
        <q-btn
          @click.native="
            () => {
              $emit('saveStateRequest');
              $emit('closeDrawerRequest');
              $emit('blockDrawerRequest');
              $modal.show('my-first-modal');
            }
          "
          color="primary"
          class=""
          label="Novo Catálogo"
        />
      </div>
    </div>
    <modal
      :clickToClose="false"
      :adaptive="true"
      height="auto"
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
      name="my-first-modal"
    >
      <div v-if="uploading" class="q-gutter-md q-pa-lg">
        <div class="column items-center justify-center">
          <h5 class="q-ma-none q-mb-md">Fazendo upload do catálogo</h5>
          <q-spinner color="primary" size="5em" :thickness="2" />
        </div>
      </div>
      <div v-else class="q-gutter-md q-pa-lg">
        <h5>Preencha todos campos para adicionar um catálogo</h5>
        <div class="row q-col-gutter-sm">
          <q-input
            class="col-md-6"
            outlined
            autofocus
            @input="errorAddCatalogName = false"
            :error="errorAddCatalogName"
            error-message="Nome é obrigatório"
            label="Nome"
            v-model="catalog.name"
          />
          <q-select
            class="col-md-6"
            outlined
            use-input
            input-debounce="0"
            label="Escolha a empresa"
            behavior="menu"
            disable
            value=""
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="row q-col-gutter-sm q-mt-xs">
          <q-input
            class="col-md-12"
            outlined
            @input="
              () => {
                errorAddCatalogSlug = false;
              }
            "
            @keyup="slugFormatter"
            @keydown="slugFormatter"
            @keypress="slugFormatter"
            :error="errorAddCatalogSlug"
            error-message="Url é obrigatório"
            label="Url"
            v-model="catalog.slug"
          />
        </div>

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
            @click.native="$modal.hide('my-first-modal')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            label="Novo Catálogo"
            @click.native="handleSave"
          />
        </div>
      </div>
    </modal>
    <modal
      :adaptive="true"
      height="auto"
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
      name="publish-catalog"
    >
      <div class="q-gutter-md q-pa-lg">
        <h5>Escolha o catálogo a ser publicado</h5>
        <div class="q-gutter-md row">
          <q-select
            outlined
            v-model="publishSelected"
            use-input
            input-debounce="0"
            label="Escolha o catálogo"
            :options="catalogsOps"
            @filter="filterFn"
            style="width: 100%"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="q-mt-lg row justify-end">
          <q-btn
            color="negative"
            class="q-mb-sm q-mr-sm"
            label="Cancelar"
            @click.native="$modal.hide('publish-catalog')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            label="Publicar"
            :disable="btnPublish"
            @click.native="handlePublish"
          />
        </div>
      </div>
    </modal>
    <list-catalogs :refreshCatalog="refresh"></list-catalogs>
    <!-- <Table
      :title="'Catálogos'"
      :columns="columns"
      :data="data"
      :empty="'Nenhum catálogo encontrado.'"
      :actions="actions"
      @action="actionHandler"
    /> -->
  </div>
</template>

<script>
import ListCatalogs from "./listCatalogs.vue";
import { status } from "src/utils/translate";
// import Table from "src/components/Table.vue";
import { create, list, update } from "src/services/Catalogs";
export default {
  components: { ListCatalogs },
  data: () => ({
    refresh: true,
    filter: "",
    catalog: {},
    uploading: false,
    publishSelected: "",
    columns: [
      {
        name: "nome",
        required: true,
        label: "Nome",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "status",
        required: true,
        label: "Status",
        align: "center",
        field: (row) => row.status,
        format: (val) => `${val ? status(val) : ""}`,
        sortable: true,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    data: [],
    catalogs: [],
    catalogsOps: [],
    errorAddCatalogName: false,
    errorAddCatalogSlug: false,
    errorAddCatalogFile: false,
    btnPublish: false,
    file: null,
    actions: [
      {
        id: 1,
        icon: "edit",
        name: "edit",
        color: "primary",
      },
      { id: 2, icon: "visibility", name: "view", color: "primary" },
    ],
  }),
  mounted() {
    this.init();
  },
  methods: {
    slugFormatter() {
      if (this.catalog && this.catalog.slug)
        this.catalog.slug = this.catalog.slug.replace(/[^a-zA-Z0-9\-\_]+/g, "");
    },
    init() {
      list().then((res) => {
        this.data = res;
        this.catalogs = res.map((item) => item.name);
        this.catalogsOps = res.map((item) => item.name);
        this.publishSelected = res.find((item) => item.status == "ACTIVE").name;
        this.publishNative = res.find((item) => item.status == "ACTIVE").name;
      });
    },
    handleSave() {
      if (this.catalog.name && this.file && this.catalog.slug) {
        const data = JSON.stringify(this.catalog);
        const formData = new FormData();
        formData.append("data", data);
        formData.append("catalog", this.file);
        this.uploading = true;
        create(formData)
          .then((catalog) => {
            this.errorAddCatalogFile = false;
            this.errorAddCatalogName = false;
            this.$modal.hide("my-first-modal");
            this.$router.push(`/catalogos/${catalog._id}/edit`);
          })
          .catch((err) => {
            this.errorAddCatalogFile = false;
            this.errorAddCatalogName = false;
            this.uploading = false;
            const message =
              err?.data?.error || "Ocorreu um erro ao processar a solicitação";
            this.$q.notify({
              message,
              color: "negative",
              position: "top-right",
              progress: true,
            });
          });
      } else {
        if (!this.catalog.name) this.errorAddCatalogName = true;
        if (!this.catalog.slug) this.errorAddCatalogSlug = true;
        if (!this.file) this.errorAddCatalogFile = true;
      }
    },
    actionHandler(name, obj) {
      this[name](obj);
    },
    remove(obj) {
      this.data.splice(this.data.indexOf(obj), 1);
    },
    edit(obj) {
      this.$router.push(`/catalogos/${obj._id}/edit`);
    },
    view(obj) {
      this.$router.push(`/catalogo/${obj._id}/`);
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.catalogsOps = this.catalogs;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.catalogsOps = this.catalogs.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async handlePublish() {
      if (this.publishNative != this.publishSelected) {
        this.btnPublish = true;
        const idSelected = this.data.find(
          (item) => item.name == this.publishSelected
        )?._id;
        const idDismiss = this.data.find(
          (item) => item.name == this.publishNative
        )?._id;
        try {
          if (idSelected) await update({ _id: idSelected, status: "ACTIVE" });
          if (idDismiss) await update({ _id: idDismiss, status: "WAIT" });
          this.init();
          this.refresh = !this.refresh;
          this.$modal.hide("publish-catalog");
        } catch (error) {
          console.error(error);
        } finally {
          this.btnPublish = false;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
