"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
var Pessoa = /** @class */ (function () {
    function Pessoa(name, age) {
        this.name = name;
        this.age = age;
    }
    Pessoa.prototype.getName = function () {
        return this.name;
    };
    Pessoa.prototype.getAge = function () {
        return this.age;
    };
    Pessoa.prototype.setName = function (value) {
        this.name = value;
    };
    Pessoa.prototype.setAge = function (value) {
        this.age = value;
    };
    return Pessoa;
}());
exports.Pessoa = Pessoa;
var pessoa = new Pessoa("Vitin", 22);
console.log("Ol\u00E1 ".concat(pessoa.getName));
