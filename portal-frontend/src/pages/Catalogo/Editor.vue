<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <div>
          <q-btn
            dense
            flat
            round
            icon="arrow_back"
            @click="$router.push('/catalogos')"
          />
          <q-btn
            dense
            class="q-ml-sm"
            style="opacity: 0; cursor: default"
            flat
            round
            icon=""
          />
        </div>
        <div class="row justify-center items-center">
          <q-btn
            @click="flipLeft"
            icon="mdi-chevron-left-circle-outline"
            round
            flat
            size="md"
          />
          <div v-if="editingPage" class="q-ml-sm q-mr-sm">
            <input
              type="text"
              style="width: 50px"
              v-model="newNumber"
              @blur="
                () => {
                  editingPage = false;
                }
              "
              @keyup="keyUp"
            />
          </div>
          <a
            class="q-ml-sm q-mr-sm"
            @click.prevent="
              () => {
                newNumber = pageNum;
                editingPage = true;
              }
            "
            v-else
          >
            <span> Página {{ pageNum }} de {{ pages.length - 1 }} </span>
          </a>

          <q-btn
            @click="flipRight"
            icon="mdi-chevron-right-circle-outline"
            round
            flat
            size="md"
          />
        </div>
        <div>
          <q-btn
            @click.prevent="redirectCatalog()"
            icon="visibility"
            round
            flat
            class="q-mr-sm"
            size="md"
          ></q-btn>
          <q-btn @click="handleSave" icon="save" flat round size="md"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="add" label="Adicionar"> </q-tab>
        <q-tab name="components" label="Componentes"></q-tab>
      </q-tabs>
      <div v-if="tab == 'add'">
        <div class="q-pa-md">
          <q-btn
            color="primary"
            icon="shopping_cart"
            size="lg"
            label="Adicionar produto"
            @click="addCart"
          />
        </div>
      </div>
      <div v-if="tab == 'components'">
        <div class="q-pa-md">
          <q-list bordered separator v-if="filtered.length">
            <q-item
              clickable
              v-ripple
              @click="selectToEdit(component)"
              v-for="(component, index) in filtered"
              :key="`${component.id}-${index}`"
            >
              <q-item-section>
                <q-item-label overline>Carrinho</q-item-label>
                <q-item-label>{{
                  component.product
                    ? `${component.product.sku} - ${formatName(
                        component.product.name
                      )}`
                    : "Não vinculado"
                }}</q-item-label>
              </q-item-section>
              <q-item-section
                v-if="itemEdit && itemEdit.id == component.id"
                side
              >
                Selecionado</q-item-section
              >
            </q-item>
          </q-list>
          <div class="text-center" v-else>
            Essa página não possui componentes
          </div>
        </div>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <div class="q-pa-md" v-if="itemEdit">
        <h6 class="q-mt-none">Editar componente</h6>
        <label>Produto</label>
        <q-select
          v-model="itemEdit.product"
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
                Nenhum produto encontrado!
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="q-pa-md">
          <div class="q-gutter-sm">
            <q-checkbox
              v-model="itemEdit.shake"
              @input="restartComponents"
              label="Sacudir por intervalo"
            />
          </div>
          <div class="q-gutter-sm">
            <q-checkbox
              v-model="itemEdit.fade"
              @input="restartComponents"
              label="Deslizar para abaixo ao abrir"
            />
          </div>
        </div>
        <div class="q-pt-md row justify-center">
          <q-btn
            @click="handleDelete"
            icon="delete_outline"
            size="md"
            color="negative"
            >Remover</q-btn
          >
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <div
        id="app"
        :class="{ 'has-mouse': hasMouse }"
        @touchstart="hasMouse = false"
        style="position: relative"
      >
        <Flipbook
          class="flipbook"
          :pages="pages"
          :startPage="pageNum"
          :singlePage="true"
          ref="flipbook"
          @flip-left-start="onFlipLeftStart"
          @flip-left-end="onFlipLeftEnd"
          @flip-right-start="onFlipRightStart"
          @flip-right-end="onFlipRightEnd"
          :zooms="null"
        >
          <!-- <div class="action-bar">
            <FlipButton :action="flipLeft" icon="arrow_back" />
            <span class="page-num">
              Página {{ flipbook.page }} de {{ flipbook.numPages }}
            </span>
            <FlipButton :action="flipRight" icon="arrow_forward" />
          </div> -->
        </Flipbook>
        <Components
          v-if="showComponents"
          :pageWidth="pageWidth"
          :pageHeight="pageHeight"
          :components="
            (catalog.components || []).filter(
              (component) => component.page == pageNum
            )
          "
          :itemEdit="itemEdit || {}"
          @buttonClick="selectToEdit"
          @complete="handleMove"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>


<script>
import Flipbook from "flipbook-vue";
import Components from "../Components";
// import FlipButton from "./FlipButton";
import {
  baseURL,
  generateImages,
  update,
  getCatalog,
} from "../../services/Catalogs";
import urls from "src/services/base_urls";
export default {
  components: {
    Flipbook,
    Components,
    //  FlipButton
  },
  watch: {
    newNumber(val) {
      const newPage = val && parseInt(val) ? parseInt(val) : 1;
      if (this.allowAlterPage && this.pages.length && val != "") {
        this.alterPage(newPage);
      }
    },
  },
  computed: {
    canFlip() {
      return this.canFlipRight || this.canFlipLeft;
    },
    filtered() {
      return (this.catalog?.components || []).filter(
        ({ page }) => page == this.pageNum
      );
    },
  },
  data: () => ({
    catalogUrl: "",
    canFlipRight: false,
    canFlipLeft: false,
    allowAlterPage: false,
    editingPage: false,
    newNumber: 1,
    originalJSON: "",
    tab: "add",
    left: true,
    right: true,
    pages: [],
    hasMouse: true,
    pageNum: null,
    showComponents: false,
    catalog: {},
    pageWidth: 0,
    pageHeight: 0,
    itemEdit: null,
    options: [],
  }),
  methods: {
    redirectCatalog() {
      if (this.catalog.slug)
        return window.open(`${this.catalogUrl}/${this.catalog.slug}`, "_blank");
      return this.$q.notify({
        message: "Esse catálogo ainda não possui URL.",
        color: "negative",
        position: "top-right",
        progress: true,
      });
    },
    alterPage(n) {
      if (!this.canFlip) return;
      if (n == this.pageNum) return;
      let newPage = n;
      if (newPage > this.pages.length - 1) newPage = this.pages.length - 1;
      if (newPage <= 0) newPage = 1;

      this.pageNum = newPage;
    },
    keyUp({ keyCode }) {
      if (keyCode == 13) this.editingPage = false;
    },
    formatName(name) {
      let formatted = name.substr(0, 20);
      if (formatted.length > 19) formatted += "...";
      return formatted;
    },
    restartComponents() {
      this.unloadComponents();
      this.$nextTick(() => {
        this.loadComponents();
      });
    },
    handleDelete() {
      if (this.itemEdit) {
        this.catalog.components.splice(
          this.catalog.components.findIndex(
            (component) => component.id == this.itemEdit.id
          ),
          1
        );
        this.itemEdit = null;
      }
    },
    transferFlipToButtons() {
      let flipbook = this.$refs.flipbook;
      flipbook.swipeStart = () => {};
      this.flipLeft = flipbook.flipLeft;
      this.flipRight = flipbook.flipRight;
      flipbook.flipRight = () => {};
      flipbook.flipLeft = () => {};
    },
    flipLeft() {},
    flipRight() {},
    handleMove(id, event) {
      let { width, height } = document.querySelector(".bounding-box").style;

      const component = this.getComponentById(id);
      component.top = this.convertToDefault(event.css.top, height);
      component.left = this.convertToDefault(event.css.left, width);
    },
    selectToEdit(component) {
      this.itemEdit = component;
    },
    convertToDefault(value, windowSize) {
      return (value * 1000) / parseInt(windowSize, 10);
    },
    getComponentById(id) {
      return this.catalog.components.filter(
        (component) => component.id == id
      )[0];
    },
    addCart() {
      const newObj = {
        id: Date.now(),
        page: this.pageNum,
        top: 0,
        left: 0,
        shake: true,
        fade: true,
      };
      this.catalog.components.push(newObj);
      this.selectToEdit(newObj);
      this.unloadComponents();
      this.$nextTick(() => {
        this.loadComponents();
      });
    },
    onFlipLeftStart(page) {
      this.compareCatalogEdit();
      this.unloadComponents();
    },
    onFlipLeftEnd(page) {
      this.pageNum = page;
      this.loadComponents();
    },
    onFlipRightStart(page) {
      this.compareCatalogEdit();
      this.unloadComponents();
    },
    onFlipRightEnd(page) {
      this.pageNum = page;
      this.loadComponents();
    },
    compareCatalogEdit() {
      this.itemEdit = null;
      const newJSON = JSON.stringify(this.catalog);
      if (newJSON != this.originalJSON)
        this.$q.notify({
          message: "Você possui alterações não salvas.",
          color: "negative",
          position: "top-right",
          progress: true,
          actions: [
            {
              label: "Salvar",
              color: "white",
              handler: this.handleSave,
            },
          ],
        });
    },
    onZoomStart(zoom) {},
    onZoomEnd(zoom) {},
    loadComponents() {
      this.showComponents = true;
    },
    unloadComponents() {
      this.showComponents = false;
    },
    handleSave() {
      update(this.catalog)
        .then((updated) => {
          this.prepareCatalog(updated);
          this.$q.notify({
            message: `Salvo com sucesso!`,
            color: "positive",
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
    prepareCatalog(res) {
      this.catalog = res;
      this.options = this.catalog.products;
      this.originalJSON = JSON.stringify(this.catalog);
      this.restartComponents();
    },
    optionsValue(option) {
      return option;
    },
    optionsLabel(option) {
      return `${option.sku} - ${option.name}`;
    },
    optionsFilter(input, update, abort) {
      if (input.length < 2) {
        abort();
        return;
      }
      update(() => {
        this.options = this.catalog.products.filter(
          (product) =>
            product.name.toLowerCase().includes(input.toLowerCase()) ||
            product.sku.toLowerCase().includes(input.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.catalogUrl = urls.catalog;
    window.addEventListener("keydown", (ev) => {
      let flipbook = this.$refs.flipbook;
      if (!flipbook) return;
      if (ev.keyCode == 37 && flipbook.canFlipLeft) flipbook.flipLeft();
      if (ev.keyCode == 39 && flipbook.canFlipRight) flipbook.flipRight();
    });
    this.$watch(
      () => this.$refs.flipbook.canFlipLeft,
      (val) => {
        this.canFlipLeft = val;
      }
    );
    this.$watch(
      () => this.$refs.flipbook.canFlipRight,
      (val) => {
        this.canFlipRight = val;
      }
    );
    this.$watch(
      () => this.$refs.flipbook.pageWidth,
      (val) => {
        this.pageWidth = val;
      }
    );
    this.$watch(
      () => this.$refs.flipbook.pageHeight,
      (val) => {
        this.pageHeight = val;
      }
    );
    getCatalog(this.$route.params.id)
      .then((res) => {
        this.prepareCatalog(res);
        this.pages = [null, ...res.path];
        this.allowAlterPage = true;
        this.pageNum = 1;
        this.loadComponents();
      })
      .catch(console.error)
      .finally(() => {
        if (!this.catalog.components) this.catalog.components = [];
      });

    this.transferFlipToButtons();
  },
};
</script>

<style >
.bounding-box img {
  font-size: 16px;
}
</style>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  color: #ccc;
  overflow: hidden;
}
a {
  color: inherit;
}
.action-bar {
  width: 100%;
  height: 30px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-bar .btn {
  font-size: 30px;
  color: #999;
}
.action-bar .btn svg {
  bottom: 0;
}
.action-bar .btn:not(:first-child) {
  margin-left: 10px;
}
.has-mouse .action-bar .btn:hover {
  color: #ccc;
  filter: drop-shadow(1px 1px 5px #000);
  cursor: pointer;
}
.action-bar .btn:active {
  filter: none !important;
}
.action-bar .btn.disabled {
  color: #666;
  pointer-events: none;
}
.action-bar .page-num {
  font-size: 12px;
  margin-left: 10px;
}

.flipbook,
.flipbook .viewport {
  width: 100%;
  height: 100%;
}
.flipbook .bounding-box {
  box-shadow: 0 0 20px #000;
  cursor: default;
}
</style>
<style>
/* Estilo para corrigir o tamanho do catalogo */
#q-app,
#q-app > .q-layout,
#q-app > .q-layout > .q-page-container {
  height: 100%;
}
</style>