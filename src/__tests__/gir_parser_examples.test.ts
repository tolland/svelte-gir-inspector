// src/services/girParser.test.ts
import { parseGirContent } from '../services/girParser.ts'
import { readFileSync } from 'fs'
import { join } from 'path'

interface ExpectedCounts {
    fileName: string
    namespaces: number
    classes: number
    interfaces: number
    records: number
    enums: number
    functions: number
    constants: number
    callbacks: number
    aliases: number
    bitfields: number
    unions: number
}

const testCases: ExpectedCounts[] = [
    {
        fileName: 'Babl-0.1.gir',
        namespaces: 1,
        classes: 0,
        interfaces: 0,
        records: 0,
        enums: 2,
        functions: 60,
        constants: 5,
        callbacks: 3,
        aliases: 0,
        bitfields: 1,
        unions: 1,
    },
    {
        fileName: 'Gegl-0.4.gir',
        namespaces: 1,
        classes: 27,
        interfaces: 1,
        records: 39,
        enums: 12,
        functions: 60,
        constants: 61,
        callbacks: 9,
        aliases: 0,
        bitfields: 4,
        unions: 0,
    },
    // {
    //   fileName: 'Gimp-3.0.gir',
    //   namespaces: 1,
    //   classes: 75,
    //   interfaces: 8,
    //   records: 45,
    //   enums: 25,
    //   functions: 150,
    //   constants: 20,
    //   callbacks: 15,
    //   aliases: 10
    // },
    // {
    //   fileName: 'GimpUi-3.0.gir',
    //   namespaces: 1,
    //   classes: 24,
    //   interfaces: 3,
    //   records: 12,
    //   enums: 10,
    //   functions: 40,
    //   constants: 5,
    //   callbacks: 11,
    //   aliases: 2,
    //   structs: 4
    // },
    // {
    //   fileName: 'Gtk-3.0.gir',
    //   namespaces: 1,
    //   classes: 180,
    //   interfaces: 25,
    //   records: 60,
    //   enums: 40,
    //   functions: 200,
    //   constants: 30,
    //   callbacks: 20,
    //   aliases: 15
    // }
]

describe('GIR Parser', () => {
    testCases.forEach((expected) => {
        describe(expected.fileName, () => {
            let result: any

            beforeAll(() => {
                const filePath = join('static/gir', expected.fileName)
                const content = readFileSync(filePath, 'utf-8')
                result = parseGirContent(content, expected.fileName)
            })

            test('should parse correct number of namespaces', () => {
                expect(result.namespaces).toHaveLength(expected.namespaces)
            })

            test('should parse correct number of classes', () => {
                const totalClasses = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.classes.length,
                    0,
                )
                expect(totalClasses).toBe(expected.classes)
            })

            test('should parse correct number of interfaces', () => {
                const totalInterfaces = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.interfaces.length,
                    0,
                )
                expect(totalInterfaces).toBe(expected.interfaces)
            })

            test('should parse correct number of records', () => {
                const totalRecords = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.records.length,
                    0,
                )
                expect(totalRecords).toBe(expected.records)
            })

            test('should parse correct number of enums', () => {
                const totalEnums = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.enums.length,
                    0,
                )
                expect(totalEnums).toBe(expected.enums)
            })

            test('should parse correct number of functions', () => {
                const totalFunctions = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.functions.length,
                    0,
                )
                expect(totalFunctions).toBe(expected.functions)
            })

            test('should parse correct number of constants', () => {
                const totalConstants = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.constants.length,
                    0,
                )
                expect(totalConstants).toBe(expected.constants)
            })

            test('should parse correct number of callbacks', () => {
                const totalCallbacks = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.callbacks.length,
                    0,
                )
                expect(totalCallbacks).toBe(expected.callbacks)
            })

            test('should parse correct number of aliases', () => {
                const totalAliases = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.aliases.length,
                    0,
                )
                expect(totalAliases).toBe(expected.aliases)
            })

            test('should parse correct number of bitfields', () => {
                const totalFields = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.bitfields.length,
                    0,
                )
                expect(totalFields).toBe(expected.bitfields)
            })

            test('should parse correct number of unions', () => {
                const totalUnions = result.namespaces.reduce(
                    (sum: number, ns: any) => sum + ns.unions.length,
                    0,
                )
                expect(totalUnions).toBe(expected.unions)
            })
        })
    })
})
