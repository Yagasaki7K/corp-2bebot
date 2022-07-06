<template>
  <mdb-card >
    <mdb-card-header class="text-center">
      Mapa de calor de candidaturas
    </mdb-card-header>
    
    <mdb-card-body>
      <div
        class="mb-4"
        v-for="item in response.states"
        :key="item.name"
      >
        
        <mdb-card-text class="m-0">
          <div class="d-flex justify-content-between">
            <span>{{ item.name }}</span>
            <span>
              <strong>
                {{ item.amount }} -
                {{ ((item.amount / response.total) * 100).toFixed(2) }}%</strong
              >
            </span>
          </div>
        </mdb-card-text>
        <div class="progress">
          <div
            aria-valuemax="100"
            aria-valuemin="0"
            :aria-valuenow="(item.amount / response.total) * 100"
            class="progress-bar grey darken-2"
            role="progressbar"
            :style="`width: ${(item.amount / response.total) * 100}%`"
          ></div>
        </div>
      </div>
      <h4 class="mt-5">
        Total:<strong> {{ response.total }} - 100%</strong>
      </h4>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbCardText,
} from "mdbvue";
export default {
  components: {
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbCardText,
  },
  props: [
    'response'
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
