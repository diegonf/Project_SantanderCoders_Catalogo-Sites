import { Catalogo } from "./Catalogo.js";
import { Form } from "./Form.js";

// Catalogo.cadastrarCatalogoInicial_excluir();
// debugger;
Catalogo.carregarCatalogoInicial();

Form.inicializarEventos();

console.log('Catalogo.prototype:', Catalogo.prototype);
const catalogo = new Catalogo();
console.log('catalogo: ', catalogo);
console.log('catalogo.prototype: ', catalogo.__proto__);

console.log('')
console.log('String: ', String);
console.log('String.prototype: ', String.prototype);
console.log('String.i: ', String.italics);
console.log('String.p.i: ', String.prototype.italics());
console.log('Italics: ', 'diego'.italics());

