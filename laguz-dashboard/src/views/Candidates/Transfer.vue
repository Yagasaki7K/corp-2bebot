<template>
  <portal to="notification-outlet">
    <mdb-modal
      size="md"
      :show="show"
      @close="
        () => {
          clear();
          close();
        }
      "
      id="modalTransfer"
    >
      <mdb-modal-header>
        <mdb-modal-title>Transferência</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form @submit.prevent="handleTransfer">
          <div class="p-3">
            <mdb-row>
              <mdb-col col="6">
                <label class="grey-text">Candidato</label>
                <autocomplete
                  @submit="selectAppointment"
                  :get-result-value="resultValueAppointment"
                  :search="searchAppointment"
                ></autocomplete>
              </mdb-col>
              <mdb-col col="6">
                <label class="grey-text">Distribuidor</label>
                <autocomplete
                  @submit="selectDistributor"
                  :get-result-value="resultValue"
                  :search="search"
                ></autocomplete>
              </mdb-col>
            </mdb-row>
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
              <mdb-btn type="submit" color="primary">Transferir</mdb-btn>
            </div>
          </div>
        </form>
      </mdb-modal-body>
    </mdb-modal>
  </portal>
</template>

<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbBtn,
  mdbRow,
  mdbCol,
} from "mdbvue";

import { getDistributors } from "@/services/Distributors.js";

import { getAppointments } from "@/services/Candidates.js";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import { updateStatusAppointment } from "../../services/Appointments";
export default {
  props: ["show"],
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbBtn,
    Autocomplete,
    mdbRow,
    mdbCol,
  },
  data: () => ({
    distributors: [],
    distributor: {},
    appointments: [],
    appointment: {},
  }),
  mounted() {
    getAppointments()
      .then((res) => {
        this.appointments = res;
      })
      .catch(console.error);
    getDistributors()
      .then((res) => {
        this.distributors = res;
      })
      .catch(console.error);
  },
  methods: {
    selectAppointment(appointment) {
      this.appointment = appointment;
    },
    selectDistributor(distributor) {
      this.distributor = distributor;
    },
    search(input) {
      if (input.length < 3) {
        return [];
      }
      return this.distributors.filter((distributor) => {
        return distributor.url_username
          .toLowerCase()
          .startsWith(input.toLowerCase());
      });
    },
    searchAppointment(input) {
      if (input.length < 3) {
        return [];
      }
      return this.appointments.filter((appointment) => {
        return appointment.lead.name
          .toLowerCase()
          .startsWith(input.toLowerCase());
      });
    },
    resultValue(result) {
      return result.url_username;
    },
    resultValueAppointment(result) {
      return result.lead.name;
    },
    handleTransfer() {
      if (!this.distributor.id || !this.appointment.id) {
        this.$toast.open({
          position: "top",
          message: "Informação obrigatória não preenchida!",
          type: "error",
        });
        return;
      }
      const data = {
        distributor_id: this.distributor.id,
        appointment: this.appointment.id,
        event: "reallocated",
      };
      updateStatusAppointment(data)
        .then(() => {
          this.$toast.open({
            position: "top",
            message: "Sucesso",
            type: "success",
          });
          this.$emit("transfered");
          this.clear();
          this.close();
        })
        .catch(() => {
          this.$toast.open({
            position: "top",
            message:
              "Ops, aconteceu um erro ao editar o status do lead! Tente mais tarde!",
            type: "error",
          });
        });
    },
    clear() {
      this.distributor = {};
      this.appointment = {};
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
#modalTransfer .autocomplete ul {
  position: absolute !important;
  list-style-type: none;
  background: white;
  border-bottom-left-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  padding: 0;
  margin: 0;
}

#modalTransfer .autocomplete ul li {
  height: 2.5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

#modalTransfer .autocomplete ul li:hover {
  background: #ced4da;
}

#modalTransfer .autocomplete input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

#modalTransfer .autocomplete input:focus {
  outline: none;
  border-color: #79b4f8;
  box-shadow: 0 0 1px 3px #ccdefd;
  -webkit-box-shadow: 0 0 1px 3px #ccdefd;
}

.grey-text {
  color: #9e9e9e !important;
}
</style>