import { NestedDataOptions, NestedMultiPartData } from './utils'

const defaultOptions: NestedDataOptions = {
    separator: "bracket"
}

/*
    @data your objects data
    @options the options for generate data

*/
export function toObject(data: object, options: NestedDataOptions = defaultOptions): NestedMultiPartData {
    const nestedData: NestedMultiPartData = {}
    options = { ...defaultOptions, ...options }
    const isDot = options?.separator == "dot"
    const isMixed = options?.separator == "mixed"
    const isMixedDot = options?.separator == "mixedDot" || isMixed

    function addSeparatorKey(parentKey: string | undefined, key: string, isArray: boolean): string {
        if (parentKey == null) {
            return key
        }
        if (isMixed && parentKey[parentKey.length - 1] == "]" && !isArray) {
            return `${parentKey}${key}`
        }
        return isDot || isMixedDot && !isArray ? `${parentKey}.${key}` : `${parentKey}[${key}]`
    }

    function toNestedData(parentKey: string | undefined, value: any[string]): void {
        Object.keys(value).forEach(key => {

            const val = value[key]

            // check last value is array
            const isArray = value instanceof Array

            // check if the value of objects is another objects
            if (val instanceof Array ||
                (val instanceof Object && !(val instanceof Blob || val instanceof Date))) {

                toNestedData(addSeparatorKey(parentKey, key, isArray), val)

            } else {

                // assign value when you are in last key
                const parent_key = addSeparatorKey(parentKey, key, isArray)
                nestedData[parent_key] = val

            }

        })
    }

    toNestedData(undefined, data)


    return nestedData
}

export function toFormData(data: object, options: NestedDataOptions = defaultOptions): FormData {
    const nestedData = toObject(data, options)
    const form = new FormData()

    Object.keys(nestedData).forEach(key => {
        let value = nestedData[key]
        // convert number, boolean, date or any value to string
        if (!(value instanceof Blob)) {
            value = String(value)
        }
        form.set(key, value)
    })

    return form
}
