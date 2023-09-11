import { WebsiteForm, WebsiteLinkPreview } from "./Website.js";

export class Catalogo {
  static #websites = [];
  static #id = 0;
  constructor() { }

  static async carregarCatalogoInicial() {
    const lista = JSON.parse(localStorage.getItem('listaSites'));
    if (!lista) return;

    this.#websites = await Promise.all(lista.map(async item => {
      if(!item.tipo || item.tipo === 'usuario') {
        return new WebsiteForm(item.titulo, item.imagem, item.descricao, item.url, Catalogo.id);
      } else if (item.tipo ==='link-preview') {
        const wsPreview = new WebsiteLinkPreview();
        await wsPreview.fetchData(item.url, Catalogo.id);
        return wsPreview;
      }
    })); 
    this.#imprimirLista();
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
      divWebsites.appendChild(item.cardDOM);
    });
  }
  
  static #atualizarLocalStorage() {
    const lista = this.#websites.map(item => ({
      titulo: item.titulo,
      descricao: item.descricao,
      imagem: item.imagem,
      url: item.url,
      tipo: item.tipo
    }))
    localStorage.setItem('listaSites', JSON.stringify(lista));
  }

  static get id() {
    return ++this.#id;
  }
}