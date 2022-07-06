<template>
  <mdb-modal
    size="md"
    :show="show"
    :centered="true"
    @close="
      () => {
        clear();
        close();
      }
    "
  >
    <mdb-modal-header>
      <mdb-modal-title>Bloquear usuário</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      Tem certeza que deseja bloquear o usuário?
    </mdb-modal-body>
    <mdb-modal-footer>
      <mdb-btn
        color="secondary"
        @click.native="
          () => {
            clear();
            close();
          }
        "
        >Não</mdb-btn
      >
      <mdb-btn color="primary" @click.native="handleBlock">Sim</mdb-btn>
    </mdb-modal-footer>
  </mdb-modal>
</template>

<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
} from "mdbvue";
import { update } from "@/services/Auth.js";
export default {
  props: ["show", "itemBlock"],
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
  },
  data: () => ({}),
  mounted() {},
  methods: {
    handleBlock() {
      update({ id: this.itemBlock.id, blocked: true })
        .then(() => {
          this.$emit("updated");
          this.clear();
        })
        .catch(console.error);
    },
    clear() {
      this.itemBlock = {};
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>