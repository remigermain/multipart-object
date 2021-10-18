import { toObject, toFormData } from "../src/nestedMultiPart"

// @ts-ignore
// import { Blob } from "blob-polyfill"



describe("convert from data nested options:bracket", () => {

  it('simple', () => {
    const obj = {
      title: 'title',
      key: 'value'
    }
    const expected = {
      title: 'title',
      key: 'value',
    }
    expect(toObject(obj)).toEqual(expected)
  })

  it('object', () => {
    const obj = {
      title: 'title',
      object: {
        title: 'title',
        key: 'value'
      }
    }
    const expected = {
      'title': 'title',
      'object[title]': 'title',
      'object[key]': 'value'
    }
    expect(toObject(obj)).toEqual(expected)
  })

  it('array', () => {
    const obj = {
      title: 'title',
      array: [
        "element",
        "element2"
      ]
    }
    const expected = {
      'title': 'title',
      'array[0]': 'element',
      'array[1]': 'element2',
    }
    expect(toObject(obj)).toEqual(expected)
  })


  it('array object', () => {
    const obj = {
      title: 'title',
      array: [
        {
          title: 'sub-title',
          key: 'key-title'
        },
        {
          title: 'sub-title2',
          key: 'key-title2'
        }
      ]
    }
    const expected = {
      'title': 'title',
      'array[0][title]': 'sub-title',
      'array[0][key]': 'key-title',
      'array[1][title]': 'sub-title2',
      'array[1][key]': 'key-title2',
    }
    expect(toObject(obj)).toEqual(expected)
  })


  it('real', () => {
    const obj = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": "2020-10-04",
      "death": "2020-10-04",
      "profil": { "_new": "u" },
      "wikipedia": "",
      "langs": [
        {
          "id": 5,
          "biography": "<p>hertherh httrehrehert</p>",
          "language": "de"
        },
        {
          "biography": "<p>ytjyrrtyrtjytrj</p>",
          "language": "en",
          "_new": true
        }
      ],
      "tags": [
        {
          "value": 10,
          "display_name": "ytrjtryhgmhgmhgmgmhgmhg"
        }
      ]
    }
    const expected = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": "2020-10-04",
      "death": "2020-10-04",
      "profil[_new]": "u",
      "wikipedia": "",
      "langs[0][id]": 5,
      "langs[0][biography]": "<p>hertherh httrehrehert</p>",
      "langs[0][language]": "de",
      "langs[1][biography]": "<p>ytjyrrtyrtjytrj</p>",
      "langs[1][language]": "en",
      "langs[1][_new]": true,
      "tags[0][value]": 10,
      "tags[0][display_name]": "ytrjtryhgmhgmhgmgmhgmhg",
    }
    expect(toObject(obj)).toEqual(expected)
  })

  it('blob', () => {
    const obj = {
      title: 'title',
      array: [
        "element",
        "element2"
      ],
      // @ts-ignore
      file: new Blob([]),
    }
    const expected = {
      'title': 'title',
      'array[0]': 'element',
      'array[1]': 'element2',
      'file': obj.file,
    }
    expect(toObject(obj)).toEqual(expected)
  })

  it('blob nested', () => {
    // @ts-ignore
    const b = new Blob([])
    const obj = {
      title: 'title',
      array: [
        "element",
        {
          "object": 'icci',
          "sub": {
            "file": b
          }
        }
      ],
    }
    const expected = {
      'title': 'title',
      'array[0]': 'element',
      'array[1][object]': 'icci',
      'array[1][sub][file]': b,
    }
    expect(toObject(obj)).toEqual(expected)
  })

})

/*
  options dots
*/

const options: NestedParserOptions = {
    separator: "dot"
}

describe("convert from data nested options:bracket", () => {

  it('simple', () => {
    const obj = {
      title: 'title',
      key: 'value'
    }
    const expected = {
      title: 'title',
      key: 'value',
    }
    expect(toObject(obj, options)).toEqual(expected)
  })

  it('object', () => {
    const obj = {
      title: 'title',
      object: {
        title: 'title',
        key: 'value'
      }
    }
    const expected = {
      'title': 'title',
      'object.title': 'title',
      'object.key': 'value'
    }
    expect(toObject(obj, options)).toEqual(expected)
  })

  it('array', () => {
    const obj = {
      title: 'title',
      array: [
        "element",
        "element2"
      ]
    }
    const expected = {
      'title': 'title',
      'array.0': 'element',
      'array.1': 'element2',
    }
    expect(toObject(obj, options)).toEqual(expected)
  })


  it('array object', () => {
    const obj = {
      title: 'title',
      array: [
        {
          title: 'sub-title',
          key: 'key-title'
        },
        {
          title: 'sub-title2',
          key: 'key-title2'
        }
      ]
    }
    const expected = {
      'title': 'title',
      'array.0.title': 'sub-title',
      'array.0.key': 'key-title',
      'array.1.title': 'sub-title2',
      'array.1.key': 'key-title2',
    }
    expect(toObject(obj, options)).toEqual(expected)
  })


  it('real', () => {
    const obj = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": "2020-10-04",
      "death": "2020-10-04",
      "profil": { "_new": "u" },
      "wikipedia": "",
      "langs": [
        {
          "id": 5,
          "biography": "<p>hertherh httrehrehert</p>",
          "language": "de"
        },
        {
          "biography": "<p>ytjyrrtyrtjytrj</p>",
          "language": "en",
          "_new": true
        }
      ],
      "tags": [
        {
          "value": 10,
          "display_name": "ytrjtryhgmhgmhgmgmhgmhg"
        }
      ]
    }
    const expected = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": "2020-10-04",
      "death": "2020-10-04",
      "profil._new": "u",
      "wikipedia": "",
      "langs.0.id": 5,
      "langs.0.biography": "<p>hertherh httrehrehert</p>",
      "langs.0.language": "de",
      "langs.1.biography": "<p>ytjyrrtyrtjytrj</p>",
      "langs.1.language": "en",
      "langs.1._new": true,
      "tags.0.value": 10,
      "tags.0.display_name": "ytrjtryhgmhgmhgmgmhgmhg",
    }
    expect(toObject(obj, options)).toEqual(expected)
  })

  it('formdata', () => {
    const obj = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": "2020-10-04",
      "death": "2020-10-04",
      "profil": { "_new": "u" },
      "wikipedia": "",
      "langs": [
        {
          "id": 5,
          "biography": "<p>hertherh httrehrehert</p>",
          "language": "de"
        },
        {
          "biography": "<p>ytjyrrtyrtjytrj</p>",
          "language": "en",
          "_new": true
        }
      ],
      "tags": [
        {
          "value": 10,
          "display_name": "ytrjtryhgmhgmhgmgmhgmhg"
        }
      ]
    }
    const expected: {[key: string]: any} = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": "2020-10-04",
      "death": "2020-10-04",
      "profil._new": "u",
      "wikipedia": "",
      "langs.0.id": 5,
      "langs.0.biography": "<p>hertherh httrehrehert</p>",
      "langs.0.language": "de",
      "langs.1.biography": "<p>ytjyrrtyrtjytrj</p>",
      "langs.1.language": "en",
      "langs.1._new": true,
      "tags.0.value": 10,
      "tags.0.display_name": "ytrjtryhgmhgmhgmgmhgmhg",
    }
    const form = toFormData(obj, options)

    expect(form).toBeInstanceOf(FormData)

    Object.keys(expected).forEach(k => {
      let value = expected[k]
      if (typeof value === 'number' || typeof value === 'boolean') {
        value = value.toString()
      }
      expect(form.get(k)).toEqual(value)
    })
  })


})

