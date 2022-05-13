
<template>
  <div class="q-pa-md" style="border-top: 1px solid #d3d0d0">
    <div class="row justify-between items-center" style="margin: 1em 0.5em">
      <div style="max-width: 300px">
        <q-input filled v-model="date2">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date range mask="DD/MM/YYYY" :locale="locale" v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <!-- Criar menu de exportar xlsx e pdf -->
      <div class="export-buttons">
        <span class="q-pr-sm">Exportar dados como: </span>
        <div class="buttons">
          <q-btn
            size="md"
            color="primary"
            label="XLSX"
            @click="exportAll"
            style="min-width: 8em"
          />
          <q-btn size="md" color="primary" label="PDF" @click="exportPdf" style="min-width: 8em" />
          <!-- <a class="text-black" href="#" @click.prevent="exportAll"></a> -->
        </div>
      </div>
    </div>

    <div class="row">
      <card title="Total de faturamento" :value="`${toLocaleBRL(sales)}`" />
      <card title="Sessões iniciadas" :value="sessions" />
      <card title="Total de visualizações" :value="accesses" />
      <card title="Média itens no carrinho" :value="averageItems" />
      <card title="Total de itens no carrinho" :value="totalItems" />
      <card title="Total de cliques no logo" :value="clicksLogo" />
    </div>

    <div class="rowCards q-mt-md">
      <div class="rowCardsChild">
        <table-card
          title="Top 10"
          subtitle="Produtos mais pedidos"
          :headers="[
            'Produto',
            'Vendas',
            'Preço unidade',
            'Total em vendas R$',
          ]"
          :dataTable="productsTop"
        >
        </table-card>
      </div>
    </div>

    <div class="rowCards">
      <div class="rowCardsChild">
        <table-card
          title="Top 10 páginas"
          subtitle="Acessos por páginas"
          :headers="['Página', 'Acessos']"
          :dataTable="getPages(pages)"
          style="width: 100%; height: 100%"
        >
        </table-card>
      </div>

      <div class="rowCardsChild">
        <q-card class="my-card">
          <q-card-section class="backgroundCards text-white q-pt-sm q-pb-sm">
            <div class="row justify-center text-h6">Meios de acesso</div>
          </q-card-section>
          <q-card-section class="flex justify-center items-center">
            <accesses
              v-if="reload && (mobile || desktop)"
              :mobile="mobile"
              :desktop="desktop"
              style="width: 100%; height: 400px"
            ></accesses>
          </q-card-section>
        </q-card>
      </div>

      <div class="rowCardsChild">
        <q-card class="my-card">
          <q-card-section class="backgroundCards text-white q-pt-sm q-pb-sm">
            <div class="row justify-center text-h6">Compartilhamentos</div>
          </q-card-section>
          <q-card-section class="flex justify-center items-center">
            <compartilhamento
              v-if="
                reload && (sharedLink || sharedEmail || sharedWpp || sharedFace)
              "
              :sharedLink="sharedLink"
              :sharedEmail="sharedEmail"
              :sharedWpp="sharedWpp"
              :sharedFace="sharedFace"
              style="width: 100%; height: 400px"
            ></compartilhamento>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="rowCards">
      <div class="rowCardsChild">
        <div class="col col-12 col-md-12 q-gutter-x-xs">
          <q-card class="my-card">
            <q-card-section
              class="backgroundCards flex justify-center text-white q-pa-sm row"
            >
              <div class="text-h6">Hora do dia</div>
            </q-card-section>
            <q-card-section class="flex justify-center items-center">
              <HourOfDay
                v-if="reload && hourOfDay && hourOfDay.length"
                :data="hourOfDay"
                style="width: 100%; height: 500px"
              ></HourOfDay>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="rowCardsChild">
        <div class="col col-12 col-md-12 q-gutter-x-xs">
          <q-card class="my-card">
            <q-card-section
              class="backgroundCards flex justify-center text-white q-pa-sm row"
            >
              <div class="text-h6">Total de vendas</div>
            </q-card-section>
            <q-card-section class="flex justify-center items-center">
              <total-sells
                v-if="reload && sellMonths.length"
                :data="sellMonths"
                style="width: 100%; height: 500px"
              ></total-sells>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "src/components/Card.vue";
import TotalSells from "src/pages/charts/totalSells";
import TableCard from "src/components/TableCard.vue";
import {
  top10ProductsSell,
  totalOrdersSales,
  utmInsightsList,
  utmCartData,
  utmCartItems,
  utmAccessData,
} from "src/services/Dashboard";
import Accesses from "../charts/accesses.vue";
import Compartilhamento from "../charts/compartilhamento.vue";
import HourOfDay from "src/pages/charts/HourOfDay.vue";
import Xlsx from "xlsx";
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { startOfMonth, endOfMonth, format, parse } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
export default {
  components: {
    Card,
    TableCard,
    TotalSells,
    Accesses,
    Compartilhamento,
    HourOfDay,
  },
  // components: { UltimoEnvio },/
  props: ["catalog"],
  data: () => ({
    reload: true,
    sessions: 0,
    accesses: 0,

    mobile: 0,
    desktop: 0,

    averageItems: 0,
    totalItems: 0,

    clicksLogo: 0,
    sharedEmail: 0,
    sharedWpp: 0,
    sharedFace: 0,
    sharedLink: 0,
    cartAdd: 0,
    cartRemove: 0,

    sellingPerPage: [],
    accessesPerPage: [],

    sellMonths: [],
    hourOfDay: null,

    productsTop: 0,
    sales: 0,
    orders: 0,
    startDate: format(startOfMonth(new Date()), "yyyy-MM-dd", { locale: ptBR }),
    endDate: format(endOfMonth(new Date()), "yyyy-MM-dd", { locale: ptBR }),

    date: {
      from: format(startOfMonth(new Date()), "dd/MM/yyyy", { locale: ptBR }),
      to: format(endOfMonth(new Date()), "dd/MM/yyyy", { locale: ptBR }),
    },
    date2: `${format(startOfMonth(new Date()), "dd/MM/yyyy", {
      locale: ptBR,
    })} á ${format(endOfMonth(new Date()), "dd/MM/yyyy", { locale: ptBR })}`,
    locale: {
      days: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
      daysShort: ["Dom", "Seg", "Ter", "Quar", "Quin", "Sex", "Sáb"],
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthsShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      firstDayOfWeek: 1,
      pluralDay: "dias",
    },
  }),
  watch: {
    date() {
      const start = this.date?.from;
      const end = this.date?.to;
      if (!start || !end) return;
      this.date2 = `${
        this.date?.from ||
        format(startOfMonth(new Date()), "dd/MM/yyyy", { locale: ptBR })
      } á ${
        this.date?.to ||
        format(endOfMonth(new Date()), "dd/MM/yyyy", { locale: ptBR })
      }`;

      this.startDate = format(
        parse(start, "dd/MM/yyyy", new Date(), { locale: ptBR }),
        "yyyy-MM-dd"
      );
      this.endDate = format(
        parse(end, "dd/MM/yyyy", new Date(), { locale: ptBR }),
        "yyyy-MM-dd"
      );
      console.log("RELOAD");
      this.init();
    },
  },
  computed: {
    pages() {
      return (this.catalog?.path || []).map((path, index) => {
        const sell = (this.sellingPerPage || []).find(
          (item) => item._id == index + 1
        );
        const access = (this.accessesPerPage || []).find(
          (item) => item._id == index + 1
        );
        return {
          page: index + 1,
          sell: sell ? sell.count : 0,
          access: access ? access.count : 0,
        };
      });
    },
  },
  methods: {
    getPages(pages) {
      const pagesSort = pages
        .sort((a, b) =>
          a.access > b.access ? -1 : a.access < b.access ? 1 : 0
        )
        .slice(0, 10);
      return pagesSort.map((item) => [`Página ${item.page}`, item.access]);
    },
    init() {
      this.reload = false;

      top10ProductsSell(
        this.$route.params.id,
        this.startDate,
        this.endDate
      ).then((res) => {
        const newCorrectedProductsTop = res.keys.map((keys) => {
          return keys.map((key, index) => {
            if (index == 2 || index == 3) {
              let keyReplaced = key.replace("R$", "");
              let value = Number(keyReplaced);
              return value.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              });
            }
            return key;
          });
        });
        this.productsTop = newCorrectedProductsTop;
      });
      totalOrdersSales(
        this.$route.params.id,
        this.startDate,
        this.endDate
      ).then((res) => {
        this.sales = res.sales;
        this.orders = res.orders;
      });
      utmInsightsList(this.$route.params.id, this.startDate, this.endDate).then(
        (res) => {
          this.sessions = res.sessionStarted;

          this.mobile = res.accessMobile;
          this.desktop = res.accessDesktop;

          this.clicksLogo = res.clicksLogo;
          this.sharedEmail = res.sharedEmail;
          this.sharedWpp = res.sharedWpp;
          this.sharedFace = res.sharedFace;
          this.sharedLink = res.sharedLink;

          this.sellMonths = res.sellMonths;
          this.sellingPerPage = res.sellingPerPage;

          this.hourOfDay = res.hourOfDay;

          this.$nextTick(() => {
            this.reload = true;
          });
        }
      );
      utmCartData(this.$route.params.id, this.startDate, this.endDate).then(
        (res) => {
          this.cartAdd = res.cartAdd;
          this.cartRemove = res.cartRemove;
        }
      );
      utmCartItems(this.$route.params.id, this.startDate, this.endDate).then(
        (res) => {
          this.averageItems = res.averageItems;
          this.totalItems = res.totalItems;
        }
      );
      utmAccessData(this.$route.params.id, this.startDate, this.endDate).then(
        (res) => {
          this.accesses = res.accesses;
          this.accessesPerPage = res.accessesPerPage;
        }
      );
    },
    exportXlsx(worksheets = [], filename) {
      let wb = Xlsx.utils.book_new();
      for (const ws of worksheets) {
        const { name, worksheet } = ws;
        Xlsx.utils.book_append_sheet(wb, worksheet, name);
      }

      Xlsx.writeFile(wb, filename);
    },
    getWorkSheet(name, cols, data) {
      return { name, worksheet: Xlsx.utils.aoa_to_sheet([cols, ...data]) };
    },
    exportAll() {
      this.exportXlsx(
        [
          this.exportTop(),
          this.exportMeiosAcesso(),
          this.exportMeiosCompartilhamento(),
          this.exportMostAccessed(),
          this.exportItems(),
          this.exportTotalSells(),
          this.exportHourOfDay(),
        ],
        `${this.catalog?.name || ""}-${Date.now()}.xlsx`
      );
    },
    exportItems() {
      return this.getWorkSheet(
        "Itens no carrinho",
        ["MÉDIA", "TOTAL"],
        [[this.averageItems || 0, this.totalItems || 0]]
      );
    },
    exportTop() {
      return this.getWorkSheet(
        "Top10",
        ["PRODUTO", "VENDAS",'VALOR UNITÁRIO','VALOR TOTAL'],
        this.productsTop || []
      );
    },
    exportHourOfDay() {
      return this.getWorkSheet(
        "Horas do Dia",
        ["HORA", "QUANTIDADE %"],
        this.hourOfDay || []
      );
    },
    exportMeiosAcesso() {
      return this.getWorkSheet(
        "Meios Acesso",
        ["MEIO", "ACESSOS"],
        [
          ["mobile", this.mobile || 0],
          ["desktop", this.desktop || 0],
        ]
      );
    },
    exportMeiosCompartilhamento() {
      return this.getWorkSheet(
        "Meios Compartilhamento",
        ["MEIO", "COMPARTILHAMENTOS"],
        [
          ["whatsapp", this.sharedWpp || 0],
          ["facebook", this.sharedFace || 0],
          ["link", this.sharedLink || 0],
          ["email", this.sharedEmail || 0],
        ]
      );
    },
    exportMostAccessed() {
      return this.getWorkSheet(
        "Mais Accessadas",
        ["PAGINA", "ACESSOS"],
        this.getPages(this.pages) || []
      );
    },
    exportTotalSells() {
      return this.getWorkSheet(
        "Total de Vendas",
        ["MES", "TOTAL"],
        this.sellMonths || []
      );
    },
    updateProxy() {
      this.proxyDate = this.date;
    },
    save() {
      this.date = this.proxyDate;
    },
    toLocaleBRL(number) {
      return number.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
    exportPdf() {
      const initialTable = `
        <table class="tableCenter">
            <tr>
                <th style="width:150px">Total Faturamento</th>
                <th style="width:150px">Sessões Iniciadas</th>
                <th style="width:150px">Total Visualizações</th>
            </tr>
            <tr>
                <td style="text-align:center" height="50">R$1.739.966,24</td>
                <td style="text-align:center" height="50">32.005</td>
                <td style="text-align:center" height="50">11.142.142</td>
            </tr>
            <tr>
                <th style="width:150px">Média Itens Carrinho</th>
                <th style="width:150px">Total Itens Carrinho</th>
                <th style="width:150px">Total Cliques Logo</th>
            </tr>
            <tr>
                <td style="text-align:center" height="50">4</td>
                <td style="text-align:center" height="50">34.404</td>
                <td style="text-align:center" height="50">3.573</td>
            </tr>
        </table>
            `;


    const products = [
    {name: 'Sabão', quantitySell: 1200, unitPrice: 120.92, totalSell: 9200.32},
    {name: 'Sabão 2', quantitySell: 1200, unitPrice: 120.92, totalSell: 9200.32}
    ];

    let htmlProducts = '';

    products.forEach(product => htmlProducts += `
    <tr>
        <td style="text-align:center" height="50">${product.name}</td>
        <td style="text-align:center" height="50">${product.quantitySell}</td>
        <td style="text-align:center" height="50">${product.unitPrice}</td>
        <td style="text-align:center" height="50">${product.totalSell}</td>
    </tr>
    `);

    function formatDate(){
      var date = new Date(),
          day  = date.getDate().toString(),
          finalDay = (day.length == 1) ? '0'+day : day,
          month  = (date.getMonth()+1).toString(),
          finalMonth = (month.length == 1) ? '0'+month : month;
      return finalDay+"/"+finalMonth;
    }

    var val = htmlToPdfmake(`
    <div class="logotipo">
    </div>
    <div class="header">
        <h1>Relatório Completo</h1>

        <div class="header-right">
            <h4>Data do relatório</h4>
            <p>${formatDate()}</p>
        </div>
    </div>

    <div class="content">
        <div>
            <h1>Relatório JPaper</h1>

            ${initialTable}

            <div>
                <h3> Top 10 Produtos </h3>
                <table class="tableCenter">
                    <tr>
                        <th style="width:150px">Produto</th>
                        <th style="width:150px">Vendas</th>
                        <th style="width:150px">Preço Unidade</th>
                        <th style="width:150px">Total Vendas</th>
                    </tr>
                    ${htmlProducts}
                </table>
            </div>

            <div>
                <h3> Top 10 Páginas </h3>
                <table class="tableCenter">
                    <tr>
                        <th style="width:150px">Página</th>
                        <th style="width:150px">Acessos</th>
                    </tr>
                    <tr>
                        <td style="text-align:center" height="50">Página <bold> 7 </bold>
                        </td>
                        <td style="text-align:center" height="50">132.220</td>
                    </tr>
                    <tr>
                        <td style="text-align:center" height="50">Página <bold> 8 </bold>
                        </td>
                        <td style="text-align:center" height="50">122.360</td>
                    </tr>
                    <tr>
                        <td style="text-align:center" height="50">Página <bold> 9 </bold>
                        </td>
                        <td style="text-align:center" height="50">162.320</td>
                    </tr>
                </table>
            </div>

            <div>
                <h3> Total de vendas/Mês </h3>
                <table class="tableCenter">
                    <tr>
                        <th style="width:120px">Janeiro 2022</th>
                        <th style="width:120px">Fevereiro 2022</th>
                        <th style="width:120px">Março 2022</th>
                        <th style="width:120px">Outubro 2021</th>
                        <th style="width:120px">Novembro 2021</th>
                        <th style="width:120px">Dezembro 2021</th>
                    </tr>
                    <tr>
                        <td style="text-align:center" height="30">R$ 182.614,23</td>
                        <td style="text-align:center" height="30">R$ 169.547,31</td>
                        <td style="text-align:center" height="30">R$ 19.422,09</td>
                        <td style="text-align:center" height="30">R$ 706.836,33</td>
                        <td style="text-align:center" height="30">R$ 359.962,37</td>
                        <td style="text-align:center" height="30">R$ 301.583,91</td>
                    </tr>
                </table>
            </div>

            <div>
                <h3> Acesso / Hora do Dia </h3>
                <ul>
                    <li>Hora 00:00 - 1%</li>
                    <li>Hora 01:00 - 1%</li>
                    <li>Hora 02:00 - 1%</li>
                    <li>Hora 03:00 - 1%</li>
                    <li>Hora 04:00 - 1%</li>
                    <li>Hora 05:00 - 1%</li>
                    <li>Hora 06:00 - 1%</li>
                    <li>Hora 07:00 - 1%</li>
                    <li>Hora 08:00 - 1%</li>
                    <li>Hora 09:00 - 1%</li>
                    <li>Hora 10:00 - 1%</li>
                    <li>Hora 11:00 - 1%</li>
                    <li>Hora 12:00 - 1%</li>
                    <li>Hora 13:00 - 1%</li>
                    <li>Hora 14:00 - 1%</li>
                    <li>Hora 15:00 - 1%</li>
                    <li>Hora 16:00 - 1%</li>
                    <li>Hora 17:00 - 1%</li>
                    <li>Hora 18:00 - 1%</li>
                    <li>Hora 19:00 - 1%</li>
                    <li>Hora 20:00 - 1%</li>
                    <li>Hora 21:00 - 1%</li>
                    <li>Hora 22:00 - 1%</li>
                    <li>Hora 23:00 - 1%</li>
                </ul>
            </div>
        </div>

    </div>
    `);
    var contentPDF = {content:val};
    pdfMake.createPdf(contentPDF).download();
    },
    },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.backgroundCards {
  background: #00173a;
  min-height: 6em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rowCards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 100%;
  margin: auto;
}
.rowCards .rowCardsChild {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1em 0.5em;
  max-width: 100%;
}
.text-subtitle2 {
  font-size: 20px;
}
.text-h7 {
  font-size: 18px;
  font-weight: bold;
}

.export-buttons .buttons {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

@media (max-width: 1024px) {
  .rowCards {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    margin: auto;
  }
}
</style>
