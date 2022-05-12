<template>
  <modal
    :centered="true"
    :scrollable="true"
    :adaptive="true"
    height="auto"
    @before-close="$emit('before-close')"
    :name="name"
  >
    <q-form @submit="approve">
      <div class="q-pt-lg q-pr-lg q-pl-lg q-mb-md">
        <div class="q-mb-md">
          <label><h6 class="q-ma-none">Código de rastreio:</h6></label>
          <q-input dense v-model="codeRastreio"></q-input>
        </div>
        <div class="q-mb-md">
          <label><h6 class="q-ma-none">Data de entrega:</h6></label>
          <q-input readonly dense v-model="deliveryDate">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="deliveryDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label><h6 class="q-ma-none">Data de faturamento:</h6></label>
          <q-input readonly dense v-model="billingDate">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="billingDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label><h6 class="q-ma-none">Data de programação:</h6></label>
          <q-input readonly dense v-model="programacaoDate">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="programacaoDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row justify-end q-pr-lg q-pb-lg">
        <div class="q-pr-md q-pb-md">
          <q-btn
            color="negative"
            class="q-mr-md"
            label="Cancelar"
            @click="$modal.hide(name)"
          />
          <q-btn type="submit" color="positive" class="" label="Aprovar" />
        </div>
      </div>
    </q-form>
  </modal>
</template>

<script>
import { update } from "src/services/Orders";
export default {
  props: ["name"],
  components: {},
  data: () => ({
    deliveryDate: null,
    billingDate: null,
    programacaoDate: null,
    codeRastreio: "",
    errorDelivery: true,
  }),
  methods: {
    approve() {
      if (
        !this.deliveryDate ||
        !this.billingDate ||
        !this.programacaoDate ||
        !this.codeRastreio
      )
        return;
      let deliveryDate = this.getDateInstance(this.deliveryDate);
      let billingDate = this.getDateInstance(this.billingDate);
      let programacaoDate = this.getDateInstance(this.programacaoDate);

      update({
        _id: this.$route.params.id,
        status: "APPROVED",
        deliveryDate,
        billingDate,
        programacaoDate,
        codeRastreio: this.codeRastreio,
      })
        .then(() => {
          this.$router.push("/orders");
        })
        .catch(console.error);
    },
    getDateInstance(date) {
      let splitted = date.split("/");
      return new Date(splitted[2], splitted[1] - 1, splitted[0]);
    },
  },
};
</script>

<style>
</style>