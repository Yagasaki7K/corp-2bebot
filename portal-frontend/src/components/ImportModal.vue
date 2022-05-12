<template>
  <modal
    :adaptive="true"
    height="auto"
    @before-close="
      () => {
        $emit('unblockDrawerRequest');
        $emit('recoverStateRequest');
        this.response = null;
        this.file = null;
      }
    "
    name="importmodal"
  >
    <div v-if="response" class="q-gutter-md q-pa-lg">
      <p>
        <span class="text-bold">Processados: </span>
        {{ response.processed }}
      </p>
      <p>
        <span class="text-bold">Novos: </span>
        {{ response.created.length }}
      </p>
      <p>
        <span class="text-bold">Atualizados: </span>
        {{ response.updated.length }}
      </p>
      <p>
        <span class="text-bold">Com erro: </span>
        {{ response.errors.length }}
      </p>
    </div>
    <div v-else class="q-gutter-md q-pa-lg">
      <h5>Selecione um arquivo excel para ser importado</h5>
      <div class="column">
        <q-file
          v-model="file"
          outlined
          label="Selecione um arquivo CSV"
          accept=".xls, .xlsx"
        />
      </div>

      <div class="q-mt-lg row justify-end">
        <q-btn
          color="negative"
          class="q-mb-sm q-mr-sm"
          label="Cancelar"
          @click.native="$modal.hide('importmodal')"
        />
        <q-btn
          color="positive"
          class="q-mb-sm"
          label="Importar"
          @click.native="handleSave"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import XLSX from "xlsx";
import { uploadXlsx } from "src/services/Products";
export default {
  props: ["exists"],
  data: () => ({
    file: null,
    response: null,
  }),
  methods: {
    upload(obj) {
      uploadXlsx(obj)
        .then((res) => {
          this.response = res;
        })
        .catch(console.error)
        .finally(() => {
          this.$emit("imported");
        });
    },
    handleSave() {
      const reader = new FileReader();
      const upload = this.upload;
      const array = this.exists;
      const catalog = this.$route.params.id;
      reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
        });

        const obj = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        const mapped = obj.map((data) => {
          const newData = {}
          Object.keys(data).forEach(key => {
            newData[key.trim()] = data[key]
          })
          let _id;
          let name = newData["Nome do Produto"];
          let description = newData["Para uso comunicação"];
          let price = newData["Preço de venda Consumidor Final"];
          let sku = newData["Código do Produto"];
          let altered;
          for (let iterator = 0; iterator < array.length; iterator++) {
            const element = array[iterator];
            if (element.sku == sku) {
              _id = element._id;
              altered =
                element.name != name ||
                element.description != description ||
                element.price != price;
              break;
            }
            altered = false;
          }
          return _id
            ? { catalog, name, description, price, sku, _id, altered }
            : { catalog, name, description, price, sku };
        });
        upload(mapped);
      };
      reader.onerror = function (ex) {
        console.error(ex);
      };

      reader.readAsBinaryString(this.file);
    },
  },
};
</script>

<style>
</style>
