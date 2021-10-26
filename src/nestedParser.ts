//options
const defaultOptions: NestedParserOptions = {
    separator: "bracket",
    throwDuplicate: true,
    assignDuplicate: false
}

function isDigit(val: string): boolean {
    return isDigit._isDigit.test(val)
}
isDigit._isDigit = new RegExp(/^\d+$/)


export class NestedParser {

    protected options: NestedParserOptions
    protected _valid: boolean | null = null
    protected _validateData: object = {}
    protected _errors: Error | null = null

    protected isDot: boolean
    protected isMixed: boolean

    constructor(
        protected readonly data: object,
        options: NestedParserOptions = defaultOptions
    ) {
        this.options = { ...defaultOptions, ...options } as const

        this.isDot = this.options.separator === "dot"
        this.isMixed = this.options.separator === "mixed"
    }

    protected mixedSplit(key: string): string[] {
        const r = RegExp(/(^[^[\].]+)|\[(\d+)\]|(\.\w+)/)

        let length = 0
        const arr: any[] = key.split(r).filter(r => r && r.length ? r : undefined)

        const e = arr.map((key, idx) => {
            length += key.length
            if (idx) {
                if (key[0] != '.') {
                    length += 2
                    return parseInt(key[0])
                } else if (key.length == 1) {
                    length--
                }
                // remove dot
                return key.substring(1, key.length)
            }
            return key
        })
        if (key.length !== length)
            throw new Error(`key "${key}" is wrong formated`)
        return e
    }

    protected splitKey(key: string): string[] {

        const k = key.replace(/\s+/g, "")
        if (k.length != key.length) {
            throw new Error(`key '${key}' is wrong formated, no space available`)
        }

        if (this.isMixed) {
            return this.mixedSplit(key)
        }

        const pattern = (this.isDot ? /\./g : /\[|\]/g)
        const pattern_length = (this.isDot ? 1 : 2)

        let length = -pattern_length

        const keys: string[] = key.split(pattern).filter(k => {
            if (k) {
                length += k.length + pattern_length
                return k
            }
        })

        if (key.length !== length)
            throw new Error(`key "${key}" is wrong formated`)

        return keys
    }

    protected constructDepth(tmp: NestedElement, key: string, value: any, memory: MemoryNested, full_key: string, last = false): string | number {
        if (tmp instanceof Array) {
            const skey = parseInt(key)
            if (tmp.length < skey)
                throw new Error(`array indice '${skey}' from key '${full_key}' is upper than actual array`)
            if (tmp.length === skey) {
                tmp.push(value)
            }

            return skey
        }
        if (["number", "string", "boolean"].includes(typeof tmp)) {
            if (this.options.throwDuplicate)
                throw new Error(`the key "${key}" as already set`)
            else if (this.options.assignDuplicate) {
                tmp = memory.tmp
                tmp[memory.key] = memory.type
                return this.constructDepth(tmp[memory.key], key, value, memory, full_key, last)
            }
        }
        else if (!(key in tmp) || (last && this.options.assignDuplicate)) {
            tmp[key] = value
        }
        return key
    }

    protected parse(data: { [key: string]: any }): object {
        const obj: { [key: string]: any } = {}

        Object.keys(data).forEach(key => {
            const keys = this.splitKey(key)

            let tmp = obj

            // need it for duplicate
            const memory: MemoryNested = {
                tmp: tmp,
                key: keys[0],
                type: {}
            }

            for (let index = 0; index < keys.length - 1; index++) {

                // if the next key is a digit we put a array

                const nextType = (this.isMixed ? (typeof keys[index + 1] === 'number' ? [] : {}) : isDigit(keys[index + 1]) ? [] : {})

                const nkey = this.constructDepth(tmp, keys[index], nextType, memory, key)

                // reset the actual var
                memory.tmp = tmp
                memory.key = nkey
                memory.type = nextType

                tmp = tmp[nkey]
            }
            const value = data[key]
            this.constructDepth(tmp, keys[keys.length - 1], value, memory, key, true)
        })

        return obj
    }

    isValid(): boolean {
        this._valid = false
        try {
            this._validateData = this.parse(this.data)
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
