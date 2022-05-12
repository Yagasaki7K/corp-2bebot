<template>
  <div>
    <reprove-modal
      :name="'reproveModal'"
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
    />
    <approve-modal
      :name="'approveModal'"
      @before-close="
        () => {
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
    />
    <modal
      :adaptive="true"
      height="auto"
      @before-close="
        () => {
          order.discount = tempDiscount;
          $emit('unblockDrawerRequest');
          $emit('recoverStateRequest');
        }
      "
      name="showDiscount"
    >
      <div class="q-gutter-sm q-pa-lg">
        <div class="column">
          <label>Desconto:</label>
          <q-input v-model="order.discount" style="font-size: 1.7em">
            <template v-slot:prepend>
              <q-icon name="fas fa-percent" />
            </template>
          </q-input>
        </div>

        <div class="q-mt-lg row justify-end">
          <q-btn
            color="negative"
            class="q-mb-sm q-mr-sm"
            label="Cancelar"
            @click.native="$modal.hide('showDiscount')"
          />
          <q-btn
            color="positive"
            class="q-mb-sm"
            label="Aplicar"
            @click.native="applyDiscount"
          />
        </div>
      </div>
    </modal>
    <div class="row justify-between q-pa-md items-baseline">
      <h4 class="q-ma-none">{{ alter ? "Pedido Original" : "Pedido" }}</h4>
      <div class="text-right">
        <h5 class="q-ma-none">Valor total: {{ total }}</h5>
        <div v-if="Number(discount)">
          <p class="q-ma-none">Subtotal: {{ subtotal }}</p>
          <p class="q-ma-none">
            Desconto ({{ order.discount }}%): - R$ {{ discount }}
          </p>
        </div>
      </div>
    </div>
    <Table
      :title="'Itens'"
      :columns="columns"
      :data="order.items || []"
      :empty="'Nenhum pedido encontrado.'"
      :actions="actions"
    />

    <div>
      <div v-if="showAlter">
        <div class="row justify-between q-pa-md items-baseline">
          <h4 class="q-ma-none">Pedido Modificado</h4>
          <div class="text-right">
            <h5 class="q-ma-none">Valor total: {{ totalAlterado }}</h5>
            <div v-if="Number(discount)">
              <p class="q-ma-none">Subtotal: {{ subtotalAlterado }}</p>
              <p class="q-ma-none">
                Desconto ({{ order.discount }}%): - R$ {{ discount }}
              </p>
            </div>
          </div>
        </div>
        <div class="q-pa-md">
          <q-table
            title="Itens"
            :data="order.proposed"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="sku" :props="props">{{
                  props.row.product.sku
                }}</q-td>
                <q-td key="name" :props="props">{{
                  props.row.product.name
                }}</q-td>
                <q-td key="quantity" :props="props"
                  >{{ props.row.quantity }}
                  <q-popup-edit
                    v-if="alter"
                    v-model="props.row.quantity"
                    buttons
                    persistent
                  >
                    Quantidade:
                    <q-input
                      v-model="props.row.quantity"
                      dense
                      hint="Use os botões para fechar"
                      autofocus
                    /> </q-popup-edit
                ></q-td>
                <q-td key="subtotal" :props="props">{{
                  props.row.product.price * props.row.quantity
                }}</q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <div
        class="row justify-end q-pr-md q-pb-md"
        v-if="user.group == 'ADMIN' && order.status == 'WAIT'"
      >
        <q-btn
          color="negative"
          class="q-mr-md"
          label="Recusar"
          @click="
            () => {
              $emit('saveStateRequest');
              $emit('closeDrawerRequest');
              $emit('blockDrawerRequest');
              $modal.show('reproveModal');
            }
          "
        />
        <q-btn
          @click.native="
            () => {
              $emit('saveStateRequest');
              $emit('closeDrawerRequest');
              $emit('blockDrawerRequest');
              $modal.show('approveModal');
            }
          "
          color="positive"
          class=""
          label="Aprovar"
        />
      </div>
      <div
        v-else-if="
          order.status == 'NEGOTIATION-REPRESENTANTE' &&
          order.representante == user._id
        "
        class="row justify-end q-pr-md q-pb-md"
      >
        <q-btn
          @click.native="
            $emit('saveStateRequest');
            $emit('closeDrawerRequest');
            $emit('blockDrawerRequest');
            $modal.show('showDiscount');
          "
          color="primary"
          class="q-mr-md"
          icon="attach_money"
          label="Desconto"
        />
        <q-btn
          @click.native="alterShow"
          v-if="!alter"
          color="primary"
          class="q-mr-md"
          icon="construction"
          label="Alterar pedido"
        />
        <q-btn
          @click.native="handleAlter"
          v-else
          color="primary"
          class="q-mr-md"
          icon="save"
          label="Salvar"
        />
        <q-btn
          @click.native="send"
          color="positive"
          class=""
          label="Enviar pedido"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "src/components/Table.vue";
import { get, update } from "src/services/Orders";
import { updateSend } from "src/services/Auth";
import ReproveModal from "src/components/ReproveModal.vue";
import ApproveModal from "src/components/ApproveModal.vue";
export default {
  components: { Table, ReproveModal, ApproveModal },
  props: ["user"],
  computed: {
    showAlter() {
      return this.alter || this.order.proposed?.length;
    },
    discount() {
      return (
        ((this.order.items || []).reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ) *
          this.order.discount) /
        100
      ).toFixed(2);
    },
    subtotal() {
      return (this.order.items || [])
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        .toFixed(2);
    },
    total() {
      let sub = (this.order.items || []).reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return (sub - (this.order.discount * sub) / 100).toFixed(2);
    },
    subtotalAlterado() {
      return (this.order.proposed || [])
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        .toFixed(2);
    },
    totalAlterado() {
      let sub = (this.order.proposed || []).reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return (sub - (this.order.discount * sub) / 100).toFixed(2);
    },
  },
  data: () => ({
    filter: "",
    alter: false,
    tempDiscount: 0,
    columns: [
      {
        name: "sku",
        required: true,
        label: "SKU",
        align: "left",
        field: (row) => row.product.sku,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "name",
        required: true,
        label: "Produto",
        align: "center",
        field: (row) => row.product.name,
        format: (val) => `${val ? val : ""}`,
        sortable: true,
      },
      {
        name: "quantity",
        required: true,
        label: "Quantidade",
        align: "center",
        field: (row) => row.quantity,
        format: (val) => `${val ? val : ""}`.padStart(2, "0"),
      },
      {
        name: "subtotal",
        required: true,
        label: "Subtotal",
        align: "center",
        field: (row) => row.product.price * row.quantity,
        format: (val) => `${val ? val : ""}`,
      },
    ],
    actions: [],
    order: {},
  }),
  methods: {
    handleAlter() {
      update({
        _id: this.order._id,
        proposed: this.order.proposed,
      })
        .then(() => {
          this.alter = false;
        })
        .catch(console.error);
    },
    alterShow() {
      if (!this.order.proposed?.length)
        this.order.proposed = this.order.items.map((data) => ({
          ...data,
        }));
      this.alter = true;
    },
    applyDiscount() {
      update({ _id: this.order._id, discount: this.order.discount })
        .then(() => {
          this.tempDiscount = this.order.discount;
          this.$modal.hide("showDiscount");
        })
        .catch(console.error);
    },
    approve() {
      update({ _id: this.order._id, status: "APPROVED" })
        .then(() => {
          this.$router.push("/orders");
        })
        .catch(console.error);
    },
    send() {
      update({ _id: this.order._id, status: "WAIT" })
        .then(async () => {
          await updateSend(this.user);
          this.$router.push("/orders");
        })
        .catch(console.error);
    },
  },
  created() {
    get(this.$route.params.id)
      .then((res) => {
        this.order = res;
        this.tempDiscount = res.discount || 0;
      })
      .catch(console.error);
  },
};
</script>

<style scoped>
.fas.fa-percent {
  font-size: 1em;
}
</style>