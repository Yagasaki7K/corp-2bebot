<template>
  <modal
    :centered="true"
    :scrollable="true"
    :adaptive="true"
    height="auto"
    @before-close="$emit('before-close')"
    :name="name"
  >
    <div class="q-pt-lg q-pr-lg q-pl-lg q-mb-md">
      <label><h6 class="q-ma-none">Motivo:</h6></label>
      <q-input v-model="motivo" filled type="textarea" dense />
    </div>
    <div class="row justify-end q-pr-lg q-pb-lg">
      <div class="q-pr-md q-pb-md">
        <q-btn
          color="primary"
          class="q-mr-md"
          label="Cancelar"
          @click="$modal.hide(name)"
        />
        <q-btn
          @click.native="reprove"
          color="negative"
          class=""
          label="Recusar"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import { update } from "src/services/Orders";
export default {
  props: ["name"],
  components: {},
  data: () => ({
    motivo: "",
  }),
  methods: {
    reprove() {
      update({ _id: this.$route.params.id, status: "REPROVED" })
        .then(() => {
          this.$router.push("/orders");
        })
        .catch(console.error);
    },
  },
};
</script>

<style>
</style>