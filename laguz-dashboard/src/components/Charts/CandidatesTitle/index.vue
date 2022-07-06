<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["response"],
  data() {
    return {
      chartdata: {
        labels: [
          "Elite Safira",
          "Esmeralda",
          "Diamante",
          "Duplo Diamante",
          "Ruby",
        ],
        datasets: [
          {
            label: "Safira",
            data: [],
          },
          {
            label: "Duplo Diamante",
            data: [],
          },
          {
            label: "Candidaturas",
            data: [],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: false,
              fontSize: 20,
            },
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 12,
                beginAtZero: true,
                steps: 10,
                stepValue: 6,
              },
            },
          ],
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
      const names = (this.response.res1 || [])
        .map((item) => item.rank)
        .sort((a, b) => ("" + a).localeCompare(b));

      this.chartdata.labels = [...names];

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

      const totalNames = (names || []).map((item) => {
        return {
          candidates: (this.response.res1 || []).find(
            (item2) => item2.rank === item
          )?.amount,
          transfers: (this.response.res2 || []).find(
            (item2) => item2.rank === item
          )?.amount,
          sells: (this.response.res3 || []).find((item2) => item2.rank === item)
            ?.amount,
          pendings: (this.response.res4 || []).find(
            (item2) => item2.rank === item
          )?.amount,
        };
      });

      const resTotalCandidates = {
        label: "Atendidas",
        // data: [totalCandidates, ...totalNames.map((item) => item.candidates)],
        data: [...totalNames.map((item) => item.candidates)],
        backgroundColor: "#34657F",
      };
      const resTotalTransfers = {
        label: "Transferências",
        // data: [totalTransfers, ...totalNames.map((item) => item.transfers)],
        data: [...totalNames.map((item) => item.transfers)],
        backgroundColor: "#A4DBE8",
      };
      const resTotalSells = {
        label: "Vendas",
        data: [...totalNames.map((item) => item.sells)],
        // data: [totalSells, ...totalNames.map((item) => item.sells)],
        backgroundColor: "#A4DBA8",
      };
      const resTotalPending = {
        label: "Pendentes",
        data: [...totalNames.map((item) => item.pendings)],
        // data: [totalSells, ...totalNames.map((item) => item.sells)],
        backgroundColor: "#A4DB41",
      };

      const resTotal = [
        resTotalCandidates,
        resTotalPending,
        resTotalTransfers,
        resTotalSells,
      ];
      // const total = this.response.res1.map((item, index) => {
      //   const amount1 = this.response.res2.find(item2 => item2.rank == item.rank).amount;
      //   const amount2 = this.response.res3.find(item3 => item3.rank == item.rank).amount;
      //   return {label: item.rank, data: [item.amount + amount1+ amount2], backgroundColor: colorScheme[index]}
      // })

      // const res2 = this.response.res2.map((item, index) => ({label: item.rank, data: [item.amount], backgroundColor: colorScheme[index]}));
      // const res3 = this.response.res3.map((item, index) => ({label: item.rank, data: [item.amount], backgroundColor: colorScheme[index]}));
      this.chartdata.datasets = resTotal;
      this.renderChart(this.chartdata, this.options);
    },
  },
};
</script>

<style></style>
