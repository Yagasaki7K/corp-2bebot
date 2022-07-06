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
      <mdb-modal-title>Remover usuário</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body> Tem certeza que deseja remover o usuário? </mdb-modal-body>
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
      <mdb-btn color="primary" @click.native="handleRemove">Sim</mdb-btn>
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
import { remove } from "@/services/Auth.js";
export default {
  props: ["show", "itemRemove"],
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
    handleRemove() {
            remove(this.itemRemove._id)
        .then(() => {
          this.$emit("updated");
          this.clear();
        })
        .catch(console.error);
    },
    clear() {
      this.itemRemove = {};
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>