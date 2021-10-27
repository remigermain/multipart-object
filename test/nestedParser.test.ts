import { NestedParser } from "../src/nestedParser"

describe("convert form data nested", () => {

    it('isValid_no_call', () => {
        const parser = new NestedParser({ "key": "value" })
        expect(() => parser.validateData).toThrowError(Error)
    })

    it('isValid_wrong', () => {
        const parser = new NestedParser({ "key[]]]": "value" })
        expect(parser.isValid()).toBeFalsy()
        expect(() => parser.validateData).toThrowError(Error)
    })

    it('parser_object', () => {
        const data = {
            'title[id][length]': 'lalal'
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': {
                'id': {
                    'length': 'lalal'
                }
            }
        }
        expect(parser.validateData).toEqual(expected)
    })

    it('parser_object2', () => {
        const data = {
            'title[id][length]': 'lalal',
            'title[id][value]': 'lalal'
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': {
                'id': {
                    'length': 'lalal',
                    'value': 'lalal'
                }
            }
        }
        expect(expected).toEqual(parser.validateData)
    })

    it('parser_object3', () => {
        const data = {
            'title[id][length]': 'lalal',
            'title[id][value]': 'lalal',
            'title[value]': 'lalal'
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': {
                'id': {
                    'length': 'lalal',
                    'value': 'lalal'
                },
                'value': 'lalal'
            }
        }
        expect(expected).toEqual(parser.validateData)
    })

    it('parser_object4', () => {
        const data = {
            'title[id][length]': 'lalal',
            'title[id][value]': 'lalal',
            'title[value]': 'lalal',
            'sub': 'lalal',
            'title[id][recusrive][only][field]': 'icci'
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': {
                'id': {
                    'length': 'lalal',
                    'value': 'lalal',
                    'recusrive': {
                        'only': {
                            'field': 'icci'
                        }
                    }
                },
                'value': 'lalal'
            },
            'sub': 'lalal'
        }
        expect(parser.validateData).toEqual(expected)
    })

    it('parser_object_reasing', () => {
        const data = {
            'title[id][length]': 'lalal',
            'title[id][  length  ]': 'laffflal',
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeFalsy()
    })

    it('parser_object_reasing2', () => {
        const data = {
            'title[id][length]': 'lalal',
            'title[value]': 'lalal',
            'sub': 'lalal',
            'title[id][recusrive][only][field]': 'icci',
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': {
                'id': {
                    'length': 'lalal',
                    'recusrive': {
                        'only': {
                            'field': 'icci'
                        },
                    },
                },
                'value': 'lalal',
            },
            'sub': 'lalal',
        }
        expect(expected).toEqual(parser.validateData)
    })

    it('parser_classic', () => {
        const data = {
            'title': 'lalal'
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': 'lalal'
        }
        expect(expected).toStrictEqual(parser.validateData)
    })

    it('parser_list_out_index', () => {
        const data = {
            'title': 'dddddddddddddd',
            'tist[0]': 'lalal',
            'tist[2]': 'lalal',
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeFalsy()
    })

    it('parser_empty_list_out_index', () => {
        const data = {
            'title': 'dddddddddddddd',
            'tist[0]': 'lalal',
            'tist[]': 'lalal',
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeFalsy()
    })

    it('parser_double_assign', () => {
        const data = {
            'title   ': 'lalal',
            'title': 'dddddddddddddd'
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeFalsy()
    })

    it('parser_list', () => {
        const data = {
            'title': 'lalal',
            'list[0]': 'icicici'
        }
        const parser = new NestedParser(data)
        const expected = {
            'title': 'lalal',
            'list': [
                'icicici'
            ]
        }
        expect(parser.isValid()).toBeTruthy()
        expect(expected).toEqual(parser.validateData)
    })

    it('parser_list_index_out_of_range', () => {
        const data = {
            'title': 'lalal',
            'list[0]': 'icicici'
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': 'lalal',
            'list': [
                "icicici"
            ]
        }
        expect(expected).toEqual(parser.validateData)
    })

    it('parser_list_object_index', () => {
        const data = {
            'title': 'lalal',
            'list[length][0]': 'icicici'
        }
        const parser = new NestedParser(data)
        const expected = {
            'title': 'lalal',
            'list': {
                'length': [
                    'icicici'
                ]
            }
        }
        expect(parser.isValid()).toBeTruthy()
        expect(expected).toEqual(parser.validateData)
    })

    it('parser_list_double_assign', () => {
        const data = {
            'title': 'lalal',
            'list[0]': 'icicici',
            'list[0 ]': 'new',
            'list[1]': 'neeew',
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeFalsy()
    })

    it('real', () => {
        const data = {
            'title': 'title',
            'date': "time",
            'langs[0][id]': "id",
            'langs[0][title]': 'title',
            'langs[0][description]': 'description',
            'langs[0][language]': "language",
            'langs[1][id]': "id1",
            'langs[1][title]': 'title1',
            'langs[1][description]': 'description1',
            'langs[1][language]': "language1"
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': 'title',
            'date': "time",
            'langs': [
                {
                    'id': 'id',
                    'title': 'title',
                    'description': 'description',
                    'language': 'language'
                },
                {
                    'id': 'id1',
                    'title': 'title1',
                    'description': 'description1',
                    'language': 'language1'
                }
            ]
        }
        expect(parser.validateData).toStrictEqual(expected)
    })

    it('parser_rewrite_key_list', () => {
        const data = {
            'title': 'lalal',
            'title[0]': 'lalal',
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeFalsy()
    })

    it('parser_rewrite_key_boject', () => {
        const data = {
            'title': 'lalal',
            'title[object]': 'lalal',
        }
        const parser = new NestedParser(data)
        expect(parser.isValid()).toBeFalsy()
    })
})

describe('mixed separator', () => {
    it('real', () => {
        const data = {
            'title': 'title',
            'date': "time",
            'langs[0].id': "id",
            'langs[0].title': 'title',
            'langs[0].description': 'description',
            'langs[0].language': "language",
            'langs[1].id': "id1",
            'langs[1].title': 'title1',
            'langs[1].description[0][0]': 'description1',
            'langs[1].description[0][1]': 'description2',
            'langs[1].description[0][2].obj': 'description3',
            'langs[1].description[0][2].puilo': 'description4',
            'langs[1].language': "language1"
        }
        const parser = new NestedParser(data, { separator: "mixedDot" })
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': 'title',
            'date': "time",
            'langs': [
                {
                    'id': 'id',
                    'title': 'title',
                    'description': 'description',
                    'language': 'language'
                },
                {
                    'id': 'id1',
                    'title': 'title1',
                    'description': [
                        [
                            'description1',
                            'description2',
                            {
                                obj: "description3",
                                puilo: "description4",
                            }
                        ]
                    ],
                    'language': 'language1'
                }
            ]
        }
        expect(parser.validateData).toStrictEqual(expected)
    })

    it('number dot in bracket', () => {
        const data = {
            'title[0].5555': 'lalal',
        }
        const parser = new NestedParser(data, { separator: "mixedDot" })
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            title: [
                {
                    "5555": "lalal"
                }
            ]
        }
        expect(parser.validateData).toEqual(expected)
    })

    describe('invalid', () => {

        it('end dot', () => {
            const data = {
                'title.': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty list', () => {
            const data = {
                'title[]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty dot ended', () => {
            const data = {
                'title[1].': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty list', () => {
            const data = {
                'title[1].': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty bracket alone', () => {
            const data = {
                'title[': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('character in bracket', () => {
            const data = {
                'title[ttt]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('character dot in bracket', () => {
            const data = {
                'title[t.tt]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('number dot in bracket', () => {
            const data = {
                'title[44.4]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixedDot" })
            expect(parser.isValid()).toBeFalsy()
        })

    })
})



describe('mixedDot separator', () => {
    it('real', () => {
        const data = {
            'title': 'title',
            'date': "time",
            'langs[0]id': "id",
            'langs[0]title': 'title',
            'langs[0]description': 'description',
            'langs[0]language': "language",
            'langs[1]id': "id1",
            'langs[1]title': 'title1',
            'langs[1]description[0][0]': 'description1',
            'langs[1]description[0][1]': 'description2',
            'langs[1]description[0][2]obj': 'description3',
            'langs[1]description[0][2]puilo': 'description4',
            'langs[1]language': "language1"
        }
        const parser = new NestedParser(data, { separator: "mixed" })
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            'title': 'title',
            'date': "time",
            'langs': [
                {
                    'id': 'id',
                    'title': 'title',
                    'description': 'description',
                    'language': 'language'
                },
                {
                    'id': 'id1',
                    'title': 'title1',
                    'description': [
                        [
                            'description1',
                            'description2',
                            {
                                obj: "description3",
                                puilo: "description4",
                            }
                        ]
                    ],
                    'language': 'language1'
                }
            ]
        }
        expect(parser.validateData).toStrictEqual(expected)
    })

    it('number dot in bracket', () => {
        const data = {
            'title[0]5555': 'lalal',
        }
        const parser = new NestedParser(data, { separator: "mixed" })
        expect(parser.isValid()).toBeTruthy()
        const expected = {
            title: [
                {
                    "5555": "lalal"
                }
            ]
        }
        expect(parser.validateData).toEqual(expected)
    })

    describe('invalid', () => {

        it('end dot', () => {
            const data = {
                'title.': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty list', () => {
            const data = {
                'title[]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty dot ended', () => {
            const data = {
                'title[1].': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty list', () => {
            const data = {
                'title[1].': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('empty bracket alone', () => {
            const data = {
                'title[': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('character in bracket', () => {
            const data = {
                'title[ttt]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('character dot in bracket', () => {
            const data = {
                'title[t.tt]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

        it('number dot in bracket', () => {
            const data = {
                'title[44.4]': 'lalal',
            }
            const parser = new NestedParser(data, { separator: "mixed" })
            expect(parser.isValid()).toBeFalsy()
        })

    })
})