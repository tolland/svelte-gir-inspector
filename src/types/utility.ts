// src/types/utility.ts
import type {
    GirAlias,
    GirBitfield,
    GirCallback,
    GirClass,
    GirConstant,
    GirConstructor,
    GirEnum,
    GirField,
    GirFunction,
    GirInterface,
    GirMember,
    GirMethod,
    GirProperty,
    GirRecord,
    GirSignal,
    GirUnion,
} from './main'
import type {GirNamespace} from './elements'
import {GirElementKind} from './base'

/**
 * SelectedItem
 *
 * track the item of interest
 */

export interface SelectedItem {
    type: string
    item: GirDisplayableElement
    filePath: string
}

export interface SearchResult extends SelectedItem {}

/*
 * Ensure GirMember is correctly part of GirAnyElement for type safety in search/display
 *
 *  For search and display, we often rely on 'name'. 'id' usually composed.
 * Let's assume for now that if GirMember appears in a list (like search results),
 * its 'name' is sufficient, and a synthetic 'id' or path is constructed for keys.
 */
export type GirAnyElement =
    | GirNamespace
    | GirClass
    | GirInterface
    | GirRecord
    | GirEnum
    | GirAlias
    | GirConstant
    | GirFunction
    | GirConstructor
    | GirMethod
    | GirProperty
    | GirField
    | GirSignal
    | GirBitfield
    | GirCallback
    | GirMember
    | GirUnion

export type GirDisplayableElement =
    | GirClass
    | GirInterface
    | GirRecord
    | GirEnum
    | GirFunction
    | GirMethod
    | GirConstructor
    | GirProperty
    | GirField
    | GirSignal
    | GirBitfield
    | GirCallback
    | GirConstant
    | GirAlias
    | GirUnion

// Simplified complex element detection using kinds
export type GirComplexElement = GirClass | GirInterface | GirRecord | GirUnion

export function isDisplayableElement(element: GirAnyElement): element is GirDisplayableElement {
    switch (element.kind) {
        case GirElementKind.Class:
        case GirElementKind.Interface:
        case GirElementKind.Record:
        case GirElementKind.Enum:
        case GirElementKind.Function:
        case GirElementKind.Method:
        case GirElementKind.Constructor:
        case GirElementKind.Property:
        case GirElementKind.Field:
        case GirElementKind.Signal:
        case GirElementKind.Callback:
        case GirElementKind.Constant:
        case GirElementKind.Alias:
        case GirElementKind.Union:
            return true
        default:
            return false
    }
}

export function isGirClass(item: GirAnyElement): item is GirClass {
    return item.kind === GirElementKind.Class
}

export function isComplexElement(element: GirAnyElement): element is GirComplexElement {
    return (
        element.kind === GirElementKind.Class ||
        element.kind === GirElementKind.Interface ||
        element.kind === GirElementKind.Record ||
        element.kind === GirElementKind.Union
    )
}

// Helper functions for kind-based logic
export function isCallable(
    element: GirAnyElement,
): element is GirFunction | GirMethod | GirConstructor | GirCallback {
    return (
        element.kind === GirElementKind.Function ||
        element.kind === GirElementKind.Method ||
        element.kind === GirElementKind.Constructor ||
        element.kind === GirElementKind.Callback
    )
}

export function hasChildren(element: GirAnyElement): boolean {
    return isComplexElement(element) || element.kind === GirElementKind.Namespace
}
