<template>
  <div class="content">
    <mdb-row v-if="!distributorView">
      <mdb-col col="4">
        <mdb-row>
          <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">CPF: </span>
            {{ formatCpf(info.lead.leads_data.cpf) }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Sexo: </span>
            {{ info.lead.gender }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Cidade: </span>
            {{
              `${info.lead.leads_address.city} - ${info.lead.leads_address.state}`
            }}
          </p>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Telefone: </span>
            {{ info.lead.phone }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Email: </span>
            {{ info.lead.email }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Meio Contato: </span>
            {{ translate(info.channel) }}
          </p>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Horário Contato: </span>
            {{ info.lead.best_hour }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Como Soube: </span>
            {{ info.lead.leads_data.knowledge.location }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Interesse: </span>
            {{ info.lead.leads_data.interest }}
          </p>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <mdb-row v-else>
      <mdb-col col="4">
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Sexo: </span>
            {{ info.lead.gender }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Cidade: </span>
            {{
              `${info.lead.leads_address.city} - ${info.lead.leads_address.state}`
            }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Telefone: </span>
            {{ info.lead.phone }}
          </p>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Email: </span>
            {{ info.lead.email }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Meio Contato: </span>
            {{ translate(info.channel) }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Horário Contato: </span>
            {{ info.lead.best_hour }}
          </p>
        </mdb-row>
      </mdb-col>
      <mdb-col col="4">
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Como Soube: </span>
            {{ info.lead.leads_data.knowledge.location }}
          </p>
        </mdb-row>
        <mdb-row>
           <p class="first-text font-weight-bolder">
            <span class="first-text font-weight-bold">Interesse: </span>
            {{ info.lead.leads_data.interest }}
          </p>
        </mdb-row>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { mdbRow, mdbCol } from "mdbvue";
import { updateAppointmentsContact } from "../../../../services/Appointments";

export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    distributorView: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    mdbRow,
    mdbCol,
  },
  mounted() {
    [this.dateContact] = this.info.date.split(".");
  },
  data() {
    return {
      dateContact: "",
    };
  },
  methods: {
    formatCpf(cpf) {
      if (!cpf) return "";
      cpf = cpf.replace(/[^\d]/g, "");
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },
    translate(channel) {
      if (channel == "phone") return "Telefone";
      if (channel == "email") return "Email";
      return channel;
    },
    handleChange() {
      updateAppointmentsContact(this.info.id, { date: this.dateContact })
        .then(() => {
          this.$toast.open({
            position: "top",
            message: "Status alterado com sucesso!",
            type: "success",
          });
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao editar o status de contato! Tente mais tarde!",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.content {
  padding: 0px 30px 30px 30px;
  margin-bottom: 2rem;
}
.form-control {
  height: 25px;
  background: #ffffff;
  border-radius: 10px;
}
p {
  font-size: 1em;
  margin-bottom: 2px;
}
.label {
  color: black;
  font-weight: bolder;
}
</style>