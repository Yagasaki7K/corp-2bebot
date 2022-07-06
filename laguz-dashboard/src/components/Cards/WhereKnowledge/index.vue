<template>
  <mdb-card >
    <mdb-card-header class="text-center">
      Por onde conheceu
    </mdb-card-header>
    <mdb-card-body>
      <mdb-list-group class="list-group-flush" v-if="response.length > 0">
        <mdb-list-group-item
          v-for="(item, index) in response"
          :key="item.name"
          class="mb-0"
          action
          waves
        >
          <div class="d-flex align-items-center">
            <span class="d-flex flex-column">
              <span class="text-replace m-0 p-0 font-weight-bold">{{ index + 1 }}° -&nbsp;&nbsp;{{ item.location }}</span>
              
            </span>
          </div>
          <span
              class="d-flex align-items-center justify-content-center image-avatar rounded-circle mr-5"
            >
            {{ item.amount}}
            </span>
        </mdb-list-group-item>
      </mdb-list-group>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardBody,
  mdbListGroup,
  mdbListGroupItem,
  // mdbBadge,
  mdbCardHeader,
} from "mdbvue";
export default {
  components: {
    mdbCard,
    mdbCardHeader,
    mdbCardBody,
    mdbListGroup,
    mdbListGroupItem,
    // mdbBadge,
  },
  props: ["response"],
};
</script>


<style scoped>
.image-avatar {
  width: 40px;
  height: 40px;
  background: #464e5f;
  color: white;
  font-weight: 800;
}
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
.text-replace {
  text-transform: capitalize;
}
.circle {
  width: 30px;
  height: 30px;
}
</style>

