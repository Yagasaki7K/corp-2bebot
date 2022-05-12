<template>
  <q-page>
    <div class="row h-500">
      <div id="maisVendidos" class="col col-6"></div>
      <div id="vendas" class="col col-6"></div>
    </div>
  </q-page>
</template>

<script>
import { list } from "src/services/Orders";
import anychart from "anychart";
// import UltimoEnvio from "./Dashboard/UltimoEnvio.vue";
export default {
  // components: { UltimoEnvio },/
  name: "PageIndex",
  props: ["jwt"],
  data: () => ({
    orders: [],
  }),

  methods: {
    vendasChart() {
      let approved = this.orders
        .filter((order) => order.status == "APPROVED")
        .map((order) => {
          let total = 0;
          if (order.proposed?.length)
            total = order.proposed.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            );
          else if (order.items?.length)
            total = order.items.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            );
          total = (total - (order.discount * total) / 100).toFixed(2);
          return { ...order, total };
        })
        .sort((a, b) => Date.parse(a.billingDate) - Date.parse(b.billingDate));

      let chartData = [];
      for (const order of approved) {
        let date = new Date(order.billingDate).toLocaleDateString("pt-BR");
        chartData.push([date, order.total]);
      }
      let chart = anychart.line(chartData);

      // turn on chart animation
      chart.animation(true);

      // set chart padding
      chart.padding([10, 20, 5, 20]);

      // turn on the crosshair
      chart.crosshair().enabled(true).yLabel(false).yStroke(null);

      // set tooltip mode to point
      chart.tooltip().positionMode("point").format("R$ {%Value}");

      // set chart title text settings
      chart.title("Vendas");

      // set yAxis title
      chart.yAxis().title("Vendas em reais");
      chart.xAxis().labels().padding(5);
      chart.container("vendas");
      chart.draw();
    },
    maisVendidosChart() {
      let approved = this.orders.filter((order) => order.status == "APPROVED");
      var memo = {};
      for (const order of approved) {
        for (const item of order.items) {
          if (memo[item.product.sku])
            memo[item.product.sku] = {
              name: item.product.name,
              quantity: memo[item.product.sku].quantity + item.quantity,
            };
          else
            memo[item.product.sku] = {
              name: item.product.name,
              quantity: item.quantity,
            };
        }
      }
      let chartData = [];
      for (const key in memo) {
        if (Object.hasOwnProperty.call(memo, key)) {
          const element = memo[key];
          chartData.push([element.name, element.quantity]);
        }
      }
      chartData = chartData.sort((a, b) => b[1] - a[1]);
      if (chartData.length > 4) {
        let [primeiro, segundo, terceiro, quarto, ...outros] = chartData;
        let otherValues = outros.reduce((sum, val) => sum + val[1], 0);
        chartData = [
          primeiro,
          segundo,
          terceiro,
          quarto,
          ["Outros", otherValues],
        ];
      }

      let chart = anychart.pie(chartData);
      chart.title("Mais vendidos");
      chart
        .labels()
        .hAlign("center")
        .position("outside")
        .format("{%Value} itens");
      chart.tooltip().format("{%Value} itens");
      chart.container("maisVendidos");
      chart.draw();
    },
  },
  mounted() {
    list()
      .then((res) => {
        this.orders = res;
        this.vendasChart();
        this.maisVendidosChart();
      })
      .catch(console.error);
  },
};
</script>
<style scoped>
.h-500 {
  height: 500px;
}
</style>
