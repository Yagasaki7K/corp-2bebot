<template>
  <div class="col col-12 col-md-2 q-pr-sm q-mt-sm">
    <q-card style="height: 120px" class="backgroundCards pad" :disabled="disabled">
      <q-card-section
        class="mb-0 text-white flex justify-center items-center q-pa-sm"
      >
        <div class="mb-0  text-h7">{{title}}</div>
      </q-card-section>
      <q-card-section class="mt-0 mt-5 flex justify-center items-center">
        <div class="mt-0 text-white text-subtitle2">{{value}}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ['title', 'value', 'disabled']
};
</script>

<style scoped>
.backgroundCards {
  background: #00173a;
}
.text-subtitle2 {
  font-size: 22px;
}
.text-h7 {
  font-size: 17px;
  font-weight: bold;
}
.mb-0 {
  margin: 0;
  padding: 0;
}
.mt-0 {
  margin-top: 0;
  padding: 0;
}
.mt-5 {
  margin-top: 20px;
}

.pad {
  padding: 15px 10px 30px 10px;
}
</style>
