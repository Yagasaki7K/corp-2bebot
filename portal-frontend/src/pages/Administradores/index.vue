<template>
  <div>

    <div class="row justify-end">
      <div class="q-pa-md">
        <q-btn
          @click.native="$modal.show('user-modal')"
          color="primary"
          class=""
          label="Novo Usuário"
        />
      </div>
    </div>
    <Table
      :title="'Administradores'"
      :columns="columns"
      :data="data"
      :empty="'Nenhum administrador encontrado.'"
      :actions="actions"
      @action="actionHandler"
    />
    <modal
      :clickToClose="true"
      :adaptive="true"
      height="auto"
      @before-close="
        () => {
          errorName = false;
          errorEmail = false;
          errorPassword = false;
          admin = {
            group: 'ADMIN',
            type: 'PF',
          };
        }
      "
      name="user-modal"
    >
      <div class="q-gutter-md q-pa-lg">
        <h5>Preencha todos campos para adicionar um usuário</h5>
        <div class="row">
          <div class="col-6  q-pr-lg">
            <q-input :error="errorName"  error-message="Nome é obrigatório" label="Nome" v-model="admin.name" dense />
          </div>
          <div class="col-6">
            <q-input type="email" :error="errorEmail"  error-message="Email inválido" label="Email" v-model="admin.email" dense />
          </div>

        </div>
        <div class="row">
          <div class="col-12 q-pr-lg">
            <q-input type="password" :error="errorPassword"  error-message="Senha é obrigatório" label="Senha" v-model="admin.password" dense />
          </div>

        </div>

        <div class="q-mt-lg row justify-end">
          <q-btn
            color="negative"
            class="q-mb-sm q-mr-sm"
            label="Cancelar"
            @click.native="$modal.hide('user-modal')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            @click="save"
            :disable="btnCreate"
            label="Novo Usuário"
          />
        </div>
      </div>
    </modal>
    <modal
      :clickToClose="true"
      :adaptive="true"
      height="auto"
      @before-close="
        () => {
          errorName = false;
          errorEmail = false;
          errorPassword = false;
          adminEdit = {
            group: 'ADMIN',
            type: 'PF',
          };
        }
      "
      name="user-modal-edit"
    >
      <div class="q-gutter-md q-pa-lg">
        <h5>Preencha todos campos para editar o usuário</h5>
        <div class="row">
          <div class="col-6  q-pr-lg">
            <q-input :error="errorName"  error-message="Nome é obrigatório" label="Nome" v-model="adminEdit.name" dense />
          </div>
          <div class="col-6">
            <q-input type="email" :error="errorEmail"  error-message="Email inválido" label="Email" v-model="adminEdit.email" dense />
          </div>

        </div>
        <div class="row">
          <div class="col-12 q-pr-lg">
            <q-input type="password" :error="errorPassword"  error-message="Senha é obrigatório" label="Senha" v-model="adminEdit.password" dense />
          </div>

        </div>

        <div class="q-mt-lg row justify-end">
          <q-btn
            color="negative"
            class="q-mb-sm q-mr-sm"
            label="Cancelar"
            @click.native="$modal.hide('user-modal-edit')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            @click="updateUser"
            :disable="btnCreate"
            label="Editar"
          />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Table from "src/components/Table.vue";
import { create, update } from "src/services/Auth";
import { list } from "src/services/Auth";
export default {
  components: { Table },
  data: () => ({
    filter: "",
    representante: {},
    admin: {
      group: "ADMIN",
      type: "PF",
    },
    columns: [
      {
        name: "nome",
        required: true,
        label: "Nome",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "email",
        required: true,
        label: "Email",
        align: "center",
        field: (row) => row.email,
        format: (val) => `${val ? val : ""}`,
      },

      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
    data: [],
    actions: [
      {
        id: 1,
        icon: "edit",
        name: "edit",
        color: "primary",
      },
    ],
    adminEdit: {
      group: "ADMIN",
      type: "PF",
    },
    errorName: false,
    errorEmail: false,
    errorPassword: false,
    btnCreate: false

  }),
  methods: {
    save() {
      if (this.admin.name && this.admin.email && this.admin.password){
        this.btnCreate = true
        create(this.admin)
          .then(() => {
            list("?group=ADMIN")
              .then((res) => {
                this.btnCreate = false;
                this.data = res;
                this.$modal.hide('user-modal')
              })
              .catch(console.error);
          })
          .catch(() => {
            if (!this.email)
              this.btnCreate = false;
              this.errorEmail = true;
          });
      }else{
        if (!this.name)
          this.errorName = true;
        if (!this.email)
          this.errorEmail = true;
        if (!this.password)
          this.errorPassword = true;
      }
    },
    updateUser() {
      if (this.adminEdit.name && this.adminEdit.email && this.adminEdit.password){
        this.btnCreate = true
        update(this.adminEdit)
          .then(() => {
            list("?group=ADMIN")
              .then((res) => {
                this.btnCreate = false;
                this.data = res;
                this.$modal.hide('user-modal-edit')
              })
              .catch(console.error);
          })
          .catch(() => {
            if (!this.email)
              this.btnCreate = false;
              this.errorEmail = true;
          });
      }else{
        if (!this.adminEdit.name)
          this.errorName = true;
        if (!this.adminEdit.email)
          this.errorEmail = true;
        if (!this.adminEdit.password)
          this.errorPassword = true;
      }
    },
    edit(admin) {
      admin.password = ''
      this.adminEdit = {...admin};
      this.$modal.show('user-modal-edit')
    },
    actionHandler(name, obj) {
      this[name](obj);
    },
  },
  created() {
    list("?group=ADMIN")
      .then((res) => {
        this.data = res;
      })
      .catch(console.error);
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("unblockDrawerRequest");
      this.$emit("recoverStateRequest");
    });
  },
};
</script>

<style scoped>
</style>
