import { defaultOptions } from "./utils"


// @ts-ignore
// import { Blob } from "blob-polyfill"

/*
    @data your objects data
    @options the options for generate data

*/
export function nestedMultiPart(data: object, options: NestedObjectOptions = defaultOptions): NestedMultiPartData {
    const nestedData: NestedMultiPartData = {}
    options = { ...defaultOptions, ...options }

    function addSeparatorKey(parentKey: string | null, key: string): string {
        if (parentKey == null) {
            return key
        }
        if (options?.separator === "dot") {
            return `${parentKey}.${key}`
        }
        return `${parentKey}[${key}]`
    }
    
    function toNestedData(parentKey: string | null, value: any[string]): void {
        Object.keys(value).forEach(key => {

            const val = value[key]
            // check if the value of objects is another objects
            if (val instanceof Array ||
            (val instanceof Object && !(val instanceof Blob))) {

                toNestedData(addSeparatorKey(parentKey, key), value[key])

            } else {

                // assign value when you are in last key
                const parent_key = addSeparatorKey(parentKey, key)
                nestedData[parent_key] =val

            }

        })
    }
    
    toNestedData(null, data)


    return nestedData
}

export function nestedMultiPartForm(data: object, options: NestedObjectOptions = defaultOptions): FormData {
    const nestedData = nestedMultiPart(data, options)
    const form = new FormData()

    Object.keys(nestedData).forEach(key => {
        const value = nestedData[key]

        if (typeof value === "number" || typeof value === "boolean")
            form.append(key, value.toString())
        else
            form.append(key, value)

    })

    return form
}