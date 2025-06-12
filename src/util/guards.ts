import type {GirAnyElement, GirClass, GirInterface, GirRecord} from '../types';
import {GirElementKind} from '../types';

export function isComplexElement(item: GirAnyElement): item is GirClass | GirInterface | GirRecord {
  return item.kind === GirElementKind.Class ||
    item.kind === GirElementKind.Interface ||
    item.kind === GirElementKind.Record;
}

export function isGirClass(item: GirAnyElement): item is GirClass {
  return item.kind === GirElementKind.Class;
}

