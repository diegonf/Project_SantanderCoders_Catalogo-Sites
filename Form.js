import { Catalogo } from "./Catalogo.js";
import { Website, WebsiteLinkPreview } from "./Website.js";

export class Form {
  static formAtivo = 'formulario';

  constructor() { }

  static inicializarEventos() {
    // Botão mostrar/esconder formulário
    const formContainer = document.querySelector('#form-container');
    const botaoMais = document.querySelector('#botaoMais');
    const botaoMenos = document.querySelector('#botaoMenos');
    botaoMais.addEventListener('click', () => this.#mostrarContainerFormularios(formContainer, botaoMais, botaoMenos));
    botaoMenos.addEventListener('click', () => this.#esconderContainerFormularios(formContainer, botaoMais, botaoMenos));

    // Tabs formulário / LinkPreview
    const formTab = document.querySelector('#formTab');
    const linkPreviewTab = document.querySelector('#linkPreviewTab');
    const formularioForm = document.querySelector('#form');
    const linkPreviewForm = document.querySelector('#linkPreviewForm');
    formTab.addEventListener('click', () => this.#mostrarTabFormulario(formularioForm, formTab, linkPreviewForm, linkPreviewTab));
    linkPreviewTab.addEventListener('click', () => this.#mostrarTabLinkPreview(formularioForm, formTab, linkPreviewForm, linkPreviewTab));

    // Alteração dos Inputs da aba Formulário
    formularioForm.addEventListener('input', this.#manipularAlteracaoForm);

    // Alteração do input da aba LinkPreview
    linkPreviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#imprimirPreviewLinkPreview();
    })

    // Confirmar / Cancelar inserção
    const btnConfirmar = document.querySelector('#btn-confirmar');
    btnConfirmar.addEventListener('click', this.#submeterCadastro);

    const btnCancelar = document.querySelector('#btn-cancelar');
    btnCancelar.addEventListener('click', () => this.#cancelarCadastro(formularioForm, linkPreviewForm));
  }

  static #mostrarContainerFormularios(formContainer, botaoMais, botaoMenos) {
    formContainer.classList.remove('hidden');
    botaoMais.classList.add('hidden');
    botaoMenos.classList.remove('hidden');
  }

  static #esconderContainerFormularios(formContainer, botaoMais, botaoMenos) {
    formContainer.classList.add('hidden');
    botaoMenos.classList.add('hidden');
    botaoMais.classList.remove('hidden');
  }

  static #mostrarTabFormulario(form, formTab, linkPreviewForm, linkPreviewTab) {
    Form.formAtivo = 'formulario';
    form.classList.remove('hidden');
    linkPreviewForm.classList.add('hidden');

    formTab.classList.add('bg-gray-100', 'underline', 'underline-offset-4');
    formTab.classList.remove('bg-gray-300');

    linkPreviewTab.classList.remove('bg-gray-100', 'underline', 'underline-offset-4');
    linkPreviewTab.classList.add('bg-gray-300');
  }

  static #mostrarTabLinkPreview(form, formTab, linkPreviewForm, linkPreviewTab) {
    Form.formAtivo = 'link-preview';
    form.classList.add('hidden');
    linkPreviewForm.classList.remove('hidden');

    formTab.classList.remove('bg-gray-100', 'underline', 'underline-offset-4');
    formTab.classList.add('bg-gray-300');

    linkPreviewTab.classList.add('bg-gray-100', 'underline', 'underline-offset-4');
    linkPreviewTab.classList.remove('bg-gray-300');
  }

  static #manipularAlteracaoForm() {
    const titulo = document.querySelector('#titulo').value;
    const imagem = document.querySelector('#imagem').value;
    const descricao = document.querySelector('#descricao').value;
    const url = document.querySelector('#url').value;

    if ([titulo, imagem, descricao, url].some(item => !item)) {
      const previewBody = document.querySelector('#preview-body');
      previewBody.classList.add('hidden');
      return
    };
    Form.#imprimirPreviewForm({ titulo, imagem, descricao, url });
  }

  static #imprimirPreviewForm(cardData) {
    const previewDiv = document.querySelector('#form-preview');
    const previewBody = document.querySelector('#preview-body');
    previewDiv.innerHTML = "";
    previewBody.classList.remove('hidden');

    const card = Website.criarCard(cardData);
    previewDiv.appendChild(card);
  }

  static async #imprimirPreviewLinkPreview() {
    const link = document.querySelector('#linkPreviewUrl').value;
    const previewDiv = document.querySelector('#form-preview');
    const previewBody = document.querySelector('#preview-body');
    previewDiv.innerHTML = "";
    previewBody.classList.add('hidden');

    const wsPreview = new WebsiteLinkPreview();
    await wsPreview.fetchData(link);
    const card = Website.criarCard(wsPreview);

    previewBody.classList.remove('hidden');
    previewDiv.appendChild(card);
  }

  static #submeterCadastro() {
    if (Form.formAtivo === 'formulario') {
      const titulo = document.querySelector('#titulo').value;
      const imagem = document.querySelector('#imagem').value;
      const descricao = document.querySelector('#descricao').value;
      const url = document.querySelector('#url').value;

      Catalogo.cadastrarNovoItemFormulario({titulo, imagem, descricao, url});
      Form.#resetarCadastro();
      return;
    }

    const link = document.querySelector('#linkPreviewUrl').value;
    Catalogo.cadastrarNovoItemLinkPreview(link);
    Form.#resetarCadastro();
  }

  static #cancelarCadastro() {
    this.#resetarCadastro();
  }

  static #resetarCadastro() {
    const formularioForm = document.querySelector('#form');
    const linkPreviewForm = document.querySelector('#linkPreviewForm');
    formularioForm.reset();
    linkPreviewForm.reset();
    const previewDiv = document.querySelector('#form-preview');
    const previewBody = document.querySelector('#preview-body');
    previewDiv.innerHTML = "";
    previewBody.classList.add('hidden');
  }
}

