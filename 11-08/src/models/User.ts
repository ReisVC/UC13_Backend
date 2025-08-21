export class User {
    private id: number;
    private nome: string;
    private email: string;

	constructor(id: number, nome: string, email: string) {
		this.id = id;
		this.nome = nome;
		this.email = email;
	}

	public getNome(): string {
		return this.nome;
	}

	public setNome(value: string) {
		this.nome = value;
	}

	public getId(): number {
		return this.id;
	}

	public setId(value: number) {
		this.id = value;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(value: string) {
		this.email = value;
	}

}

export let usuarios: User[] = [];