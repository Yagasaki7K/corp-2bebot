<template>
  <mdb-card :class="color" class="classic-admin-card">
    <mdb-card-body style="height: 90px" class="m-0 mt-3 p-0">
      <div
        class="
          m-0
          p-0
          d-flex
          flex-column
          align-items-center
          justify-content-center
        "
      >
        <p
          class="text-center m-0 p-0 white-text"
          style="font-size: 11pt; color: #fff"
        >
          <strong style="color: #fff"
            >{{ title }} <br />
            {{ secondLine }}</strong
          >
        </p>
        <h3 style="font-size: 27pt">
          <strong>{{ value }}</strong>
        </h3>
      </div>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbCard, mdbCardBody } from "mdbvue";
export default {
  components: {
    mdbCard,
    mdbCardBody,
  },
  props: ["title", "color", "icon", "value", "secondLine"],
};
</script>

<style scoped>
.classic-admin-card .card-body {
  color: #fff;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
}
</style>

