<template>
  <div id="accesses-per-page" class="col col-6">
  </div>
</template>

<script>
import anychart from "anychart";
export default {
  mounted(){
    this.accessesChart()
  },
  methods: {
    accessesChart() {
      const { mobile, desktop } = { mobile: 7, desktop: 12 };

      const info = [
        ["Página", mobile],
        ["Desktop", desktop],
      ];

      // create an instance of a pie chart
      const chart = anychart.bar();
      // set the data
      chart.data(info);
      // set chart title
      chart.tooltip().format("Quantidade: {%Value}");
      // set the container element
      chart.container("accesses-per-page");
      // initiate chart display
      chart.draw();
    },
  },
};
</script>

<style>
</style>
