export class Pessoa {
    private name: string;
    private age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	public getName(): string {
		return this.name;
	}

	public getAge(): number {
		return this.age;
	}

	public setName(value: string) {
		this.name = value;
	}

	public setAge(value: number) {
		this.age = value;
	}
}

let pessoa = new Pessoa("Vitin", 22)

console.log(`Olá ${pessoa.getName}`)