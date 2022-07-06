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
  <div
    v-else
    class="w-100 p-0 d-flex flex-column justify-content-start align-items-center mt-5 mb-3"
  >
    <div class="w-100 d-flex flex-wrap justify-content-between mb-1">
      <form @submit.prevent class="d-flex align-items-center mb-2">
        <mdb-icon icon="search" class="mr-3" />

        <mdb-input
          class="m-0"
          type="text"
          style="width: 250px"
          v-model="inputSearch"
          placeholder="Digite o texto para filtrar"
        />
      </form>
      <div class="d-flex justify-content-center flex-wrap">
        <mdb-btn
          v-if="$store.getters['auth/user'].role.name !== 'analytics'"
          :disables="disabledAdd"
          color="blue-grey"
          class="btn btn-rounded m-0 mb-2"
          @click.native="
            () => {
              clearData();
              showModalAdd = true;
            }
          "
        >
          <mdb-icon class="mr-2" icon="plus" />
          Adicionar Distribuidor
        </mdb-btn>
        <mdb-btn
          v-if="$store.getters['auth/user'].role.name !== 'analytics'"
          :disables="disabledAdd"
          color="blue-grey"
          class="btn btn-rounded m-0 ml-3 mb-2"
          @click="renderComponent"
        >
          <mdb-icon class="m-0" size="1x" icon="sync-alt" />
        </mdb-btn>
      </div>
    </div>
    <mdb-tbl hover bordered responsive class="m-0 p-0 text-center w-100">
      <colgroup>
        <col style="width: 16%" />
        <col style="width: 10%" />
        <col style="width: 12%" />
        <col style="width: 11%" />
        <col style="width: 10%" />
        <col style="width: 12%" />
        <col style="width: 5%" />
        <col style="width: 11%" />
        <col style="width: 10%" />
        <col style="width: 3%" />
      </colgroup>
      <thead class="bg-color-table">
        <tr class="text-white">
          <th
            class="font-weight-bold"
            v-for="(item, index) in columns"
            :key="index"
          >
            {{ item }}
            <mdb-icon
              v-if="item === 'Distribuidor'"
              @click.native="handleSort(item)"
              style="cursor: pointer; margin-left: 4px"
              icon="sort"
            />
            <mdb-icon
              v-if="item === 'Título'"
              @click.native="handleSort(item)"
              style="cursor: pointer; margin-left: 4px"
              icon="sort"
            />
            <mdb-icon
              v-if="item === 'Bloqueio'"
              @click.native="handleSort(item)"
              style="cursor: pointer; margin-left: 4px"
              icon="sort"
            />
            <mdb-icon
              v-if="item === 'Transferências'"
              @click.native="handleSort(item)"
              style="cursor: pointer; margin-left: 4px"
              icon="sort"
            />
          </th>
          <th
            class="font-weight-bold"
            v-if="$store.getters['auth/user'].role.name !== 'analytics'"
          >
            Ação
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>
            <span class="first-text font-weight-bold">{{ item.name }}</span>
          </td>
          <td>
            <span class="first-text font-weight-bold">{{
              item.last_login ? dateFormat(item.last_login.created_at) : "-"
            }}</span>
          </td>
          <td>
            <span class="first-text font-weight-bold">{{
              item.url_username
            }}</span>
          </td>
          <td>
            <span class="first-text font-weight-bold">{{ item.phone }}</span>
          </td>
          <td class="first-text font-weight-bold">
            {{ item.rank.name }}
            <!-- <span class="second-text font-weight-bolder">{{
                        new Date().toLocaleDateString("pt-BR")
                      }}</span> -->
          </td>
          <td class="first-text font-weight-bold">
            {{ bloqueType(item.config) }}
            <!-- <span class="second-text font-weight-bolder">{{
                        new Date().toLocaleDateString("pt-BR")
                      }}</span> -->
          </td>
          <!-- <td>
            <div class="d-flex flex-column">
              <span class="first-text font-weight-bold">{{
                item.config.is_online ? "Online" : "Offline"
              }}</span>
             
            </div>
          </td> -->
          <td>
            <span class="first-text font-weight-bold">{{
              item.config.leads_received
            }}</span>
          </td>
          <td>
            <div class="d-flex flex-column">
              <!-- <span class="first-text font-weight-bold">{Respondidos} - {{item.assigment.answered}}</span>
                      <span class="second-text font-weight-bolder">Agendados - {{item.assigment.schedule}}</span>
                      <span class="second-text font-weight-bolder">Transferidos - {{item.assigment.transfered}}</span> -->
              <span class="first-text font-weight-bold"
                >Respondidos - {{ item.answered }}</span
              >
              <span style="color: red" class="second-text font-weight-bold"
                >Transferidos - {{ item.transferred }}</span
              >
            </div>
          </td>
          <td>
            <span class="first-text font-weight-bold">
              {{
                (item.config.leads_received && item.transferred
                  ? (item.transferred / item.config.leads_received) * 100 || 0
                  : 0
                ).toFixed(2)
              }}%
            </span>
          </td>
          <td v-if="$store.getters['auth/user'].role.name !== 'analytics'">
            <div class="d-flex justify-content-center">
              <mdb-btn
                type="button"
                title="Editar distribuidor"
                style="width: 30px; height: 30px"
                class="d-flex align-items-center justify-content-center btn btn-blue btn-rounded btn-sm m-0 p-0 p-2 text-btn"
                @click.native="
                  () => {
                    const until = new Date(item.config.block_until)
                      .toISOString()
                      .split('T')[0];
                    itemEdit = { ...item, until_date: until };
                    showModalEdit = true;
                  }
                "
              >
                <mdb-icon size="1x" icon="user-edit" />
              </mdb-btn>
              <mdb-btn
                type="button"
                title="Mais detalhes"
                style="width: 30px; height: 30px"
                class="d-flex align-items-center justify-content-center btn btn-blue btn-rounded btn-sm m-0 ml-2 p-0 p-2 text-btn"
                @click.native="
                  () => {
                    $router.push(`/distributors/${item.id}`);
                  }
                "
              >
                <mdb-icon size="1x" icon="list-alt" />
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
        v-if="getPages.indexOf(totalPages) < 0"
        class="d-flex align-items-end ml-2"
        style="font-size: 20px"
      >
        ...
      </div>
      <mdb-page-item
        v-if="getPages.indexOf(totalPages) < 0"
        class="ml-2"
        @click.native="alterPage(totalPages)"
        >{{ totalPages }}</mdb-page-item
      >
      <!-- <mdb-page-item>Último</mdb-page-item> -->
    </mdb-pagination>

    <!-- ************ MODAL EDIT *************** -->
    <portal to="notification-outlet">
      <mdb-modal size="lg" :show="showModalEdit" @close="showModalEdit = false">
        <mdb-modal-header>
          <mdb-modal-title>Editar Distribuidor</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form @submit.prevent="handleUpdate" cl>
            <div class="grey-text p-3 no-padding-top">
              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="name" class="mt-3 grey-text">Nome</label>
                  <input
                    v-model="itemEdit.name"
                    type="text"
                    id="name"
                    class="form-control"
                    required
                  />
                </div>
                <div class="input-wrapper">
                  <label for="email" class="mt-3 grey-text">Email</label>
                  <input
                    v-model="itemEdit.email"
                    type="email"
                    id="email"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="url_username" class="mt-3 grey-text">Url</label>
                  <input
                    v-model="itemEdit.url_username"
                    type="text"
                    id="url_username"
                    class="form-control"
                    required
                  />
                </div>
                <div class="input-wrapper">
                  <label for="phone" class="mt-3 grey-text">Celular</label>
                  <input
                    v-model="itemEdit.phone"
                    type="text"
                    id="phone"
                    required
                    class="form-control"
                  />
                </div>
              </div>
              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="uf" class="mt-3 grey-text">Estado</label>
                  <input
                    v-model="itemEdit.state"
                    type="text"
                    id="uf"
                    class="form-control"
                    required
                  />
                </div>
                <div class="input-wrapper">
                  <label for="city" class="mt-3 grey-text">Cidade</label>
                  <input
                    v-model="itemEdit.city"
                    type="text"
                    id="city"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="rank" class="mt-3 grey-text">Titulo</label>
                  <select
                    id="rank"
                    name="rank"
                    class="browser-default custom-select title-select"
                    v-model="itemEdit.rank.id"
                    required
                  >
                    <option
                      v-for="(item, index) in ranks"
                      :key="index"
                      :value="item.id"
                      :selected="itemEdit.rank.id == item.id ? true : false"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="input-wrapper">
                  <label for="status" class="mt-3 grey-text">Status</label>
                  <select
                    id="status"
                    name="status"
                    class="browser-default custom-select title-select"
                    v-model="itemEdit.config.block_event"
                    required
                  >
                    <option
                      v-for="(item, index) in blocks"
                      :key="index"
                      :value="item.type"
                      :selected="
                        itemEdit.config.block_event == item.type ? true : false
                      "
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <label
                    v-if="
                      itemEdit.config.block_event == 'auto-blocked' ||
                      itemEdit.config.block_event == 'suspended'
                    "
                    class="mt-3"
                    for="blockUntil"
                    >Data Final</label
                  >
                  <input
                    v-if="
                      itemEdit.config.block_event == 'auto-blocked' ||
                      itemEdit.config.block_event == 'suspended'
                    "
                    :min="new Date().toISOString().split('T')[0]"
                    v-model="itemEdit.until_date"
                    id="blockUntil"
                    name="blockUntil"
                    type="date"
                    class="form-control"
                    @click.stop
                  />
                </div>
              </div>
              <div class="mt-3 float-right">
                <mdb-btn color="danger" @click.native="showModalEdit = false"
                  >Cancelar</mdb-btn
                >
                <mdb-btn type="submit" color="primary">Salvar</mdb-btn>
              </div>
            </div>
          </form>
        </mdb-modal-body>
      </mdb-modal>
    </portal>
    <!-- ************ MODAL ADD *************** -->
    <portal to="notification-outlet">
      <mdb-modal size="lg" :show="showModalAdd" @close="showModalAdd = false">
        <mdb-modal-header>
          <mdb-modal-title>Adicionar Distribuidor</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form @submit.prevent="handleSubmit">
            <div class="grey-text p-3">
              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="name" class="mt-3 grey-text">Nome</label>
                  <input
                    v-model="name"
                    type="text"
                    id="name"
                    class="form-control"
                    required
                  />
                </div>
                <div class="input-wrapper">
                  <label for="email" class="mt-3 grey-text">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="url_username" class="mt-3 grey-text">Url</label>
                  <input
                    v-model="url_username"
                    type="text"
                    id="url_username"
                    class="form-control"
                    required
                  />
                </div>
                <div class="input-wrapper">
                  <label for="phone" class="mt-3 grey-text">Celular</label>
                  <input
                    v-model="phone"
                    type="text"
                    id="phone"
                    required
                    class="form-control"
                  />
                </div>
              </div>

              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="uf" class="mt-3 grey-text">Estado</label>
                  <input
                    v-model="uf"
                    type="text"
                    id="uf"
                    class="form-control"
                    required
                  />
                </div>
                <div class="input-wrapper">
                  <label for="city" class="mt-3 grey-text">Cidade</label>
                  <input
                    v-model="city"
                    type="text"
                    id="city"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="rank" class="mt-3 grey-text">Titulo</label>
                  <select
                    id="rank"
                    name="rank"
                    class="browser-default custom-select"
                    required
                    v-model="rank_id"
                  >
                    <option
                      v-for="(item, index) in ranks"
                      :key="index"
                      :value="item.id"
                      selected
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <!-- <div class="input-wrapper">
                  <label for="status" class="mt-3 grey-text">Status</label>
                  <select
                    id="status"
                    name="status"
                    class="browser-default custom-select"
                    v-model="typeSelect"
                  >
                    <option
                      v-for="(item, index) in blocks"
                      :key="index"
                      :value="item.type"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div> -->
              </div>
              <div class="mt-3 float-right">
                <mdb-btn color="danger" @click.native="showModalAdd = false"
                  >Cancelar</mdb-btn
                >
                <mdb-btn type="submit" color="primary">Salvar</mdb-btn>
              </div>
            </div>
          </form>
        </mdb-modal-body>
      </mdb-modal>
    </portal>
  </div>
</template>

<script>
import {
  mdbIcon,
  mdbInput,
  mdbTbl,
  mdbBtn,
  mdbPagination,
  mdbPageItem,
  mdbPageNav,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
} from "mdbvue";
import {
  getDistributors as findAllDistributors,
  createDistributors,
  updateDistributors,
  getBlocks,
  updateStatus,
} from "../../services/Distributors";
import { getAllRanks } from "../../services/Ranks";
import { format } from "date-fns";
export default {
  name: "TableDistributors",
  components: {
    mdbTbl,
    mdbBtn,
    mdbIcon,
    mdbInput,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
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
  data() {
    return {
      inputSearch: "",
      disabledAdd: false,
      showModalAdd: false,
      showModalEdit: false,
      blockUntil: format(new Date(), "yyyy-MM-dd"),
      blocks: "",
      data: [],
      dataSearch: [],
      dataBkp: [],
      dataOrder: [],
      itemEdit: {
        config: {
          priority: 0,
        },
        rank: "",
        rank_id: [],
      },
      order: true,
      columns: [
        "Distribuidor",
        "Último acesso",
        "Url",
        "Telefone",
        "Título",
        "Bloqueio",
        "Candidatos",
        "Candidatos Status",
        "Transferências",
      ],
      limit: 10,
      page: 1,
      totalPages: 0,
      ranks: [],
      // FORM ADD
      name: "",
      email: "",
      rank_id: ["1"],
      priority: 0,
      phone: "",
      city: "",
      uf: "",
      url_username: "",
      isLoading: true,
    };
  },
  watch: {
    inputSearch() {
      const filterData = this.dataBkp.filter(
        (item) =>
          item["name"].toLowerCase().includes(this.inputSearch.toLowerCase()) ||
          item["url_username"]
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase()) ||
          item["rank"]["name"]
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase())
      );
      this.dataSearch = filterData;
      this.page = 1;
      this.totalPages = parseInt(Math.ceil(filterData.length / this.limit));
      this.data = this.paginate(filterData, this.limit, this.page);
    },
  },
  mounted() {
    this.renderComponent();
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
  methods: {
    renderComponent() {
      this.$emit("refresh");
      this.isLoading = true;
      findAllDistributors()
        .then((response) => {
          let res = response.sort(this.sortPriority);
          res = [
            ...res.filter(({ config }) => !config.block),
            ...res.filter(({ config }) => config.block),
          ];
          this.isLoading = false;
          this.dataBkp = [...res];
          // this.data = [...res];
          // this.totalPages = 20;
          this.totalPages = parseInt(Math.ceil(res.length / this.limit));
          this.data = this.paginate([...res], this.limit, this.page);
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao buscar todos dados dos distribuidores! Tente mais tarde!",
            type: "error",
          });
        });
    },
    sortPriority(distributorA, distributorB) {
      return (
        distributorA.config.leads_received -
          distributorB.config.leads_received ||
        distributorA.rank.priority - distributorB.rank.priority ||
        distributorA.config.priority - distributorB.config.priority
      );
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
          this.renderComponent();
          this.clearData();
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
        phone: this.itemEdit.phone,
        city: this.itemEdit.city,
        state: this.itemEdit.state,
        email: this.itemEdit.email,
        url_username: this.itemEdit.url_username,
      };

      this.handleSubmitStatus(
        this.itemEdit.id,
        this.itemEdit.config.block_event,
        this.itemEdit.until_date
      );
      updateDistributors(data)
        .then(() => {
          this.renderComponent();
          this.showModalEdit = false;
          this.$toast.open({
            position: "top",
            message: "Distribuidor editado com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao editar o distribuidor! Tente mais tarde!",
            type: "error",
          });
          this.showModalEdit = false;
        });
    },
    handleSubmitStatus(id, type, block_until) {
      if (!type) {
        console.error("error");
      } else {
        if (type !== "suspended" && type !== "auto-blocked") block_until = null;
        const data = {
          distributor_id: id,
          block_until,
          event: type,
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
    clearData() {
      this.name = "";
      this.email = "";
      this.rank_id = 0;
      this.phone = "";
      this.city = "";
      this.uf = "";
      this.url_username = "";
    },
    bloqueType(item) {
      if (item.block && item.block_event == "auto-blocked") {
        return "Autobloqueio";
      }
      if (item.block && item.block_event == "blocked") {
        return "Bloqueado";
      }
      if (item.block && item.block_event == "suspended") {
        return "Suspensão";
      }
      if (item.block && item.block_event == "not-receiving-leads") {
        return "Não Receber Leads";
      }
      return "Liberado";
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
      if (item == "Distribuidor") {
        dataOrder = data.sort((a, b) => this.sortFn(a.name, b.name));
      }
      if (item == "Título") {
        dataOrder = data.sort((a, b) => this.sortFn(a.rank.name, b.rank.name));
      }
      if (item == "Bloqueio") {
        dataOrder = data.sort((a, b) =>
          this.sortFn(this.bloqueType(a.config), this.bloqueType(b.config))
        );
      }
      if (item == "Transferências") {
        dataOrder = data.sort((a, b) =>
          this.sortFn(
            (a.config.leads_received && a.transferred
              ? (a.transferred / a.config.leads_received) * 100 || 0
              : 0
            ).toFixed(2),
            (b.config.leads_received && b.transferred
              ? (b.transferred / b.config.leads_received) * 100 || 0
              : 0
            ).toFixed(2)
          )
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
    dateFormat(data) {
      return data ? format(Date.parse(data), "dd/MM/yyyy HH:mm") : "";
    },
  },
};
</script>
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

.modal-line {
  display: flex;
  justify-content: space-between;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 49%;
}

.no-padding-top {
  padding-top: 0 !important;
}

.title-select {
  height: calc(1.5em + 0.75rem + 2px);
}
</style>
