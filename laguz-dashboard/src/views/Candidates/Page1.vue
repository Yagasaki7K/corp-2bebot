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
  <section class="animated fadeIn" v-else>
    <mdb-row class="mb-3">
      <mdb-col xl="3" md="3" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="TOTAL CANDIDATOS"
          :value="formatCardValue(cards.total || 0)"
        />
      </mdb-col>
      <mdb-col xl="3" md="3" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="ATENDIDOS"
          :value="formatCardValue(cards.done || 0)"
        />
      </mdb-col>
      <mdb-col xl="3" md="3" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="PENDENTES"
          :value="formatCardValue(cards.open || 0)"
        />
      </mdb-col>
      <mdb-col xl="3" md="3" class="mb-r">
        <mini-cards
          color="blue-grey"
          title="TRANSFERIDOS"
          :value="formatCardValue(cards.expired || 0)"
        />
      </mdb-col>
    </mdb-row>
    <div class="body">
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
          <mdb-btn
            class="btn btn-rounded m-0 ml-2"
            color="default"
            @click.native="search"
          >
            Buscar</mdb-btn
          >
        </form>

        <mdb-btn
          class="btn btn-rounded m-0 mb-2"
          color="default"
          @click.native="showTransfer = true"
        >
          <mdb-icon icon="user-plus" /> Transferir Manual</mdb-btn
        >
      </div>
      <transfer
        @transfered="init"
        :show="showTransfer"
        @close="showTransfer = false"
      />
      <Table
        showForm="vertical"
        :showTimeline="true"
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
  </section>
</template>

<script>
import MiniCards from "../../components/Cards/MiniCards";
import {
  mdbRow,
  mdbBtn,
  mdbIcon,
  mdbInput,
  mdbCol,
  mdbPagination,
  mdbPageItem,
  mdbPageNav,
} from "mdbvue";
import Table from "./Table/Table";
import { getAppointments, getStatusAppointments } from "@/services/Candidates";
// import { showDistributor } from "../../services/Distributors";
import Transfer from "./Transfer.vue";
export default {
  components: {
    Table,
    mdbRow,
    mdbBtn,
    mdbIcon,
    Transfer,
    mdbCol,
    MiniCards,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
    mdbInput,
  },
  computed: {
    reallocateds() {
      return this.appointmentsBkp.reduce(
        (sum, app) => sum + ((app.assignmentTimes || 0) >= 1 ? 1 : 0),
        0
      );
    },
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

  data() {
    return {
      sortKey: "created_at",
      cards: {},
      filter: "",
      openPaneNum: 0,
      sort: true,
      leads: [],
      appointments: [],
      appointmentsBkp: [],
      isLoading: true,
      showTransfer: false,
      status: {
        no_contact_yet: false,
        already_contacted: true,
        no_answer: true,
        no_interest: true,
      },
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    search() {
      this.alterPage(1);
    },
    async alterPage(n) {
      this.openPaneNum = 0;
      this.page = n;
      try {
        const { appointments, total } = await getAppointments(
          `/paginated?page=${this.page}&page_size=${this.limit}${
            this.filter.trim() ? "&lead_name=" + this.filter.trim() : ""
          }&order_key=${this.sortKey}&order_sort=${this.sort ? "DESC" : "ASC"}`
        );
        this.totalPages = parseInt(Math.ceil(total / this.limit));
        const pageAppointments = appointments.map(({ assigns, ...data }) => {
          let filtered = assigns.filter(
            (ass) =>
              ass.event == "reallocated" ||
              ass.event == "denied" ||
              ass.event == "expired"
          );
          let assignedFilter = assigns.filter((ass) => ass.event == "assigned");
          let assignmentDate;
          let assignmentTimes;
          if (filtered.length) {
            assignmentDate = filtered[0].created_at;
            assignmentTimes = filtered.length;
          } else {
            if (assignedFilter[0])
              assignmentDate = assignedFilter[0].created_at;
            assignmentTimes = 0;
          }
          assigns = assigns.reverse();
          return { assigns, assignmentDate, assignmentTimes, ...data };
        });
        this.appointments = [...pageAppointments];
      } catch (error) {
        console.error(error);
      }
    },
    paginate(array, page_size, page_number) {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
    handleSort(item) {
      this.sort = !this.sort;
      if (item == "Data Candidatura" || item == "Data") {
        this.sortKey = "created_at";
      }
      if (item == "Data Atribuição") {
        this.sortKey = "updated_at";
      }
      if (item == "Candidato" || item == "Nome") {
        // this.appointmentsBkp.sort((a, b) =>
        //   this.sortFn(a.lead.name, b.lead.name)
        // );
      }
      if (item == "Melhor Horário") {
        // this.appointmentsBkp.sort((a, b) =>
        //   this.sortFn(
        //     Date.parse(a.lead.best_hour),
        //     Date.parse(b.lead.best_hour)
        //   )
        // );
      }
      if (item == "Meio Contato") {
        // this.appointmentsBkp.sort((a, b) => this.sortFn(a.channel, b.channel));
        this.sortKey = "channel";
      }
      if (item == "Distribuidor") {
        // this.appointmentsBkp.sort((a, b) =>
        //   this.sortFn(a.distributor.name, b.distributor.name)
        // );
      }
      if (item == "Transferência") {
        // this.appointmentsBkp.sort((a, b) =>
        //   this.sortFn(a.assignmentTimes, b.assignmentTimes)
        // );
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
    async init() {
      try {
        await this.alterPage(1);
        this.isLoading = false;
        this.cards = await getStatusAppointments();
      } catch (error) {
        console.error(error);
      }
    },
    formatCardValue(value) {
      return `${value}`.padStart(2, "0");
    },
    filterPendentes(a) {
      return a.attendance_status === "no_contact_yet";
    },
    filterAgendados(a) {
      return a.status === "assigned";
    },
    filterFinalizados(a) {
      return a.attendance_status === "already_contacted";
    },
    filterTransferido(a) {
      a;
      return false;
    },
    filterWhatsapp(a) {
      return a.channel === "phone";
    },
    filterEmail(a) {
      return a.channel === "email";
    },
    filterAtendido(candidate) {
      return this.status[candidate.attendance_status];
    },
  },
};
</script>

<style scoped>
.button-add {
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 100%;
  height: 100%;
  padding: 0px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
</style>