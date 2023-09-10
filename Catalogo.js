export class Catalogo {
  #websites = [];
  constructor() { }

  carregarCatalogoInicial() {
    const lista = JSON.parse(localStorage.getItem('listaSites'));
    this.#websites = lista ? lista : [];
    this.#imprimirLista();
  }

  cadastrarCatalogoInicial_excluir() {
    const lista = [
      {
        "title": "Google",
        "description": "Search webpages, images, videos and more.",
        "image": "https://www.google.com/images/logo.png",
        "url": "https://www.google.com"
      },
      {
        "title": "Ada | A Nova Educação",
        "description": "Saber programar é mais importante que um diploma em seu currículo. Formações em tecnologia com foco em empregabilidade.",
        "image": "https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/Thumb-Ada.png",
        "url": "https://ada.tech:443/"
      }
    ];
    localStorage.setItem('listaSites', JSON.stringify(lista));
  }

  #imprimirLista() {
    console.log(this.#websites);
    const divWebsites = document.querySelector('#websites-container');
    divWebsites.innerHTML = "";

    this.#websites.forEach(item => {
      const card = this.#criarCard(item);
      divWebsites.appendChild(card);
    });
  }

  #criarCard(card) {
    // div card
    const divCard = document.createElement('div');
    divCard.className = 'w-80 max-w-md bg-white rounded-lg shadow-lg p-4';

    // img
    const imagem = document.createElement('img');
    imagem.src = card.image;
    imagem.className = 'w-full h-32 rounded-t-lg object-contain';
    imagem.alt = `Imagem do site ${card.title}`;
    divCard.appendChild(imagem);

    // div do corpo do card
    const divCorpo = document.createElement('div');
    divCorpo.className = 'p-4 h-[calc(100%-105px)]';
    divCard.appendChild(divCorpo);

    // h3 titulo
    const titulo = document.createElement('h3');
    titulo.className = 'text-2xl font-semibold mb-2';
    titulo.textContent = card.title;
    divCorpo.appendChild(titulo);

    // div texto e link do card
    const divTexto = document.createElement('div');
    divTexto.className = 'flex flex-col justify-between h-full';
    divCorpo.appendChild(divTexto);

    // p descrição
    const descricao = document.createElement('p');
    descricao.className = 'text-gray-500 mb-5';
    descricao.textContent = card.description;
    divTexto.appendChild(descricao);

    // a url
    const link = document.createElement('a');
    link.href = card.url;
    link.className = 'text-blue-500 hover:underline mt-2 block';
    link.textContent = 'Acessar';
    divTexto.appendChild(link);

    return divCard;
  }

}