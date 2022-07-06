<template>
  <mdb-card cascade class="cascading-admin-card">
    <div class="admin-up">
      <mdb-icon icon="mouse" fas class="blue-grey" />
      <div class="data">
        <p>RESUMO DE ACESSOS</p>
        <h5>
          <strong>{{ period.startDate ? new Date(`${period.startDate}T12:00:00`).toLocaleDateString("pt-BR") +' - '+ new Date(`${period.endDate}T12:00:00`).toLocaleDateString("pt-BR"): 'Todo o período' }}</strong>
        </h5>
      </div>
    </div>
    <mdb-card-body>
      <mdb-list-group class="list-group-flush">
        <mdb-list-group-item v-if="response.total || response.total == 0" action waves
          >Total
          <mdb-badge color="success-color" pill class="pull-right"
            >{{ response.total }}
          </mdb-badge>
        </mdb-list-group-item>
        <mdb-list-group-item v-if="response.done || response.done == 0" action waves
          >Leads Atendidos
          <mdb-badge color="success-color" pill class="pull-right"
            >{{ response.done }}
          </mdb-badge>
        </mdb-list-group-item>
        <mdb-list-group-item v-if="response.answered || response.answered == 0" action waves
          >Respondidas
          <mdb-badge color="danger-color" pill class="pull-right"
            >{{ response.answered }}
          </mdb-badge>
        </mdb-list-group-item>
        <mdb-list-group-item v-if="response.schedules || response.schedules == 0" action waves
          >Agendamentos
          <mdb-badge color="primary-color" pill class="pull-right">{{
            response.schedules
          }}</mdb-badge>
        </mdb-list-group-item>
        <mdb-list-group-item v-if="response.pending || response.pending == 0" action waves
          >Pendentes
          <mdb-badge color="primary-color" pill class="pull-right">{{
            response.pending
          }}</mdb-badge>
        </mdb-list-group-item>
      </mdb-list-group>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardBody,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  mdbBadge,
} from "mdbvue";


export default {
  components: {
    mdbCard,
    mdbCardBody,
    mdbIcon,
    mdbListGroup,
    mdbListGroupItem,
    mdbBadge,
  },
  props: [
    'response',
    'period'
  ],
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
</style>
