# Multipart-object
[![CI](https://github.com/remigermain/multipart-object/actions/workflows/node.js.yml/badge.svg)](https://github.com/remigermain/multipart-object/actions/workflows/node.js.yml)
[![build](https://img.shields.io/npm/v/multipart-object)](https://www.npmjs.com/package/multipart-object)

library to convert a classic object to a nested object, for send nested data in multipart http request.
A parser for nodejs is provided.

## Installation

```bash
# with yarn
yarn add multipart-object
# npm
npm install multipart-object
```
```html
# cnd for nestedMultiPart function
 <script src="https://unpkg.com/multipart-object/dist/nestedMultiPart.js" defer></script>
```



# Convert data to nestedMultiPart

### How is work
```js
//es module
import nestedMultiPart from "multipart-object"
// with cdn
const toObject = windows.nestedMultiPart.toObject
const toFormData = windows.nestedMultiPart.toFormData


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

const nestedData = nestedMultiPart.toObject(data)
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
// you have to nestedMultiPartForm is return FormData with nested formated
const nestedData = nestedMultiPart.toFormData(data)

```

### Options
```js
const options = {
	/*
		Separators:
		with bracket:  article[0][title][authors][0]: "jhon doe"
		with dot:      article.0.title.authors.0: "jhon doe"
		with mixed:      article[0]title.authors[0]: "jhon doe"
		with mixedDot:      article[0].title.authors[0]: "jhon doe"
	*/
	separator: 'bracket' or 'dot' or 'mixed' or 'mixedDot', // default is bracket
}

nestedMultiPart(data, options)
```

# Parser for multipart nested
If your project are mande in python, you can use this lib
[nested_multipart_parser](https://github.com/remigermain/nested-multipart-parser)

A parser made for nodeJs

For this working perfectly you need to follow this rules:


For this to work perfectly, you must follow the following rules:

- A first key always need to be set. ex: `title[0]` or `title`. In both cases the first key is `title`
- Each sub key need to be separate by brackets `[ ]` or dot `.` (depends of your options)
- For `mixed` or `mixedDot` options, brackets `[]` is for list, and dot `.` is for object
- For `mixedDot` options, is look like `mixed` but with dot when array is follow a object
- Don't put spaces between separators.
- By default, you can't set duplicates keys (see options)
  
## How it works:

Attributes where sub keys are full numbers only are automatically converted into lists:

```python
	data = {
		'title[0]': 'my-value',
		'title[1]': 'my-second-value'
	}
	output = {
		'title': [
			'my-value',
			'my-second-value'
		]
	}

	# Be aware of the fact that you have to respect the order of the indices for arrays, thus 
    	'title[2]': 'my-value' # Invalid (you have to set title[0] and title[1] before)

    # Also, you can't create an array on a key already set as a prinitive value (int, boolean or string):
		'title': 42,
		'title[object]': 42 # Invalid
```



Attributes where sub keys are other than full numbers are converted into Python dictionary:

```python
	data = {
		'title[key0]': 'my-value',
		'title[key7]': 'my-second-value'
	}
	output = {
		'title': {
			'key0': 'my-value',
			'key7': 'my-second-value'
		}
	}
    
    # You have no limit for chained key:
	data = {
		'the[0][chained][key][0][are][awesome][0][0]': 'im here !!'
	}
	# With "dot" separator option:
	data = {
		'the.0.chained.key.0.are.awesome.0.0': 'im here !!'
	}
	# with "mixed" separator option:
	data = {
		'the[0]chained.key[0]are.awesome[0][0]': 'im here !!'
	}
	# with "mixed-dot" separator option (same as 'mixed' but with dot after list to object):
	data = {
		'the[0].chained.key[0].are.awesome[0][0]': 'im here !!'
	}
```



## Parser usage
```js
const NestedParser = require('multipart-object')

// options is optional
const options = {
    separator: "dot"
}

const parser = new NestedParser(data, options)
if (parser.isValid()) {
    const validateData = parser.validateData

} else {
    console.error(parser.errors)
}
```

## Options

```js
const options = {
	/*
		Separators:
		with bracket:  article[0][title][authors][0]: "jhon doe"
		with dot:      article.0.title.authors.0: "jhon doe"
		with mixed:      article[0].title.authors[0]: "jhon doe"
		with mixedDot:      article[0]title.authors[0]: "jhon doe"
	*/
	separator: 'bracket' or 'dot' or 'mixed' or 'mixedDot', // default is bracket

    /*
    raise a expections when you have duplicate keys
	    ex :
	    {
		    "article": 42,
	    	"article[title]": 42,
	    } 
    */
	throwDuplicate: true,

	/*
    overide the duplicate keys, you need to set "throwDuplicate" to False
	 ex :
	 {
		"article": 42,
		"article[title]": 42,
	 }
	 the out is
	 ex :
	 {
		"article"{
	 		"title": 42,
		}
	 }
     */
	assignDuplicate: false
}
```

## License

[MIT](https://github.com/remigermain/multipart-object/blob/main/LICENSE)
