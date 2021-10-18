declare type Separator = "dot" | "bracket";
interface NestedDataOptions {
    separator?: Separator;
}
interface NestedParserOptions extends NestedDataOptions {
    throwDuplicate?: boolean;
    assignDuplicate?: boolean;
}
interface MemoryNested {
    tmp: any[] | {
        [key: string]: any;
    } | object;
    key: string | number;
    type: any[] | {
        [key: string]: any;
    } | null;
}
declare type NestedElement = {
    [key: string]: any;
} | [[index: number]];
interface NestedMultiPartData {
    [key: string]: string | boolean | number | Blob | File;
}
interface ObjectDepth {
    [key: string]: any;
}
interface ArrayDepth {
    [key: number]: any;
}
declare type NestedDepth = ArrayDepth | ObjectDepth;
