import { WebsiteForm, WebsiteLinkPreview } from "./Website.js";

export class Catalogo {
  static #websites = [];
  constructor() { }

  static async carregarCatalogoInicial () {
    const lista = JSON.parse(localStorage.getItem('listaSites'));
    if(!lista) return;

    this.#websites = await Promise.all(lista.map(async (item) => {
      if(item.tipo === "link") {
        const wsPreview = new WebsiteLinkPreview();
        await wsPreview.fetchData(item.url);
        return wsPreview;
      }
      else if(item.tipo === "form") return new WebsiteForm(item.titulo, item.imagem, item.descricao, item.url);
    }));
    console.log('#websites: ', this.#websites);
    this.#imprimirLista();
    
  }

  static cadastrarCatalogoInicial_excluir() {
    const lista = [
      {
        titulo: "Google",
        descricao: "Search webpages, images, videos and more.",
        imagem: "https://www.google.com/images/logo.png",
        url: "https://www.google.com",
        tipo: "link"
      },
      {
        titulo: "Ada | A Nova Educação",
        descricao: "Saber programar é mais importante que um diploma em seu currículo. Formações em tecnologia com foco em empregabilidade.",
        imagem: "https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/Thumb-Ada.png",
        url: "https://ada.tech:443/",
        tipo: "form"
      }
    ];
    localStorage.setItem('listaSites', JSON.stringify(lista));
  }

  static #imprimirLista() {
    console.log('catalogo imprimitLista:', this.#websites);
    const divWebsites = document.querySelector('#websites-container');
    divWebsites.innerHTML = "";

    this.#websites.forEach(item => {
      console.log(item.titulo);
      console.log(item.imagem);
      const card = this.#criarCard(item);
      divWebsites.appendChild(card);
    });
  }

  static #criarCard(card) {
    // div card
    const divCard = document.createElement('div');
    divCard.className = 'w-80 max-w-md bg-white rounded-lg shadow-lg p-4';

    // img
    const imagem = document.createElement('img');
    imagem.src = card.imagem;
    imagem.className = 'w-full h-32 rounded-t-lg object-contain';
    imagem.alt = `Imagem do site ${card.titulo}`;
    divCard.appendChild(imagem);

    // div do corpo do card
    const divCorpo = document.createElement('div');
    divCorpo.className = 'p-4 h-[calc(100%-105px)]';
    divCard.appendChild(divCorpo);

    // h3 titulo
    const titulo = document.createElement('h3');
    titulo.className = 'text-2xl font-semibold mb-2';
    titulo.textContent = card.titulo;
    divCorpo.appendChild(titulo);

    // div texto e link do card
    const divTexto = document.createElement('div');
    divTexto.className = 'flex flex-col justify-between h-full';
    divCorpo.appendChild(divTexto);

    // p descrição
    const descricao = document.createElement('p');
    descricao.className = 'text-gray-500 mb-5';
    descricao.textContent = card.descricao;
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