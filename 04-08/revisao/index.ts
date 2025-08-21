import { Pessoa } from './Pessoa';

let nome: string = "Vitor Reis";
let idade: number = 22;
let estudante: boolean = false;

console.log(`Meu nome é ${nome}, tenho ${idade} anos e sou ${estudante ? "estudante" : "professor"} no SenacRS`)

let listaDeCompras:string[] = ["Batata", "Feijão", "Carne"];
let notas:Array<number> = [1, 2, 3, 4, 5];

let professor: {nome: string, idade: number, disciplinas: string[]} = {
    nome: "Vitor",
    idade: 22,
    disciplinas: ["UC1", "UC12"]
}

function mensagem(): void {
    console.log(`Olá professor ${professor.nome}`)
}

function frase(nome: string): string {
    return `Olá ${nome}, como vai você?`
}

function fraseOpcionar(nome?:string):string {
    return nome ? "Olá " + nome + " como você tá?" : "Eu tô doido"
}

function desconto(valor: number, desconto: number = 5): void {
    console.log(valor - (valor / 100 * desconto))
}

mensagem();
frase("Vitor Reis")
console.log(fraseOpcionar())
desconto(2000, 10)

const pessoa = new Pessoa("Jorginho Beira-Mar", 22);

console.log(`Olá ${pessoa.getName()}`)