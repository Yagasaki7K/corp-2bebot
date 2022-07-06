<template>
  <div
    id="chart-container"
    style="margin: auto; height: 370px; width: 100%;"
  ></div>
</template>

<script>
var CanvasJS = require("../../../assets/canvasjs.min.js");
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  name: "ChartComponent",
  props: ['response'],
  data() {
    return {
      chart: null,
      chartOptions: {
        animationEnabled: true,
        exportEnabled: false,
        theme: "light1",

        data: [
          {
             
            type: "pyramid",
            indexLabelFontSize: 18,
            valueRepresents: "area",
            showInLegend: true,
            legendText: "{label}: {y}",
            indexLabelPlacement: "inside",
            toolTipContent: "<b>{label}:</b> {y} Acessos",
            dataPoints: [
              { y: 15, label: "Pay Per Click Advertising" },
              { y: 25, label: "Website Sponsorship" },
            ],
          },
        ],
      },
    };
  },
  watch: {
    response: function() {
      const transpileLabel = {
        phone:{title: "Telefone", color: '#A4DBE8'},
        whatsapp: {title: "WhatsApp", color:'#34657F'},
        email: {title: "e-Mail", color: '#A4DBA8'},
      };
      this.chartOptions.data[0].dataPoints = this.response.map((item) => ({
        y: item.amount,
        label: transpileLabel[item.location]
          ? transpileLabel[item.location].title
          : item.location,
        color: transpileLabel[item.location]
        ? transpileLabel[item.location].color
        : item.location,
      }));

      this.chart = new CanvasJS.Chart("chart-container", this.chartOptions);
      this.chart.render();
    },
  },
};
</script>
<style>
.canvasjs-chart-credit {
  display: none !important;
}
</style>