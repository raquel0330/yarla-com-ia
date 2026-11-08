/* =========================================
   DADOS DA PESQUISA
========================================= */

const perguntas = [

    {
        titulo: "Você confia nas informações geradas por inteligência artificial?",
        respostas: ["Sim", "Talvez", "Não"],
        valores: [27, 38, 35]
    },

    {
        titulo: "Você já compartilhou alguma notícia ou informação gerada por IA sem verificar a fonte?",
        respostas: ["Sim", "Não"],
        valores: [59, 41]
    }

];


/* =========================================
   PALETA DE CORES
========================================= */

const cores = [
    "#bd7893",
    "#e7b6c9",
    "#f2d5e0"
];

const corDestaque = "#a65377";
const corSuave = "#e7b6c9";


/* =========================================
   REFERÊNCIAS DOS GRÁFICOS
========================================= */

let graficoBarras1;
let graficoRosca1;

let graficoBarras2;
let graficoRosca2;


/* =========================================
   FUNÇÕES AUXILIARES
========================================= */

function calcularTotal(valores) {

    return valores.reduce(
        (soma, valor) => soma + valor,
        0
    );

}


/* =========================================
   CONFIGURAÇÃO DOS GRÁFICOS DE BARRAS
========================================= */

function configuracaoBarras() {

    return {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            legend: {
                display: false
            },

            tooltip: {

                callbacks: {

                    label: function(context) {
                        return `${context.raw}%`;
                    }

                }

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                max: 100,

                ticks: {

                    callback: function(valor) {
                        return valor + "%";
                    }

                }

            }

        }

    };

}


/* =========================================
   CONFIGURAÇÃO DOS GRÁFICOS DE ROSCA
========================================= */

function configuracaoRosca() {

    return {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            legend: {

                position: "bottom",

                labels: {

                    generateLabels: function(chart) {

                        const dados = chart.data.datasets[0].data;

                        const total = calcularTotal(dados);

                        return chart.data.labels.map((label, indice) => {

                            const percentual = (
                                dados[indice] / total * 100
                            ).toFixed(1);

                            return {

                                text: `${label}: ${percentual}%`,

                                fillStyle: chart.data.datasets[0].backgroundColor[indice],

                                strokeStyle: "#ffffff",

                                lineWidth: 2,

                                hidden: false,

                                index: indice

                            };

                        });

                    }

                }

            },

            tooltip: {

                callbacks: {

                    label: function(context) {

                        const total = calcularTotal(
                            context.dataset.data
                        );

                        const percentual = (
                            context.raw / total * 100
                        ).toFixed(1);

                        return `${context.label}: ${percentual}%`;

                    }

                }

            }

        }

    };

}


/* =========================================
   CRIAR GRÁFICOS DA PRIMEIRA PERGUNTA
========================================= */

function criarGraficosPrimeiraPergunta() {

    const pergunta = perguntas[0];

    graficoBarras1 = new Chart(

        document.getElementById("graficoBarras1"),

        {

            type: "bar",

            data: {

                labels: pergunta.respostas,

                datasets: [{

                    label: "Percentual",

                    data: pergunta.valores,

                    backgroundColor: cores,

                    borderRadius: 8

                }]

            },

            options: configuracaoBarras()

        }

    );


    graficoRosca1 = new Chart(

        document.getElementById("graficoRosca1"),

        {

            type: "doughnut",

            data: {

                labels: pergunta.respostas,

                datasets: [{

                    data: pergunta.valores,

                    backgroundColor: cores,

                    borderWidth: 3,

                    borderColor: "#ffffff"

                }]

            },

            options: configuracaoRosca()

        }

    );

}


/* =========================================
   CRIAR GRÁFICOS DA SEGUNDA PERGUNTA
========================================= */

function criarGraficosSegundaPergunta() {

    const pergunta = perguntas[1];

    graficoBarras2 = new Chart(

        document.getElementById("graficoBarras2"),

        {

            type: "bar",

            data: {

                labels: pergunta.respostas,

                datasets: [{

                    label: "Percentual",

                    data: pergunta.valores,

                    backgroundColor: cores.slice(0, 2),

                    borderRadius: 8

                }]

            },

            options: configuracaoBarras()

        }

    );


    graficoRosca2 = new Chart(

        document.getElementById("graficoRosca2"),

        {

            type: "doughnut",

            data: {

                labels: pergunta.respostas,

                datasets: [{

                    data: pergunta.valores,

                    backgroundColor: cores.slice(0, 2),

                    borderWidth: 3,

                    borderColor: "#ffffff"

                }]

            },

            options: configuracaoRosca()

        }

    );

}


/* =========================================
   FILTRO DA PRIMEIRA PERGUNTA
   CONFIANÇA NAS INFORMAÇÕES DA IA
========================================= */

function aplicarFiltroConfianca() {

    const pergunta = perguntas[0];

    const filtro = document.getElementById("filtroConfianca");

    const analise = document.getElementById("analiseConfianca");

    const modo = filtro.value;

    let labels;
    let valores;
    let coresAtualizadas;


    if (modo === "todos") {

        labels = pergunta.respostas;

        valores = pergunta.valores;

        coresAtualizadas = cores;

        analise.textContent =
            "A resposta Talvez foi a mais escolhida, com 38%. " +
            "Outros 27% afirmaram confiar nas informações geradas por IA, " +
            "enquanto 35% responderam Não.";

    } else {

        const maiorValor = Math.max(...pergunta.valores);

        const indiceMaior = pergunta.valores.indexOf(maiorValor);

        const respostaMaior = pergunta.respostas[indiceMaior];

        const outrasRespostas = 100 - maiorValor;

        labels = [
            respostaMaior,
            "Outras respostas"
        ];

        valores = [
            maiorValor,
            outrasRespostas
        ];

        coresAtualizadas = [
            corDestaque,
            corSuave
        ];

        analise.textContent =
            `A resposta "${respostaMaior}" foi a mais escolhida, ` +
            `representando ${maiorValor}% dos resultados. ` +
            `As demais respostas somadas representam ${outrasRespostas}%.`;

    }


    graficoBarras1.data.labels = labels;

    graficoBarras1.data.datasets[0].data = valores;

    graficoBarras1.data.datasets[0].backgroundColor = coresAtualizadas;

    graficoBarras1.update();


    graficoRosca1.data.labels = labels;

    graficoRosca1.data.datasets[0].data = valores;

    graficoRosca1.data.datasets[0].backgroundColor = coresAtualizadas;

    graficoRosca1.update();

}


/* =========================================
   FILTRO DA SEGUNDA PERGUNTA
   COMPARTILHAMENTO DE INFORMAÇÕES
========================================= */

function aplicarFiltroCompartilhamento() {

    const pergunta = perguntas[1];

    const filtro = document.getElementById("filtroResultados");

    const analise = document.getElementById("analiseFiltro");

    const modo = filtro.value;

    let coresAtualizadas;


    if (modo === "todos") {

        coresAtualizadas = cores.slice(0, 2);

        analise.textContent =
            "59% dos participantes afirmaram já ter compartilhado " +
            "informações geradas por IA, enquanto 41% representam " +
            "as demais respostas.";

    } else {

        coresAtualizadas = [
            corDestaque,
            corSuave
        ];

        analise.textContent =
            "A resposta Sim foi a mais escolhida, representando 59% " +
            "dos resultados. A resposta Não corresponde a 41%. " +
            "O destaque visual facilita a identificação da alternativa predominante.";

    }


    graficoBarras2.data.datasets[0].backgroundColor = coresAtualizadas;

    graficoBarras2.update();


    graficoRosca2.data.datasets[0].backgroundColor = coresAtualizadas;

    graficoRosca2.update();

}


/* =========================================
   INICIALIZAÇÃO DOS GRÁFICOS
========================================= */

criarGraficosPrimeiraPergunta();

criarGraficosSegundaPergunta();


/* =========================================
   EVENTOS DOS FILTROS
========================================= */

document
    .getElementById("filtroConfianca")
    .addEventListener("change", aplicarFiltroConfianca);


document
    .getElementById("filtroResultados")
    .addEventListener("change", aplicarFiltroCompartilhamento);


/* =========================================
   ESTADO INICIAL
========================================= */

aplicarFiltroConfianca();

aplicarFiltroCompartilhamento();