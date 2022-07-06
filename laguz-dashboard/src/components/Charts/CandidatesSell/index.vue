<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ['response'],
  data() {
    return {
      chartdata: {
        labels: ['Periodo'],
        datasets: [
          {
            label: "Vendas",
            backgroundColor: "#34657F",
            data: [],
            scaleSteps: 1,
          },
          {
            label: "Candidaturas",
            backgroundColor: "#A4DBE8",
            data: [],
            scaleSteps: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: false,
              categoryPercentage: 0.3,
            },
          ],
          yAxes: [{
            ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 6,
            }
            
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    response: function(){
      this.chartdata.datasets[0].data = [this.response.sold];
      this.chartdata.datasets[1].data = [this.response.created];
      this.renderChart(this.chartdata, this.options);
      } 
  },
};
</script>

<style></style>
