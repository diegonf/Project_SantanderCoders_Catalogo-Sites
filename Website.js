class Website {
  #titulo;
  #imagem;
  #descricao;
  #url;
  constructor(titulo, imagem, descricao, url) {
    this.#titulo = titulo;
    this.#imagem = imagem;
    this.#descricao = descricao;
    this.#url = url;
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

  fonte() {
    throw new Error('Esse método deve ser sobrescrito');
  }
}

export class WebsiteLinkPreview extends Website {
  constructor() {
    super();
  }

  async fetchData(link) {
    try {
      const data = new URLSearchParams({ key: '5aca0012d6c92562f212833276229f2b', q: link });
      const response = await fetch('https://api.linkpreview.net', { method: 'POST', body: data });
      if (!response.ok) throw new Error('Não foi possível buscar os dados');

      const responseData = await response.json();
      this.#inicializarDados(responseData);

    } catch (error) {
      console.error('Erro:', error.message);
      this.#inicializarDados({ title: 'Error', image: '', description: 'Error', url: '#' });
    }
  }

  #inicializarDados(data) {
    this.titulo = data.title;
    this.imagem = data.image;
    this.descricao = data.description;
    this.url = data.url;
  }
}

export class WebsiteForm extends Website {
  constructor(titulo, linkImg, descricao, url) {
    super(titulo, linkImg, descricao, url);
  }
}

