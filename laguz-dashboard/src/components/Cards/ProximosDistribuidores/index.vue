<template>
  <mdb-card cascade class="cascading-admin-card">
    <div class="admin-up">
      <mdb-icon icon="users" class="blue-grey" />
      <div class="data">
        <p>PRÓXIMOS DISTRIBUIDORES</p>
      </div>
    </div>
    <mdb-card-body>
      <mdb-list-group class="list-group-flush" v-if="distributors.length > 0">
        <mdb-list-group-item
          v-for="(item, index) in distributors"
          :key="item.name"
          class="mb-0"
          action
          waves
        >
          <div class="d-flex">
            <img
              :src="item.avatar_url"
              class="image-avatar rounded-circle mr-2"
            />
            <span class="d-flex flex-column">
              <span class="m-0 p-0 font-weight-bold">{{ item.name }}</span>
              <span class="mt-n2 p-0"
                ><small class="p-0 m-0">{{ item.rank.name }}</small></span
              >
            </span>
          </div>
          <mdb-badge color="success-color" pill class="p-2 pull-right">
            <p class="m-0 font-weight-bold">{{ index + 1 }}°</p>
          </mdb-badge>
        </mdb-list-group-item>
      </mdb-list-group>
      <mdb-alert v-else color="danger">
        Não existe próximos distribuidores
      </mdb-alert>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardBody,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  mdbBadge,
  mdbAlert
} from "mdbvue";
export default {
  components: {
    mdbCard,
    mdbCardBody,
    mdbIcon,
    mdbListGroup,
    mdbListGroupItem,
    mdbBadge,
    mdbAlert
  },
  props: ["distributors"],
};
</script>


<style scoped>
.image-avatar {
  width: 40px;
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
</style>

