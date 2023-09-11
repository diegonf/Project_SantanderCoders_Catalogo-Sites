import { Catalogo } from "./Catalogo.js";

export class Website {
  #titulo;
  #imagem;
  #descricao;
  #url;
  #id;
  #cardDOM;
  constructor(titulo, imagem, descricao, url, id) {
    this.#titulo = titulo;
    this.#imagem = imagem;
    this.#descricao = descricao;
    this.#url = url;
    this.#id = id;
    if(titulo) this.#cardDOM = Website.criarCard({ titulo, imagem, descricao, url, id, fonte: this.fonte() });
  }

  get titulo() { return this.#titulo; }
  get imagem() { return this.#imagem; }
  get descricao() { return this.#descricao; }
  get url() { return this.#url; }
  get id() { return this.#id; }
  get cardDOM() { return this.#cardDOM; }

  set titulo(titulo) { this.#titulo = titulo; }
  set imagem(imagem) { this.#imagem = imagem; }
  set descricao(descricao) { this.#descricao = descricao; }
  set url(url) { this.#url = url; }
  set id(id) { this.#id = id; }
  set cardDOM(cardDOM) { this.#cardDOM = cardDOM; }

  fonte() {
    throw new Error('Esse método deve ser chamado nas classes filhas');
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

    // fonte
    const span = document.createElement('span');
    span.className = 'text-right -mb-4 text-xl';
    span.textContent = card.fonte;
    divTexto.appendChild(span);

    // icone trash para deletar
    if (!card.id) return divCard;
    const trash = document.createElement('img');
    trash.src = './assets/trash.png';
    trash.className = 'w-8 absolute right-5 bottom-8 cursor-pointer';
    trash.alt = `icone da lixeira - deletar card`;
    trash.addEventListener('click', () => Catalogo.deletarItem(card.id));
    divCard.appendChild(trash);

    return divCard;
  }
}

export class WebsiteLinkPreview extends Website {
  #tipo;
  constructor() {
    super();
    this.#tipo = 'link-preview';
  }

  async fetchData(link, id) {
    try {
      const url = 'https://api.linkpreview.net';
      const data = { key: '5aca0012d6c92562f212833276229f2b', q: link };
      const header = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
      }
      const response = await fetch(url, header);
      if (!response.ok) throw new Error('Não foi possível buscar os dados');

      const responseData = await response.json();
      this.#inicializarDados({ ...responseData, id });

    } catch (error) {
      console.error('Erro:', error.message);
      this.#inicializarDados({ title: link, image: './assets/erro.avif', description: `Não foi possível obter os dados do link ${link}`, url: link, id });
    }
  }

  #inicializarDados(data) {
    this.titulo = data.title;
    this.imagem = data.image;
    this.descricao = data.description;
    this.url = data.url;
    this.id = data.id;
    this.cardDOM = Website.criarCard({ titulo: data.title, imagem: data.image, descricao: data.description, url: data.url, id: data.id, fonte: this.fonte() });
  }

  fonte() {
    return 'fonte: LinkPreview';
  }

  get tipo() {
    return this.#tipo;
  }
}

export class WebsiteForm extends Website {
  #tipo;
  constructor(titulo, linkImg, descricao, url, id) {
    super(titulo, linkImg, descricao, url, id);
    this.#tipo = 'usuario';
  }

  fonte() {
    return 'fonte: usuário';
  }

  get tipo() {
    return this.#tipo;
  }
}

