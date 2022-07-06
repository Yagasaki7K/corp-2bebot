<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["response", "chartData"],
  data() {
    return {
      genreData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Feminino", "Masculino", "Outros"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#34657F", "#A4DBE8", "#A4DBA8"],
            data: [0, 0, 0],
          },
        ],
      },
      genreOptions: {
        borderWidth: "10px",
        hoverBackgroundColor: "red",
        hoverBorderWidth: "10px",
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontSize: 16,
          },
        },
      },
    };
  },
  watch: {
    response: function () {
      this.genreData.datasets[0].data = [
        this.response.feminino,
        this.response.masculino,
        this.response.outro,
      ];
      this.renderChart(this.genreData, this.genreOptions);
    },
  },
};
</script>
