import { NestedDataOptions, NestedMultiPartData } from './utils'

const defaultOptions: NestedDataOptions = {
    separator: "mixedDot"
}

function isObject(obj: any) {
    return (obj instanceof Object && !(obj instanceof Blob || obj instanceof Date))
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
        // check last value is array
        const isArray = Array.isArray(value)
        const keys = Object.keys(value)

        if ((isArray && value.length === 0) || (isObject(value) && keys.length === 0)) {
            const subParentKey = addSeparatorKey(parentKey, "", isArray)
            nestedData[subParentKey] = null
            return
        }
        keys.forEach(key => {

            const val = value[key]
            const subParentKey = addSeparatorKey(parentKey, key, isArray)

            // check if the value of objects is another objects
            if (Array.isArray(val) || isObject(val)) {
                toNestedData(subParentKey, val)
            } else {
                // assign value when you are in last key
                nestedData[subParentKey] = val
            }
        })
    }

    toNestedData(undefined, data)


    return nestedData
}

export function toFormData(data: object, options: NestedDataOptions = defaultOptions): FormData {
    const nestedData = toObject(data, options)
    const form = new FormData()

    Object.entries(nestedData).forEach(([key, value]) => {
        // convert number, boolean, date or any value to string
        if (!(value instanceof Blob)) {
            value = String(value)
        }
        form.set(key, value)
    })

    return form
}
