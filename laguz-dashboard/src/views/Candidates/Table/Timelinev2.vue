<template>
  <div class="first-text font-weight-bolder">
    <div class="mt-5 mb-4" id="lineCont">
      <div id="line">
        <div
          class="circle active"
          @mouseover="hover(index)"
          v-for="(assignment, index) in assignments"
          :key="index"
          :style="`left: ${
            (100 / assignments.length) * (index + 0.5) + '%'
          }; background: ${translationColor[assignment.event]}`"
        >
          <div
            :style="`opacity: ${mouserhovered == index ? '1' : '0.1'}`"
            class="popupSpan"
          >
            <div class="spanFlex">
              <div class="first-text font-weight-bolder">
                {{ transpileStatus(assignment) }}
              </div>
              <div class="first-text font-weight-bolder">
                {{ dateSpan(assignment.updated_at) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="d-flex mt-4 justify-content-end">
      <mdb-row class="w-25">
        <mdb-col col="12" v-for="legend in memory" :key="legend.name">
          <p>
            <mdb-icon
              far
              icon="circle"
              :style="`color: ${legend.color} !important`"
              :color="legend.color"
            />
            {{ legend.name }}
          </p>
        </mdb-col>
      </mdb-row>
    </div> -->
  </div>
</template>

<script>
// import { mdbCol, mdbRow, mdbIcon } from "mdbvue";
import { format } from "date-fns";
export default {
  props: ["assignments"],
  // components: { mdbCol, mdbRow, mdbIcon },
  computed: {
    memory() {
      return this.memo;
    },
  },
  data: () => ({
    mouserhovered: null,
    translation: {
      done: "Finalizado",
      assigned: "Atribuído",
      declined: "Negado",
      expired: "Expirado",
      denied: "Negado",
      reallocated: "Transferência Manual",
      opened: "Aberto",
    },
    translationColor: {
      done: "#32CD32",
      assigned: "#1E90FF",
      declined: "grey",
      expired: "#FF0000",
      denied: "#FF0000",
      reallocated: "yellow",
      opened: "green",
    },
    memo: [],
    monthSpan: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  }),
  methods: {
    hover(index) {
      this.mouserhovered = index;
    },
    dateSpan(date) {
      return format(Date.parse(date), "dd/MM/yyyy HH:mm");
    },
    relativeInt(date) {
      return date;
    },
    transpileLegend(event) {
      return this.translation[event] ? this.translation[event] : `${event}`;
    },
    transpileStatus(data) {
      if (data.event === "done") return "Finalizado";
      if (data.event === "assigned")
        return `Atribuído: ${data.url_username || "Não definido"} `;
      if (data.event === "declined" || data.event === "denied") return "Negado";
      if (data.event === "reallocated") return "Transferência Manual";
      if (data.event === "opened") return "Aberto";
      if (data.event === "expired") return "Expirado";
      return data.event;
    },
  },
  mounted() {
    for (const assignment of this.assignments) {
      if (
        !this.memo.filter(
          (legend) => legend.name == this.transpileLegend(assignment.event)
        ).length
      )
        this.memo.push({
          color: "#000",
          name: this.transpileLegend(assignment.event),
        });
    }
  },
};
</script>

<style scoped>
#lineCont {
  width: 100%;
  height: 20%;
}

#line {
  height: 1px;
  width: 70%;
  background: #234663;
  border-radius: 5px;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}

.circle {
  width: 20px;
  height: 20px;

  border-radius: 15px;
  position: absolute;
  top: -10px;
  border: 3px solid #efefef;
  cursor: pointer;
}
.circle::before {
  content: "";
  width: 10px;
  height: 10px;
  background: #efefef;
  position: absolute;
  border-radius: 100%;
  top: 2px;
  left: 2px;
  display: none;
}
.circle .popupSpan {
  width: auto;
  height: auto;
  padding: 10px 0px;
  white-space: nowrap;
  display: inline-block;
  color: black;
  position: absolute;
  top: 20px;
  left: -50px;
  display: none;
  transition: all 0.1s ease-out;
}
.circle:hover::before,
.circle.active::before {
  display: block;
}
.circle:hover .popupSpan,
.circle.active .popupSpan {
  display: block;
}
.circle.active .popupSpan {
  top: -55px;
}

.spanFlex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>