export const jsonGrammar = {
    "startType": "ElementRepository",
    "refs": {
        "XMLText": {
            "type": "text"
        },
        "ElementRepository": {
            "type": "element",
            "name": "repository",
            "attributes": {
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier-prefixes": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:symbol-prefixes": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementCInclude"
                },
                {
                    "ref": "ElementDocFormat"
                },
                {
                    "ref": "ElementInclude"
                },
                {
                    "ref": "ElementNamespace"
                },
                {
                    "ref": "ElementPackage"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementPackage": {
            "type": "element",
            "name": "package",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementNamespace": {
            "type": "element",
            "name": "namespace",
            "attributes": {
                "name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier-prefixes": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:symbol-prefixes": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:prefix": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shared-library": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAlias"
                },
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementBitField"
                },
                {
                    "ref": "ElementBoxed"
                },
                {
                    "ref": "ElementCallback"
                },
                {
                    "ref": "ElementClass"
                },
                {
                    "ref": "ElementConstant"
                },
                {
                    "ref": "ElementDocSection"
                },
                {
                    "ref": "ElementEnum"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementFunctionMacro"
                },
                {
                    "ref": "ElementInterface"
                },
                {
                    "ref": "ElementRecord"
                },
                {
                    "ref": "ElementUnion"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementUnion": {
            "type": "element",
            "name": "union",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:symbol-prefix": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "copy-function": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "free-function": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementConstructor"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementField"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementMethod"
                },
                {
                    "ref": "ElementMethodInline"
                },
                {
                    "ref": "ElementRecord"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementSourcePosition": {
            "type": "element",
            "name": "source-position",
            "attributes": {
                "filename": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "line": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "column": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementRecord": {
            "type": "element",
            "name": "record",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "disguised": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "opaque": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "pointer": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "glib:type-name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:symbol-prefix": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "foreign": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "glib:is-gtype-struct-for": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "copy-function": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "free-function": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementConstructor"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementField"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementMethod"
                },
                {
                    "ref": "ElementMethodInline"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementUnion"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementMethodInline": {
            "type": "element",
            "name": "method-inline",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadowed-by": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadows": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "moved-to": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:async-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:sync-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:finish-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementDocVersion": {
            "type": "element",
            "name": "doc-version",
            "attributes": {
                "xml:space": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                },
                "xml:whitespace": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": true
        },
        "ElementDocStability": {
            "type": "element",
            "name": "doc-stability",
            "attributes": {
                "xml:space": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                },
                "xml:whitespace": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": true
        },
        "ElementDocDeprecated": {
            "type": "element",
            "name": "doc-deprecated",
            "attributes": {
                "xml:space": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                },
                "xml:whitespace": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": true
        },
        "ElementDoc": {
            "type": "element",
            "name": "doc",
            "attributes": {
                "xml:space": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                },
                "xml:whitespace": {
                    "optional": true,
                    "type": [
                        "\"preserve\""
                    ]
                },
                "filename": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "line": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "column": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": true
        },
        "ElementCallablereturn": {
            "type": "element",
            "name": "return-value",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "nullable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "closure": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "scope": {
                    "optional": true,
                    "type": [
                        "\"notified\"",
                        "\"async\"",
                        "\"call\"",
                        "\"forever\""
                    ]
                },
                "destroy": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "skip": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "allow-none": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "transfer-ownership": {
                    "optional": true,
                    "type": [
                        "\"none\"",
                        "\"container\"",
                        "\"full\""
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementType": {
            "type": "element",
            "name": "type",
            "attributes": {
                "name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementArrayType": {
            "type": "element",
            "name": "array",
            "attributes": {
                "name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "zero-terminated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "fixed-size": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "length": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementAnnotation": {
            "type": "element",
            "name": "attribute",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "value": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementCallableparams": {
            "type": "element",
            "name": "parameters",
            "attributes": {},
            "children": [
                {
                    "ref": "ElementInstanceParameter"
                },
                {
                    "ref": "ElementParameter"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementParameter": {
            "type": "element",
            "name": "parameter",
            "attributes": {
                "name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "nullable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "allow-none": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "closure": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "destroy": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "scope": {
                    "optional": true,
                    "type": [
                        "\"notified\"",
                        "\"async\"",
                        "\"call\"",
                        "\"forever\""
                    ]
                },
                "direction": {
                    "optional": true,
                    "type": [
                        "\"out\"",
                        "\"in\"",
                        "\"inout\""
                    ]
                },
                "caller-allocates": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "optional": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "skip": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "transfer-ownership": {
                    "optional": true,
                    "type": [
                        "\"none\"",
                        "\"container\"",
                        "\"full\""
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                },
                {
                    "ref": "ElementVarArgs"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementVarArgs": {
            "type": "element",
            "name": "varargs",
            "attributes": {},
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementInstanceParameter": {
            "type": "element",
            "name": "instance-parameter",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "nullable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "allow-none": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "direction": {
                    "optional": true,
                    "type": [
                        "\"out\"",
                        "\"in\"",
                        "\"inout\""
                    ]
                },
                "caller-allocates": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "transfer-ownership": {
                    "optional": true,
                    "type": [
                        "\"none\"",
                        "\"container\"",
                        "\"full\""
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementMethod": {
            "type": "element",
            "name": "method",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadowed-by": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadows": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "moved-to": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:async-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:sync-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:finish-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:set-property": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-property": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementFunctionInline": {
            "type": "element",
            "name": "function-inline",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadowed-by": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadows": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "moved-to": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:async-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:sync-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:finish-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementFunction": {
            "type": "element",
            "name": "function",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadowed-by": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadows": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "moved-to": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:async-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:sync-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:finish-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementField": {
            "type": "element",
            "name": "field",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "writable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "readable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "private": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "bits": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementCallback"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementCallback": {
            "type": "element",
            "name": "callback",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementConstructor": {
            "type": "element",
            "name": "constructor",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadowed-by": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadows": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "moved-to": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:async-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:sync-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:finish-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementInterface": {
            "type": "element",
            "name": "interface",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-type": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:symbol-prefix": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-struct": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallback"
                },
                {
                    "ref": "ElementConstant"
                },
                {
                    "ref": "ElementConstructor"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementField"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementImplements"
                },
                {
                    "ref": "ElementMethod"
                },
                {
                    "ref": "ElementMethodInline"
                },
                {
                    "ref": "ElementPrerequisite"
                },
                {
                    "ref": "ElementProperty"
                },
                {
                    "ref": "ElementSignal"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementVirtualMethod"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementVirtualMethod": {
            "type": "element",
            "name": "virtual-method",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadowed-by": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadows": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "moved-to": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:async-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:sync-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:finish-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "invoker": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementSignal": {
            "type": "element",
            "name": "glib:signal",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "detailed": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "when": {
                    "optional": true,
                    "type": [
                        "\"first\"",
                        "\"last\"",
                        "\"cleanup\""
                    ]
                },
                "action": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "no-hooks": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "no-recurse": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "emitter": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementCallablereturn"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementProperty": {
            "type": "element",
            "name": "property",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "writable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "readable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "construct": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "construct-only": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "setter": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "getter": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "default-value": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "transfer-ownership": {
                    "optional": true,
                    "type": [
                        "\"none\"",
                        "\"container\"",
                        "\"full\""
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementPrerequisite": {
            "type": "element",
            "name": "prerequisite",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementImplements": {
            "type": "element",
            "name": "implements",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementConstant": {
            "type": "element",
            "name": "constant",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "value": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementFunctionMacro": {
            "type": "element",
            "name": "function-macro",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadowed-by": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "shadows": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "throws": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "moved-to": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:async-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:sync-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:finish-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallableparams"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementEnum": {
            "type": "element",
            "name": "enumeration",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:error-domain": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementMember"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementMember": {
            "type": "element",
            "name": "member",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "value": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:identifier": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "glib:nick": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementDocSection": {
            "type": "element",
            "name": "docsection",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementClass": {
            "type": "element",
            "name": "class",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-type": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "parent": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-struct": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:ref-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:unref-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:set-value-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-value-func": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "c:symbol-prefix": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "abstract": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "glib:fundamental": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "final": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementCallback"
                },
                {
                    "ref": "ElementConstant"
                },
                {
                    "ref": "ElementConstructor"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementField"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementImplements"
                },
                {
                    "ref": "ElementMethod"
                },
                {
                    "ref": "ElementMethodInline"
                },
                {
                    "ref": "ElementProperty"
                },
                {
                    "ref": "ElementRecord"
                },
                {
                    "ref": "ElementSignal"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementUnion"
                },
                {
                    "ref": "ElementVirtualMethod"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementBoxed": {
            "type": "element",
            "name": "glib:boxed",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:symbol-prefix": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementBitField": {
            "type": "element",
            "name": "bitfield",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "glib:type-name": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "glib:get-type": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementFunction"
                },
                {
                    "ref": "ElementFunctionInline"
                },
                {
                    "ref": "ElementMember"
                },
                {
                    "ref": "ElementSourcePosition"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementAlias": {
            "type": "element",
            "name": "alias",
            "attributes": {
                "introspectable": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated": {
                    "optional": true,
                    "type": [
                        "\"0\"",
                        "\"1\""
                    ]
                },
                "deprecated-version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "stability": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                },
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "c:type": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [
                {
                    "ref": "ElementAnnotation"
                },
                {
                    "ref": "ElementArrayType"
                },
                {
                    "ref": "ElementDoc"
                },
                {
                    "ref": "ElementDocDeprecated"
                },
                {
                    "ref": "ElementDocStability"
                },
                {
                    "ref": "ElementDocVersion"
                },
                {
                    "ref": "ElementSourcePosition"
                },
                {
                    "ref": "ElementType"
                }
            ],
            "textChildrenAllowed": false
        },
        "ElementInclude": {
            "type": "element",
            "name": "include",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                },
                "version": {
                    "optional": true,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementDocFormat": {
            "type": "element",
            "name": "doc:format",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        },
        "ElementCInclude": {
            "type": "element",
            "name": "c:include",
            "attributes": {
                "name": {
                    "optional": false,
                    "type": [
                        "string"
                    ]
                }
            },
            "children": [],
            "textChildrenAllowed": false
        }
    }
}