<template>
  <div class="my-card">
    <modal
      :clickToClose="false"
      :adaptive="true"
      height="auto"
      name="add-page-modal"
    >
      <div v-if="uploading" class="q-gutter-md q-pa-lg">
        <div class="column items-center justify-center">
          <h5 class="q-ma-none q-mb-md">Fazendo upload das novas páginas</h5>
          <q-spinner color="primary" size="5em" :thickness="2" />
        </div>
      </div>
      <div v-else class="q-gutter-md q-pa-lg">
        <h5 class="q-ma-none q-ml-md q-mt-md">Adicionar novas páginas</h5>
        <div class="q-ma-none q-ml-md">
          Atenção: O PDF deve conter apenas as novas páginas que serão
          inseridas!
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
            @click.native="$modal.hide('add-page-modal')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            label="Adicionar"
            @click.native="newPage"
          />
        </div>
      </div>
    </modal>
    <modal
      :clickToClose="false"
      :adaptive="true"
      height="80%"
      styles="overflow-y: scroll"
      name="new-pages-modal"
    >
      <div class="q-gutter-md q-pa-lg">
        <h5 class="q-ma-none q-ml-md q-mt-md">Páginas adicionadas</h5>
        <div class="q-ma-none q-ml-md">
          Agora informe o número da página onde cada uma deverá ser atribuída!
        </div>
        <div class="row">
          <div
            class="image-box q-mr-md q-mb-md clickable"
            v-for="item in itemsNew"
            :key="`${item.page}-${item.loaded}`"
          >
            <div v-if="item == selected" />

            <img :src="item.page" :alt="item.page" />
            <div class="text-center">
              <input type="text" style="width: 100%" v-model="item.position" />
            </div>
          </div>
        </div>

        <div class="q-mt-lg row justify-end">
          <q-btn
            color="negative"
            class="q-mb-sm q-mr-sm"
            label="Cancelar"
            @click.native="$modal.hide('new-pages-modal')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            label="Adicionar"
            @click.native="placePages"
          />
        </div>
      </div>
    </modal>
    <div class="text-h6">Páginas</div>
    <div class="text-subtitle2">
      <span>Alterar a ordem, adicionar e remover páginas.</span>
    </div>
    <q-separator />
    <div class="q-mt-md row justify-end">
      <q-btn @click="save" color="positive">Salvar</q-btn>
    </div>

    <div class="row justify-between q-mt-md">
      <q-btn
        color="primary"
        class="q-mb-md"
        :disable="!selected"
        @click.prevent="decrement"
        >Deslocar para Esquerda</q-btn
      >
      <q-btn
        color="primary"
        class="q-mb-md"
        :disable="!selected"
        @click.prevent="increment"
        >Deslocar para Direita</q-btn
      >
      <q-btn
        color="primary"
        class="q-mb-md"
        @click.prevent="() => $modal.show('add-page-modal')"
        >Adicionar nova Página</q-btn
      >
      <q-btn
        color="negative"
        class="q-mb-md"
        :disable="!selected"
        @click.prevent="removePage"
        >Remover Página</q-btn
      >
    </div>
    <q-separator class="q-mb-md" />
    <div class="row">
      <div
        class="image-box q-mr-md q-mb-md clickable"
        v-for="(item, index) in items"
        :key="`${item.page}-${item.loaded}`"
      >
        <div class="image-box-selected" v-if="item == selected" />
        <a href="#" class="text-black" @click.prevent="select(item)">
          <img :src="item.page" :alt="index" />
          <div class="text-center">
            {{ index + 1 }}
            <span
              v-if="
                (item.oldIndex || item.oldIndex > -1) && index != item.oldIndex
              "
            >
              <br />
              Antes: {{ item.oldIndex + 1 }}
            </span>
            <span v-else-if="item.isNew">
              <br />
              Nova
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { addPage, update } from "src/services/Catalogs";

export default {
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
    catalog: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    file: null,
    errorAddCatalogFile: false,
    uploading: false,
    items: [],
    selected: null,
    itemsNew: [],
  }),
  methods: {
    select(item) {
      this.selected = item;
    },
    save() {
      const { _id } = this.catalog;
      const path = (this.items || []).map(({ page }) => page);
      update({ _id, path })
        .then(() => {
          this.$q.notify({
            message: `Salvo com sucesso!`,
            color: "primary",
            textColor: "white",
            multiline: true,
            position: "top-right",
          });
        })
        .catch(() => {
          this.$q.notify({
            message: `Ocorreu um erro ao processar a solicitação.`,
            color: "negative",
            textColor: "white",
            multiline: true,
            position: "top-right",
          });
        });
    },
    newPage() {
      if (!this.file) return (this.errorAddCatalogFile = true);
      this.errorAddCatalogFile = false;
      const formData = new FormData();
      formData.append("catalog", this.file);
      this.uploading = true;
      let success = false;
      addPage(this.catalog._id, formData)
        .then((pages) => {
          const newPages = pages.map((page, index) => ({
            page,
            position: this.items.length + index + 1,
            isNew: true,
            loaded: Date.now(),
          }));
          this.itemsNew = [...newPages];
          success = true;
        })
        .catch(console.error)
        .finally(() => {
          this.$nextTick(() => {
            this.$modal.hide("add-page-modal");
            this.file = null;
            this.uploading = false;
            if (success)
              this.$nextTick(() => {
                this.$modal.show("new-pages-modal");
              });
          });
        });
    },
    placePages() {
      for (const page of this.itemsNew.sort(
        (a, b) => a.position - b.position
      )) {
        if (page.position < 1) page.position = 1;
        this.items.splice(page.position - 1, 0, page);
      }
      this.$modal.hide("new-pages-modal");
    },
    removePage() {
      if (!this.selected || this.items.indexOf(this.selected) < 0) return;
      const selectedIndex = this.items.indexOf(this.selected);
      this.items.splice(selectedIndex, 1);
      this.selected = null;
    },
    increment() {
      if (
        !this.selected ||
        this.items.indexOf(this.selected) < 0 ||
        this.items.indexOf(this.selected) == this.items.length - 1
      )
        return;
      const selectedIndex = this.items.indexOf(this.selected);
      this.items.splice(
        selectedIndex,
        2,
        this.items[selectedIndex + 1],
        this.selected
      );
    },
    decrement() {
      if (!this.selected || this.items.indexOf(this.selected) <= 0) return;
      const selectedIndex = this.items.indexOf(this.selected);
      this.items.splice(
        selectedIndex - 1,
        2,
        this.selected,
        this.items[selectedIndex - 1]
      );
    },
  },
  mounted() {
    this.items = (this.pages || []).map((page, oldIndex) => ({
      page,
      oldIndex,
      loaded: Date.now(),
    }));
  },
};
</script>

<style scoped>
.image-box {
  width: 150px;
  position: relative;
}
.image-box img {
  width: 100%;
}

.image-box-selected {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #00173a;
  opacity: 0.4;
}

a:link,
a:visited,
a:hover,
a:active,
a {
  color: #000;
  text-decoration: none;
}
</style>