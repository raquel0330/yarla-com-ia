
/* DADOS ORIGINAIS DA PESQUISA */

const perguntas = [
    {
        titulo: "Você já compartilhou alguma notícia ou informação por confiar no conteúdo gerado por IA sem verificar a fonte?",
        respostas: ["Sim", "Não", "Talvez"],
        valores: [18, 5, 7]
    },

    {
        titulo: "A IA deveria explicar suas decisões?",
        respostas: ["Sim", "Não", "Talvez"],
        valores: [25, 2, 3]
    },

    {
        titulo: "Você confia nas decisões da IA?",
        respostas: ["Sim", "Não", "Talvez"],
        valores: [8, 10, 12]
    }
];

/* PALETA DE CORES */

const cores = [
    "#bd7893",
    "#e7b6c9",
    "#f2d5e0"
];

/* REFERÊNCIAS AOS GRÁFICOS */

let graficoBarras1;
let graficoRosca1;
let graficoBarras2;
let graficoRosca2;

/* FUNÇÃO PARA CALCULAR PERCENTUAIS */

function calcularPercentuais(valores) {

    const total = valores.reduce((soma, valor) => soma + valor, 0);

    return valores.map(valor => {
        return ((valor / total) * 100).toFixed(1);
    });

}

/* GRÁFICOS FIXOS DA PRIMEIRA PERGUNTA */

function criarGraficosPrimeiraPergunta() {

    const pergunta = perguntas[0];

    graficoBarras1 = new Chart(
        document.getElementById("graficoBarras1"),
        {
            type: "bar",

            data: {
                labels: pergunta.respostas,

                datasets: [{
                    label: "Quantidade de respostas",
                    data: pergunta.valores,
                    backgroundColor: cores,
                    borderRadius: 8
                }]
            },

            options: {
                responsive: true,

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + " respostas";
                            }
                        }
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
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

            options: {
                responsive: true,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    );

}

/* GRÁFICOS INTERATIVOS DA SEGUNDA PERGUNTA */

function criarGraficosSegundaPergunta() {

    const pergunta = perguntas[2];

    graficoBarras2 = new Chart(
        document.getElementById("graficoBarras2"),
        {
            type: "bar",

            data: {
                labels: pergunta.respostas,

                datasets: [{
                    label: "Quantidade de respostas",
                    data: pergunta.valores,
                    backgroundColor: cores,
                    borderRadius: 8
                }]
            },

            options: {
                responsive: true,

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + " respostas";
                            }
                        }
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
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
                    backgroundColor: cores,
                    borderWidth: 3,
                    borderColor: "#ffffff"
                }]
            },

            options: {
                responsive: true,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    );

}

/* FILTRO DA SEGUNDA PERGUNTA */

function aplicarFiltro() {

    const pergunta = perguntas[2];

    const filtro = document.getElementById("filtroResultados");

    const analise = document.getElementById("analiseFiltro");

    const modo = filtro.value;

    const total = pergunta.valores.reduce(
        (soma, valor) => soma + valor,
        0
    );

    let labels;
    let valores;
    let coresBarras;
    let coresRosca;

    if (modo === "todos") {

        labels = pergunta.respostas;

        valores = pergunta.valores;

        coresBarras = cores;

        coresRosca = cores;

        const percentuais = calcularPercentuais(valores);

        analise.textContent =
            `A pesquisa contou com ${total} participantes. ` +
            `A distribuição foi: Sim, ${valores[0]} respostas ` +
            `(${percentuais[0]}%); Não, ${valores[1]} respostas ` +
            `(${percentuais[1]}%); e Talvez, ${valores[2]} respostas ` +
            `(${percentuais[2]}%).`;

    } else {

        const maiorValor = Math.max(...pergunta.valores);

        const indiceMaior = pergunta.valores.indexOf(maiorValor);

        const respostaMaior = pergunta.respostas[indiceMaior];

        const outrasRespostas = total - maiorValor;

        const percentualMaior = ((maiorValor / total) * 100).toFixed(1);

        labels = [
            respostaMaior,
            "Outras respostas"
        ];

        valores = [
            maiorValor,
            outrasRespostas
        ];

        coresBarras = [
            "#a65377",
            "#e7b6c9"
        ];

        coresRosca = [
            "#a65377",
            "#e7b6c9"
        ];

        analise.textContent =
            `A resposta "${respostaMaior}" foi a mais escolhida, ` +
            `com ${maiorValor} participantes, representando ` +
            `${percentualMaior}% do total. As outras respostas ` +
            `somadas representam ${outrasRespostas} participantes. ` +
            `Esse agrupamento facilita a identificação da tendência predominante.`;

    }

    /* ATUALIZAR GRÁFICO DE BARRAS */

    graficoBarras2.data.labels = labels;

    graficoBarras2.data.datasets[0].data = valores;

    graficoBarras2.data.datasets[0].backgroundColor = coresBarras;

    graficoBarras2.update();

    /* ATUALIZAR GRÁFICO DE ROSCA */

    graficoRosca2.data.labels = labels;

    graficoRosca2.data.datasets[0].data = valores;

    graficoRosca2.data.datasets[0].backgroundColor = coresRosca;

    graficoRosca2.update();

}

/* INICIALIZAÇÃO */

criarGraficosPrimeiraPergunta();

criarGraficosSegundaPergunta();

document
    .getElementById("filtroResultados")
    .addEventListener("change", aplicarFiltro);

aplicarFiltro();