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
  <section v-else class="animated fadeIn">
    <mdb-row class="mt-4">
      <mdb-col>
        <form
          enctype="multipart/form-data"
          @submit.prevent="handleSubmit"
          class="d-flex align-items-start flex-wrap"
        >
          <div class="input-group w-75 mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupFileAddon01"
                ><mdbIcon icon="file-csv"
              /></span>
            </div>
            <div class="custom-file w-25">
              <input
                type="file"
                class="custom-file-input"
                aria-describedby="inputGroupFileAddon01"
                name="teste"
                accept=".xls,.xlsx"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
              <label
                class="custom-file-label truncate-class"
                for="inputGroupFile01"
                >{{ file.name || "Selecione um arquivo" }}</label
              >
            </div>
          </div>

          <mdb-btn
            type="submit"
            color="blue-grey"
            class="btn-height p-2 px-4 m-0 ml-2 mb-2"
          >
            Enviar
          </mdb-btn>
        </form>
        <mdb-tbl hover bordered class="">
          <thead class="bg-color-table darken-3">
            <tr class="text-white">
              <th v-for="column in columns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, index) in data" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  
                  <td>
                    <router-link :to="`/campaign/${item.id}`">
                    {{ item.name }}
                    </router-link>
                  </td>
                  <td>{{ item.campaign_code }}</td>
                  <td>
                    {{ new Date(item.start_at).toLocaleDateString("pt-BR") }}
                  </td>
                  <td>
                    {{ new Date(item.finish_at || new Date()).toLocaleDateString("pt-BR") }}
                  </td>
                  <td><img :src="`https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${item.url}`"/></td>
                  <td>
                    <mdb-badge
                      class="size-badge text-size p-2 rounded"
                      :color="
                        item.status == 'Vigente'
                          ? 'primary'
                          : item.status == 'Finalizado'
                          ? 'success'
                          : 'orange'
                      "
                      >{{ item.status }}</mdb-badge
                    >
                  </td>
                  <td>{{ item.leads_requested }}</td>
                  <td>{{ item.leads_total }}</td>
                  <td>
                    <mdb-btn
                      type="button"
                      class="btn btn-blue btn-rounded btn-sm m-0"
                      @click.native="
                        () => {
                          itemToUpdate = {...item};
                          itemEdit = {...item};
                          showModalEdit = true;
                        }
                      "
                    >
                      Editar
                    </mdb-btn>
                  </td>
                </tr> -->
            <tr v-for="(item, index) in data" :key="index">
              <td>
                <span class="first-text font-weight-bold">
                  {{ item.filename.split("-")[1] }}</span
                >
              </td>
              <td>
                <span class="first-text font-weight-bold">{{
                  item.amount
                }}</span>
              </td>
              <td>
                <span class="first-text font-weight-bold">
                  {{ new Date(item.created_at).toLocaleDateString("pt-BR") }}
                </span>
              </td>
            </tr>
          </tbody>
        </mdb-tbl>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbIcon, mdbTbl, mdbBtn } from "mdbvue";
import { getHistoryCsv, sendCsv } from "../../services/Appointments";
export default {
  components: {
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbTbl,
    mdbBtn,
  },
  data() {
    return {
      columns: ["Nome do Arquivo", "Distribuidores afetados", "Data de envio"],
      file: "",
      data: [],
      isLoading: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getHistoryCsv().then(({ mailings }) => {
        this.isLoading = false;
        this.data = mailings;
      });
    },
    handleSubmit() {
      let formData = new FormData();
      formData.append("mailing", this.file);
      sendCsv(formData)
        .then(() => {
          this.init();
          this.$toast.open({
            position: "top",
            message: "Arquivo enviado com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Arquivo tem CPF's não válidos ou está mal formatado. Para maiores dúvidas, entre em contato com o setor técnico",
            type: "error",
          });
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped>
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
.btn-height {
  height: 38px;
}
.truncate-class {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.first-text {
  color: #464e5f;
}

.custom-grey {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
