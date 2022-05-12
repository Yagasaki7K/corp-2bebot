<template>
  <q-layout view="hHh lpR fFf">
    <add-item-to-cart-modal
      @addToCart="addToCart"
      v-if="showModal"
      :product="clickedProduct"
    />
    <Carrinho
      @resetCart="resetCart"
      :user="user"
      :items="carrinho"
      name="carrinhoModal"
    />
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="row justify-center">
          <div class="column items-center">
            <span style="font-size: 1.2em">Baú</span>
            <div>
              <FlipButton :action="flipLeft" icon="arrow_back" />
              Página
              {{ pageNum + (showTwoPages ? " - " + (pageNum + 1) : "") }}
              de {{ pages.length - 1 }}
              <FlipButton :action="flipRight" icon="arrow_forward" />
            </div>
          </div>
        </q-toolbar-title>
        <q-btn
          v-if="modoCompra"
          @click="$modal.show('carrinhoModal')"
          icon="shopping_cart"
          size="md"
          color="green"
          >Carrinho ({{ carrinho.length }})</q-btn
        >
      </q-toolbar>
    </q-header>

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
          ref="flipbook"
          @flip-left-start="onFlipLeftStart"
          @flip-left-end="onFlipLeftEnd"
          @flip-right-start="onFlipRightStart"
          @flip-right-end="onFlipRightEnd"
          :zooms="null"
        >
          <!-- <div class="action-bar">

            <span class="page-num">
              Página

              de
              {{ flipbook.numPages }}
            </span>

          </div> -->
        </Flipbook>
        <Components
          v-if="showComponents"
          :pageWidth="pageWidth"
          :pageHeight="pageHeight"
          :components="filterComponents()"
          @buttonClick="handleClick"
          :unmovable="true"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>


<script>
import Carrinho from "./Carrinho";
import Flipbook from "flipbook-vue";
import Components from "../Components";
import FlipButton from "./FlipButton";
import {
  baseURL,
  generateImages,
  update,
  getCatalog,
} from "../../services/Catalogs";
import AddItemToCartModal from "src/components/AddItemToCartModal.vue";
export default {
  components: {
    Flipbook,
    Components,
    FlipButton,
    Carrinho,
    AddItemToCartModal,
  },
  props: ["user"],
  data: () => ({
    pages: [],
    hasMouse: true,
    pageNum: null,
    showComponents: false,
    catalog: {},
    showTwoPages: false,
    pageWidth: 0,
    pageHeight: 0,
    representante: null,
    carrinho: [],
    modoCompra: false,
    clickedProduct: {},
    showModal: false,
  }),
  methods: {
    resetCart() {
      this.carrinho = [];
    },
    filterComponents() {
      if (this.showTwoPages)
        return (this.catalog.components || [])
          .filter(
            (component) =>
              component.page == this.pageNum ||
              component.page == this.pageNum + 1
          )
          .map((component) => ({
            secondPage: component.page == this.pageNum + 1,
            ...component,
          }));

      return (this.catalog.components || []).filter(
        (component) => component.page == this.pageNum
      );
    },
    transferFlipToButtons() {
      let flipbook = this.$refs.flipbook;
      this.flipLeft = flipbook.flipLeft;
      this.flipRight = flipbook.flipRight;
      let swipeStart = flipbook.swipeStart;
      flipbook.swipeStart = (event) => {
        if (event.target.className == "bounding-box") {
          this.unloadComponents();
          swipeStart(event);
        }
      };
      let swipeEnd = flipbook.swipeEnd;
      flipbook.swipeEnd = (event) => {
        this.loadComponents();
        swipeEnd(event);
      };
    },
    flipLeft() {},
    flipRight() {},
    addToCart(item) {
      this.carrinho.push(item);
      this.$modal.hide("addItemToCartModal");
    },
    handleClick(obj) {
      if (obj._id) {
        this.component = this.getComponentById(obj._id);
        if (!this.component.product) return;
        this.clickedProduct = this.component.product;
        this.showModal = false;
        this.$nextTick(() => {
          this.showModal = true;
          this.$nextTick(() => {
            this.$modal.show("addItemToCartModal");
          });
        });
      }
    },
    getComponentById(id) {
      return this.catalog.components.filter(
        (component) => component._id == id
      )[0];
    },
    onFlipLeftStart(page) {
      this.unloadComponents();
    },
    onFlipLeftEnd(page) {
      this.pageNum = page;
      this.loadComponents();
    },
    onFlipRightStart(page) {
      this.unloadComponents();
    },
    onFlipRightEnd(page) {
      this.pageNum = page;
      this.loadComponents();
    },
    onZoomStart(zoom) {},
    onZoomEnd(zoom) {},
    loadComponents() {
      this.showComponents = true;
    },
    unloadComponents() {
      this.showComponents = false;
    },
  },
  mounted() {
    window.addEventListener("keydown", (ev) => {
      let flipbook = this.$refs.flipbook;
      if (!flipbook) return;
      if (ev.keyCode == 37 && flipbook.canFlipLeft) flipbook.flipLeft();
      if (ev.keyCode == 39 && flipbook.canFlipRight) flipbook.flipRight();
    });
    this.$watch(
      () => {
        return (
          this.$refs.flipbook.showLeftPage && this.$refs.flipbook.showRightPage
        );
      },
      (val) => {
        this.showTwoPages = val;
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
    let { id, catalogo, representante } = this.$route.params;
    this.modoCompra = !!representante;
    getCatalog(id || catalogo)
      .then((res) => {
        this.catalog = res;
        let representantes = this.catalog.representantes.filter(
          (repr) => repr._id == representante
        );
        if (representantes.length) this.representante = representantes[0];
        if (representante && (this.representante.block || !this.representante))
          this.$router.push("/404");

        this.pages = [null, ...res.path];
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

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
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
}
</style>
