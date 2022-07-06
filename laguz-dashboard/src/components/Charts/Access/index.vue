<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ['response'],
  data() {
    return {
      chartdata: {
        labels: [''],
        datasets: [
          {
            label: "Acessos",
            backgroundColor: "#A4DBE8",
            data: [],
            borderWidth: 1
          }
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
              categoryPercentage: 0.7,
              barPercentage: 0.7,
            },
          ],
          yAxes: [
            {
              stacked: true,
              categoryPercentage: 0.4,
              ticks: {
                fontSize: 12,
                beginAtZero: true,
                steps: 10,
                stepValue: 10,
              },
            },
          ]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        elements: {
          bar: {
            borderWidth: 20
          }
        }
      },
    };
  },
  watch: {
    response: function(){
      const transpileLabel = {
        phone(){ return "Telefone" },
        whatsapp(){ return "WhatsApp" },
        email(){ return "e-Mail" },
      }
      const labels = this.response.map(item => transpileLabel[item.location]());
      const data = this.response.map(item => item.amount);
      this.chartdata.labels = labels;
      this.chartdata.datasets[0].data = data;
      this.renderChart(this.chartdata, this.options);
    }
  },
};
</script>

<style></style>
