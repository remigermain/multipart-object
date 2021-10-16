export declare class NestedParser {
    protected readonly data: object;
    protected _options: NestedObjectOptions;
    protected _valid: boolean | null;
    protected _validateData: object;
    protected _errors: Error | null;
    constructor(data: object, options?: NestedObjectOptions);
    protected splitKey(key: string): string[];
    protected setType(dtc: any[any] | {
        [key: string]: any;
    }, key: string, value: any, full_keys: string): void;
    protected decompile(data: {
        [key: string]: any;
    }): object;
    isValid(): boolean;
    get validateData(): object;
    get errors(): Error | null;
}
