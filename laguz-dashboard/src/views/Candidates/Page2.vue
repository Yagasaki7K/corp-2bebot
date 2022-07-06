<template>
  <div
    style="margin-top: 10%"
    class="animated fadeIn d-flex align-items-center justify-content-center"
    v-if="isLoading"
  >
    <div
      style="width: 10rem; height: 10rem"
      class="spinner-border text-primary"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="body animated fadeIn" v-else>
    <mdb-row class="justify-content-between align-items-center mb-5 mt-3">
      <div class="custom-control custom-switch">
        <input
          v-model="receiveLead"
          @change="showModalNotReceive = receiveLead"
          :disabled="disabled"
          type="checkbox"
          class="custom-control-input"
          id="lead"
        />
        <label class="custom-control-label" for="lead"
          >NÃO QUERO RECEBER CANDIDATOS</label
        >
      </div>
    </mdb-row>
    <mdb-modal
      size="md"
      :show="showModalNotReceive"
      @close="
        () => {
          showModalNotReceive = false;
          receiveLead = blocked;
        }
      "
      :centered="true"
    >
      <mdb-modal-header class="pb-0">
        <mdb-modal-title>Confirmação</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="pt-1">
        <form @submit.prevent="handleReceive">
          <div class="black-text p-1">
            <label class="mt-0 text-center" for="blockUntil">
              Você confirma que não deseja mais receber candidatos?<br />
              Uma vez atualizado, não será possível alterar novamente!
            </label>
            <div class="mt-3 d-flex justify-content-end">
              <mdb-btn
                color="danger"
                @click.native="
                  () => {
                    showModalNotReceive = false;
                    receiveLead = false;
                  }
                "
                >Cancelar</mdb-btn
              >
              <mdb-btn type="submit" color="primary">Confirmar</mdb-btn>
            </div>
          </div>
        </form>
      </mdb-modal-body>
    </mdb-modal>
    <mdb-modal
      size="sm"
      :show="showModalUpdateStatus"
      @close="showModalUpdateStatus = false"
      :centered="true"
    >
      <mdb-modal-header class="pb-0">
        <mdb-modal-title>Auto-bloqueio</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="pt-1">
        <form @submit.prevent="handlePause">
          <div class="black-text p-1">
            <label class="mt-0" for="blockUntil">Até:</label>
            <input
              v-model="blockUntil"
              id="blockUntil"
              name="blockUntil"
              type="date"
              class="form-control"
              @click.stop
            />
            <div class="mt-3 d-flex flex-column">
              <mdb-btn
                color="danger"
                @click.native="showModalUpdateStatus = false"
                >Cancelar</mdb-btn
              >
              <mdb-btn type="submit" color="primary">Iniciar</mdb-btn>
            </div>
          </div>
        </form>
      </mdb-modal-body>
    </mdb-modal>
    <div class="d-flex flex-wrap justify-content-between">
      <form @submit.prevent class="d-flex align-items-center mr-5">
        <mdb-icon icon="search" class="mr-3" />

        <mdb-input
          style="width: 210px"
          class="m-0"
          type="text"
          v-model="filter"
          placeholder="Digite o texto para filtrar"
        />
      </form>
      <mdb-btn
        class="btn btn-rounded m-0 mb-2"
        @click.native="showModalUpdateStatus = true"
        color="orange"
        :disabled="disabled"
        v-if="!paused"
      >
        <mdb-icon icon="pause" /> AUTO-BLOQUEIO</mdb-btn
      >
      <mdb-btn
        class="btn btn-rounded m-0 mb-2"
        @click.native="handleResume"
        color="green"
        v-else
      >
        <mdb-icon icon="play" /> INTERROMPER AUTO-BLOQUEIO</mdb-btn
      >
    </div>
    <Table
      :showTimeline="false"
      showForm="horizontal"
      statusCampanha=""
      :appointments="appointments"
      :openPaneNum="openPaneNum"
      @sort="handleSort"
      @openPane="handlePaneOpened"
    />
    <mdb-pagination lg class="justify-content-center">
      <!-- <mdb-page-item :disabled="page == 1 ? true : false">Primeiro</mdb-page-item> -->
      <mdb-page-nav :disabled="page == 1 ? true : false"></mdb-page-nav>
      <mdb-page-item
        v-if="getPages.indexOf(1) < 0"
        class="mr-2"
        @click.native="alterPage(1)"
        >{{ 1 }}</mdb-page-item
      >
      <div
        v-if="getPages.indexOf(1) < 0"
        class="d-flex align-items-end mr-2"
        style="font-size: 20px"
      >
        ...
      </div>
      <mdb-page-item
        @click.native="alterPage(n)"
        v-for="n in getPages"
        :key="n"
        :active="page == n ? true : false"
        >{{ n }}</mdb-page-item
      >
      <div
        v-if="getPages.indexOf(totalPages) < 0 && totalPages"
        class="d-flex align-items-end ml-2"
        style="font-size: 20px"
      >
        ...
      </div>
      <mdb-page-item
        v-if="getPages.indexOf(totalPages) < 0 && totalPages"
        class="ml-2"
        @click.native="alterPage(totalPages)"
        >{{ totalPages }}</mdb-page-item
      >
      <!-- <mdb-page-item>Último</mdb-page-item> -->
    </mdb-pagination>
  </div>
</template>

<script>
import {
  mdbRow,
  mdbBtn,
  mdbIcon,
  mdbInput,
  mdbModal,
  mdbModalBody,
  mdbModalHeader,
  mdbModalTitle,
  mdbPagination,
  mdbPageItem,
  mdbPageNav,
} from "mdbvue";
import Table from "./Table/Table";
import {
  getAppointmentsById,
  // getAssignmentsById
} from "@/services/Candidates";
import { block, showDistributor, updateStatus } from "@/services/Distributors";
export default {
  computed: {
    getPages() {
      let nextPages = [];
      let previousPages = [];
      if (this.page + 1 <= this.totalPages) nextPages.push(this.page + 1);
      if (this.page + 2 <= this.totalPages) nextPages.push(this.page + 2);
      if (this.page - 2 > 0) previousPages.push(this.page - 2);
      if (this.page - 1 > 0) previousPages.push(this.page - 1);

      return [...previousPages, this.page, ...nextPages];
    },
  },
  watch: {
    filter() {
      const filterData = this.appointmentsBkp.filter((appointment) =>
        appointment.lead.name.toLowerCase().includes(this.filter.toLowerCase())
      );

      this.page = 1;
      this.totalPages = parseInt(Math.ceil(filterData.length / this.limit));
      this.appointments = this.paginate(filterData, this.limit, this.page);
    },
  },
  components: {
    Table,
    mdbRow,
    mdbBtn,
    mdbIcon,
    mdbModal,
    mdbModalBody,
    mdbModalHeader,
    mdbModalTitle,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
    mdbInput,
  },
  data() {
    return {
      openPaneNum: 0,
      sort: true,
      filter: "",
      cardValue3: "100",
      cardValue2: "70",
      leadCheck: false,
      appointments: [],
      appointmentsBkp: [],
      receiveLead: false,
      disabled: true,
      showModalUpdateStatus: false,
      showModalNotReceive: false,
      paused: false,
      blockUntil: new Date(),
      isLoading: true,
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    alterPage(n) {
      this.openPaneNum = 0;
      this.page = n;
      this.appointments = this.paginate(
        this.appointmentsBkp,
        this.limit,
        this.page
      );
    },
    paginate(array, page_size, page_number) {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
    handleSort(item) {
      this.sort = !this.sort;

      if (item == "Data") {
        this.appointmentsBkp.sort((a, b) =>
          this.sortFn(Date.parse(a.updated_at), Date.parse(b.updated_at))
        );
      }
      if (item == "Data Candidatura") {
        this.appointmentsBkp.sort((a, b) =>
          this.sortFn(Date.parse(a.created_at), Date.parse(b.created_at))
        );
      }
      if (item == "Data Atribuição") {
        this.appointmentsBkp.sort((a, b) =>
          this.sortFn(
            Date.parse(a.assignmentDate),
            Date.parse(b.assignmentDate)
          )
        );
      }
      if (item == "Candidato" || item == "Nome") {
        this.appointmentsBkp.sort((a, b) =>
          this.sortFn(a.lead.name, b.lead.name)
        );
      }
      if (item == "Melhor Horário") {
        this.appointmentsBkp.sort((a, b) =>
          this.sortFn(
            Date.parse(a.lead.best_hour),
            Date.parse(b.lead.best_hour)
          )
        );
      }
      if (item == "Meio Contato") {
        this.appointmentsBkp.sort((a, b) => this.sortFn(a.channel, b.channel));
      }
      if (item == "Distribuidor") {
        this.appointmentsBkp.sort((a, b) =>
          this.sortFn(a.distributor.name, b.distributor.name)
        );
      }
      if (item == "Transferência") {
        this.appointmentsBkp.sort((a, b) =>
          this.sortFn(a.assignmentTimes, b.assignmentTimes)
        );
      }
      this.alterPage(1);
    },
    sortFn(a, b) {
      if (this.sort) return a > b ? 1 : b > a ? -1 : 0;
      return a < b ? 1 : b < a ? -1 : 0;
    },
    handlePaneOpened(num) {
      this.openPaneNum = this.openPaneNum == num ? 0 : num;
      if (this.openPaneNum)
        setTimeout(() => {
          document.querySelector(`.head-${num - 1}`).scrollIntoView({
            behavior: "smooth",
          });
        }, 250);
    },
    handleReceive() {
      const { distributor_id } = JSON.parse(localStorage.getItem("user"));
      block({ distributor_id, event: "not-receiving-leads" })
        .then(() => {
          this.disabled = this.receiveLead || this.paused;
          this.blocked = true;
          this.showModalNotReceive = false;
        })
        .catch((err) => {
          this.$toast.open({
            position: "top",
            message: `${err.response.data.message}`,
            type: "error",
          });
          this.receiveLead = true;
        });
    },
    handlePause() {
      if (!this.paused && this.blockUntil) {
        const { distributor_id } = JSON.parse(localStorage.getItem("user"));
        block({
          distributor_id,
          event: "auto-blocked",
          block_until: this.blockUntil,
        })
          .then(() => {
            this.showModalUpdateStatus = false;
            this.paused = true;
            this.disabled = this.receiveLead || this.paused;
          })
          .catch((err) => {
            this.$toast.open({
              position: "top",
              message: `${err.response.data.message}`,
              type: "error",
            });
          });
      }
    },
    handleResume() {
      if (this.paused) {
        const { distributor_id } = JSON.parse(localStorage.getItem("user"));
        updateStatus({
          distributor_id,
          event: "unblocked",
          block_until: null,
        })
          .then(() => {
            this.paused = false;
            this.disabled = this.receiveLead || this.paused;
          })
          .catch((err) => {
            this.$toast.open({
              position: "top",
              message: `${err.response.data.message}`,
              type: "error",
            });
          });
      }
    },
    init() {
      const { distributor_id } = JSON.parse(localStorage.getItem("user"));
      showDistributor(distributor_id).then((distributor) => {
        this.paused =
          distributor.config.block &&
          distributor.config.block_event == "auto-blocked";
        this.receiveLead =
          distributor.config.block &&
          distributor.config.block_event == "not-receiving-leads";
        this.disabled = this.receiveLead || this.paused;
      });
      getAppointmentsById(distributor_id)
        .then(async (r) => {
          this.totalPages = parseInt(Math.ceil(r.length / this.limit));
          this.appointmentsBkp = r;

          let now = Date.now();
          this.appointmentsBkp = this.appointmentsBkp.map(
            ({ updated_at, ...data }) => {
              now;
              let prazo = 48 * 36e5 - (now - Date.parse(updated_at));
              prazo = Math.ceil(prazo / 36e5);
              prazo = prazo < 0 ? 0 : prazo;
              return { updated_at, prazo, ...data };
            }
          );

          this.appointmentsBkp.sort(
            (b, a) => Date.parse(a.updated_at) - Date.parse(b.updated_at)
          );

          this.appointments = this.paginate(
            [...this.appointmentsBkp],
            this.limit,
            this.page
          );
          this.isLoading = false;

          // this.appointments = [];
          // for (const appointment of r) {
          //   appointment.assignments = await getAssignmentsById(
          //     appointment.lead_id
          //   );
          //   const filtered = appointment.assignments.filter(
          //     (ass) => ass.event == "assigned"
          //   );
          //   if (filtered.length) {
          //     appointment.assignmentDate = filtered[0].created_at;
          //     appointment.assignmentTimes = filtered.length;
          //   }
          //   this.appointments.push(appointment);
          //   this.isLoading = false;
          //   this.$emit("initLoad");
          // }
          // this.$emit("loaded");
        })
        .catch(console.error);
    },
  },
};
</script> 

<style scoped>
.custom-switch {
  padding-left: 5rem !important;
  margin-right: 2rem !important;
  transform: scale(1.2);
}
</style>