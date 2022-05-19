<template>
  <div id="totalSells" class="col col-6"></div>
</template>

<script>
import anychart from "anychart";
export default {
  props: ["data"],
  mounted() {
    this.accessesChart();
  },
  methods: {
    accessesChart() {
      const data = [
        ["Janeiro", 10000.99],
        ["Fevereiro", 12000.34],
        ["Março", 13000.2],
        ["Abril", 10000],
        ["Maio", 9000],
        ["Junho", 9000],
        ["Julho", 19900],
        ["Agosto", 1300],
        ["Setembro", 700.1],
        ["Outubro", 9055],
        ["Novembro", 13000],
        ["Dezembro", 10000],
      ];

      // create an instance of a pie chart
      anychart.format.locales.default.numberLocale.decimalsCount = 2;
      anychart.format.locales.default.numberLocale.zeroFillDecimals = true;
      anychart.format.locales.default.numberLocale.groupsSeparator = ".";
      anychart.format.locales.default.numberLocale.decimalPoint = ",";
      const chart = anychart.line();

      const series = chart.column(this.data);
      console.log({ data: this.data, series: series });
      series.name("Total");

      // enable and configure labels on the series
      series.labels(true);
      series.labels().fontColor("green");
      series.labels().fontWeight(900);
      series.labels().format("R$ {%value}");

      // set the chart title

      // set the titles of the axes
      chart.xAxis().title("Mês");
      chart.yAxis().title("Total, R$");

      // set the container id
      chart.container("totalSells");

      // initiate drawing the chart
      chart.draw();
    },
  },
};
</script>

<style></style>
