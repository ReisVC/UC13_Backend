// Interface para tipar o tsconfig.json
export interface TsConfig {
    compilerOptions: {
        target: string;
        module: string;
        moduleResolution: string;
        outDir: string;
        rootDir: string;
        strict: boolean;
        esModuleInterop: boolean;
        experimentalDecorators: boolean;
        emitDecoratorMetadata: boolean;
        strictPropertyInitialization: boolean;
    };
    include: string[];
}