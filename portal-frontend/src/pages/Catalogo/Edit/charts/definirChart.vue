<template>
  <div id="definir"></div>
</template>

<script>
import anychart from "anychart";
export default {
  mounted() {
    this.chartRender();
  },
  methods: {
    chartRender() {
       const { whatsapp, email, link } = { whatsapp: 7, email: 12, link: 10 };

      const info = [
        ["Whatsapp", whatsapp],
        ["Email", email],
        ["Link", link],
      ];

      // create an instance of a pie chart
      const chart = anychart.pie();
      // set the data
      chart.data(info);
      // set chart title
      chart.tooltip().format("Quantidade: {%Value}");
      // set the container element
      chart.container("definir");
      // initiate chart display
      chart.draw();


    },
  },
};
</script>

<style>
</style>
