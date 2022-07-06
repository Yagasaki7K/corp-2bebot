
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
  <section v-else id="tables">
    <mdb-row>
      <mdb-col md="12">
        <router-link
          class="d-block btn-circle btn-lg blue-grey-text"
          to="/distributors"
          ><mdb-icon icon="angle-left" class="m-0" />
          <span class="m-0 font-weight-normal">Voltar</span></router-link
        >
        <mdb-view
          class="bg white-text d-flex px-5 py-3 align-items-center"
          gradient="deep-blue-gradient"
          cascade
        >
          <img
            :src="distributor.avatar_url"
            class="image-avatar rounded-circle mr-4"
          />
          <div style="text-align: center">
            <h2 class="m-0 font-weight-bolder">{{ distributor.name }}</h2>
            <p class="m-0 p-0 font-weight-bolder">
              {{ distributor.rank.name }}
            </p>
          </div>
          <p class="ml-4">
            <span class="font-weight-bold">Username: </span
            >{{ distributor.url_username
            }}<span class="font-weight-bold"> | Email:</span>
            {{ distributor.email
            }}<span class="font-weight-bold"> | Telefone:</span>
            {{ distributor.phone }}
            <span class="font-weight-bold"> | Cidade:</span>
            {{ distributor.city }} - {{ distributor.state }}
          </p>
        </mdb-view>
        <div class="mt-5 d-flex justify-content-between align-items-baseline">
          <div v-if="data.length > 0">
            <form @submit.prevent class="d-flex align-items-center">
              <mdbIcon icon="search" class="mr-3" />

              <mdb-input
                style="width: 210px"
                class="m-0"
                type="text"
                v-model="inputSearch"
                placeholder="Digite o texto para filtrar"
              />
            </form>
          </div>
        </div>
        <div
          class="d-flex flex-column align-items-center"
          v-if="data.length > 0"
        >
          <mdb-tbl hover bordered responsive class="w-100 mt-3 text-center">
            <col style="width: 10rem" />
            <col style="width: 10rem" />
            <col style="width: 8rem" />
            <col style="width: 10rem" />
            <col style="width: 20rem" />
            <col style="width: 10rem" />
            <col style="width: 15rem" />
            <col style="width: 20rem" />
            <thead class="bg-color-table darken-3">
              <tr class="text-white">
                <th
                  class="font-weight-bold"
                  v-for="(item, index) in columns"
                  :key="index"
                >
                  {{ item }}
                  <mdb-icon
                    v-if="item === 'Data Atribuição'"
                    @click.native="handleSort(item)"
                    style="cursor: pointer; margin-left: 4px"
                    icon="sort"
                  />
                  <mdb-icon
                    v-if="item === 'Nome'"
                    @click.native="handleSort(item)"
                    style="cursor: pointer; margin-left: 4px"
                    icon="sort"
                  />
                  <mdb-icon
                    v-if="item === 'Genero'"
                    @click.native="handleSort(item)"
                    style="cursor: pointer; margin-left: 4px"
                    icon="sort"
                  />
                  <mdb-icon
                    v-if="item === 'Campanha'"
                    @click.native="handleSort(item)"
                    style="cursor: pointer; margin-left: 4px"
                    icon="sort"
                  />
                  <mdb-icon
                    v-if="item === 'Endereço'"
                    @click.native="handleSort(item)"
                    style="cursor: pointer; margin-left: 4px"
                    icon="sort"
                  />
                </th>
                <th
                  class="font-weight-bold"
                  v-if="$store.getters['auth/user'].role.name !== 'analytics'"
                >
                  Status
                </th>
                <th
                  class="font-weight-bold"
                  v-if="$store.getters['auth/user'].role.name !== 'analytics'"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <td class="first-text font-weight-bold">
                  {{ dateFormat(item.lead.updated_at) }}
                </td>
                <td class="first-text font-weight-bold">
                  {{ item.lead.name }}
                </td>
                <td class="first-text font-weight-bold">
                  {{ item.lead.phone }}
                </td>
                <td class="first-text font-weight-bold">
                  {{ item.lead.gender }}
                </td>
                <td class="first-text font-weight-bold">
                  {{ getSplitEmail(item.lead.email)[0] }}
                  <br />
                  @{{ getSplitEmail(item.lead.email)[1] }}
                </td>
                <td class="first-text font-weight-bold">
                  {{
                    item.lead.campaign === (undefined || null)
                      ? "Não Possui"
                      : item.lead.campaign.name
                  }}
                </td>
                <td class="first-text font-weight-bold">
                  {{ item.lead.leads_address.city }} -
                  {{ item.lead.leads_address.state }}
                </td>
                <td class="first-text font-weight-bold">
                  {{ item.lead.leads_data.interest }}
                </td>
                <td class="first-text font-weight-bold">
                  <span
                    class="font-weight-bold"
                    v-if="item.attendance_status == 'already_contacted'"
                    >Já Contatado</span
                  >
                  <span
                    class="font-weight-bold"
                    v-if="item.attendance_status == 'no_answer'"
                    >Sem Resposta</span
                  >
                  <span
                    class="font-weight-bold"
                    v-if="item.attendance_status == 'no_interest'"
                    >Sem Interesse</span
                  >
                  <span
                    class="font-weight-bold"
                    v-if="item.attendance_status == 'no_contact_yet'"
                    >Pendente</span
                  >
                </td>
                <td
                  v-if="$store.getters['auth/user'].role.name !== 'analytics'"
                >
                  <div class="d-flex justify-content-center">
                    <mdb-btn
                      type="button"
                      title="Editar status"
                      style="width: 30px; height: 30px"
                      class="
                        d-flex
                        align-items-center
                        justify-content-center
                        btn btn-blue btn-rounded btn-sm
                        m-0
                        p-0 p-2
                        text-btn
                        ml-1
                      "
                      @click.native="
                        () => {
                          appointmentId = item.id;
                          showModalUpdateStatusLead = true;
                        }
                      "
                    >
                      <mdb-icon size="1x" icon="edit" />
                    </mdb-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </mdb-tbl>
          <mdb-pagination lg>
            <!-- <mdb-page-item :disabled="page == 1 ? true : false">Primeiro</mdb-page-item> -->
            <mdb-page-nav :disabled="page == 1 ? true : false"></mdb-page-nav>
            <mdb-page-item
              @click.native="alterPage(n)"
              v-for="n in totalPages"
              :key="n"
              :active="page == n ? true : false"
              >{{ n }}</mdb-page-item
            >
            <mdb-page-nav></mdb-page-nav>
            <!-- <mdb-page-item>Último</mdb-page-item> -->
          </mdb-pagination>
        </div>
        <mdb-alert class="mt-4" v-else color="danger">
          Esse distribuidor não possui leads!
        </mdb-alert>
      </mdb-col>
    </mdb-row>

    <!-- EDIT DISTRIBUTOR STATUS -->
    <mdb-modal
      size="lg"
      :show="showModalUpdateStatus"
      @close="showModalUpdateStatus = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Editar Status</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form @submit.prevent="handleSubmitStatus">
          <div class="grey-text p-3">
            <label for="name" class="mt-3 grey-text">Alterar para</label>
            <select class="browser-default custom-select" v-model="typeSelect">
              <option
                v-for="(item, index) in blocks"
                :key="index"
                :value="item.type"
              >
                {{ item.name }}
              </option>
            </select>
            <label
              v-if="typeSelect == 'auto-blocked' || typeSelect == 'suspended'"
              class="mt-3"
              for="blockUntil"
              >Data Final</label
            >
            <input
              v-if="typeSelect == 'auto-blocked' || typeSelect == 'suspended'"
              v-model="blockUntil"
              id="blockUntil"
              name="blockUntil"
              type="date"
              class="form-control"
              @click.stop
            />
            <div class="mt-3 float-right">
              <mdb-btn
                color="danger"
                @click.native="showModalUpdateStatus = false"
                >Cancelar</mdb-btn
              >
              <mdb-btn type="submit" color="primary">Editar</mdb-btn>
            </div>
          </div>
        </form>
      </mdb-modal-body>
    </mdb-modal>
    <!-- EDIT LEAD STATUS -->
    <mdb-modal
      size="lg"
      :show="showModalUpdateStatusLead"
      @close="showModalUpdateStatusLead = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Editar Status do Lead</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form @submit.prevent="handleSubmitStatusLead">
          <div class="grey-text p-3">
            <label for="name" class="mt-3 grey-text">Alterar para</label>
            <select class="browser-default custom-select" v-model="leadSelect">
              <option
                v-for="(item, index) in leadsStatus"
                :key="index"
                :value="item.type"
              >
                {{ item.name }}
              </option>
            </select>
            <div class="mt-3 float-right">
              <mdb-btn
                color="danger"
                @click.native="showModalUpdateStatusLead = false"
                >Cancelar</mdb-btn
              >
              <mdb-btn type="submit" color="primary">Editar</mdb-btn>
            </div>
          </div>
        </form>
      </mdb-modal-body>
    </mdb-modal>
  </section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbView,
  mdbTbl,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbInput,
  mdbIcon,
  mdbPagination,
  mdbPageItem,
  mdbPageNav,
  mdbAlert,
} from "mdbvue";
import {
  getBlocks,
  showDistributor,
  updateStatus,
} from "../../services/Distributors";
import {
  getAppointmentsByDistributor,
  updateStatusAppointment,
} from "../../services/Appointments";
import { format } from "date-fns";
export default {
  name: "Campaign",
  components: {
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbView,
    mdbTbl,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbInput,
    mdbIcon,
    mdbAlert,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
  },
  data() {
    return {
      showModalUpdateStatus: false,
      showModalUpdateStatusLead: false,
      typeSelect: "",
      blockUntil: format(new Date(), "yyyy-MM-dd"),
      blocks: "",
      distributor: {
        config: {},
        rank: "",
      },

      appointmentId: "",
      leadSelect: "",
      leadsStatus: [
        { name: "Aberto", type: "opened" },
        { name: "Atribuido", type: "assigned" },
        { name: "Negado", type: "denied" },
        { name: "Redistribuido", type: "reallocated" },
        { name: "Finalizado", type: "done" },
      ],

      columns: [
        "Data Atribuição",
        "Nome",
        "Telefone",
        "Genero",
        "Email",
        "Campanha",
        "Endereço",
        "Interesse",
      ],
      isLoading: true,

      data: [],
      dataBkp: [],
      dataSearch: [],
      dataOrder: [],
      inputSearch: "",
      limit: 10,
      page: 1,
      totalPages: 0,
      order: true,
    };
  },
  watch: {
    inputSearch() {
      const filterData = this.dataBkp.filter((item) =>
        item.lead["name"].toLowerCase().includes(this.inputSearch.toLowerCase())
      );
      this.dataSearch = filterData;
      this.page = 1;
      this.totalPages = parseInt(Math.ceil(filterData.length / this.limit));
      this.data = this.paginate(filterData, this.limit, this.page);
    },
  },
  mounted() {
    this.renderComponent();
  },
  methods: {
    getSplitEmail(email) {
      return (email || "").split("@");
    },
    dateFormat(data) {
      return data ? format(Date.parse(data), "dd/MM/yyyy HH:mm") : "";
    },
    renderComponent() {
      showDistributor(this.$route.params.id)
        .then((res) => {
          this.distributor = res;
        })
        .catch(() => this.$router.push("/distributors"));

      getAppointmentsByDistributor(this.$route.params.id)
        .then((res) => {
          this.isLoading = false;
          this.dataBkp = [...res];
          this.totalPages = parseInt(Math.ceil(res.length / this.limit));
          this.data = this.paginate([...res], this.limit, this.page);
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao listar os leads do distribuidor! Tente mais tarde!",
            type: "error",
          });
        });

      getBlocks()
        .then((res) => {
          this.blocks = res;
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao listar os tipos de bloqueios! Tente mais tarde!",
            type: "error",
          });
        });
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
    clearData() {
      this.leadsStatus = "";
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
    handleSort(item) {
      const data = this.dataSearch.length > 0 ? this.dataSearch : this.dataBkp;
      this.order = !this.order;
      let dataOrder;

      if (item == "Data Atribuição") {
        dataOrder = data.sort((a, b) =>
          this.sortFn(
            Date.parse(a.lead.updated_at),
            Date.parse(b.lead.updated_at)
          )
        );
      }
      if (item == "Nome") {
        dataOrder = data.sort((a, b) => this.sortFn(a.lead.name, b.lead.name));
      }
      if (item == "Genero") {
        dataOrder = data.sort((a, b) =>
          this.sortFn(a.lead.gender, b.lead.gender)
        );
      }
      if (item == "Campanha") {
        dataOrder = data.sort((a, b) =>
          this.sortFn(a.lead.campaign.name, b.lead.campaign.name)
        );
      }
      if (item == "Endereço	") {
        dataOrder = data.sort((a, b) =>
          this.sortFn(a.lead.leads_address.city, b.lead.leads_address.city)
        );
      }
      this.data = [...dataOrder];
      this.dataOrder = data;
      this.page = 1;
      this.totalPages = parseInt(Math.ceil(data.length / this.limit));
      this.data = this.paginate(data, this.limit, this.page);
    },
    sortFn(a, b) {
      if (this.order) return a > b ? 1 : b > a ? -1 : 0;
      return a < b ? 1 : b < a ? -1 : 0;
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
  width: 80px;
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
.bg {
  background: #3f729b;
}
.text-btn {
  font-weight: bold;
  text-transform: capitalize;
  font-size: 10pt;
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
</style>
