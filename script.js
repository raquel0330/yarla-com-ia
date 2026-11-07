
const perguntas = [
  {
    titulo: "A IA pode apresentar resultados injustos?",
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

// Dados fictícios para demonstração.
// Troque pelos resultados reais da sua pesquisa.

const filtro = document.getElementById("filtro");
const conclusao = document.getElementById("conclusao");

let barras;
let rosca;

function atualizarDashboard() {
  const pergunta = perguntas[Number(filtro.value)];

  const cores = ["#e7a3bc", "#c58aa5", "#f2cbd9"];

  if (barras) barras.destroy();
  if (rosca) rosca.destroy();

  barras = new Chart(
    document.getElementById("graficoBarras"),
    {
      type: "bar",
      data: {
        labels: pergunta.respostas,
        datasets: [{
          label: "Respostas",
          data: pergunta.valores,
          backgroundColor: cores,
          borderRadius: 7
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    }
  );

  rosca = new Chart(
    document.getElementById("graficoRosca"),
    {
      type: "doughnut",
      data: {
        labels: pergunta.respostas,
        datasets: [{
          data: pergunta.valores,
          backgroundColor: cores,
          borderWidth: 2,
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

  const total = pergunta.valores.reduce((a, b) => a + b, 0);
  const maior = Math.max(...pergunta.valores);
  const indice = pergunta.valores.indexOf(maior);
  const percentual = Math.round((maior / total) * 100);

  conclusao.textContent =
    `Na pergunta "${pergunta.titulo}", a resposta mais escolhida foi ` +
    `"${pergunta.respostas[indice]}", com ${maior} respostas ` +
    `(${percentual}% do total).`;
}

filtro.addEventListener("change", atualizarDashboard);

atualizarDashboard();
