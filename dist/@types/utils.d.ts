export declare type Separator = "dot" | "bracket" | "mixed" | "mixedDot";
export interface NestedDataOptions {
    separator?: Separator;
}
export interface NestedParserOptions extends NestedDataOptions {
    throwDuplicate?: boolean;
    assignDuplicate?: boolean;
}
export interface MemoryNested {
    tmp: any[] | {
        [key: string]: any;
    } | object;
    key: string | number;
    type: any[] | {
        [key: string]: any;
    } | null;
}
export declare type NestedElement = {
    [key: string]: any;
} | [[index: number]];
export interface NestedMultiPartData {
    [key: string]: string | boolean | number | Date | Blob;
}
