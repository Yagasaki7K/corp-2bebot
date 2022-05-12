<template>
  <div id="hourOfDay" class="col col-6"></div>
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
      const chart = anychart.area();
      const mockData = [
        ["00", 9],
        ["01", 5],
        ["02", 9],
        ["03", 3],
        ["04", 2],
        ["05", 1],
        ["06", 5],
        ["07", 6],
        ["08", 5],
        ["09", 5],
        ["10", 4],
        ["11", 3],
        ["12", 2],
        ["13", 1],
        ["14", 3],
        ["15", 5],
        ["16", 2],
        ["17", 2],
        ["18", 3],
        ["19", 1],
        ["20", 5],
        ["21", 4],
        ["22", 8],
        ["23", 7],
      ];

      chart.area(this.data || mockData);

      // set function to format y axis labels
      chart.tooltip().format("Sessões: {%value} %");
      chart.tooltip().titleFormat("{%x} horas");
      const yLabels = chart.yAxis(0).labels();
      yLabels.format("{%value} %");
      // set y axis title
      chart.yAxis(0).title("Sessões");

      var xAxis = chart.xAxis();
      xAxis.title("Hora do dia");

      chart.container("hourOfDay");
      chart.draw();
    },
  },
};
</script>

<style>
</style>
