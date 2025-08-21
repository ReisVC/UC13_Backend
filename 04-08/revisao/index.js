"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pessoa_1 = require("./Pessoa");
var nome = "Vitor Reis";
var idade = 22;
var estudante = false;
console.log("Meu nome \u00E9 ".concat(nome, ", tenho ").concat(idade, " anos e sou ").concat(estudante ? "estudante" : "professor", " no SenacRS"));
var listaDeCompras = ["Batata", "Feijão", "Carne"];
var notas = [1, 2, 3, 4, 5];
var professor = {
    nome: "Vitor",
    idade: 22,
    disciplinas: ["UC1", "UC12"]
};
function mensagem() {
    console.log("Ol\u00E1 professor ".concat(professor.nome));
}
function frase(nome) {
    return "Ol\u00E1 ".concat(nome, ", como vai voc\u00EA?");
}
function fraseOpcionar(nome) {
    return nome ? "Olá " + nome + " como você tá?" : "Eu tô doido";
}
function desconto(valor, desconto) {
    if (desconto === void 0) { desconto = 5; }
    console.log(valor - (valor / 100 * desconto));
}
mensagem();
frase("Vitor Reis");
console.log(fraseOpcionar());
desconto(2000, 10);
var pessoa = new Pessoa_1.Pessoa("Jorginho Beira-Mar", 22);
console.log("Ol\u00E1 ".concat(pessoa.getName()));
