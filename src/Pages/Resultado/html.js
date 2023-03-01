import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";


export const GerarPdf = async (dadosC, dadosB, dadosE, contato, total, rateio) => {
	const htmlpdf = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de compra</title>
        <style>
        h1{
          font-size:2rem;
        }
          h2{
            font-size:1.5rem;
          }
          ul{
            list-style:none;
          }
          li{
            font-size: 1rem;
          }
        </style>
    </head>
    <body>
        <center>
            <h1>Informações de contato</h1>
              <h3>Responsável: ${contato.responsavel}</h3>
              <h3>Tel. Contato: ${contato.telContato}</h3>
            <h1>Lista de compra</h1>
            <h2>Carnes:</h2>
            <ul>
            ${dadosC.map((item) => {
							return `<li>${item.qntdTotal} Kg de ${item.tipo} - R$ ${
								item.precoFinal
							}</li>

                <ul>
                    ${item.tipos.map(
											(items) => `<li>${items.assado} - R$${items.total}</li>`
										)}
                </ul>
                `;
						})}
            </ul>
            <h2>Bebidas:</h2>
            <ul>
            ${dadosB.map(
							(item) =>
								`<li> ${item.litrosTotal}L de ${item.bebida} - R$${item.total}</li>`
						)}
            </ul>
            <h2>Acompanhamentos:</h2>
            <ul>
            ${dadosE.map(
							(item) =>
								`<li>${item.qntdTotal} de ${item.tipo} - R$${item.precoFinal}</li>`
						)}
            </ul>
            <h1>Total: R$${total.toFixed(2)}</h1>
            ${rateio ? `<h1>Total dividido:R$${rateio.toFixed(2)}</h1>` : ""}
        </center>
    </body>
    </html>
    `;
	const file = await Print.printToFileAsync({
		html: htmlpdf,
		base64: false,
	});
	await shareAsync(file.uri);
};
