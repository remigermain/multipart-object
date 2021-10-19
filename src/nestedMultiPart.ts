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

    function addSeparatorKey(parentKey: string | null, key: string): string {
        if (parentKey == null) {
            return key
        }
        return isDot ? `${parentKey}.${key}` : `${parentKey}[${key}]`
    }
    
    function toNestedData(parentKey: string | null, value: any[string]): void {
        Object.keys(value).forEach(key => {

            const val = value[key]
            // check if the value of objects is another objects

            if (val instanceof Array ||
            (val instanceof Object && !(val instanceof Blob || val instanceof Date))) {

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
