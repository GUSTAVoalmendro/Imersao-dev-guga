let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        // Adiciona um evento de clique para navegar para o link
        article.addEventListener('click', () => {
            window.open(dado.link, '_blank');
        });

        article.innerHTML = `
            <div class="card-header">
                <i class="${dado.icone || 'fa-solid fa-puzzle-piece'} card-icon"></i>
                <h2>${dado.nome}</h2>
            </div>
            <p><strong>Ano de criação:</strong> ${dado.data_criacao}</p>
            <p class="card-description">${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Visitar <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        `;
        cardContainer.appendChild(article);
    }
}

function filtrarDados() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

async function carregarDadosIniciais() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Renderiza todos os cards inicialmente
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
    }
}

// Adiciona o listener para o campo de busca
campoBusca.addEventListener('input', filtrarDados);

// Carrega os dados assim que o script é executado
carregarDadosIniciais();

// --- Lógica para o botão "Voltar ao Topo" ---

// 1. Criar o botão e adicionar ao corpo da página
const btnVoltarTopo = document.createElement('button');
btnVoltarTopo.id = 'btnVoltarTopo';
btnVoltarTopo.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(btnVoltarTopo);

// 2. Adicionar evento de clique para rolar para o topo
btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
});

// 3. Mostrar ou esconder o botão com base na rolagem da página
window.addEventListener('scroll', () => {
    // Mostra o botão se a rolagem for maior que 300 pixels
    if (window.scrollY > 300) {
        btnVoltarTopo.classList.add('show');
    } else {
        btnVoltarTopo.classList.remove('show');
    }
});