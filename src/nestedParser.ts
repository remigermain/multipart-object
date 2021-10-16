import { defaultOptions, isDigit, isPrimitive} from "./utils"


//options

export class NestedParser {
    
    protected _options: NestedObjectOptions
    protected _valid: boolean | null = null
    protected _validateData: object = {}
    protected _errors: Error | null = null

    constructor(
        protected readonly data: object,
        options: NestedObjectOptions = defaultOptions
    ) {
        this._options = {...defaultOptions, ...options} as const
    }

    protected splitKey(key: string): string[] {

        // remove space
        const results: string[] = []
        let check = -2
        key.split(/\[|\]/).forEach((select: string) => {
            if (select) {
                check += select.length + 2
                results.push(select)
            }
        })

        if (key.length != check || results.length == 0)
            throw new Error(`invalid format from key ${key}`)
        return results
    }

    protected setType(dtc: any[any] | {[key: string]: any} , key: string, value: any, full_keys: string): void {
        if (dtc instanceof Array) {
            const index = parseInt(key)
            if (dtc.length < index)
                throw new Error(`key \"${full_keys}\" is upper than actual list`)
            if (dtc.length == index)
                dtc.push(value)
            else if (isPrimitive(dtc[index]))
                throw new Error(`invalid rewrite key from \"${full_keys}\" to \"${dtc}\"`)
        } else if (!(key in dtc)) {
            dtc[key] = value
        }
        else if (isPrimitive(value))
            throw new Error(`invalid rewrite key from \"${full_keys}\" to \"${dtc}\"`)
    }

    protected decompile(data: {[key: string]: any}): object {
        const obj: {[key: string]: any} = {}

        Object.keys(data).forEach((key: string) => {
            // @ts-ignore TS7053
            const keys = this.splitKey(key.replace(/\s/g, ""))
            let tmp: object | any[any] = obj

            let idx = -1
            while (++idx < (keys.length - 1)) {
            const keyNum = parseInt(key)
                const value = (isDigit(keys[idx + 1]) ? [] : {})

                const index = keys[idx]
                this.setType(tmp,  index, value, key)
                tmp = tmp[index]
            }

            // set the last value of nested data
            this.setType(tmp, keys[idx], data[key], key)
        })

        return obj
    }

    isValid() : boolean {
        this._valid = false
        try {
            this._validateData = this.decompile(this.data)
            this._valid = true
        } catch (e: any) {
            this._errors = e
        }
        return this._valid
    }


    get validateData(): object {
        if (this._valid === null)
            throw new Error("You need to be call is_valid() before access validate_data")
        if (this._valid === false)
            throw new Error("You can't get validate data")
        return this._validateData
    }

    get errors() {
        return this._errors
    }
}
