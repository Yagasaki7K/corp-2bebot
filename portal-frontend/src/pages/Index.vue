<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pa-md" style="max-width: 300px">
    <q-input filled  v-model="date2" >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date range mask="DD/MM/YYYY" v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
      <div class="row q-mt-md">
        <card title="Total de vendas" :value="`R$${sales}`" />
        <card title="Total de pedidos" :value="orders" />
        <card title="Total de visualizações" :disabled="true" value="--" />
        <card title="Compartilhamentos" :disabled="true" value="--" />
        <card title="Total de downloads" :disabled="true" value="--" />
        <card title="Card a definir" :disabled="true" value="--" />
      </div>
      <div class="row q-mt-md">
      </div>
      <div class="q-mt-md row">
        <div class="col col-12 col-md-12 q-pr-sm">
          <table-card
            title="Top 10"
            subtitle="Produtos mais pedidos"
            :headers="['Produto', 'Vendas']"
            :dataTable="productsTop"
          />
        </div>

      </div>
      <div class="q-mt-md row justify-between">
        <div class="col col-12 col-md-12  q-gutter-x-xs">
          <q-card class="my-card">
            <q-card-section
              class="backgroundCards text-white flex justify-center items-center q-pa-sm"
              style="width: 100%"
            >
              <div class="text-h6">Total de vendas</div>
            </q-card-section>
            <q-card-section style="width: 100%" class="flex justify-center items-center">
              <total-sells  style="width: 100%; height: 500px"></total-sells>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Card from "src/components/Card.vue";
import TotalSells from './charts/totalSells'
import TableCard from "src/components/TableCard.vue";
import { top10ProductsSell, totalOrdersSales } from "src/services/Dashboard";
// import UltimoEnvio from "./Dashboard/UltimoEnvio.vue";
export default {
  components: { Card, TableCard, TotalSells },
  // components: { UltimoEnvio },/
  name: "PageIndex",
  props: ["jwt"],
  data: () => ({
    productsTop: 0,
    sales: 0,
    orders: 0,
    date: { from: '01/05/2021', to: '30/05/2021' },
    date2: '01/05/2021 á 30/05/2021'
  }),
  watch: {
    date(){
      this.date2 = `${this.date.from} á ${this.date.to}`
    }
  },
  methods: {
    init() {
      top10ProductsSell().then((res) => {
        this.productsTop = res.keys;
      });
      totalOrdersSales().then((res) => {
        this.sales = res.sales;
        this.orders = res.orders;
      });
    },
    updateProxy() {
      this.proxyDate = this.date;
    },

    save() {
      this.date = this.proxyDate;
    },
  },
  mounted() {
    this.init();
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
