<template>
  <div
    style="margin-top: 10%"
    class="
      animated
      fadeIn
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
    v-if="isLoading"
  >
    <div v-if="isLoading && isLoading !== true" style="margin-bottom: 16px">
      <h2>{{ isLoading }}</h2>
    </div>
    <div
      style="width: 10rem; height: 10rem"
      class="spinner-border text-primary"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <section v-else class="w-100 animated fadeIn" id="tables">
    <mdb-modal
      size="md"
      :show="showModalDelete"
      :centered="true"
      @close="
        () => {
          itemLaunch = null;
          showModalDelete = false;
        }
      "
    >
      <mdb-modal-header>
        <mdb-modal-title>Deletar campanha</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        Tem certeza que deseja deletar a campanha?
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn
          color="secondary"
          @click.native="
            () => {
              showModalDelete = false;
            }
          "
          >Não</mdb-btn
        >
        <mdb-btn
          color="primary"
          @click.native="
            () => {
              deleteCampaign();
            }
          "
          >Sim</mdb-btn
        >
      </mdb-modal-footer>
    </mdb-modal>
    <mdb-modal
      size="md"
      :show="showModalLaunch"
      :centered="true"
      @close="
        () => {
          itemLaunch = null;
          showModalLaunch = false;
        }
      "
    >
      <mdb-modal-header>
        <mdb-modal-title>Disparar campanha</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        Tem certeza que deseja disparar a campanha?
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn
          color="secondary"
          @click.native="
            () => {
              showModalLaunch = false;
            }
          "
          >Não</mdb-btn
        >
        <mdb-btn
          color="primary"
          @click.native="
            () => {
              launchCampaign();
            }
          "
          >Sim</mdb-btn
        >
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-row class="mt-4">
      <mdb-col>
        <mdb-btn
          class="btn btn-rounded m-0 mb-2 float-right"
          color="blue-grey"
          @click.native="
            () => {
              clearData();
              showModalAdd = true;
            }
          "
        >
          Criar Campanha
        </mdb-btn>
        <div class="w-100 d-flex flex-column align-items-center">
          <mdb-tbl responsive hover bordered class="w-100 text-center">
            <colgroup>
              <col :span="columns.length" />
              <col style="width: 175px" />
            </colgroup>
            <thead class="bg-color-table">
              <tr class="text-white">
                <th v-for="column in columns" :key="column">
                  {{ column }}
                  <mdb-icon
                    v-if="
                      [
                        'Nome da campanha',
                        'Falecido',
                        'Tipo',
                        'Gênero',
                        'Documento',
                        'Idade',
                      ].includes(column)
                    "
                    @click.native="handleSort(column)"
                    style="cursor: pointer; margin-left: 4px"
                    icon="sort"
                  />
                </th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bordered"
                :style="
                  campaignView && item._id == campaignView._id
                    ? 'background-color:#607d8b;'
                    : ''
                "
                v-for="(item, index) in data"
                :key="index"
              >
                <td>
                  <span
                    class="first-text font-weight-bold"
                    :style="rowStyle(item)"
                  >
                    {{ item.name }}
                  </span>
                </td>
                <!-- <td>
                  <span
                    class="first-text font-weight-bold"
                    :style="rowStyle(item)"
                  >
                    {{ item.description }}
                  </span>
                </td>
                <td>
                  <span
                    class="first-text font-weight-bold"
                    :style="rowStyle(item)"
                  >
                    {{ item.isDead }}
                  </span>
                </td>
                <td>
                  <span
                    class="first-text font-weight-bold"
                    :style="rowStyle(item)"
                  >
                    {{ item.type }}
                  </span>
                </td>
                <td>
                  <span
                    class="first-text font-weight-bold"
                    :style="rowStyle(item)"
                  >
                    {{ item.gender }}
                  </span>
                </td>
                <td>
                  <span
                    class="first-text font-weight-bold"
                    :style="rowStyle(item)"
                  >
                    {{ item.document }}
                  </span>
                </td>
                <td>
                  <span
                    class="first-text font-weight-bold"
                    :style="rowStyle(item)"
                  >
                    {{ item.age }}
                  </span>
                </td> -->
                <td class="pt-1">
                  <span class="first-text font-weight-bold">
                    <div class="d-flex justify-content-evenly" style="font-size:10px">
                      <div class="d-flex flex-column justify-content-center">
                        <span>Extrair Relatório</span>
                        <mdb-btn
                          title="Extrair Relatório"
                          type="button"
                          class="btn btn-blue btn-rounded btn-sm m-0 text-btn"
                          @click.native="
                            () => {
                              downloadCampaign(item);
                            }
                          "
                        >
                          <mdb-icon icon="file-alt" />
                        </mdb-btn>
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <span class="ml-3">Visualizar Dados</span>
                        <mdb-btn
                          title="Visualizar"
                          type="button"
                          class="
                            btn btn-blue btn-rounded btn-sm
                            m-0
                            ml-3
                            text-btn
                          "
                          @click.native="
                            () => {
                              viewCampaign(item);
                            }
                          "
                        >
                          <mdb-icon icon="eye" />
                        </mdb-btn>
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <span class="ml-3">Disparar Campanha</span>
                        <mdb-btn
                          title="Disparar Campanha"
                          type="button"
                          class="
                            btn btn-blue btn-rounded btn-sm
                            m-0
                            ml-3
                            text-btn
                          "
                          @click.native="
                            () => {
                              itemLaunch = item;
                              showModalLaunch = true;
                            }
                          "
                        >
                          <mdb-icon icon="rocket" />
                        </mdb-btn>
                      </div>
                      <div class="d-flex flex-column justify-content-center ">
                        <span class="ml-3">Deletar Campanha</span>
                        <mdb-btn
                          title="Deletar"
                          type="button"
                          class="
                            btn btn-blue btn-rounded btn-sm
                            m-0
                            ml-3
                            text-btn
                          "
                          @click.native="
                            () => {
                              itemLaunch = item;
                              showModalDelete = true;
                            }
                          "
                        >
                          <mdb-icon icon="trash" />
                        </mdb-btn>
                      </div>
                    </div>
                  </span>
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
      </mdb-col>
    </mdb-row>
    <!-- EDIT MODAL -->
    <portal to="notification-outlet">
      <mdb-modal size="lg" :show="showModalEdit" @close="showModalEdit = false">
        <mdb-modal-header>
          <mdb-modal-title>Editar Campanha</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form @submit.prevent="handleUpdate">
            <div class="grey-text p-3">
              <div class="w-100 input-wrapper">
                <label for="name" class="mt-3 grey-text"
                  >Nome da campanha</label
                >
                <input
                  v-model="itemEdit.name"
                  type="text"
                  id="name"
                  class="form-control"
                  required
                />
              </div>

              <div class="modal-line">
                <div class="input-wrapper">
                  <label for="Date" class="mt-3">Data de Início</label>
                  <datepicker
                    v-model="itemEdit.start_at"
                    id="Date"
                    bootstrap-styling
                    name="Date"
                    bg
                    :language="ptBR"
                    label="Date"
                    required
                  />
                </div>
                <div class="input-wrapper">
                  <label for="EndDate" class="mt-3">Data Finalização</label>
                  <datepicker
                    v-model="itemEdit.finish_at"
                    id="EndDate"
                    bootstrap-styling
                    name="EndDate"
                    bg
                    :language="ptBR"
                    label="EndDate"
                    required
                  />
                </div>
              </div>
              <div class="mt-3 float-right">
                <mdb-btn color="danger" @click.native="showModalEdit = false"
                  >Cancelar</mdb-btn
                >
                <mdb-btn type="submit" color="primary">Editar</mdb-btn>
              </div>
            </div>
          </form>
        </mdb-modal-body>
      </mdb-modal>
    </portal>
    <portal to="notification-outlet">
      <mdb-modal size="lg" :show="showModalAdd" @close="showModalAdd = false">
        <mdb-modal-header>
          <mdb-modal-title>Adicionar Campanha</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form @submit.prevent="handleSubmit">
            <div class="grey-text p-3">
              <div class="w-100 input-wrapper">
                <label for="name" class="mt-3 grey-text"
                  >Nome da campanha</label
                >
                <input
                  v-model="name"
                  type="text"
                  id="name"
                  class="form-control"
                  required
                />
              </div>
              <!-- <div class="w-100 input-wrapper">
                <label for="name" class="mt-3 grey-text">Descrição</label>
                <textarea
                  v-model="description"
                  id="description"
                  class="form-control"
                />
              </div>
              <div>
                <label class="mt-3 grey-text">Falecido</label>
                <v-select :options="isDeadOptions" v-model="isDead"> </v-select>
              </div>
              <div>
                <label class="mt-3 grey-text">Tipo</label>

                <v-select :options="typeOptions" v-model="type"> </v-select>
              </div>
              <div>
                <label class="mt-3 grey-text">Gênero</label>

                <v-select :options="genderOptions" v-model="gender"> </v-select>
              </div>
              <div class="w-100 input-wrapper">
                <label for="document" class="mt-3 grey-text">Documento</label>
                <input
                  v-model="document"
                  id="document"
                  class="form-control"
                  type="text"
                />
              </div> -->
              <div class="w-100 input-wrapper">
                <label for="age" class="mt-3 grey-text"
                  >Id da campanha atual</label
                >
                <input
                  v-model="age"
                  id="age"
                  class="form-control"
                  type="text"
                />
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
  </section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbTbl,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbPagination,
  mdbPageItem,
  mdbPageNav,
  mdbBtn,
  mdbIcon,
} from "mdbvue";

import { ptBR } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";
import {
  getCampaigns,
  createCampaigns,
  updateCampaigns,
  deleteCampaign,
  launchCampaign,
  downloadCampaign,
} from "../../services/Campaign";
export default {
  name: "Campaign",
  components: {
    mdbRow,
    mdbCol,
    mdbTbl,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    Datepicker,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
    mdbIcon,
  },
  data() {
    return {
      campaignView: false,

      sort: true,
      showModalAdd: false,
      showModalEdit: false,
      name: "",
      description: "",
      isDead: "",
      startDate: new Date(),
      endDate: new Date(),
      linkCampaign: "",
      candidates: 1,
      itemEdit: {},
      itemToUpdate: {},
      type: "",
      typeOptions: ["", "Aposentado", "Pensionista"],
      gender: "",
      genderOptions: ["", "Masculino", "Feminino"],
      isDeadOptions: ["", "Sim", "Não"],
      document: "",
      age: "",
      columns: [
        "Nome da campanha",
        // "Descrição",
        // "Falecido",
        // "Tipo",
        // "Gênero",
        // "Documento",
        // "Idade",
      ],
      isLoading: false,

      data: [],
      dataBkp: [],
      dataSearch: [],
      dataOrder: [],
      inputSearch: "",
      limit: 10,
      page: 1,
      totalPages: 0,
      order: true,
      showModalLaunch: false,
      showModalDelete: false,
      itemLaunch: null,
      ptBR,
    };
  },
  mounted() {
    this.renderComponent();
  },

  methods: {
    rowStyle(item) {
      return this.campaignView && this.campaignView._id == item._id
        ? "color:white"
        : "";
    },
    downloadCampaign(itemC) {
      const item = itemC;
      this.isLoading = "Extraindo Relatório";
      downloadCampaign(item)
        .then((data) => {
          const url = window.URL.createObjectURL(new Blob([data])); // you can mention a type if you wish
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "campanha.xlsx"); //this is the name with which the file will be downloaded
          link.click();
          // no need to append link as child to body.
          setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!

          this.$toast.open({
            position: "top",
            message: "Relatório extraído com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao extrair o relatório! Tente mais tarde!",
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    viewCampaign(item) {
      this.campaignView = item;
      const { _id: id } = item;
      this.$router.push(`/campaign/${id}`);
    },
    launchCampaign() {
      const item = this.itemLaunch;
      this.isLoading = "Disparando campanha";
      launchCampaign(item)
        .then(() => {
          this.renderComponent();
          this.$toast.open({
            position: "top",
            message: "Campanha disparada com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao disparar sua campanha! Tente mais tarde!",
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.itemLaunch = null;
          this.showModalLaunch = false;
        });
    },
    deleteCampaign() {
      const item = this.itemLaunch;
      this.isLoading = "Deletando a campanha";
      deleteCampaign(item)
        .then(() => {
          this.renderComponent();

          this.$toast.open({
            position: "top",
            message: "Campanha deletada com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao deletar sua campanha! Tente mais tarde!",
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.itemLaunch = null;
          this.showModalDelete = false;
        });
    },
    renderComponent() {
      this.isLoading = true;
      getCampaigns().then((res) => {
        this.isLoading = false;
        this.dataBkp = [...res];
        this.totalPages = parseInt(Math.ceil(res.length / this.limit));
        this.data = this.paginate([...res], this.limit, this.page);
      });
    },
    handleSort(item) {
      this.sort = !this.sort;
      this.dataSearch = [...this.dataBkp];
      if (item == "Nome da campanha") {
        this.dataSearch.sort((a, b) => this.sortFn(a.name, b.name));
      }

      if (item == "Falecido") {
        this.dataSearch.sort((a, b) => this.sortFn(a.isDead, b.isDead));
      }
      if (item == "Tipo") {
        this.dataSearch.sort((a, b) => this.sortFn(a.type, b.type));
      }
      if (item == "Gênero") {
        this.dataSearch.sort((a, b) => this.sortFn(a.gender, b.gender));
      }
      if (item == "Idade") {
        this.dataSearch.sort((a, b) => this.sortFn(a.age, b.age));
      }
      if (item == "Documento") {
        this.dataSearch.sort((a, b) => this.sortFn(a.document, b.document));
      }
      this.alterPage(1);
    },
    sortFn(a, b) {
      if (this.sort) return a > b ? 1 : b > a ? -1 : 0;
      return a < b ? 1 : b < a ? -1 : 0;
    },
    handleSubmit() {
      const data = {
        name: this.name,
        // description: this.description,
        // isDead: this.isDead,
        // gender: this.gender,
        // type: this.type,
        // document: this.document,
        currentCampaignId: this.age,
      };
      this.isLoading = "Gerando campanha";
      createCampaigns(data)
        .then(() => {
          this.renderComponent();
          this.showModalAdd = false;
          this.$toast.open({
            position: "top",
            message: "Campanha cadastrada com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao criar sua campanha! Tente mais tarde!",
            type: "error",
          });
          this.showModalAdd = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleUpdate() {
      const data = {
        id: this.itemEdit.id,
        name: this.itemEdit.name,
        start: this.itemEdit.start_at,
        end: this.itemEdit.finish_at,
      };

      const isEqual =
        JSON.stringify(this.itemEdit) === JSON.stringify(this.itemToUpdate);
      if (!isEqual) {
        updateCampaigns(data)
          .then(() => {
            getCampaigns().then((res) => {
              this.data = res;
            });
            this.showModalEdit = false;
            this.$toast.open({
              position: "top",
              message: "Campanha editada com sucesso!",
              type: "success",
            });
            return;
          })
          .catch(() => {
            this.$toast.open({
              position: "top",
              message:
                "Ops, aconteceu um erro ao editar sua campanha! Tente mais tarde!",
              type: "error",
            });
            this.showModalEdit = false;
            return;
          });
      } else {
        this.$toast.open({
          position: "top",
          message: "Campos Inválidos ou totalmente iguais aos já existente!",
          type: "error",
        });
        return;
      }
    },
    clearData() {
      this.name = "";
      this.startDate = new Date();
      this.linkCampaign = "";
      this.candidates = 1;
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
.size-badge {
  min-width: 80px;
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
.bg-color {
  background: #588cb8;
}
.text-btn {
  font-weight: bold;
  text-transform: capitalize;
  font-size: 10pt;
}
.first-text {
  color: #464e5f;
}
.custom-grey {
  background-color: rgba(0, 0, 0, 0.05);
}
.modal-line {
  display: flex;
  justify-content: space-between;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 48%;
}
</style>

<style>
.custom-grey {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>