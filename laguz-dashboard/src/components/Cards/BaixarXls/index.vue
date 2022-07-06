<template>
  <mdb-dropdown style="width: 100%">
    <mdb-dropdown-toggle class="font-weight-bold d-flex align-items-center justify-content-center" style="height: 110px;width: 100%" color="blue-grey" slot="toggle"
      ><mdb-icon class="mr-3" icon="file-download" fas color="white" size="3x" /><div class="d-flex flex-column"> Tabelas XLS <span style="font-size: 10pt; font-weight: 500;">De 20/04/2021 á 31/04/2021</span></div></mdb-dropdown-toggle
    >
    <mdb-dropdown-menu>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<script>
import {
    mdbIcon,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle,
} from "mdbvue";
export default {
  components: {
    mdbIcon,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle,
  }
}
</script>

<style scoped>
.description {
  font-size: 10pt !important;
  color: red;
}
</style>