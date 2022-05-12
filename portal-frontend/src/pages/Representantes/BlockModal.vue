<template>
  <modal
    :adaptive="true"
    height="auto"
    @before-close="$emit('before-close')"
    name="blockModal"
  >
    <div class="q-gutter-md q-pa-lg">
      <div class="column">
        <label><h6 class="q-ma-none">Até:</h6></label>
        <q-input readonly dense v-model="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="q-mt-lg row justify-end">
        <q-btn
          color="primary"
          class="q-mb-sm q-mr-sm"
          label="Cancelar"
          @click.native="$modal.hide('blockModal')"
        />
        <q-btn
          color="negative"
          class="q-mb-sm"
          label="Bloquear"
          @click.native="block"
        />
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  data: () => ({
    date: null,
  }),
  methods: {
    block() {
      this.$emit("blockRequest");
    },
  },
};
</script>

<style>
</style>