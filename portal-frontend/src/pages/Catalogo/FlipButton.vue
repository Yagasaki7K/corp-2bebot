<template>
  <q-btn dense flat round :icon="icon" @click="action" />
</template>

<script>
export default {
  props: ["icon", "action"],
};
</script>