import * as fs from "fs";                       // Para criar pastas e arquivos
import * as path from "path";                   // Para criar caminhos seguros
import { execSync } from "child_process";       // Para rodar comandos do terminal
import * as readlineSync from "readline-sync";  // Para perguntar algo ao usuário
import { TsConfig } from "./interfaces/TsConfig";       // Tipagem do tsconfig
import { PackageJson } from "./interfaces/PackageJson"; // Tipagem do package.json

function createTsProject(): void {

    // Passo 1: Perguntar o nome do projeto
    const projectName: string = readlineSync.question("Digite o nome do projeto: ");
    if (!projectName) {
        console.log("Nome do projeto não pode ser vazio!");
        return;
    }

    // Passo 2: Definir o caminho do projeto
    const projectPath: string = path.join("..", projectName);

    // Passo 3: Criar a pasta do projeto
    fs.mkdirSync(projectPath, { recursive: true });

    // Passo 4: Entrar na pasta do projeto
    process.chdir(projectPath);
    console.log("📦 Inicializando o projeto...");

    // Passo 5: Inicializar npm
    // Inicializa npm
    execSync("npm init -y", { stdio: "inherit" });

    // Instala dependências de runtime
    execSync(
        "npm install express cors dotenv bcrypt jsonwebtoken typeorm reflect-metadata class-validator class-transformer",
        { stdio: "inherit" }
    );

    // Instala dependências de desenvolvimento
    execSync(
        "npm install -D typescript @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken ts-node-dev",
        { stdio: "inherit" }
    );

    // Passo 6: Criar tsconfig.json
    const tsConfig: TsConfig = {
        compilerOptions: {
            target: "ES6",
            module: "commonjs",
            moduleResolution: "Node",
            outDir: "dist",
            rootDir: "src",
            strict: true,
            esModuleInterop: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            strictPropertyInitialization: false
        },
        include: ["src"]
    };

    fs.writeFileSync("tsconfig.json", JSON.stringify(tsConfig, null, 2));

    // Passo 7: Editar package.json para scripts úteis
    const packageJsonRaw: string = fs.readFileSync("package.json", "utf-8");
    const packageJson: PackageJson = JSON.parse(packageJsonRaw);

    packageJson.scripts = {
        test: 'echo "Error: no test specified" && exit 1',
        build: "tsc",
        start: "tsc && node dist/server.js",
        dev: "ts-node-dev --respawn --transpile-only src/server.ts"
    };

    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

    // Passo 8: Criar estrutura de pastas e arquivos iniciais MVC
    const srcFolders = ["models", "controllers", "middlewares", "routes", "services", "utils", "dtos"];
    fs.mkdirSync("src");
    srcFolders.forEach(folder => fs.mkdirSync(`src/${folder}`));

    // Passo 9: Criar arquivos iniciais dentro de src
    fs.writeFileSync("src/app.ts", "");
    fs.writeFileSync("src/data-source.ts", "");
    fs.writeFileSync("src/server.ts", "");


    // Passo 10: Criar um arquivo inicial no src
    fs.writeFileSync("src/index.ts", `console.log("Projeto ${projectName} rodando!");`);

    // Passo 11: Criar arquivo .env
    fs.writeFileSync(".env", "# Variáveis de ambiente\nPORT=3000\n");

    // Final: Mensagem de sucesso
    console.log(`\n✅ Projeto "${projectName}" criado com sucesso em "${projectPath}"`);
    console.log("👉 Para começar:");
    console.log(`cd ../${projectName}`);
    console.log("npm run dev");

}

// Chamar a função principal
createTsProject(); 