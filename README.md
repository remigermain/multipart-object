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
	//the separator
	//with bracket:  article[title][authors][0]: "jhon doe"
	//with dot:      article.title.authors.0: "jhon doe"
	separator: 'bracket' or 'dot', // default is bracket
}

nestedMultiPart(data, options)
```

# Parser for multipart nested
If your project are mande in python, you can use this lib
[nested_multipart_parser](https://github.com/remigermain/nested-multipart-parser)

A parser made for nodeJs

For this working perfectly you need to follow this rules:

- a first key need to be set ex: `title[0]` or `title`, in both the first key is `title`
- each sub key need to be seperate by brackets `[ ]` or dot `.` (depends of your options)
- if sub key are a full number, is converted to list *ex:* `[0]` or `[42]`
- if sub key is Not a number is converted to dictionary *ex:* `[username]` or `[article]`
- no space between separator
- by default,the duplicate keys can't be set (see options to override that)
  ex:

```python
	data = {
		'title[0]': 'my-value'``
	}
	# output
	output = {
		'title': [
			'my-value'
		]
	}

	# invalid key
	data = {
		'title[688]': 'my-value'
	}
	# ERROR , you set a number is upper thans actual list


	# wrong format if separator is brackets (see options)
	data = {
		'title[0]]]': 'my-value',
		'title[0': 'my-value',
		'title[': 'my-value',
		'title[]': 'my-value',
		'[]': 'my-value',
	}

	data = {
		'title': 42,
		'title[object]': 42
	}
	# Error , title as alerady set by primitive value (int, boolean or string)

	# many element in list
	data = {
		'title[0]': 'my-value',
		'title[1]': 'my-second-value'
	}
	# output
	output = {
		'title': [
			'my-value',
			'my-second-value'
		]
	}

	# converted to object
	data = {
		'title[key0]': 'my-value',
		'title[key7]': 'my-second-value'
	}
	# output
	output = {
		'title': {
			'key0': 'my-value',
			'key7': 'my-second-value'
		}
	}

	# you have no limit for chained key
	data = {
		'the[0][chained][key][0][are][awesome][0][0]': 'im here !!'
	}
	# with "dot" separator in options is look like that
	data = {
		'the.0.chained.key.0.are.awesome.0.0': 'im here !!'
	}

	# the output
	output: {
		'the': [
			{
				'chained':{
					'key': [
						{
							'are': {
								'awesome':
								[
									[
										'im here !!'
									]
								]
							}
						}
					]
				}
			}
		]
	}
```

## How to use it
```js
import { NestedParser } from 'multipart-object'

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
	// the separator
	// with bracket:  article[title][authors][0]: "jhon doe"
	// with dot:      article.title.authors.0: "jhon doe"
	separator: 'bracket' /* or */ 'dot', // default is bracket


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
    overide the duplicate keys, you need to set "raise_duplicate" to False
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
