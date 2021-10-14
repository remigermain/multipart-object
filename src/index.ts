export default function (data: object): object {
    const newobj : {[key: string]: string | number | boolean} = {}

    function toKey(path: string, key: string): string {
        return path && `${path}[${key}]` || key
    }
  
  function nestedKeys(path: string, value: any[string]): void {
      Object.keys(value).forEach(key => {

        // check if the value of objects is another objects
        if (value[key] instanceof Object) {

            nestedKeys(toKey(path, key), value[key])

        } else {

            // assign value when you are in last key
            const parent_key = toKey(path, key)
            newobj[parent_key] = value[key]

        }

      })
    }
    
    nestedKeys("", data)

    return newobj
  }