
<template>
  <div
    style="margin-top: 10%"
    class="animated fadeIn d-flex align-items-center justify-content-center"
    v-if="isLoadingCampaign"
  >
    <div
      style="width: 10rem; height: 10rem"
      class="spinner-border text-primary"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <section v-else class="animated fadeIn" id="tables">
    <div class="mt-4">
      <h3>Detalhes da campanha "{{ campaign.name }}"</h3>
    </div>
    <mdb-row class="mt-4">
      <mdb-col xl="2" md="4"  class="mb-3">
        <mini-cards
          color="blue-grey"
          title="TOTAL DE OPORTUNIDADES"
          :value="formatCardValue(cards.totalOfOpportunities || 0)"
        />
      </mdb-col>
      <mdb-col xl="2" md="4" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="NÃO HOUVE CONTATO"
          :value="formatCardValue(cards.thereWasNoContact || 0)"
        />
      </mdb-col>
       <mdb-col xl="2" md="4" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="CONTATO REALIZADO"
          :value="formatCardValue(cards.contactMade || 0)"
        />
      </mdb-col>
      <mdb-col xl="2" md="4" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="NÃO TEM INTERESSE"
          :value="formatCardValue(cards.notInterested || 0)"
        />
      </mdb-col>
     
      <mdb-col xl="2" md="4" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="TEM INTERESSE"
          :value="formatCardValue(cards.hasInterest || 0)"
        />
      </mdb-col>
      
       <mdb-col xl="2" md="4" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="SEM RETORNO DE CONTATO"
          :value="formatCardValue(cards.noContactReturn || 0)"
        />
      </mdb-col>
    </mdb-row>

    <mdb-row class="mt-4">
      <mdb-col>
        <div class="w-100 d-flex flex-column align-items-center">
          <mdb-tbl responsive hover bordered class="w-100 text-center">
            <thead class="bg-color-table">
              <tr class="text-white">
                <th v-for="column in columns" :key="column">
                  {{ column }}
                  <mdb-icon
                    v-if="
                      ['Nome da oportunidade', 'Comentário'].includes(column)
                    "
                    @click.native="handleSort(column)"
                    style="cursor: pointer; margin-left: 4px"
                    icon="sort"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bordered"
                
                v-for="(item, index) in data"
                :key="index"
              >
                <td>
                  <span class="first-text font-weight-bold">
                    {{ item.name }}
                  </span>
                </td>
                <td>
                  <span class="first-text font-weight-bold">
                    {{ item.phones.join(", ") }}
                  </span>
                </td>
                <td>
                  <span class="first-text font-weight-bold">
                    {{ item.comment.join(' ') }}
                  </span>
                </td>
              </tr>
            </tbody>
          </mdb-tbl>
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
      </mdb-col>
    </mdb-row>

    <!-- EDIT DISTRIBUTOR STATUS -->
  </section>
</template>

<script>
import MiniCards from "../../components/Cards/MiniCards";

import {
  mdbRow,
  mdbCol,
  mdbTbl,
  mdbPagination,
  mdbPageItem,
  mdbPageNav,
  mdbIcon,
} from "mdbvue";
import { updateStatus } from "../../services/Distributors";
import { getCampaign } from "../../services/Campaign";
import { updateStatusAppointment } from "../../services/Appointments";
import { format } from "date-fns";
export default {
  name: "Campaign",
  components: {
    mdbRow,
    mdbCol,
    mdbTbl,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
    mdbIcon,
    MiniCards,
  },
  data() {
    return {
      campaign: {},
      cards: {},

      showModalUpdateStatus: false,
      showModalUpdateStatusLead: false,
      typeSelect: "",
      blockUntil: format(new Date(), "yyyy-MM-dd"),
      blocks: "",
      distributor: {
        config: {},
        rank: "",
      },
      appointments: [],
      appointmentsBkp: [],
      appointmentId: "",
      leadSelect: "",
      inputSearch: "",
      leadsStatus: [
        { name: "Aberto", type: "opened" },
        { name: "Atribuido", type: "assigned" },
        { name: "Negado", type: "denied" },
        { name: "Redistribuido", type: "reallocated" },
        { name: "Finalizado", type: "done" },
      ],

      columns: [
        "Nome da oportunidade",
        "Telefone(s)",
        "Comentário",
        // "Alterar Status",
      ],
      isLoadingCampaign: true,
      data: [],
      dataBkp: [],
      dataSearch: [],
      dataOrder: [],
      limit: 10,
      page: 1,
      totalPages: 0,
      order: true,
    };
  },
  watch: {
    inputSearch() {
      this.appointments = this.appointmentsBkp.filter((item) =>
        item["name"].toLowerCase().includes(this.inputSearch.toLowerCase())
      );
    },
  },
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
  mounted() {
    this.renderComponent();

    // getBlocks()
    //   .then((res) => {
    //     this.blocks = res;
    //   })
    //   .catch(() => {
    //     this.$toast.open({
    //       position: "top",
    //       message:
    //         "Ops, aconteceu um erro ao listar os tipos de bloqueios! Tente mais tarde!",
    //       type: "error",
    //     });
    //   });
  },
  methods: {
    formatCardValue(value) {
      return `${value}`.padStart(2, "0");
    },
    handleSubmitStatus() {
      if (!this.typeSelect) {
        console.error("error");
      } else {
        if (
          this.typeSelect !== "suspended" &&
          this.typeSelect !== "auto-blocked"
        )
          this.blockUntil = null;
        const data = {
          distributor_id: this.$route.params.id,
          block_until: this.blockUntil,
          event: this.typeSelect,
        };
        updateStatus(data)
          .then(() => {
            this.showModalUpdateStatus = false;
          })
          .catch(() => {
            this.showModalUpdateStatus = false;
            this.$toast.open({
              position: "top",
              message:
                "Ops, aconteceu um erro ao editar o status do distribuidor! Tente mais tarde!",
              type: "error",
            });
          });
      }
    },
    handleSubmitStatusLead() {
      if (!this.leadSelect) {
        console.error("error");
      } else {
        const data = {
          distributor_id: this.$route.params.id,
          appointment: this.appointmentId,
          event: this.leadSelect,
        };
        updateStatusAppointment(data)
          .then(() => {
            this.showModalUpdateStatusLead = false;
          })
          .catch(() => {
            this.showModalUpdateStatusLead = false;
            this.$toast.open({
              position: "top",
              message:
                "Ops, aconteceu um erro ao editar o status do lead! Tente mais tarde!",
              type: "error",
            });
          });
      }
    },
    dateFormat(data) {
      return data ? format(Date.parse(data), "dd/MM/yyyy HH:mm") : "";
    },
    renderComponent() {
      this.isLoadingCampaign = true;
      getCampaign(this.$route.params.id)
        .then((res) => {
          console.log("1");
          this.campaign = res;
          const {
            totalOfOpportunities,
            notInterested,
            contactMade,
            didNotAnswer,
            scheduledMeeting,
            opportunities,
            recap,
            thereWasNoContact,
            hasInterest,
            noContactReturn
          } = res;
          console.log("2");
          this.cards = {
            totalOfOpportunities,
            notInterested,
            contactMade,
            didNotAnswer,
            scheduledMeeting,
            recap,
            thereWasNoContact,
            hasInterest,
            noContactReturn
          };
          console.log("3");
          this.dataBkp = [...opportunities];
          console.log("4");
          this.totalPages = parseInt(
            Math.ceil(opportunities.length / this.limit)
          );
          console.log("5");
          this.data = this.paginate([...opportunities], this.limit, this.page);
          console.log("6");
          this.isLoadingCampaign = false;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados da campanha! Tente mais tarde!",
            type: "error",
          });
        });
    },
    handleSort(item) {
      this.sort = !this.sort;
      this.dataSearch = [...this.dataBkp];
      if (item == "Nome da oportunidade") {
        this.dataSearch.sort((a, b) => this.sortFn(a.name, b.name));
      }
      if (item == "Comentário") {
        this.dataSearch.sort((a, b) => this.sortFn(a.comment ||'Z', b.comment ||'Z'));
      }
      this.alterPage(1);
    },
    sortFn(a, b) {
      if (this.sort) return a > b ? 1 : b > a ? -1 : 0;
      return a < b ? 1 : b < a ? -1 : 0;
    },
    alterPage(n) {
      this.page = n;
      const data = this.dataSearch.length > 0 ? this.dataSearch : this.dataBkp;
      this.data = this.paginate(data, this.limit, this.page);
    },
    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.first-text {
  color: #464e5f;
}
.second-text {
  color: #77777a;
}
.three-text {
  color: #77777a;
}
.image-avatar {
  width: 150px;
}
.card.card-cascade .view.gradient-card-header {
  padding: 1rem 1rem;
  text-align: center;
}
.card.card-cascade h3,
.card.card-cascade h4 {
  margin-bottom: 0;
}
.text-size {
  font-size: 11pt;
}
.white-text {
  color: #fff;
}
.btn-circle {
  border-radius: 50%;
}

/* <mdb-row>
      <mdb-col xl="2" md="2" class="mb-r">
        <mdb-card class="classic-admin-card mt-2 blue accent-2">
          <mdb-card-body>
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center">
                <p class="ml-3 white-text">
                  <strong class="">TOTAL DE LEADS</strong>
                </p>
              </div>
              <div class="mt-2 white-text">
                <h3>
                  <!-- <strong>{{ total }}</strong> -->
                  <strong>50</strong>
                </h3>
              </div>
            </div>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-r">
        <mdb-card class="classic-admin-card mt-2 blue accent-2">
          <mdb-card-body>
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center">
                <p class="ml-3 white-text">
                  <strong class="">RESPONDIDOS</strong>
                </p>
              </div>
              <div class="mt-2 white-text">
                <h3>
                  <strong>{{ auto_blocked }}</strong>
                </h3>
              </div>
            </div>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-r">
        <mdb-card class="classic-admin-card mt-2 blue accent-2">
          <mdb-card-body>
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center">
                <p class="ml-3 white-text">
                  <strong class="">TRANSFERIDOS</strong>
                </p>
              </div>
              <div class="mt-2 white-text">
                <h3>
                  <strong>0</strong>
                  <!-- <strong>{{ is_online }}</strong> -->
                </h3>
              </div>
            </div>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-r">
        <mdb-card class="classic-admin-card mt-2 blue accent-2">
          <mdb-card-body>
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center">
                <p class="ml-3 white-text">
                  <strong class="">EXPIRADOS</strong>
                </p>
              </div>
              <div class="mt-2 white-text">
                <h3>
                  <strong>{{ can_not_receive_lead }}</strong>
                </h3>
              </div>
            </div>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row> */
.bg {
  background: #3f729b;
}
</style>
