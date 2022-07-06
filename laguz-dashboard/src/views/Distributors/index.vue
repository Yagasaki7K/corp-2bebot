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
  <section v-else class="animated fadeIn" id="tables">
    <mdb-row>
      <mdb-col xl="2" md="2" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="TOTAL DISTRIBUIDORES"
          :value="total"
        />
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="ATIVOS"
          :value="
            total - (auto_blocked + blocked + suspended + can_not_receive_lead)
          "
        />
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="AUTO BLOQUEIOS"
          :value="auto_blocked"
        />
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-3">
        <mini-cards color="blue-grey" title="SUSPENSO" :value="suspended" />
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="NÃO QUERO"
          secondLine="RECEBER LEAD"
          :value="can_not_receive_lead"
        />
      </mdb-col>
      <mdb-col xl="2" md="2" class="mb-3">
        <mini-cards
          color="blue-grey"
          title="INDISPONÍVEL"
          :value="notAvaliable + '%'"
        />
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="12">
        <data-table v-on:refresh="refresh" />
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  // mdbTbl,
} from "mdbvue";
import { getDistributors } from "../../services/Dashboard";
import MiniCards from "../../components/Cards/MiniCards";
import {
  getDistributors as findAllDistributors,
  createDistributors,
  updateDistributors,
} from "../../services/Distributors";
import { getAllRanks } from "../../services/Ranks";
import DataTable from "./Table";
export default {
  name: "Distributors",
  components: {
    mdbRow,
    mdbCol,
    // mdbTbl,

    MiniCards,
    DataTable,
  },
  data() {
    return {
      inputSearch: "",
      disabledAdd: false,
      ranks: [],
      showModalAdd: false,
      showModalEdit: false,
      data: [],
      dataBkp: [],
      itemEdit: {
        config: {
          priority: 0,
        },
        rank: "",
        rank_id: [],
      },
      columns: [
        "Distribuidor",
        "Titulo",
        "Bloqueio",
        "Status",
        "Candidatos Recebidos",
        "Candidatos Status",
      ],
      suspended: 0,
      blocked: 0,
      auto_blocked: 0,
      can_not_receive_lead: 0,
      can_receive: 0,
      is_online: 0,
      total: 0,

      // FORM ADD
      name: "",
      email: "",
      rank_id: ["1"],
      priority: 0,
      phone: "",
      city: "",
      uf: "",
      url_username: "",
      isLoading: false,
    };
  },
  // watch: {
  //   inputSearch() {
  //     this.data = this.dataBkp.filter(
  //       (item) =>
  //         item["name"].toLowerCase().includes(this.inputSearch.toLowerCase()) ||
  //         item["url_username"]
  //           .toLowerCase()
  //           .includes(this.inputSearch.toLowerCase())
  //     );
  //   },
  // },
  mounted() {
    this.renderComponent();
  },
  computed: {
    notAvaliable() {
      return (
        ((this.auto_blocked +
          this.blocked +
          this.suspended +
          this.can_not_receive_lead) /
          this.total) *
        100
      ).toFixed(2);
    },
  },
  methods: {
    renderComponent() {
      getDistributors()
        .then((res) => {
          this.can_receive = res.can_receive;
          this.suspended = res.suspended;
          this.blocked = res.blocked;
          this.auto_blocked = res.auto_blocked;
          this.can_not_receive_lead = res.can_not_receive_lead;
          this.total = res.total;
          this.is_online = res.is_online;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar os dados do distribuidores! Tente mais tarde!",
            type: "error",
          });
        });

      getAllRanks()
        .then((res) => {
          this.ranks = res;
        })
        .catch(() => {
          this.disabledAdd = true;
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao listar os ranks! Tente mais tarde!",
            type: "error",
          });
        });
    },
    refresh() {
      this.renderComponent();
    },
    handleSubmit() {
      const data = {
        name: this.name,
        email: this.email,
        rank_id: this.rank_id,
        priority: this.priority,
        phone: this.phone,
        city: this.city,
        state: this.uf,
        url_username: this.url_username,
      };

      createDistributors(data)
        .then(() => {
          findAllDistributors().then((res) => {
            this.data = res;
          });
          this.showModalAdd = false;
          this.$toast.open({
            position: "top",
            message: "Distribuidor cadastrado com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro o seu distribuidor! Tente mais tarde!",
            type: "error",
          });
          this.showModalAdd = false;
        });
    },
    handleUpdate() {
      const data = {
        distributor_id: this.itemEdit.id,
        name: this.itemEdit.name,
        rank_id: this.itemEdit.rank.id,
        priority: this.itemEdit.config.priority,
        phone: this.itemEdit.phone,
        city: this.itemEdit.city,
        state: this.itemEdit.state,
        url_username: this.itemEdit.url_username,
      };
      updateDistributors(data)
        .then(() => {
          findAllDistributors().then((res) => {
            this.data = res;
          });
          this.showModalEdit = false;
          this.$toast.open({
            position: "top",
            message: "Distribuidor editado com sucesso!",
            type: "success",
          });
          return;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao editar o distribuidor! Tente mais tarde!",
            type: "error",
          });
          this.showModalEdit = false;
          return;
        });
    },

    bloqueType(item) {
      if (item.block && item.block_event == "auto-blocked") {
        return "Autobloqueio";
      }
      if (item.block && item.block_event == "suspended") {
        return "Suspensão";
      }
      if (item.block && item.block_event == "not-receiving-leads") {
        return "Não Receber Leads";
      }
      return "Liberado";
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
  width: 50px;
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
.height-btn {
  height: 40px;
}
.text-btn {
  font-weight: bold;
  text-transform: capitalize;
  font-size: 10pt;
}
</style>
