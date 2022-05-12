<template>
  <div id="compartilhamento"></div>
</template>

<script>
import anychart from "anychart";
export default {
  props: ["sharedEmail", "sharedWpp", "sharedLink", "sharedFace"],
  mounted() {
    this.chartRender();
  },
  methods: {
    chartRender() {
      const info = [
        ["Whatsapp", this.sharedWpp],
        ["Facebook", this.sharedFace],
        ["Email", this.sharedEmail],
        ["Link", this.sharedLink],
      ];

      // create an instance of a pie chart
      const chart = anychart.pie();
      // set the data
      chart.data(info);
      // set chart title
      chart.tooltip().format("Quantidade: {%Value}");
      // set the container element
      chart.container("compartilhamento");
      // initiate chart display
      chart.draw();
    },
  },
};
</script>

<style>
</style>
