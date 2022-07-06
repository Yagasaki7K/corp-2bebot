<template>
  <mdb-dropdown style="width: 100%">
    <mdb-dropdown-toggle
      class="font-weight-bold d-flex flex-column align-items-center justify-content-center"
      style="height: 110px;width: 100%"
      color="grey"
      slot="toggle"
    >
      <mdb-icon class="mr-1" icon="calendar-alt" fas color="white" size="3x" />
      <span class="mt-2">Período</span></mdb-dropdown-toggle
    >
    <mdb-dropdown-menu>
      <form class="px-4 py-3" @submit.prevent="handleSubmit" @click.stop>
        <div class="form-group">
          <label for="startDate">Data de início</label>
          <input
            v-model="startDate"
            id="startDate"
            name="startDate"
            type="date"
            class="form-control"
            @click.stop
          />
        </div>
        <div class="form-group">
          <label for="endDate">Data Final</label>
          <input
            v-model="endDate"
            id="endDate"
            name="endDate"
            type="date"
            class="form-control"
            @click.stop
          />
        </div>
        <mdb-btn class="w-100 m-0" type="submit" color="primary"
          >Definir</mdb-btn
        >
      </form>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" @click="setDate(30)" >Ultimos 30 dias</a>
      <a class="dropdown-item" @click="setDate(60)" >Ultimos 60 dias</a>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<script>
import {
  mdbIcon,
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbBtn,
} from "mdbvue";
import {subDays, format, isAfter} from 'date-fns'
export default {
  components: {
    mdbIcon,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbBtn,
  },
  data() {
    return {
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
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

<style></style>
