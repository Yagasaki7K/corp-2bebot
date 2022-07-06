<template>
  <mdb-tbl responsive hover bordered>
    <thead class="bg-color-table darken-3">
      <tr class="text-white head-0">
        <th v-for="(item, index) in columns" :key="index">
          {{ item }}
          <mdb-icon
            v-if="
              item == 'Data Candidatura' ||
              item == 'Data Atribuição' ||
              item == 'Data' ||
              item == 'Nome' ||
              item == 'Melhor Horário' ||
              item == 'Meio Contato'
            "
            @click.native="$emit('sort', item)"
            style="cursor: pointer; margin-left: 4px"
            icon="sort"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in appointments">
        <tr :key="`head-${index + 1}`" :class="`head-${index + 1}`">
          <td>
            <a @click.prevent="$emit('openPane', index + 1)">
              <mdb-icon
                class="clickable"
                :icon="openPaneNum == index + 1 ? 'angle-up' : 'angle-down'"
              />
            </a>
          </td>
          <td class="first-text font-weight-bold">
            <div>
              {{
                showTimeline
                  ? dateFormat(item.created_at)
                  : dateFormat(item.updated_at)
              }}
            </div>
          </td>
          <td class="first-text font-weight-bold" v-if="showTimeline">
            <div>
              {{ dateFormat(item.assignmentDate) }}
            </div>
          </td>
          <td class="first-text font-weight-bold">
            <div>
              {{ item.lead.name }}
            </div>
          </td>
          <td class="first-text font-weight-bold" v-if="!showTimeline">
            <div class="d-flex flex-column">
              <div>
                {{ item.lead.email }}
              </div>
              <div>
                {{ item.lead.phone }}
              </div>
            </div>
          </td>
          <td class="first-text font-weight-bold" v-if="!showTimeline">
            <div>
              {{ item.lead.best_hour }}
            </div>
          </td>
          <td class="first-text font-weight-bold" v-if="!showTimeline">
            <div>
              {{ translate(item.channel) }}
            </div>
          </td>
          <td class="first-text font-weight-bold" style="min-width: 150px">
            <div>
              <select
                class="browser-default custom-select"
                v-bind:class="{
                  'text-danger': item.attendance_status == 'no_contact_yet',
                  'text-success': item.attendance_status == 'already_contacted',
                }"
                :disabled="
                  $store.getters['auth/user'].role.name === 'corporate'
                    ? false
                    : ($store.getters['auth/user'].role.name === 'analytics'
                        ? true
                        : false) || item.attendance_status != 'no_contact_yet'
                "
                v-model="item.attendance_status"
                @change="handleChange(item, item.attendance_status)"
              >
                <option
                  class="first-text"
                  v-for="it in items"
                  :value="it.id"
                  :key="it.id"
                >
                  {{ it.val }}
                </option>
              </select>
            </div>
          </td>

          <td class="first-text font-weight-bold" v-if="showTimeline">
            <div class="d-flex flex-column">
              <div>
                {{ item.distributor.name }}
              </div>
              <div>{{ item.distributor.url_username }}</div>
            </div>
          </td>
          <td
            class="first-text font-weight-bold"
            :style="showTimeline ? 'width:175px' : ''"
          >
            <div
              v-if="!showTimeline"
              class="d-flex flex-column align-items-center"
            >
              <div v-if="item.attendance_status != 'no_contact_yet'">--</div>
              <div v-else>
                {{ `${item.prazo || ""}`.padStart(2, "0") }}
                {{
                  `${item.prazo || ""}`.padStart(2, "0") == "01"
                    ? "hora"
                    : "horas"
                }}
              </div>
            </div>
            <div v-else class="d-flex flex-column align-items-center">
              <div>
                {{ `${item.assignmentTimes || ""}`.padStart(2, "0") }}
                {{
                  `${item.assignmentTimes || ""}`.padStart(2, "0") == "01"
                    ? "Vez"
                    : "Vezes"
                }}
              </div>
              <div>
                {{
                  `${item.assignmentTimes || ""}`.padStart(2, "0") == "00"
                    ? ""
                    : dateFormatDDMMYYYY(item.assignmentDate)
                }}
              </div>
            </div>
          </td>
        </tr>
        <transition name="fade" :key="`transition-${index + 1}`">
          <tr
            v-show="openPaneNum == index + 1"
            :key="`body-${index + 1}`"
            :class="`body-${index + 1}`"
          >
            <td :colspan="columns.length">
              <Horizontalv2
                :distributorView="showForm == 'horizontal'"
                :info="item"
              />
              <div v-if="showForm == 'vertical'" class="accordion-body">
                <Timelinev2 :assignments="item.assigns" />
              </div>
            </td>
          </tr>
        </transition>
      </template>
    </tbody>
  </mdb-tbl>
</template>

<script>
import { mdbIcon, mdbTbl } from "mdbvue";

import { format } from "date-fns";
import Timelinev2 from "./Timelinev2";
import Horizontalv2 from "./Infos/Horizontalv2";

import {
  updateStatusAppointment,
  finishAppointments,
} from "../../../services/Appointments";

export default {
  props: {
    openPaneNum: {
      type: Number,
      default: 0,
    },
    showTimeline: {
      type: Boolean,
      default: false,
    },
    showForm: {
      type: String,
      default: "horizontal",
    },
    appointments: {
      type: Array,
      default: () => [],
    },
    statusCampanha: {
      type: String,
      default: "Status",
    },
  },
  components: {
    mdbIcon,
    Timelinev2,
    Horizontalv2,
    // mdbDropdown,
    // mdbDropdownItem,
    // mdbDropdownMenu,
    // mdbDropdownToggle,
    mdbTbl,
  },
  mounted() {
    this.columns = this.showTimeline
      ? [
          "#",
          "Data Candidatura",
          "Data Atribuição",
          "Candidato",
          "Status",
          "Distribuidor",
          "Transferência",
        ]
      : [
          "#",
          "Data",
          "Nome",
          "Contato",
          "Melhor Horário",
          "Meio Contato",
          "Status",
          "Prazo",
        ];
  },
  data() {
    return {
      elHeight: 0,

      leadsStatus: [
        { name: "Aberto", type: "opened" },
        { name: "Atribuido", type: "assigned" },
        { name: "Negado", type: "denied" },
        { name: "Transferido", type: "reallocated" },
        { name: "Finalizado", type: "done" },
      ],
      selected: 2,
      items: {
        1: { id: "no_contact_yet", val: "Pendente" },
        2: { id: "already_contacted", val: "Já contatado" },
        3: { id: "no_answer", val: "Sem resposta" },
        4: { id: "no_interest", val: " Sem interesse" },
      },
      columns: [],
    };
  },
  methods: {
    translate(channel) {
      if (channel == "phone") return "Telefone";
      if (channel == "email") return "Email";
      return channel;
    },
    handleChange(item, attendance_status) {
      finishAppointments(item.id, attendance_status)
        .then(() => {
          this.$toast.open({
            position: "top",
            message: "Status alterado com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao editar o status de contato! Tente mais tarde!",
            type: "error",
          });
        });
    },
    updateStatus(appointment, event) {
      const data = {
        distributor_id: appointment.distributor_id,
        appointment: appointment.id,
        event,
      };
      updateStatusAppointment(data)
        .then(() => {})
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao editar o status! Tente mais tarde!",
            type: "error",
          });
        });
    },
    dateFormatDDMMYYYY(data) {
      return data ? format(Date.parse(data), "dd/MM/yyyy") : "";
    },
    dateFormat(data) {
      return data ? format(Date.parse(data), "dd/MM/yyyy HH:mm:ss") : "";
    },
    beforeEnter(el) {
      this.elHeight = el.scrollHeight;
    },
    enter(el) {
      el.style.height = this.elHeight + "px";
    },
    beforeLeave(el) {
      el.style.height = 0;
    },
  },
};
</script>

<style >
#candidates .accordion a.fix {
  display: none !important;
}
.clickable {
  cursor: pointer;
}
</style>
<style scoped>
.accordion-body {
}
.black-tile {
  color: black;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0ms;
}
.fade-enter, .fade-leave-to /* .list-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
  transform: translateY(-15px);
}
.custom-select {
  font-size: 0.9rem;
}
</style>
