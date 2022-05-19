<template>
    <q-btn size="md" color="primary" label="PDF" @click="exportPdf" style="min-width: 8em" />
</template>

<script>
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { toLocaleBRL } from 'src/utils/formatters';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
    props: ['value'],
    data() {
        return {
            productsTop: this.productsTop,
            sellMonths: this.sellMonths,
            pages: this.pages,
            averageItems: this.averageItems,
            totalItems: this.totalItems,
            clicksLogo: this.clicksLogo,
            sessions: this.sessions,
            sales: this.sales,
            accesses: this.accesses,
            sharedEmail: this.sharedEmail,
            sharedFace: this.sharedFace,
            sharedLink: this.sharedLink,
            sharedWpp: this.sharedWpp,
            hourOfDay: this.hourOfDay,
        }
    },
    methods: {
        formatDate() {
            var date = new Date(),
                day = date.getDate().toString(),
                finalDay = (day.length == 1) ? '0' + day : day,
                month = (date.getMonth() + 1).toString(),
                finalMonth = (month.length == 1) ? '0' + month : month;
            return finalDay + "/" + finalMonth;
        },
        exportPdf() {
        console.log(JSON.stringify(this.value));
        const initialTable = `
        <table style="align-items: center">
            <tr>
                <th style="text-align: center; border: 1px solid #ccc;">Total Faturamento</th>
                <th style="text-align: center; border: 1px solid #ccc;">Sessões Iniciadas</th>
                <th style="text-align: center; border: 1px solid #ccc;">Total Visualizações</th>
            </tr>
            <tr>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.sales}</td>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.sessions}</td>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.accesses[0]}</td>
            </tr>
            <tr>
                <th style="text-align: center; border: 1px solid #ccc;">Média Itens Carrinho</th>
                <th style="text-align: center; border: 1px solid #ccc;">Total Itens Carrinho</th>
                <th style="text-align: center; border: 1px solid #ccc;">Total Cliques Logo</th>
            </tr>
            <tr>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.averageItems}</td>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.totalItems}</td>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.clicksLogo}</td>
            </tr>
        </table>
    `;


            const products = (this.value.productsTop || []).map((product)=>({
                name:product[0],
                quantitySell:product[1],
                unitPrice:product[2],
                totalSell:product[3]
            }));

            const pages =(this.value.pages || []).map(({page,access})=>({
                page,
                access
            }))
            
            const sellMonths = (this.value.sellMonths || []).map(sellmonth=>({
                month:sellmonth[0],
                sells:sellmonth[1]
            }))

              const hourOfDay = (this.value.hourOfDay || [ ]).map(element=>({
                  hour:element[0],
                  accesses:element[1]
              }))

            let htmlProducts = '';
            let htmlPages = '';
            let htmlMonthSales=''
            let htmlHourOfDay = ''

            products.forEach(product => htmlProducts += `
    <tr>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.name}</td>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.quantitySell}</td>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.unitPrice}</td>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.totalSell}</td>
    </tr>
    `);

            pages.slice(0,10).forEach(({page,access}) => htmlPages += `
      <tr>
          <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">Página <bold> ${page} </bold>
          </td>
          <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${access}</td>
      </tr>
      `)

      sellMonths.forEach(sellmonth=>{
          htmlMonthSales+=`
           <tr>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${sellmonth.month}</td>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${toLocaleBRL(sellmonth.sells)}</td>
            </tr>
          `
      })

      
        hourOfDay.forEach(({hour,accesses})=>{
          htmlHourOfDay+=`
           <li>Hora ${hour} - ${accesses}%</li>
          `
      })

            var val = htmlToPdfmake(`
    <div class="logotipo">
    </div>
    <div class="header">
        <h1>Relatório Completo - 2BEBOT</h1>

        <div class="header-right">
            <h5>Data do relatório: <i>${this.formatDate()}</i></h5>
        </div>
    </div>

    <hr>

    <div class="content">
        <div>
            <h1 style="color: #00405c">Relatório JPaper</h1>

            ${initialTable}

            <hr>

            <div>
                <h3 style="color: #00405c"> Top 10 Produtos </h3>
                <table>
                    <tr>
                        <th style="text-align: center; border: 1px solid #ccc;">Produto</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Vendas</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Preço Unidade</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Total Vendas</th>
                    </tr>
                    ${htmlProducts}
                </table>
            </div>

            <hr>

            <div>
                <h3 style="color: #00405c"> Top 10 Páginas </h3>
                <table>
                    <tr>
                        <th style="text-align: center; border: 1px solid #ccc;">Página</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Acessos</th>
                    </tr>
                    ${htmlPages}
                </table>
            </div>

            <hr>

            <div>
              <h3 style="color: #00405c"> Meios de Acesso </h3>
                <div align="center">
              <table>
                    <tr style="max-width: 500px">
                        <th style="text-align: center; border: 1px solid #ccc;">Desktop</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Mobile</th>
                    </tr>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.accesses[2][1]}</td>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.accesses[1][1]}</td>
                </table>
                </div>
                
            </div>
            <hr>
            <div>
              <h3 style="color: #00405c"> Compartilhamentos </h3>
                <div align="center">
              <table>
                    <tr style="max-width: 500px">
                        <th style="text-align: center; border: 1px solid #ccc;">E-mail</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Link</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Facebook</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Whatsapp</th>
                    </tr>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.sharedEmail}</td>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.sharedLink}</td>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.sharedFace}</td>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.sharedWpp}</td>
                </table>
                </div>
            </div>
            <hr>
            <div>
                <h3 style="color: #00405c"> Total de vendas/Mês </h3>
                <div align="center">
                <table>
                    <tr style="max-width: 500px">
                        <th style="text-align: center; border: 1px solid #ccc;">Mês</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Vendas</th>
                    </tr>
                   ${htmlMonthSales}
                </table>
                </div>
            </div>

            <hr>

            <div>
                <h3 style="color: #00405c"> Acesso / Hora do Dia </h3>
                <ul>
                    ${htmlHourOfDay}
                </ul>
            </div>
        </div>

    </div>
    `)
      var contentPDF = { content: val };
      pdfMake.createPdf(contentPDF).download();
    }
    }
}



</script>
