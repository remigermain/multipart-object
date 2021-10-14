# Multipart-object

## Installation

```bash
# with yarn
yarn add multipart-object
# npm
npm install multipart-object
```

## cdn

```html
 <script src="https://unpkg.com/multipart-object/dist/index.js">
```

## How is work

```js
//es module
import toNestedObject from "multipart-object"

const data = {
    key: "value",
    array: [
        "value1",
        true,
        "value3"
        42,
        {
            anotherkey: "value",
            anotherkey2: "value2"
        }
    ],
    what: {
        nice: "library"
    }
}

const nestedData = toNestedObject(data)
// output
{
  "key": 'value',
  'array[0]': 'value1',
  'array[1]': true,
  'array[2]': 'value3',
  'array[3]': 42,
  'array[4][anotherkey]': 'value',
  'array[4][anotherkey2]': 'value2',
  'what[nice]': 'library'
}
```

## lib for parser in backend

If your project are mande in python, you cna use this lib
[nested_multipart_parser](https://github.com/remigermain/nested_multipart_parser/)
