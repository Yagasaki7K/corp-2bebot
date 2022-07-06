<template>
  <mdb-row>
    <mdb-col col="5" class="form">
      <div class="content">
        <mdb-row>
          <mdb-col col="6">
            <p>CPF:</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              :value="info.lead.leads_data.cpf"
              class="form-control"
            />
          </mdb-col>
        </mdb-row>
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
        <mdb-row>
          <mdb-col col="6">
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
        <mdb-row>
          <mdb-col col="6">
            <p>ESTADO:</p>
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
        <mdb-row>
          <mdb-col col="6">
            <p>HORÁRIO CONTATO:</p>
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
        <mdb-row>
          <mdb-col col="6">
            <p>TELEFONE:</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              class="form-control"
              :value="info.lead.phone"
            />
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col col="6">
            <p>EMAIL:</p>
          </mdb-col>
          <mdb-col col="6">
            <input
              readonly
              type="text"
              class="form-control"
              :value="info.lead.email"
            />
          </mdb-col>
        </mdb-row>
      </div>
    </mdb-col>
    <mdb-col col="6">
      <div class="time-line content">
        <timeline v-if="showTimeline" :data="info.assignments" />
      </div>
    </mdb-col>
  </mdb-row>
</template>

<script>
import { mdbRow, mdbCol } from "mdbvue";
import Timeline from "../Timeline";
export default {
  props: {
    showTimeline: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Timeline,
    mdbRow,
    mdbCol,
  },
};
</script>

<style scoped>
.content {
  padding: 30px;
}
.form-control {
  width: 188px;
  height: 25px;
  background: #ffffff;
  border-radius: 10px;
}
p {
  color: #4fd5ce;
  font-weight: bolder;
  text-align: right;
}
.time-line {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>