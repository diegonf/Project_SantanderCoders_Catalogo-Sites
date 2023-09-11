import { Catalogo } from "./Catalogo.js";
import { Form } from "./Form.js";
import { Website } from "./Website.js";

Catalogo.carregarCatalogoInicial();
Form.inicializarEventos();

// usanto prototype
Website.prototype.editarItem = function() {
  alert(`Item com id ${this.id} editado!`);
}





