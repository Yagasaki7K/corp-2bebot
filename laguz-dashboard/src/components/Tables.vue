<template>
  <section id="tables">
    <mdb-row>
      <mdb-col md="12">
        <mdb-card cascade narrow class="mt-5">
          <mdb-card-body>
          <button type="button" disabled class="btn btn-dark btn-rounded  m-0 mb-2">Criar Campanha</button>
            <mdb-tbl class="table-striped">
              <thead class="mdb-color darken-3 ">
                <tr class="text-white">
                  <th>#</th>
                  <th>Nome da campanha</th>
                  <th>Código Camp</th>
                  <th>Data Início</th>
                  <th>Link Campanha</th>
                  <th>Link QRCode</th>
                  <th>Status</th>
                  <th>Candidatos</th>
                  <th>Candidatos Pend.</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Brasil</td>
                  <td>56037-XDER</td>
                  <td>05/28/2020</td>
                  <td>https://cutt.ly/pt</td>
                  <td>https://cutt.ly/pt</td>
                  <td>Finalizado</td>
                  <td>1000</td>
                  <td>200</td>
                  <td><button type="button" class="btn btn-blue btn-rounded btn-sm m-0">Edit</button></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Belarus</td>
                  <td>56037-XDER</td>
                  <td>05/28/2020</td>
                  <td>https://cutt.ly/pt</td>
                  <td>https://cutt.ly/pt</td>
                  <td>Finalizado</td>
                  <td>1000</td>
                  <td>200</td>
                  <td><button type="button" class="btn btn-blue btn-rounded btn-sm m-0">Edit</button></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Argentina</td>
                  <td>56037-XDER</td>
                  <td>05/28/2020</td>
                  <td>https://cutt.ly/pt</td>
                  <td>https://cutt.ly/pt</td>
                  <td>Finalizado</td>
                  <td>1000</td>
                  <td>200</td>
                  <td><button type="button" class="btn btn-blue btn-rounded btn-sm m-0">Edit</button></td>
                </tr>
              </tbody>
            </mdb-tbl>
            
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbTbl } from "mdbvue";

export default {
  name: "Tables",
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbTbl,
  },
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.card-cascade .view.gradient-card-header {
  padding: 1rem 1rem;
  text-align: center;
}
.card.card-cascade h3,
.card.card-cascade h4 {
  margin-bottom: 0;
}
</style>
