<template>
  <div>
    <div class="row justify-end q-mt-md q-pa-md">
      <q-btn
        @click.native="$emit('openModal')"
        color="primary"
        @saved="$emit('saved')"
        class=""
        label="Vincular Representantes"
      />
    </div>
    <Table
      :title="'Representantes e Gerentes'"
      :columns="columns"
      :data="data || []"
      :empty="'Nenhum representante ou gerente encontrado.'"
      :actions="actions"
      @action="actionHandler"
    />
  </div>
</template>

<script>
import Table from "src/components/Table";
export default {
  props: ["data", "catalog"],
  components: {
    Table,
  },
  data: () => ({
    actions: [
      {
        id: 1,
        icon: "fab fa-whatsapp",
        name: "whatsapp",
        color: "primary",
      },
      {
        id: 2,
        icon: "mail_outline",
        name: "mail",
        color: "primary",
      },
      { id: 3, color: "negative", name: "remove", icon: "delete_outline" },
    ],
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
      {
        name: "categoria",
        required: true,
        label: "Categoria",
        align: "center",
        field: (row) =>
          row.group
            ?.split(" ")
            .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(" "),
        format: (val) => `${val ? val : ""}`,
      },
      {
        name: "contact",
        required: true,
        label: "Contato",
        align: "center",
        field: (row) => row.phone,
        format: (val) => `${val ? val : ""}`,
      },
      { name: "action", label: "Ações", align: "center", field: "action" },
    ],
  }),
  methods: {
    actionHandler(name, obj) {
      this[name](obj);
    },
    mail(representante) {
      if (representante.email) {
        let subject = `Link de acesso ${this.catalog.name}`;
        let message =
          `Olá, seu link de acesso para o catálogo ${this.catalog.name} é:` +
          `\nhttp://localhost:8080/${this.catalog._id}/${representante._id}`;
        let a = document.createElement("a");
        a.setAttribute(
          "href",
          `mailto:${representante.email}?subject=${encodeURI(
            subject
          )}&body=${encodeURI(message)}`
        );
        a.click();
        a.remove();
      }
    },
    whatsapp(representante) {
      if (representante.phone) {
        let message =
          `Olá, seu link de acesso para o catálogo ${this.catalog.name} é:` +
          `\nhttp://localhost:8080/${this.catalog._id}/${representante._id}`;
        window.open(
          `https://wa.me/${representante.phone}?text=${encodeURI(message)}`
        );
      }
    },
  },
};
</script>

<style>
</style>