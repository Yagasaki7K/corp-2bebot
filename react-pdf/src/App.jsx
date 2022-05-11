import { jsPDF } from "jspdf";

import './App.css'

function exampleSavePdf() {

    const doc = new jsPDF();
    let logo = 'https://assets-global.website-files.com/5e42772e6a8cfd42a9715206/5f57b3f463fbeb775c448ee4_CHIC17YGIHNR2CZD7HPKOTVODDOLGKY4%201.png'

    let invoicing = 'R$ 3.200,16'
    let startSessions = '144'
    let visualizations = '1198'
    let itensCart = '1'
    let itensTotal = '16'
    let itensClick = '0'
    let product = 'KIT Baú Caixa Azul - Uso Diário'
    let sells = '16'
    let priceUnit = 'R$ 200,00'
    let priceTotal = 'R$ 3.200,16'
    let acess1 = '221'
    let acess2 = '214'
    let acess3 = '202'
    let acess4 = '194'
    let acess5 = '144'
    let acess6 = '198'
    let acess7 = '121'
    let acess8 = '97'
    let acess9 = '5'
    let acessActive = '69.4%'
    let shareActive = '50.0%'
    let acessDenied = '30.6%'
    let shareDenied = '50.0%'

    doc.addImage(logo, 'JPEG', 150, 15, 40, 40);

    doc.setLineWidth(0.5)
    doc.line(5, 5, 125, 5)

    doc.setFontSize(10)
    doc.text(`Total de Faturamento: ${invoicing}`, 5, 10);
    doc.text(`Sessões Iniciadas: ${startSessions}`, 5, 15);
    doc.text(`Total de Visualizações: ${visualizations}`, 5, 20);
    doc.text(`Média Itens no Carrinho: ${itensCart}`, 5, 25);
    doc.text(`Total de Itens no Carrinho: ${itensTotal}`, 5, 30);
    doc.text(`Total de Cliques no logo: ${itensClick}`, 5, 35);

    doc.setLineWidth(0.5)
    doc.line(5, 38, 125, 38)

    doc.setFontSize(15)
    doc.text(`Top 10:`, 5, 45);

    doc.setFontSize(10)
    doc.text(`Produto: ${product}`, 5, 50);
    doc.text(`Vendas: ${sells} | Preço Unidade ${priceUnit} | Total em Vendas R$ ${priceTotal}`, 5, 55);
    doc.text(`Total de Cliques no logo: ${itensClick}`, 5, 60);

    doc.setLineWidth(0.5)
    doc.line(5, 63, 125, 63)

    doc.setFontSize(15)
    doc.text(`Top 10 Páginas:`, 5, 70);
    
    doc.setFontSize(10)
    doc.text(`Página 1: ${acess1} | Página 2: ${acess2} | Página 3: ${acess3}`, 5, 75)
    doc.text(`Página 4: ${acess4} | Página 5: ${acess5} | Página 6: ${acess6}`, 5, 80)
    doc.text(`Página 7: ${acess7} | Página 8: ${acess8} | Página 9: ${acess9}`, 5, 85)

    doc.setLineWidth(0.5)
    doc.line(5, 88, 125, 88)

    doc.setFontSize(15)
    doc.text(`Meios de Acesso:`, 5, 95);

    doc.setFontSize(10)
    doc.text(`Acessos Ativos: ${acessActive} | Acessos Negativos: ${acessDenied}`, 5, 100);

    doc.setLineWidth(0.5)
    doc.line(5, 103, 125, 103)

    doc.setFontSize(15)
    doc.text(`Compartilhamentos:`, 5, 110);

    doc.setFontSize(10)
    doc.text(`Ativos: ${shareActive} | Negativos: ${shareDenied}`, 5, 115);

    doc.save("newdocument.pdf");
}

function App() {

    return (
        <div className="App">
            <form>
                <input type="button" value="Save PDF" onClick={exampleSavePdf} />
            </form>
        </div>
    )
}

export default App
