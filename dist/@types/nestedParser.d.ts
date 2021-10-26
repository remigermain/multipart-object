export declare class NestedParser {
    protected readonly data: object;
    protected options: NestedParserOptions;
    protected _valid: boolean | null;
    protected _validateData: object;
    protected _errors: Error | null;
    protected isDot: boolean;
    protected isMixed: boolean;
    constructor(data: object, options?: NestedParserOptions);
    protected mixedSplit(key: string): string[];
    protected splitKey(key: string): string[];
    protected constructDepth(tmp: NestedElement, key: string, value: any, memory: MemoryNested, full_key: string, last?: boolean): string | number;
    protected parse(data: {
        [key: string]: any;
    }): object;
    isValid(): boolean;
    get validateData(): object;
    get errors(): Error | null;
}
