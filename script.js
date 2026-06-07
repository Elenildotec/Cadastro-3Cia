const canvas =
document.getElementById(
"signature-pad"
);

const ctx =
canvas.getContext("2d");

ctx.lineWidth = 2;

let desenhando = false;

function posicao(event){

const rect =
canvas.getBoundingClientRect();

const p =
event.touches ?
event.touches[0] :
event;

const scaleX =
canvas.width / rect.width;

const scaleY =
canvas.height / rect.height;

return {

x:(p.clientX-rect.left)
* scaleX,

y:(p.clientY-rect.top)
* scaleY

};

}

function iniciar(event){

desenhando=true;

const p=posicao(event);

ctx.beginPath();

ctx.moveTo(
p.x,
p.y
);

}

function desenhar(event){

if(!desenhando)
return;

event.preventDefault();

const p=posicao(event);

ctx.lineTo(
p.x,
p.y
);

ctx.stroke();

}

function parar(){

desenhando=false;

}

canvas.addEventListener(
"mousedown",
iniciar
);

canvas.addEventListener(
"mousemove",
desenhar
);

window.addEventListener(
"mouseup",
parar
);

canvas.addEventListener(
"touchstart",
iniciar
);

canvas.addEventListener(
"touchmove",
desenhar,
{passive:false}
);

canvas.addEventListener(
"touchend",
parar
);

function limparAssinatura(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

}

function gerarPDF(){

    const assinatura = canvas.toDataURL("image/png");

    const docDefinition = {

        pageSize: "A4",

        pageMargins: [30,30,30,30],

        content: [

            {
                text: "FICHA CADASTRAL PMESP",
                style: "titulo"
            },

            {
                text: "DADOS PESSOAIS",
                style: "secao"
            },

            `Nome Completo: ${document.getElementById("nome").value}`,
            `Posto/Graduação: ${document.getElementById("posto").value}`,
            `RE: ${document.getElementById("re").value}`,
            `Nome de Guerra: ${document.getElementById("guerra").value}`,
            `Data de Admissão: ${document.getElementById("admissao").value}`,
            `Data de Nascimento: ${document.getElementById("nascimento").value}`,
            `Estado Civil: ${document.getElementById("civil").value}`,
            `Endereço: ${document.getElementById("endereco").value}`,
            `Bairro: ${document.getElementById("bairro").value}`,
            `Município: ${document.getElementById("municipio").value}`,
            `Celular: ${document.getElementById("celular").value}`,
            `Telefone Residencial: ${document.getElementById("residencial").value}`,
            `Telefone Recado: ${document.getElementById("recado").value}`,
            `E-mail Funcional: ${document.getElementById("emailf").value}`,
            `E-mail Particular: ${document.getElementById("emailp").value}`,

            {
                text: "CONTATO DE EMERGÊNCIA",
                style: "secao"
            },

            document.getElementById("contato1").value,
            document.getElementById("contato2").value,

            {
                text: "DOCUMENTOS",
                style: "secao"
            },

            `RG: ${document.getElementById("rg").value}`,
            `CPF: ${document.getElementById("cpf").value}`,
            `CNH: ${document.getElementById("cnh").value}`,
            `Categoria CNH: ${document.getElementById("categoria").value}`,
            `Título Eleitoral: ${document.getElementById("titulo").value}`,
            `Zona: ${document.getElementById("zona").value}`,
            `Seção: ${document.getElementById("secao").value}`,
            `Município do Título: ${document.getElementById("municipioTitulo").value}`,
            `Escola em que Vota: ${document.getElementById("escola").value}`,
            `Endereço Eleitoral: ${document.getElementById("endEleitoral").value}`,

            {
                text: "DADOS FUNCIONAIS",
                style: "secao"
            },

            `Cursos PMESP: ${document.getElementById("cursosPM").value}`,
            `Láurea: ${document.getElementById("laurea").value}`,
            `Última Promoção: ${document.getElementById("promocao").value}`,
            `Habilitação SAT: ${document.getElementById("sat").value}`,
            `Unidades Anteriores: ${document.getElementById("unidades").value}`,
            `Arma Particular: ${document.getElementById("arma").value}`,

            {
                text: "ESCOLARIDADE",
                style: "secao"
            },

            `Ensino Médio: ${document.getElementById("medio").checked ? "SIM" : "NÃO"}`,
            `Ensino Superior: ${document.getElementById("superior").checked ? "SIM" : "NÃO"}`,
            `Graduação: ${document.getElementById("graduacao").value}`,
            `Outros Cursos: ${document.getElementById("outrosCursos").value}`,

            {
                text: "DADOS BANCÁRIOS",
                style: "secao"
            },

            `Banco: ${document.getElementById("banco").value}`,
            `Agência: ${document.getElementById("agencia").value}`,
            `Conta Corrente: ${document.getElementById("conta").value}`,

            {
                text: "ASSINATURA",
                style: "secao"
            },

            {
                image: assinatura,
                width: 250
            }

        ],

        styles: {

            titulo: {
                fontSize: 18,
                bold: true,
                alignment: "center",
                margin: [0,0,0,20]
            },

            secao: {
                fontSize: 14,
                bold: true,
                margin: [0,15,0,8]
            }

        }

    };

    pdfMake.createPdf(docDefinition)
           .download("Ficha_Cadastral_PMESP.pdf");
}