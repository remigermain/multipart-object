import { toObject, toFormData } from "../src/nestedMultiPart"
import { NestedDataOptions } from '../src/utils'

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
    expect(toObject(obj, { separator: "bracket" })).toEqual(expected)
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
    expect(toObject(obj, { separator: "bracket" })).toEqual(expected)
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
    expect(toObject(obj, { separator: "bracket" })).toEqual(expected)
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
    expect(toObject(obj, { separator: "bracket" })).toEqual(expected)
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
    expect(toObject(obj, { separator: "bracket" })).toEqual(expected)
  })

  it('blob', () => {
    const obj = {
      title: 'title',
      array: [
        "element",
        "element2"
      ],
      // @ts-ignore
      file: new Blob([], "filename"),
    }
    const expected = {
      'title': 'title',
      'array[0]': 'element',
      'array[1]': 'element2',
      'file': obj.file,
    }
    expect(toObject(obj, { separator: "bracket" })).toEqual(expected)
  })

  it('blob nested', () => {
    // @ts-ignore
    const b = new Blob([], "filename")
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
    expect(toObject(obj, { separator: "bracket" })).toEqual(expected)
  })

})

/*
  options dots
*/

const options: NestedDataOptions = {
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
    const date = new Date("2021-01-01")
    const data = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": date,
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
    const expected: { [key: string]: any } = {
      "id": 14,
      "name": "ytrjtryhgmhgmhgmgmhgmhg",
      "born": date,
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
    const form = toFormData(data, options)

    expect(form).toBeInstanceOf(FormData)

    Object.keys(expected).forEach(k => {
      let value = expected[k]

      // check if number, boolean, or date is converted to string
      if (typeof value === 'number' || typeof value === 'boolean' || value instanceof Date) {
        value = String(value)
      }

      expect(form.get(k)).toEqual(value)
    })
  })
})

describe('mixed dot separator', () => {
  it('mixed', () => {
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
          "display_name": [
            [
              "vc",
              {
                "check": true
              }
            ]
          ]
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
      "langs[0].id": 5,
      "langs[0].biography": "<p>hertherh httrehrehert</p>",
      "langs[0].language": "de",
      "langs[1].biography": "<p>ytjyrrtyrtjytrj</p>",
      "langs[1].language": "en",
      "langs[1]._new": true,
      "tags[0].value": 10,
      "tags[0].display_name[0][0]": "vc",
      "tags[0].display_name[0][1].check": true
    }
    expect(toObject(obj, { separator: "mixedDot" })).toEqual(expected)
  })


  it('mixed separator', () => {
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
          "display_name": [
            [
              "vc",
              {
                "check": true
              }
            ]
          ]
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
      "langs[0]id": 5,
      "langs[0]biography": "<p>hertherh httrehrehert</p>",
      "langs[0]language": "de",
      "langs[1]biography": "<p>ytjyrrtyrtjytrj</p>",
      "langs[1]language": "en",
      "langs[1]_new": true,
      "tags[0]value": 10,
      "tags[0]display_name[0][0]": "vc",
      "tags[0]display_name[0][1]check": true
    }
    expect(toObject(obj, { separator: "mixed" })).toEqual(expected)
  })

  it("add empty array", () => {
    const obj = {
      "title": "titleContent",
      "empty": {
        "array": [],
        "des": "description"
      }
    }
    const expected = {
      "title": "titleContent",
      "empty.array[]": null,
      "empty.des": "description",
    }
    expect(toObject(obj)).toEqual(expected)
  })
  it("add empty obj", () => {
    const obj = {
      "title": "titleContent",
      "empty": {
        "obj": {},
        "des": "description"
      }
    }
    const expected = {
      "title": "titleContent",
      "empty.obj.": null,
      "empty.des": "description",
    }
    expect(toObject(obj)).toEqual(expected)
  })

})

