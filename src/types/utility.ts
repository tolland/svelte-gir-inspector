

import type {
  GirAlias,
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
  GirSignal
} from "./main";
import type {GirNamespace} from "./elements";
import {GirElementKind} from "./base";



/**
* SelectedItem
*
* track the item of interest
*/

export interface SelectedItem {
  type: string; // e.g., "Class", "Function", "Property"
  item: GirAnyElement;
  filePath: string; // Path to the item, e.g. "fileName.namespaceName.className.methodName"
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
  | GirCallback
  | GirMember;

// export type GirComplexElement = GirClass | GirInterface | GirRecord;

export const GirComplexKinds = new Set([
  GirElementKind.Class,
  GirElementKind.Interface,
  GirElementKind.Record
]);

export type GirComplexElement = Extract<GirAnyElement, { kind: GirElementKind.Class | GirElementKind.Interface | GirElementKind.Record }>;

export function isComplexElement(e: GirAnyElement): e is GirComplexElement {
  return GirComplexKinds.has(e.kind);
}

// const componentMap: Record<GirElementKind, typeof SvelteComponent> = {
//   [GirElementKind.Class]: ClassRenderer,
//   [GirElementKind.Interface]: InterfaceRenderer,
//   [GirElementKind.Record]: RecordRenderer,
//   [GirElementKind.Enum]: EnumRenderer,
//   // ...
// };
