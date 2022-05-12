<template>
  <div id="accesses" class="col col-6">
  </div>
</template>

<script>
import anychart from "anychart";
export default {
  props: ['mobile', 'desktop'],
  mounted(){
    this.accessesChart()
  },
  methods: {
    accessesChart() {
      const info = [
        ["Mobile", this.mobile],
        ["Desktop", this.desktop],
      ];

      // create an instance of a pie chart
      const chart = anychart.pie();
      // set the data
      chart.data(info);
      // set chart title
      chart.tooltip().format("Quantidade: {%Value}");
      // set the container element
      chart.container("accesses");
      // initiate chart display
      chart.draw();
    },
  },
};
</script>

<style>
</style>
