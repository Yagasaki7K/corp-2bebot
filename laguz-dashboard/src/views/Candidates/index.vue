<template>
  <section class="animated fadeIn" id="candidates">
    <page-1
      @loaded="loading = false"
      @initLoad="loading = true"
      v-if="role.name == 'corporate' || role.name == 'analytics'"
    />
    <page-2
      @loaded="loading = false"
      @initLoad="loading = true"
      v-else-if="role.name == 'distributor'"
    />
    <mdb-row v-if="loading" class="animated fadeIn justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </mdb-row>
  </section>
</template>

<script>
import Page1 from "./Page1.vue";
import Page2 from "./Page2.vue";
import { mdbRow } from "mdbvue";

export default {
  data: () => ({
    toggled: false,
    loading: false,
    role: JSON.parse(localStorage.getItem("user")).role,
  }),
  components: {
    Page1,
    Page2,
    mdbRow,
  },

  methods: {
    toggle() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

