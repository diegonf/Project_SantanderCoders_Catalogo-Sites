import { Website, WebsiteForm, WebsiteLinkPreview } from "./Website.js";

export class Catalogo {
  static #websites = [];
  static #id = 0;
  constructor() { }

  static carregarCatalogoInicial() {
    const lista = JSON.parse(localStorage.getItem('listaSites'));
    if (!lista) return;

    this.#websites = lista.map(item => new WebsiteForm(item.titulo, item.imagem, item.descricao, item.url, Catalogo.id));
    this.#imprimirLista();
  }

  static cadastrarCatalogoInicial_excluir() {
    const lista = [
      {
        titulo: "Google",
        descricao: "Search webpages, images, videos and more.",
        imagem: "https://www.google.com/images/logo.png",
        url: "https://www.google.com",
      },
      {
        titulo: "Ada | A Nova Educação",
        descricao: "Saber programar é mais importante que um diploma em seu currículo. Formações em tecnologia com foco em empregabilidade.",
        imagem: "https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/Thumb-Ada.png",
        url: "https://ada.tech:443/",
      }
    ];
    localStorage.setItem('listaSites', JSON.stringify(lista));
  }

  static cadastrarNovoItemFormulario(item) {
    this.#websites.push(new WebsiteForm(item.titulo, item.imagem, item.descricao, item.url, Catalogo.id));
    this.#atualizarLocalStorage();
    this.#imprimirLista();
  }

  static async cadastrarNovoItemLinkPreview(url) {
    const wsPreview = new WebsiteLinkPreview()
    await wsPreview.fetchData(url, Catalogo.id);
    this.#websites.push(wsPreview);
    this.#atualizarLocalStorage();
    this.#imprimirLista();
  }

  static deletarItem(id) {
    this.#websites.splice(this.#websites.findIndex(item => item.id === id),1);
    this.#atualizarLocalStorage();
    this.#imprimirLista();
  }

  static #imprimirLista() {
    const divWebsites = document.querySelector('#websites-container');
    divWebsites.innerHTML = "";

    this.#websites.forEach(item => {
      const card = Website.criarCard(item);
      divWebsites.appendChild(card);
    });

    console.log(this.#websites);
  }
  
  static #atualizarLocalStorage() {
    const lista = this.#websites.map(item => ({
      titulo: item.titulo,
      descricao: item.descricao,
      imagem: item.imagem,
      url: item.url
    }))
    localStorage.setItem('listaSites', JSON.stringify(lista));
  }

  static get id() {
    return ++this.#id;
  }
}