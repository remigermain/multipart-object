/**utils */
export function isDigit(val: string): boolean {
    return isDigit._isDigit.test(val)
}
isDigit._isDigit = RegExp(/^\d+$/)


export function isPrimitive(val: any): boolean {
    return ["number", "boolean", "string"].includes(typeof val)
}


export const defaultOptions: NestedObjectOptions = {
    separator: "bracket"
}