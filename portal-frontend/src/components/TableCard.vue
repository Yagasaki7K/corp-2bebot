<template>
  <q-card>
    <q-card-section class="backgroundCards text-white">
      <div class="text-h6">{{ title }}</div>
      <slot name="subtitle"
        ><div class="text-subtitle">{{ subtitle }}</div></slot
      >
    </q-card-section>

    <q-markup-table>
      <thead>
        <tr>
          <th v-for="(head, index) of headers" :key="index" class="text-left">
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of dataTable" :key="index">
          <td v-for="(key, index) of item" :key="index" class="text-left">
            {{ key }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-card>
</template>

<script>
export default {
  props: ["title", "subtitle", "headers", "dataTable"],
};
</script>

<style scoped>
.backgroundCards {
  background: #00173a;
  min-height: 6em;
}
.text-subtitle2 {
  font-size: 20px;
}
.text-h7 {
  font-size: 18px;
  font-weight: bold;
}
</style>
