<template>
  <div class="q-pa-md">
    <div class="row">Status: {{ status }}</div>
    <div class="row">Data de cadastro: {{ createdAt }}</div>
    <div class="row">Última atualização: {{ updatedAt }}</div>
    <div class="row q-mt-md">
      <card title="Total de vendas" :value="`R$${sales}`" />
      <card title="Total de pedidos" :value="orders" />
      <card title="Total de visualizações" value="--" />
    </div>
    <div class="row q-mt-md">
      <card title="Compartilhamentos" value="--" />
      <card title="Total de downloads" value="--" />
      <card title="Card a definir" value="--" />
    </div>
    <div class="q-mt-md row">
      <div class="col col-12 col-md-6 q-pr-sm">
        <table-card
          v-if="productsTop"
          title="Top 10"
          subtitle="Produtos mais pedidos"
          :headers="['Produto', 'Vendas']"
          :dataTable="productsTop"
        />
        <table-card
          v-else
          title="Top 10"
          subtitle="Produtos mais pedidos"
          :headers="['Produto', 'Vendas']"
          :dataTable="[['Não há produtos', '']]"
        />
      </div>
      <div class="col col-12 col-md-6 q-pr-sm">
        <q-card>
          <q-card-section class="backgroundCards text-white">
            <div class="text-h6">Páginas do catálogo</div>
            <div class="text-subtitle">Informações das mais acessadas</div>
          </q-card-section>

          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Página</th>
                <th class="text-right">Acessos</th>
                <th class="text-right">Vendas</th>
                <th class="text-right">Produto mais vendido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">Página 1</td>
                <td class="text-right">159</td>
                <td class="text-right">300.7</td>
                <td class="text-right">Batom</td>
              </tr>
              <tr>
                <td class="text-left">Página 2</td>
                <td class="text-right">237</td>
                <td class="text-right">9</td>
                <td class="text-right">Esmalte</td>
              </tr>
              <tr>
                <td class="text-left">Página 3</td>
                <td class="text-right">262</td>
                <td class="text-right">16</td>
                <td class="text-right">Pente</td>
              </tr>
              <tr>
                <td class="text-left">Página 4</td>
                <td class="text-right">305</td>
                <td class="text-right">300.7</td>
                <td class="text-right">Cosmo</td>
              </tr>
              <tr>
                <td class="text-left">Página 5</td>
                <td class="text-right">356</td>
                <td class="text-right">350.7</td>
                <td class="text-right">Loucas</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </div>
    </div>
    <div class="q-mt-md row justify-between">
      <div class="col col-12 col-md-4 q-gutter-x-xs">
        <q-card class="my-card">
          <q-card-section
            class="backgroundCards text-white flex justify-center items-center"
            style="width: 100%"
          >
            <div class="text-h6">Meios de acesso</div>
          </q-card-section>
          <q-card-section class="flex justify-center items-center">
            <accesses style="width: 100%; height: 500px"></accesses>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-12 col-md-4 q-gutter-x-xs">
        <q-card class="my-card">
          <q-card-section
            class="backgroundCards text-white flex justify-center items-center"
            style="width: 100%"
          >
            <div class="text-h6">Compartilhamentos</div>
          </q-card-section>
          <q-card-section class="flex justify-center items-center">
            <compartilhamento
              style="width: 100%; height: 500px"
            ></compartilhamento>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-12 col-md-4 q-gutter-x-xs">
        <q-card class="my-card">
          <q-card-section
            class="backgroundCards text-white flex justify-center items-center"
            style="width: 100%"
          >
            <div class="text-h6">Gráfico em definição</div>
          </q-card-section>
          <q-card-section class="flex justify-center items-center">
            <definir-chart style="width: 100%; height: 500px"></definir-chart>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
