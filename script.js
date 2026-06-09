// ======================================
// DEPENDENTES
// ======================================

let contadorDependentes = 0;

function adicionarDependente() {

    contadorDependentes++;

    const container =
        document.getElementById(
            "dependentesContainer"
        );

    const div =
        document.createElement("div");

    div.className = "dependente";

    div.innerHTML = `

        <h3>Dependente ${contadorDependentes}</h3>

        <input
            type="text"
            class="depNome"
            placeholder="Nome do Dependente">

        <input
            type="text"
            class="depParentesco"
            placeholder="Parentesco">

        <input
            type="text"
            class="depCpf"
            placeholder="CPF">

        <label>Data de Nascimento</label>

        <input
            type="date"
            class="depNascimento">

        <button
            type="button"
            class="btnRemover"
            onclick="this.parentElement.remove()">

            Remover Dependente

        </button>

    `;

    container.appendChild(div);

}

adicionarDependente();


// ======================================
// ASSINATURA
// ======================================

const canvas =
    document.getElementById(
        "signature-pad"
    );

const ctx =
    canvas.getContext("2d");

ctx.lineWidth = 2;

ctx.lineCap = "round";

let desenhando = false;

function obterPosicao(event) {

    const rect =
        canvas.getBoundingClientRect();

    const ponto =
        event.touches ?
        event.touches[0] :
        event;

    const scaleX =
        canvas.width / rect.width;

    const scaleY =
        canvas.height / rect.height;

    return {

        x:
            (ponto.clientX - rect.left)
            * scaleX,

        y:
            (ponto.clientY - rect.top)
            * scaleY

    };

}

function iniciar(event) {

    desenhando = true;

    const p =
        obterPosicao(event);

    ctx.beginPath();

    ctx.moveTo(
        p.x,
        p.y
    );

}

function desenhar(event) {

    if (!desenhando)
        return;

    event.preventDefault();

    const p =
        obterPosicao(event);

    ctx.lineTo(
        p.x,
        p.y
    );

    ctx.stroke();

}

function parar() {

    desenhando = false;

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
    { passive:false }
);

canvas.addEventListener(
    "touchend",
    parar
);

function limparAssinatura() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// ======================================
// FORMATAR DATA
// ======================================

function formatarData(data) {

    if (!data)
        return "";

    const partes =
        data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// ======================================
// GERAR PDF
// ======================================

function gerarPDF() {

    const assinatura =
        canvas.toDataURL("image/png");

    const dependentes = [];

    document
        .querySelectorAll(".dependente")
        .forEach(dep => {

            dependentes.push([

                dep.querySelector(".depNome").value,

                dep.querySelector(".depParentesco").value,

                dep.querySelector(".depCpf").value,

                formatarData(
                    dep.querySelector(".depNascimento").value
                )

            ]);

        });

    const docDefinition = {

        pageSize: "A4",

        pageMargins: [30,30,30,40],

        footer: function(currentPage,pageCount){

            return {

                text:
                    "Página " +
                    currentPage +
                    " de " +
                    pageCount,

                alignment:"center",

                fontSize:8

            };

        },

        content:[

            {

                text:
                    "POLÍCIA MILITAR DO ESTADO DE SÃO PAULO",

                style:"titulo"

            },

            {

                text:
                    "FICHA CADASTRAL",

                style:"subtitulo"

            },

            // DADOS PESSOAIS

            {

                text:"DADOS PESSOAIS",

                style:"secao"

            },

            {
                table:{
                    widths:["*","*"],
                    body:[

                        ["Nome Completo", document.getElementById("nome").value],

                        ["Posto/Graduação", document.getElementById("posto").value],

                        ["RE", document.getElementById("re").value],

                        ["Nome de Guerra", document.getElementById("guerra").value],

                        ["Data Admissão", formatarData(document.getElementById("admissao").value)],

                        ["Data Nascimento", formatarData(document.getElementById("nascimento").value)],

                        ["Estado Civil", document.getElementById("civil").value],

                        ["Tipo Sanguíneo", document.getElementById("sangue").value],

                        ["Endereço", document.getElementById("endereco").value],

                        ["Bairro", document.getElementById("bairro").value],

                        ["Município", document.getElementById("municipio").value],

                        ["Celular", document.getElementById("celular").value],

                        ["Telefone Residencial", document.getElementById("residencial").value],

                        ["Telefone Recado", document.getElementById("recado").value],

                        ["E-mail Funcional", document.getElementById("emailf").value],

                        ["E-mail Particular", document.getElementById("emailp").value]

                    ]
                }
            },

            {

                text:"DADOS DO CÔNJUGE",

                style:"secao"

            },

            {
                table:{
                    widths:["*","*"],
                    body:[

                        ["Nome", document.getElementById("conjugeNome").value],

                        ["CPF", document.getElementById("conjugeCpf").value],

                        ["Nascimento", formatarData(document.getElementById("conjugeNascimento").value)],

                        ["Telefone", document.getElementById("conjugeTelefone").value],

                        ["Profissão", document.getElementById("conjugeProfissao").value]

                    ]
                }
            },

            {

                text:"DEPENDENTES",

                style:"secao"

            },

            {
                table:{
                    headerRows:1,
                    widths:["*","*","*","*"],
                    body:[
                        [
                            "Nome",
                            "Parentesco",
                            "CPF",
                            "Nascimento"
                        ],
                        ...dependentes
                    ]
                }
            },

            {

                text:"CONTATOS DE EMERGÊNCIA",

                style:"secao"

            },

            document.getElementById("contato1").value,

            document.getElementById("contato2").value,

            {

                text:"DOCUMENTOS",

                style:"secao"

            },

            {
                table:{
                    widths:["*","*"],
                    body:[

                        ["RG", document.getElementById("rg").value],

                        ["CPF", document.getElementById("cpf").value],

                        ["CNH", document.getElementById("cnh").value],

                        ["Categoria", document.getElementById("categoria").value],

                        ["Título Eleitoral", document.getElementById("titulo").value],

                        ["Zona", document.getElementById("zona").value],

                        ["Seção", document.getElementById("secao").value],

                        ["Município do Título", document.getElementById("municipioTitulo").value],

                        ["Escola em que Vota", document.getElementById("escola").value],

                        ["Endereço Eleitoral", document.getElementById("endEleitoral").value]

                    ]
                }
            },

            {

                text:"DADOS FUNCIONAIS",

                style:"secao"

            },

            {
                table:{
                    widths:["*","*"],
                    body:[

                        ["Cursos PMESP", document.getElementById("cursosPM").value],

                        ["Láurea", document.getElementById("laurea").value],

                        ["Última Promoção", formatarData(document.getElementById("promocao").value)],

                        ["Habilitação SAT", document.getElementById("sat").value],

                        ["Unidades Anteriores", document.getElementById("unidades").value],

                        ["Arma Particular", document.getElementById("arma").value]

                    ]
                }
            },

            {

                text:"ESCOLARIDADE",

                style:"secao"

            },

            {
                table:{
                    widths:["*","*"],
                    body:[

                        ["Ensino Médio",
                            document.getElementById("medio").checked ? "SIM" : "NÃO"
                        ],

                        ["Ensino Superior",
                            document.getElementById("superior").checked ? "SIM" : "NÃO"
                        ],

                        ["Graduação",
                            document.getElementById("graduacao").value
                        ],

                        ["Outros Cursos",
                            document.getElementById("outrosCursos").value
                        ]

                    ]
                }
            },

            {

                text:"DADOS BANCÁRIOS",

                style:"secao"

            },

            {
                table:{
                    widths:["*","*"],
                    body:[

                        ["Banco",
                            document.getElementById("banco").value
                        ],

                        ["Agência",
                            document.getElementById("agencia").value
                        ],

                        ["Conta Corrente",
                            document.getElementById("conta").value
                        ]

                    ]
                }
            },

            {

                text:"ASSINATURA",

                style:"secao",

                pageBreak:"before"

            },

            {

                image: assinatura,

                width:250,

                alignment:"center"

            }

        ],

        styles:{

            titulo:{

                fontSize:16,

                bold:true,

                alignment:"center",

                margin:[0,0,0,5]

            },

            subtitulo:{

                fontSize:14,

                bold:true,

                alignment:"center",

                margin:[0,0,0,15]

            },

            secao:{

                fontSize:12,

                bold:true,

                margin:[0,15,0,8]

            }

        }

    };

    pdfMake
        .createPdf(docDefinition)
        .download(

            "Ficha_Cadastral_" +

            (
                document.getElementById("re").value ||
                "PMESP"
            )

            + ".pdf"

        );

}
