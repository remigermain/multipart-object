import { NestedParserOptions, NestedElement, MemoryNested } from './utils'

const defaultOptions: NestedParserOptions = {
    separator: "mixedDot",
    throwDuplicate: true,
    assignDuplicate: false
}

function isDigit(val: string | number): boolean {
    if (typeof val === 'number') {
        return true
    }
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
    protected isMixedDot: boolean

    constructor(
        protected readonly data: object,
        options: NestedParserOptions = defaultOptions
    ) {
        this.options = { ...defaultOptions, ...options } as const

        this.isDot = this.options.separator === "dot"
        this.isMixed = this.options.separator === "mixed"
        this.isMixedDot = this.options.separator === "mixedDot"
        if (this.isMixedDot) {
            this.isMixed = true
        }
    }

    protected mixedSplit(key: string): Array<string | number> {
        function span(key: string, i: number): number {
            const old = i
            while (i != key.length) {
                if (key[i] == '.' || key[i] == ']' || key[i] == '[') {
                    break
                }
                i++
            }
            if (old == i) {
                throw new Error(
                    `invalid format key '${fullKeys}', empty key value at position ${i + pos}`)
            }
            return i
        }

        const fullKeys = key
        let idx = span(key, 0)
        const pos = idx
        const keys: Array<string | number> = [key.substring(0, idx)]
        key = key.substring(idx, key.length)

        let i = 0
        let lastIsArray = false
        while (i < key.length) {
            if (key[i] == '[') {
                i++
                idx = span(key, i)
                if (key[idx] != ']') {
                    throw new Error(
                        `invalid format key '${fullKeys}', not end with bracket at position ${i + pos}`)
                }
                const sub = key.substring(i, idx)
                if (!isDigit(sub)) {
                    throw new Error(
                        `invalid format key '${fullKeys}', list key is not a valid number at position ${i + pos}`)
                }
                keys.push(parseInt(key.substring(i, idx)))
                i = idx + 1
                lastIsArray = true
            }
            else if (key[i] == ']') {
                throw new Error(
                    `invalid format key '${fullKeys}', not start with bracket at position ${i + pos}`)
            }
            else if ((key[i] == '.' && this.isMixedDot) || (
                !this.isMixedDot && (
                    (key[i] != '.' && lastIsArray) ||
                    (key[i] == '.' && !lastIsArray)
                )
            )) {
                if (this.isMixedDot || !lastIsArray) {
                    i++
                }
                idx = span(key, i)
                keys.push(key.substring(i, idx))
                i = idx
                lastIsArray = false
            }
            else {
                throw new Error(
                    `invalid format key '${fullKeys}', invalid char at position ${i + pos}`)
            }
        }
        return keys
    }

    protected splitKey(key: string): Array<string | number> {

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

    protected constructDepth(tmp: NestedElement, key: string | number, value: any, memory: MemoryNested, full_key: string, last = false): string | number {
        if (tmp instanceof Array) {
            const skey = this.isMixed ? key : parseInt(key as string)
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
