<template>
  <mdb-col :col="col">
    <mdb-row>
      <mdb-col col="6"><p>Teste</p></mdb-col>
      <mdb-col col="6">
        <input type="text" class="form-control" />
      </mdb-col>
    </mdb-row>
  </mdb-col>
</template>

<script>
import { mdbRow, mdbCol } from "mdbvue";
export default {
  components: { mdbRow, mdbCol },
  props: ["label", "value",'col'],
};
</script>

<style scoped>
.form-row {
  margin-bottom: 5px;
}
p {
  color: #4fd5ce;
  font-weight: bolder;
}
</style>