<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["response"],
  data() {
    return {
      chartdata: {
        labels: [],
        datasets: [],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
              fontSize: 20,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: 12,
                beginAtZero: true,
                steps: 10,
                stepValue: 6,
              },
            },
          ],
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
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
      const days = [];
      for (const key in this.response?.byDate) {
        if (Object.hasOwnProperty.call(this.response.byDate, key)) {
          days.push(key);
        }
      }
      this.chartdata.labels = [...days];

      // const totalCandidates = (this.response.res1 || []).reduce(
      //   (acc, curr) => acc + Number(curr.amount),
      //   0
      // );
      // const totalTransfers = (this.response.res2 || []).reduce(
      //   (acc, curr) => acc + Number(curr.amount),
      //   0
      // );
      // const totalSells = (this.response.res3 || []).reduce(
      //   (acc, curr) => acc + Number(curr.amount),
      //   0
      // );

      this.chartdata.datasets = [
        {
          label: "Entraram",
          data: days.map((day) => this.response.byDate[day].created),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(0,0,0,0)",
          type: "line",
          order: 0,
        },
        {
          label: "Atendidos",
          data: days.map((day) => this.response.byDate[day].done),
          backgroundColor: "#34657F",
          order: 1,
        },
        {
          label: "Pendentes",
          data: days.map(
            (day) =>
              this.response.byDate[day].opened -
              this.response.byDate[day].opened * 2
          ),

          backgroundColor: "#A4DB41",
          order: 1,
        },
      ];
      this.renderChart(this.chartdata, this.options);
    },
  },
};
</script>

<style></style>
