/*

    type for nested options

*/

type Separator = "dot" | "bracket"

interface NestedDataOptions {
    separator?: Separator,
}

interface NestedParserOptions extends NestedDataOptions {
    throwDuplicate?: boolean,
    assignDuplicate?: boolean,
}

interface MemoryNested {
    tmp: any[] | {[key: string]: any} | object ,
    key: string | number,
    type: any[] | {[key: string]: any} | null
}

type NestedElement = {[key: string]: any} | [[index: number]]
/*
    type for nested form
*/

interface NestedMultiPartData {
    [key: string]: string | boolean | number | Date | Blob
}

interface ObjectDepth{
    [key: string]: any
}

interface ArrayDepth{
    [key: number]: any
}

type NestedDepth = ArrayDepth | ObjectDepth