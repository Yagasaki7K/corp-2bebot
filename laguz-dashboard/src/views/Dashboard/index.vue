<template>
  <section class="animated fadeIn" id="dashboard">
    <section>
      <mdb-row>
        <mdb-col lg="6" xl="4" md="8" sm="12" class="mt-3 mb-r">
          <new-periods @changePeriod="changePeriod" />
        </mdb-col>
        <mdb-col lg="3" xl="5" lang="1" md="1" class="mt-3 mb-r"> </mdb-col>
        <mdb-col lg="1" xl="1" lang="1" md="1" class="mt-3 mb-r">
          <mdb-btn
            @click="refreshDash"
            color="blue-grey"
            class="m-0 py-4 d-flex justify-content-center align-items-center"
            style="height: 100%"
            block
          >
            <mdb-icon icon="sync-alt" fas color="white" size="2x" />
            <span style="font-size: 10pt" class="font-weight-bold"> </span>
          </mdb-btn>
        </mdb-col>
        <mdb-col lg="2" xl="2" md="3" sm="12" class="mt-3 mb-r">
          <mdb-btn
            @click="showModalCsv = true"
            color="blue-grey"
            class="m-0 py-4 d-flex justify-content-center align-items-center"
            style="height: 100%"
            block
          >
            <mdb-icon
              class="d-none d-xl-inline mr-3"
              icon="file-download"
              fas
              color="white"
              size="2x"
            />
            <span style="font-size: 11pt" class="font-weight-bold">
              Exportar Dados
            </span>
          </mdb-btn>
          <!-- <baixar-xls /> -->
        </mdb-col>
      </mdb-row>
      <mdb-row class="mt-4">
        <mdb-col xl="2" md="6" class="mt-3 mb-r">
          <mini-cards
            color="blue-grey"
            title="LEADS RECEBIDOS"
            :value="app.total"
          />
        </mdb-col>
        <mdb-col xl="2" md="6" class="mt-3 mb-r">
          <mini-cards
            color="blue-grey"
            title="LEADS ATENDIDOS"
            :value="app.done"
          />
        </mdb-col>
        <mdb-col xl="2" md="6" class="mt-3 mb-r">
          <mini-cards
            color="blue-grey"
            title="LEADS PENDENTES"
            :value="app.open"
          />
        </mdb-col>
        <mdb-col xl="2" md="6" class="mt-3 mb-r">
          <mini-cards
            color="blue-grey"
            title="LEADS TRANSFERIDOS"
            :value="app.expired"
          />
        </mdb-col>
        <mdb-col xl="2" md="6" class="mt-3 mb-r">
          <mini-cards
            color="blue-grey"
            title="SUSPENSOS PERIODO"
            :value="suspended"
            icon="exclamation-circle"
          />
        </mdb-col>
        <mdb-col xl="2" md="6" class="mt-3 mb-r">
          <mini-cards
            color="blue-grey"
            title="TOTAL SUSPENSOS"
            :value="suspended"
            icon="exclamation-circle"
          />
        </mdb-col>
      </mdb-row>
      <mdb-row class="mt-5">
        <mdb-col md="12">
          <mdb-card style="min-height: 400px">
            <mdb-card-body>
              <div style="display: block">
                <candidates-title
                  style="max-height: 380px"
                  v-if="responseAppointmentsRanks"
                  :response="{
                    res1: responseAppointmentsRanks || [],
                    res2: responseAssignmentsByRank || [],
                    res3: responseAppointmentsByRankSold || [],
                    res4: responseAppointmentsWait || [],
                  }"
                />
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <!-- <mdb-col xl="4" md="4" class="mb-r">
          <mapa-calor
            style="min-height: 480px"
            v-if="responseAppointmentsStates"
            :response="responseAppointmentsStates"
          />
        </mdb-col> -->

        <!-- <mdb-col xl="4" md="4" class="mb-r">
          <proximos-distribuidores
            v-if="distributors"
            style="min-height: 400px"
            :distributors="distributors"
          />
        </mdb-col> -->
      </mdb-row>
    </section>
    <section>
      <mdb-row class="mt-5">
        <mdb-col md="12">
          <mdb-card style="min-height: 400px">
            <mdb-card-body>
              <div style="display: block">
                <percentage-candidates-title
                  style="max-height: 380px"
                  v-if="responseAppointmentsRanks"
                  :response="{
                    res1: responseAppointmentsRanks || [],
                    res2: responseAssignmentsByRank || [],
                    res3: responseAppointmentsByRankSold || [],
                    res4: responseAppointmentsWait || [],
                  }"
                />
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
     <section>
      <mdb-row class="mt-5">
        <mdb-col md="12">
          <mdb-card style="min-height: 400px">
            <mdb-card-body>
              <div style="display: block">
                <daily-candidates
                  style="max-height: 380px"
                  v-if="responseAppointmentsRanks"
                  :response="{
                    byDate:app.byDate
                  }"
                />
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
    <section>
      <mdb-row class="mt-5">
        <mdb-col xl="4" md="12" sm="12" class="mb-r">
          <where-knowlegde
            style="min-height: 480px"
            v-if="responseWhereKnowledge"
            :response="responseWhereKnowledge"
          />
        </mdb-col>
        <mdb-col xl="4" md="12" sm="12">
          <mdb-card style="min-height: 480px">
            <mdb-card-header class="text-center">
              Meio de contato Preferêncial
            </mdb-card-header>
            <mdb-card-body>
              <access v-if="responseAccess" :response="responseAccess"></access>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="4" md="12" sm="12">
          <mdb-card style="min-height: 480px">
            <mdb-card-header class="text-center">Sexo </mdb-card-header>
            <mdb-card-body
              class="d-flex align-items-center justify-content-center"
            >
              <!-- <pyramid></pyramid> -->
              <genre-charts
                style="max-width: 350px; max-height: 400px"
                v-if="responseGenres"
                :response="responseGenres"
              />
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <!-- <mdb-col md="4">
          <mdb-card>
            <mdb-card-header class="text-center">
              Por onde conheceu
            </mdb-card-header>
            <mdb-card-body>
              <where-knowlegde
                v-if="responseWhereKnowledge"
                :response="responseWhereKnowledge"
              />
            </mdb-card-body>
          </mdb-card>
        </mdb-col> -->
        <!-- <mdb-col md="4" style="height: 300px">
          <tempo-medio />
        </mdb-col> -->

        <!-- <mdb-col md="6">
          <mdb-card>
            <mdb-card-header class="text-center"
              >Transferếncia por Titulos</mdb-card-header
            >
            <mdb-card-body>
              <div style="display: block">
                <transactions-title
                  v-if="responseAssignmentsByRank"
                  :response="responseAssignmentsByRank"
                />
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col> -->
      </mdb-row>
      <!--<mdb-row class="mt-5">
        
         <mdb-col md="6">
          <mdb-card>
            <mdb-card-header class="text-center"
              >Vendas por titulo</mdb-card-header
            >
            <mdb-card-body>
              <div style="display: block">
                <sell-titles
                  v-if="responseAppointmentsByRankSold"
                  :response="responseAppointmentsByRankSold"
                />
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col> 
      </mdb-row>-->
    </section>
    <portal to="notification-outlet">
      <mdb-modal size="md" :show="showModalCsv" @close="showModalCsv = false">
        <mdb-modal-header>
          <mdb-modal-title>Extrair Dados</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form
            class="
              d-flex
              flex-column flex-md-row
              align-items-md-end
              justify-content-md-center
              px-4
            "
          >
            <div class="form-group">
              <label for="startDate">Data de início</label>
              <input
                v-model="startDateCsv"
                id="startDate"
                name="startDate"
                type="date"
                :max="new Date().toISOString().split('T')[0]"
                class="form-control form-control-sm"
                @click.stop
              />
            </div>
            <div class="ml-md-4 form-group">
              <label for="endDate">Data Final</label>
              <input
                v-model="endDateCsv"
                id="endDate"
                name="endDate"
                type="date"
                :max="new Date().toISOString().split('T')[0]"
                class="form-control form-control-sm"
                @click.stop
              />
            </div>
          </form>
          <div
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <!-- <mdb-alert class="w-100" color="warning">
              O periodo a ser extraido é de
              {{ new Date(startDateCsv).toLocaleDateString("pt-BR") }} até
              {{ new Date(endDateCsv).toLocaleDateString("pt-BR") }}
            </mdb-alert> -->
          </div>
        </mdb-modal-body>
      </mdb-modal>
    </portal>

    <!-- Editar Password -->
    <portal to="notification-outlet">
      <mdb-modal
        size="md"
        :show="showModalPassword"
        @close="showModalPassword = false"
      >
        <mdb-modal-header>
          <mdb-modal-title
            >Esse é seu primeiro acesso, altere sua senha!</mdb-modal-title
          >
        </mdb-modal-header>
        <mdb-modal-body>
          <form class="d-flex flex-column px-4">
            <div class="form-group">
              <label for="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                class="form-control form-control-sm"
              />
            </div>
            <div class="form-group">
              <label for="repear-password">Confirme sua senha</label>
              <input
                id="repear-password"
                name="repear-password"
                type="password"
                class="form-control form-control-sm"
              />
            </div>

            <mdb-btn color="primary" size="sm" type="button" class="w-100 m-0"
              >Alterar senha</mdb-btn
            >
          </form>
        </mdb-modal-body>
      </mdb-modal>
    </portal>
  </section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  // mdbAlert,
  mdbBtn,
  mdbIcon,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
} from "mdbvue";
// import ResumoAcessos from "../../components/Cards/ResumoAcessos";
// import BaixarXls from "../../components/Cards/BaixarXls";
import NewPeriods from "../../components/Cards/newPeriods";
import MiniCards from "../../components/Cards/MiniCards";
// import MapaCalor from "../../components/Cards/MapaCalor";
import WhereKnowlegde from "../../components/Cards/WhereKnowledge";
// import Pyramid from "../../components/Charts/Pyramid";
import Access from "../../components/Charts/Access";
import GenreCharts from "../../components/Charts/Genre";
// import WhereKnowlegde from "../../components/Charts/whereKnowlegde";
// import TempoMedio from "../../components/Charts/TempoMedio";
import CandidatesTitle from "../../components/Charts/CandidatesTitle";
import PercentageCandidatesTitle from "../../components/Charts/PercentageCandidatesTitle";
import DailyCandidates from "../../components/Charts/DailyCandidates"
// import TransactionsTitle from "../../components/Charts/TransactionsTitle";
// import SellTitles from "../../components/Charts/SellTitles";
// import CandidatesSell from "../../components/Charts/CandidatesSell";
// import ProximosDistribuidores from "../../components/Cards/ProximosDistribuidores";
import {
  getDistributors,
  // getLastDistributors,
  getGenresChart,
  getFromChannelsChart,
  getAppointments,
  // getConversions,
  getAppointmentsByRanks,
  getAssignmentsByRank,
  getAppointmentsByRankSold,
  getWhereKnowledge,
  getTransfers,
  getStatusAppointments,
  getAppointmentsWait,
} from "../../services/Dashboard";
import { format, startOfMonth } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
// import { getInfos } from "../../services/Appointments";
export default {
  name: "Dashboard",
  components: {
    // Pyramid,
    mdbRow,
    Access,
    mdbBtn,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbIcon,
    mdbCardHeader,
    // ResumoAcessos,
    MiniCards,
    // BaixarXls,
    // MapaCalor,
    // ProximosDistribuidores,
    GenreCharts,
    WhereKnowlegde,
    // mdbAlert,
    // TempoMedio,
    CandidatesTitle,
    // TransactionsTitle,
    // SellTitles,
    // CandidatesSell,
    NewPeriods,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    PercentageCandidatesTitle,
    DailyCandidates
  },
  data() {
    return {
      responseAppointments: {},
      responseAppointmentsStates: {
        total: 0,
        states: [],
      },
      can_receive: 0,
      blocked: 0,
      suspended: 0,
      auto_blocked: 0,
      can_not_receive_lead: 0,
      done: 0,
      answered: 0,
      schedules: 0,
      pending: 0,
      total: 0,
      distributors: null,
      responseGenres: {
        feminino: 0,
        masculino: 0,
      },
      responseAccess: [],
      responseAppointmentsRanks: [],
      responseAssignmentsByRank: [],
      responseAppointmentsByRankSold: [],
      responseAppointmentsWait: [],
      responseWhereKnowledge: false,

      channelOptions: {
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
      channelData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [""],

        datasets: [
          {
            label: "Acessos",
            backgroundColor: [
              "#E46651",
              "#00D8FF",
              "#00ff00",
              "#FFFF00",
              "#800080",
              "#000000",
            ],
            data: [],
          },
        ],
      },
      startDate: format(startOfMonth(new Date()), "yyyy-MM-dd", {
        locale: ptBr,
      }),
      endDate: format(new Date(), "yyyy-MM-dd", { locale: ptBr }),
      startDateCsv: format(startOfMonth(new Date()), "yyyy-MM-dd", {
        locale: ptBr,
      }),
      endDateCsv: format(new Date(), "yyyy-MM-dd", { locale: ptBr }),
      showModalCsv: false,
      showModalPassword: false,
      intro: true,

      app: {},
    };
  },
  mounted() {
    this.callApis();
  },
  methods: {
    changePeriod(startDate, endDate) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.callApis();
    },
    refreshDash() {
      this.callApis();
    },
    callApis() {
      const dates = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.isLoadingGenre = true;
      this.isLoadingWhere = true;
      this.isLoadingAccess = true;
      this.isLoadingTotal1 = true;
      this.isLoadingTotal2 = true;
      this.isLoadingTotal3 = true;
      this.isLoadingCandidatesSell = true;

      // getInfos(dates)
      //   .then(({ leads }) => {
      //     this.app = leads;
      //   })
      //   .catch(() => {
      //     this.$toast.open({
      //       position: "top",
      //       message:
      //         "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
      //       type: "error",
      //     });
      //   });

      getStatusAppointments(dates)
        .then((res) => {
          this.app = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });

      getDistributors(dates)
        .then((res) => {
          this.suspended = res.suspended;
          this.can_receive = res.can_receive;
          this.blocked = res.blocked;
          this.auto_blocked = res.auto_blocked;
          this.can_not_receive_lead = res.can_not_receive_lead;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados do distribuidores! Tente mais tarde!",
            type: "error",
          });
        });
      getAppointments(dates)
        .then((res) => {
          this.responseAppointments = res;
          this.responseAppointmentsStates = res.appointmentStates;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados do leads! Tente mais tarde!",
            type: "error",
          });
        });
      // getLastDistributors()
      //   .then((res) => {
      //     this.distributors = res.filter((item) => item.config.block == false);
      //   })
      //   .catch(() => {
      //     this.$toast.open({
      //       position: "top",
      //       message:
      //         "Ops, aconteceu um erro ao buscar os dados do ultimos distribuidores! Tente mais tarde!",
      //       type: "error",
      //     });
      //   });
      getGenresChart(dates)
        .then((res) => {
          this.isLoadingGenre = false;
          this.responseGenres = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });
      // getConversions(dates)
      //   .then((res) => {
      //     this.isLoadingCandidatesSell = false;
      //     this.responseConversions = res;
      //   })
      //   .catch(() => {
      //     this.$toast.open({
      //       position: "top",
      //       message:
      //         "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
      //       type: "error",
      //     });
      //   });
      getFromChannelsChart(dates)
        .then((res) => {
          this.isLoadingAccess = false;
          this.responseAccess = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });
      getAppointmentsByRanks(dates)
        .then((res) => {
          this.isLoadingTotal1 = false;
          this.responseAppointmentsRanks = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });
      getAssignmentsByRank;
      getTransfers(dates)
        .then((res) => {
          this.isLoadingTotal2 = false;
          this.responseAssignmentsByRank = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });

      getAppointmentsByRankSold(dates)
        .then((res) => {
          this.isLoadingTotal3 = false;
          this.responseAppointmentsByRankSold = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });

      getAppointmentsWait(dates)
        .then((res) => {
          this.responseAppointmentsWait = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });

      getWhereKnowledge(dates)
        .then((res) => {
          this.isLoadingWhere = false;
          this.responseWhereKnowledge = res.slice(0, 6);
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados! Tente mais tarde!",
            type: "error",
          });
        });
    },
  },
  watch: {
    startDate() {
      this.callApis();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-avatar {
  width: 40px;
}
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 12px;
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
