<template>
  <div class="col col-12 col-md-4 q-mt-sm">
    <q-card class="propertyCards" :disabled="disabled">
      <q-card-section
        class="mb-0 text-white flex justify-center items-center q-pa-sm"
      >
        <div class="mb-0 text-h7">{{ title }}</div>
      </q-card-section>
      <q-card-section class="mt-0 mt-5 flex justify-center items-center">
        <div class="mt-0 text-white text-subtitle2">{{ value }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ["title", "value", "disabled"],
};
</script>

<style scoped>
.propertyCards {
  background: #00173a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  margin: 0.5em;
}
.text-subtitle2 {
  font-size: 25px;
}
.text-h7 {
  font-size: 12px;
  opacity: 70%;
  text-transform: uppercase;
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
  margin-top: 10px;
}
</style>
