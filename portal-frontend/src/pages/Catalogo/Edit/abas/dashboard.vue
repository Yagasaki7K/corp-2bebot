<template>
  <div class="q-pa-md" style="border-top: 1px solid #d3d0d0">
    <div class="row justify-between items-center">
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
      <span class="q-pr-sm"
        >Exportar dados como:
        <a class="text-black" href="#" @click.prevent="exportAll">Xlsx</a></span
      >
    </div>
    <div class="row q-mt-md">
      <card title="Total de faturamento" :value="`R$${sales.toFixed(2)}`" />
      <card title="Sessões iniciadas" :value="sessions" />
      <card title="Total de visualizações" :value="accesses" />
      <card title="Média itens no carrinho" :value="averageItems" />
      <card title="Total de itens no carrinho" :value="totalItems" />
      <card title="Total de cliques no logo" :value="clicksLogo" />
    </div>
    <div class="row q-mt-md"></div>
    <div class="q-mt-md row">
      <div class="col col-12 col-md-6 q-pr-sm">
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
      <div class="col col-12 col-md-6 q-pr-sm">
        <table-card
          title="Top 10 páginas"
          subtitle="Acessos por páginas"
          :headers="['Página', 'Acessos']"
          :dataTable="getPages(pages)"
        >
        </table-card>
      </div>
    </div>
    <div class="q-mt-md row justify-between">
      <div class="col col-12 col-md-12 q-gutter-x-xs">
        <q-card class="my-card">
          <q-card-section
            class="backgroundCards flex justify-center text-white q-pa-sm row"
            style="width: 100%"
          >
            <div class="text-h6">Total de vendas</div>
          </q-card-section>
          <q-card-section
            style="width: 100%"
            class="flex justify-center items-center"
          >
            <total-sells
              v-if="reload && sellMonths.length"
              :data="sellMonths"
              style="width: 100%; height: 500px"
            ></total-sells>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-mt-md row justify-between">
      <div class="col col-12 col-md-12 q-gutter-x-xs">
        <q-card class="my-card">
          <q-card-section
            class="backgroundCards flex justify-center text-white q-pa-sm row"
            style="width: 100%"
          >
            <div class="text-h6">Hora do dia</div>
          </q-card-section>
          <q-card-section
            style="width: 100%"
            class="flex justify-center items-center"
          >
            <HourOfDay
              v-if="reload && hourOfDay && hourOfDay.length"
              :data="hourOfDay"
              style="width: 100%; height: 500px"
            ></HourOfDay>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-mt-md row justify-between">
      <div class="col col-12 col-md-6 q-gutter-x-xs">
        <q-card class="my-card">
          <q-card-section
            class="backgroundCards text-white q-pt-sm q-pb-sm"
            style="width: 100%"
          >
            <div class="row justify-center text-h6">Meios de acesso</div>
          </q-card-section>
          <q-card-section class="flex justify-center items-center">
            <accesses
              v-if="reload && (mobile || desktop)"
              :mobile="mobile"
              :desktop="desktop"
              style="width: 100%; height: 500px"
            ></accesses>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-12 col-md-6 q-gutter-x-xs">
        <q-card class="my-card">
          <q-card-section
            class="backgroundCards text-white q-pt-sm q-pb-sm"
            style="width: 100%"
          >
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
              style="width: 100%; height: 500px"
            ></compartilhamento>
          </q-card-section>
        </q-card>
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
        this.productsTop = res.keys;
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
        ["PRODUTO", "VENDAS"],
        this.productsTop
      );
    },
    exportHourOfDay() {
      return this.getWorkSheet(
        "Horas do Dia",
        ["HORA", "QUANTIDADE %"],
        this.hourOfDay
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
        ["PAGINA", "ACESSOS", "VENDAS"],
        this.getPages(this.pages)
      );
    },
    exportTotalSells() {
      return this.getWorkSheet(
        "Total de Vendas",
        ["MES", "TOTAL"],
        this.sellMonths
      );
    },
    updateProxy() {
      this.proxyDate = this.date;
    },

    save() {
      this.date = this.proxyDate;
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
}
.text-subtitle2 {
  font-size: 20px;
}
.text-h7 {
  font-size: 18px;
  font-weight: bold;
}
</style>
