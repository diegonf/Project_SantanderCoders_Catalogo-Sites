import { Catalogo } from "./Catalogo.js";

export class Website {
  #titulo;
  #imagem;
  #descricao;
  #url;
  #id;
  constructor(titulo, imagem, descricao, url, id) {
    this.#titulo = titulo;
    this.#imagem = imagem;
    this.#descricao = descricao;
    this.#url = url;
    this.#id = id;
  }

  get titulo() {
    return this.#titulo;
  }
  get imagem() {
    return this.#imagem;
  }
  get descricao() {
    return this.#descricao;
  }
  get url() {
    return this.#url;
  }
  get id() {
    return this.#id;
  }

  set titulo(titulo) {
    this.#titulo = titulo;
  }
  set imagem(imagem) {
    this.#imagem = imagem;
  }
  set descricao(descricao) {
    this.#descricao = descricao;
  }
  set url(url) {
    this.#url = url;
  }
  set id(id) {
    this.#id = id;
  }

  static criarCard(card) {
    // div card
    const divCard = document.createElement('div');
    divCard.className = 'w-80 h-[31rem] max-w-md bg-white rounded-xl shadow-lg relative mb-20';

    // img
    const imagem = document.createElement('img');
    imagem.src = card.imagem;
    imagem.className = 'w-full h-40 rounded-t-lg object-contain';
    imagem.alt = `Imagem do site ${card.titulo}`;
    divCard.appendChild(imagem);

    // div do corpo do card
    const divCorpo = document.createElement('div');
    divCorpo.className = 'p-4 h-[calc(100%-100px)]';
    divCard.appendChild(divCorpo);

    // h3 titulo
    const titulo = document.createElement('h3');
    titulo.className = 'text-2xl font-semibold mb-2 truncate';
    titulo.textContent = card.titulo;
    divCorpo.appendChild(titulo);

    // div texto e link do card
    const divTexto = document.createElement('div');
    divTexto.className = 'flex flex-col justify-between h-[calc(100%-25px)]';
    divCorpo.appendChild(divTexto);

    // p descrição
    const descricao = document.createElement('p');
    descricao.className = 'text-gray-500 h-[12.5rem] overflow-hidden';
    descricao.textContent = card.descricao;
    divTexto.appendChild(descricao);

    // a url
    const link = document.createElement('a');
    link.href = card.url;
    link.className = 'text-blue-500 hover:underline mt-2 block';
    link.textContent = 'Acessar';
    divTexto.appendChild(link);

    // icone trash para deletar
    if(!card.id) return divCard;
    const trash = document.createElement('img');
    trash.src = './assets/trash_icon.png';
    trash.className = 'w-8 absolute right-5 bottom-4 cursor-pointer';
    trash.alt = `icone da lixeira - deletar card`;
    trash.addEventListener('click', () => Catalogo.deletarItem(card.id));
    divCard.appendChild(trash);

    return divCard;
  }
}

export class WebsiteLinkPreview extends Website {
  constructor() {
    super();
  }

  async fetchData(link, id) {
    try {
      const data = new URLSearchParams({ key: '5aca0012d6c92562f212833276229f2b', q: link });
      const response = await fetch('https://api.linkpreview.net', { method: 'POST', body: data });
      if (!response.ok) throw new Error('Não foi possível buscar os dados');

      const responseData = await response.json();
      this.#inicializarDados({...responseData, id});

    } catch (error) {
      console.error('Erro:', error.message);
      this.#inicializarDados({ title: 'Error Key', image: '', description: 'Error', url: '#', id });
    }
  }

  #inicializarDados(data) {
    this.titulo = data.title;
    this.imagem = data.image;
    this.descricao = data.description;
    this.url = data.url;
    this.id = data.id;
  }
}

export class WebsiteForm extends Website {
  constructor(titulo, linkImg, descricao, url, id) {
    super(titulo, linkImg, descricao, url, id);
  }
}

