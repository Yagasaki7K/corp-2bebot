<template>
  <mdb-modal
    size="lg"
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
      <mdb-modal-title>Novo Usuário</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <form @submit.prevent="handleSave">
        <div class="grey-text p-3">
          <label for="name" class="mt-3 grey-text">Nome</label>
          <input
            v-model="itemEdit.name"
            type="text"
            id="name"
            class="form-control"
            required
          />
          <!-- <label for="phone" class="mt-3 grey-text">Telefone</label>
          <input
            v-model="itemEdit.phone"
            type="text"
            id="phone"
            required
            class="form-control"
          /> -->
          <label for="email" class="mt-3 grey-text">Email</label>
          <input
            v-model="itemEdit.email"
            type="email"
            id="email"
            class="form-control"
            required
          />
          <!-- <label for="username" class="mt-3 grey-text">Username</label>
          <input
            v-model="itemEdit.username"
            type="text"
            id="username"
            class="form-control"
            required
          /> -->
          <label for="password" class="mt-3 grey-text">Password</label>
          <input
            v-model="itemEdit.password"
            type="password"
            id="password"
            class="form-control"
            required
          />
          <!-- <label for="role" class="mt-3 grey-text">Grupo</label>
          <select
            id="role"
            name="role"
            class="browser-default custom-select"
            v-model="itemEdit.role_id"
            required
          >
            <option
              v-for="(item, index) in roles"
              :key="index"
              :value="item.id"
              :selected="itemEdit.role_id == item.id ? true : false"
            >
              {{ item.name }}
            </option>
          </select> -->
          <div class="mt-3 float-right">
            <mdb-btn
              color="danger"
              @click.native="
                () => {
                  clear();
                  close();
                }
              "
              >Cancelar</mdb-btn
            >
            <mdb-btn type="submit" color="primary">Salvar</mdb-btn>
          </div>
        </div>
      </form>
    </mdb-modal-body>
  </mdb-modal>
</template>

<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbBtn,
} from "mdbvue";
import { create } from "@/services/Auth.js";
import { list } from "@/services/Roles.js";
export default {
  props: ["show"],
  components: { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbBtn },
  data: () => ({
    itemEdit: {},
    roles: [],
    rolesName: {
      distributor: "Distribuidor",
      analytics: "Analitico",
      corporate: "Administrador",
    },
  }),
  mounted() {
    list()
      .then((roles) => {
        const filtered = roles.filter((role) => role.name != "distributor");
        this.roles = filtered.map((role) => ({
          ...role,
          name: this.rolesName[role.name],
        }));
      })
      .catch(console.error);
  },
  methods: {
    handleSave() {
      create(this.itemEdit)
        .then(() => {
          this.$emit("updated");
          this.clear();
        })
        .catch((err) => {
          this.processError(err);
        });
    },
    processError({ message }) {
      if (message == "Email address already used.")
        this.$toast.open({
          position: "top",
          message: "Ops, o email informado já existe.",
          type: "error",
        });
    },
    clear() {
      this.itemEdit = {};
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>