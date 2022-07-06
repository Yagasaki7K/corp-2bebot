<script>
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,
  props: ['response'],
  data() {
    return {
      chartdata: {
        labels: [''],
        datasets: [
          {
            label: "Quantidade de pessoas",
            backgroundColor: "#A4DBE8",
            data: [],
          }
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    response: function(){
      const labels = this.response.map(item => item.location);
      const data = this.response.map(item => item.amount);
      this.chartdata.labels = labels;
      this.chartdata.datasets[0].data = data;
      this.renderChart(this.chartdata, this.options);
    }
  },
};
</script>

<style></style>
