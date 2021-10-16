/*

    type for nested options

*/

type Separator = "dot" | "bracket"

interface NestedObjectOptions {
    separator?: Separator,
}

interface ParserOptions {
    raise_duplicate?: boolean,
    assign_duplicate?: boolean,
}


/*
    type for nested form
*/

interface NestedMultiPartData {
    [key: string]: string | boolean | number | Blob | File
}