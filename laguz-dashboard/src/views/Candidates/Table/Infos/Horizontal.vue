<template>
  <div class="content">
    <mdb-row>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="6">
            <p>SEXO:</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              :value="info.lead.gender"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="4">
            <p>CIDADE:</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              :value="info.lead.leads_address.city"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="6">
            <p>COMO SOUBE:</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              class="form-control"
              :value="info.lead.leads_data.knowledge.location"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="6">
            <p>HORARIO CONTATO</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              :value="info.lead.best_hour"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="4">
            <p>ESTADO</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              :value="info.lead.leads_address.state"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="6">
            <p>INTERESSE:</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              class="form-control"
              :value="info.lead.leads_data.interest"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="6">
            <p>DATA DE CONTATO</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              name="dateContact"
              v-model="dateContact"
              type="datetime-local"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="4">
            <p>EMAIL</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              :value="info.lead.email"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
          <mdb-col col="6">
            <p>TELEFONE</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              :value="info.lead.phone"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-end">
      <mdb-btn class="btn btn-green btn-rounded btn-sm" @click="handleChange"
        ><mdb-icon icon="check"
      /></mdb-btn>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol, mdbBtn, mdbIcon } from "mdbvue";
import { updateAppointmentsContact } from "../../../../services/Appointments";

export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbIcon,
  },
  mounted() {
    [this.dateContact] = this.info.date.split(".");
  },
  data() {
    return {
      dateContact: "",
    };
  },
  methods: {
    handleChange() {
      updateAppointmentsContact(this.info.id, { date: this.dateContact })
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
  },
};
</script>

<style scoped>
.content {
  padding: 30px;
}
.form-control {
  height: 25px;
  background: #ffffff;
  border-radius: 10px;
}
p {
  color: #4fd5ce;
  font-weight: bolder;
}
</style>