<template>
  <mdb-card >
    <mdb-card-header class="text-center">
      Tempo médio de contato
    </mdb-card-header>
    <mdb-card-body>
      <div
        style="height: 300px"
        class="d-flex align-items-center justify-content-around"
      >
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center font-weight-bold mb-3">
            <mdb-badge class="p-1 rounded-circle mr-3" color="grey"
              ><mdb-icon icon="clock" fas size="2x"/></mdb-badge
            >50% - 48 horas
          </div>
          <div class="d-flex align-items-center font-weight-bold mb-3">
            <mdb-badge class="p-1 rounded-circle mr-3" color="grey"
              ><mdb-icon icon="clock" fas size="2x"/></mdb-badge
            >30% - 96 horas
          </div>
          <div class="d-flex align-items-center font-weight-bold mb-3">
            <mdb-badge class="p-1 rounded-circle mr-3" color="grey"
              ><mdb-icon icon="clock" fas size="2x"/></mdb-badge
            >20% - 120 horas
          </div>
        </div>
        <div class="font-weight-bold">60Horas</div>
      </div>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbIcon,
  mdbBadge,
} from "mdbvue";
export default {
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbIcon,
    mdbBadge,
  }
}
</script>

<style>

</style>