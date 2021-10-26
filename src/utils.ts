/* eslint-disable */

type Separator = "dot" | "bracket" | "mixed"

interface NestedDataOptions {
    separator?: Separator,
}

interface NestedParserOptions extends NestedDataOptions {
    throwDuplicate?: boolean,
    assignDuplicate?: boolean,
}

interface MemoryNested {
    tmp: any[] | { [key: string]: any } | object,
    key: string | number,
    type: any[] | { [key: string]: any } | null
}

type NestedElement = { [key: string]: any } | [[index: number]]
/*
    type for nested form
*/

interface NestedMultiPartData {
    [key: string]: string | boolean | number | Date | Blob
}