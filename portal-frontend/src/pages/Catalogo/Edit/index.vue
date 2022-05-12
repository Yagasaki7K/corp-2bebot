<template>
  <div class="q-pa-md" v-if="catalog">
    <ProductModal
      v-if="modalShow"
      @saved="saved"
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
      :name="editModalName"
    />
    <VincularRepresentante
      v-if="modalShow"
      @saved="saved"
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
      :name="vincularModalName"
    />
    <div class="row q-mb-lg justify-between items-center">
      <div class="text-h4">
        <span style="display: flex; align-items: center; grid-gap: 5px">
          <q-icon size="sm" name="fas fa-book" /> {{ catalog.name }}
          <q-badge
            v-if="catalog.status === 'ACTIVE'"
            style="margin-left: 10px; height: 20px; font-weight: bold"
            color="green"
            align="middle"
            >Publicado</q-badge
          >
          <q-badge
            v-else
            style="margin-left: 10px; height: 20px; font-weight: bold"
            color="red"
            align="middle"
            >Não publicado</q-badge
          >
        </span>
      </div>
      <div>
        <q-btn
          size="md"
          @click.native="
            () => {
              $router.push(`/catalogo/${catalog._id}/edit`);
            }
          "
          icon="construction"
          color="primary"
          label="Mapear produtos"
        />
        <!-- <q-btn
        style="margin-left: 15px"
          size="md"
          icon="edit"
          color="primary"
          disable
          label="Editar catálogo"
        /> -->
      </div>
    </div>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="main" label="Resumo"> </q-tab>
        <q-tab name="dash" label="Dashboards"> </q-tab>
        <q-tab name="config" label="Configurações"> </q-tab>
        <q-tab name="products" label="Produtos"></q-tab>
        <!-- <q-tab name="representantes" label="Representantes e Gerentes"></q-tab> -->
      </q-tabs>
      <div v-if="tab == 'main'">
        <inicio v-if="catalog" :catalog="catalog"></inicio>
      </div>
      <div v-if="tab == 'dash'">
        <dashboard v-if="catalog" :catalog="catalog"></dashboard>
      </div>
      <div v-if="tab == 'config'">
        <config
          v-if="catalog"
          :catalog="catalog"
          v-on:refreshData="init"
        ></config>
      </div>
      <produtos
        v-else-if="tab == 'products'"
        :data="catalog.products"
        :catalog="catalog"
        v-on:refreshData="init"
        @exportXlsx="exportXlsx"
        @imported="init"
        @openModal="
          () => {
            $emit('saveStateRequest');
            $emit('closeDrawerRequest');
            $emit('blockDrawerRequest');
            $modal.show(editModalName);
          }
        "
      />
      <Representantes
        v-else-if="tab == 'representantes'"
        :data="catalog.representantes"
        :catalog="catalog"
        @openModal="
          () => {
            $emit('saveStateRequest');
            $emit('closeDrawerRequest');
            $emit('blockDrawerRequest');
            $modal.show(vincularModalName);
          }
        "
      />
    </q-card>
  </div>
</template>

<script>
// import Card from '../../../components/Card'
// import TableCard from '../../../components/TableCard'
import { status } from "src/utils/translate";
import ProductModal from "src/components/ProductModal";
import VincularRepresentante from "src/components/VincularRepresentante";
import Produtos from "./Produtos";
import Representantes from "./Representantes";
import { getCatalog } from "src/services/Catalogs";
import { top10ProductsSell, totalOrdersSales } from "src/services/Dashboard";
import { remove } from "src/services/Products";
import moment from "moment";
import Xlsx from "xlsx";

import Inicio from "./abas/inicio.vue";
import Dashboard from "./abas/dashboard.vue";
import Config from "./abas/config/index.vue";
// import Accesses from "./charts/accesses.vue";
// import Compartilhamento from "./charts/compartilhamento.vue";
// import definirChart from "./charts/definirChart.vue";
export default {
  components: {
    ProductModal,
    Produtos,
    Representantes,
    VincularRepresentante,
    Inicio,
    Dashboard,
    Config,
    // Accesses,
    // Compartilhamento,
    // definirChart,
    // Card,
    // TableCard
  },
  computed: {
    status() {
      return status((this.catalog || { status: "" }).status);
    },
    createdAt() {
      return this.catalog.createdAt
        ? moment(this.catalog.createdAt).format("DD/MM/YYYY HH:mm")
        : "";
    },
    updatedAt() {
      return this.catalog.updatedAt
        ? moment(this.catalog.updatedAt).format("DD/MM/YYYY HH:mm")
        : "";
    },
  },
  mounted() {
    this.init();
  },
  data: () => ({
    loaded: false,
    editModalName: "edit-modal",
    vincularModalName: "vincular-modal",
    catalog: null,
    modalShow: true,
    tab: "main",

    productsTop: [],
    sales: 0,
    orders: 0,
  }),
  methods: {
    init() {
      getCatalog(this.$route.params.id)
        .then((res) => {
          this.catalog = res;
          if (
            (!this.loaded && !this.catalog.pathPdf) ||
            !this.catalog.path.length
          ) {
            this.loaded = true;
            this.$q.notify({
              message: `Fazendo upload do PDF e processando as páginas do catálogo.`,
              color: "primary",
              progress: true,
              timeout: 3000,
              textColor: "white",
              position: "top-right",
            });
          }
        })
        .catch(console.error);
    },
    saved() {
      this.$modal.hide(this.editModalName);
      this.$modal.hide(this.vincularModalName);
      setTimeout(() => {
        this.modalShow = false;
        this.$nextTick(() => {
          this.modalShow = true;
          this.init();
        });
      }, 250);
    },
    exportXlsx() {
      let wb = Xlsx.utils.book_new();
      let ws_name = "SheetJS";
      /* make worksheet */
      let ws_data = [["SKU", "NOME", "DESCRICAO", "PRECO"]];
      for (const product of this.catalog.products || []) {
        ws_data.push([
          product.sku,
          product.name,
          product.description,
          product.price,
        ]);
      }
      let ws = Xlsx.utils.aoa_to_sheet(ws_data);
      Xlsx.utils.book_append_sheet(wb, ws, ws_name);
      Xlsx.writeFile(
        wb,
        `${(this.catalog.name || "").replaceAll(
          " ",
          ""
        )}-produtos-${Date.now()}.xlsx`
      );
    },
    actionHandler(name, obj) {
      this[name](obj);
    },
    remove(obj) {
      remove(obj).then(this.init).catch(console.error);
    },
  },
};
</script>

<style scoped>
.backgroundCards {
  background: #00173a;
}
.text-subtitle2 {
  font-size: 20px;
}
.text-h7 {
  font-size: 18px;
  font-weight: bold;
}
</style>
