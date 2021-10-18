//@ts-nocheck

// emulate Blob,file and formdata for jest test

global.Blob = class Blob {
    constructor(blobPart? : BlopP){
    }
}
global.File = class File extends Blob {}


global.FormData = class FormData {
    private obj = {}
    
    set(key: string, value: string | Blob, filename: string = null) {
        this.obj[key] = value
    }

    get(key: string) {
        return this.obj[key]
    }
}