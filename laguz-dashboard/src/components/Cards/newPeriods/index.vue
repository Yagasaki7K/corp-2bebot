<template>
  <mdb-card  color="blue-grey px-3">
    <mdb-card-body class="d-flex flex-wrap justify-content-center align-items-center p-0 py-3">
      <div class="d-flex flex-wrap justify-content-center align-items-center">
        <!-- <mdb-icon
          icon="calendar-alt"
          fas
          color="white"
          size="2x"
          class="mr-3 mt-md-2"
        /> -->
        <div class="white-text ">
          <form
            class="d-flex flex-column flex-md-row flex-wrap align-items-center align-items-md-end justify-content-center"
            @submit.prevent="handleSubmit"
            @click.stop
          >
            <div class="form-group">
              <label for="startDate">Data de início</label>
              <input
                v-model="startDate"
                id="startDate"
                name="startDate"
                type="date"
                style="max-width: 150px;"
                class="form-control form-control-sm p-1"
                @click.stop
              />
            </div>
            <div class="ml-md-2 form-group">
              <label for="endDate">Data Final</label>
              <input
                v-model="endDate"
                id="endDate"
                name="endDate"
                type="date"
                style="max-width: 150px;"
                class="form-control form-control-sm p-1"
                @click.stop
              />
            </div>
            <div class="form-group">
              <label for="endDate"> </label>
              <mdb-btn size="sm" class="m-0 ml-md-2 bg-color" type="submit" outline="white"
                >Definir</mdb-btn
              >
            </div>
          </form>
        </div>
      </div>
    </mdb-card-body>
  </mdb-card>
</template>


<script>
import { mdbCard, mdbCardBody, mdbBtn } from "mdbvue";
import {subDays, format, isAfter, startOfMonth} from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
export default {
  components: {
    mdbCard,
    mdbCardBody,
    // mdbIcon,
    mdbBtn,
  },
  data() {
    return {
      startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd',  {locale: ptBr}),
      endDate: format(new Date(), 'yyyy-MM-dd', {locale: ptBr}),
    }
  },
  methods: {
    handleSubmit(){
      if (isAfter(new Date(this.startDate), new Date()) || isAfter(this.endDate, new Date())) {
        this.$toast.open({
          position: "top",
          message:
            "Nenhuma data pode ser maior que a data atual",
          type: "error",
        });
      }else {
        this.$emit('changePeriod', this.startDate, this.endDate)
      }
    },
    setDate(days){
      this.startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');
      this.handleSubmit()
    }
  }
};
</script>

<style scoped>
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
.bg-color {
  background: red;
}
</style>

