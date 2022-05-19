<template>
    <q-btn size="md" color="primary" label="PDF" @click="exportPdf" style="min-width: 8em" />
</template>

<script>
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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
        console.log('ThisValue:', this.value);
        const initialTable = `
        <table style="align-items: center">
            <tr>
                <th style="text-align: center; border: 1px solid #ccc;">Total Faturamento</th>
                <th style="text-align: center; border: 1px solid #ccc;">Sessões Iniciadas</th>
                <th style="text-align: center; border: 1px solid #ccc;">Total Visualizações</th>
            </tr>
            <tr>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.sellMonths}</td>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.sessions}</td>
                <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${this.value.accesses}</td>
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


            const products = [
                {
                    name: this.value.productsTop[0], quantitySell: this.value.productsTop[1],
                    unitPrice: this.value.productsTop[2], totalSell: this.value.productsTop[3]
                }
            ];

            const pages = [
                {
                    pages: this.value.pages[0][1], acess: this.value.pages[1][1]
                }
            ]

            let htmlProducts = '';
            let htmlPages = '';

            products.forEach(product => htmlProducts += `
    <tr>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.name}</td>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.quantitySell}</td>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.unitPrice}</td>
        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${product.totalSell}</td>
    </tr>
    `);

            pages.forEach(page => htmlPages += `
      <tr>
          <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">Página <bold> ${page.pages} </bold>
          </td>
          <td style="text-align: center; border; border: 0.5px solid #ccc;" height="50">${page.acess}</td>
      </tr>
      `)


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
              <table>
                <div align="center">
                    <tr style="max-width: 500px">
                        <th style="text-align: center; border: 1px solid #ccc;">Desktop</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Mobile</th>
                    </tr>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.accesses[1]}</td>
                    <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">${this.value.accesses[0]}</td>
                </div>
            </div>

            <div>
              <h3 style="color: #00405c"> Compartilhamentos </h3>
              <table>
                <div align="center">
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
                </div>
            </div>

            <div>
                <h3 style="color: #00405c"> Total de vendas/Mês </h3>
                <table>
                <div align="center">
                    <tr style="max-width: 500px">
                        <th style="text-align: center; border: 1px solid #ccc;">Janeiro 2022</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Fevereiro 2022</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Março 2022</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Outubro 2021</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Novembro 2021</th>
                        <th style="text-align: center; border: 1px solid #ccc;">Dezembro 2021</th>
                    </tr>
                    <tr>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">R$ 182.614,23</td>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">R$ 169.547,31</td>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">R$ 19.422,09</td>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">R$ 706.836,33</td>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">R$ 359.962,37</td>
                        <td style="text-align: center; border; border: 0.5px solid #ccc;" height="30">R$ 301.583,91</td>
                    </tr>
                </div>
                </table>
            </div>

            <hr>

            <div>
                <h3 style="color: #00405c"> Acesso / Hora do Dia </h3>
                <ul>
                    <li>Hora ${this.value.hourOfDay[0]} - ${this.value.hourOfDay[1]}%</li>
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
