// Interface para tipar o package.json
export interface PackageJson {
    name?: string;
    version?: string;
    description?: string;
    main?: string;
    scripts: {
        test: string;
        build: string;
        start: string;
        dev: string;
    };
    keywords?: string[];
    author?: string;
    license?: string;
    [key: string]: unknown;
}