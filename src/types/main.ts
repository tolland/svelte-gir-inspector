// src/types/main.ts
import {GirElementKind} from "./base";

export interface GirKind {
  kind: GirElementKind;
}

export interface GirBaseElement extends GirKind {
  id: string;
  name: string;
  cIdentifier?: string;
  glibName?: string;
  doc?: GirDoc;
  sourcePosition?: GirSourcePosition;
  deprecated?: string | boolean;
  version?: string;
  attributes: GirAttribute[];
}

export interface GirComplexBase extends GirBaseElement {
  cSymbolPrefix?: string;
  cType?: string;
  glibTypeName?: string;
  glibGetType?: string;
  parent?: string;
  functions: GirFunction[];
  methods: GirMethod[];
  properties: GirProperty[];
  signals: GirSignal[];
  callbacks: GirCallback[];
  constants: GirConstant[];
}

export interface GirInterface extends GirComplexBase {
  kind: GirElementKind.Interface;
  prerequisites?: string[];
}

/**
 *
 * GirClass
 *
 * Extends GirInterface as they share many children
 * Includes functions, methods, properties, signals, callbacks, constants from GirInterface
 *
 */
export interface GirClass extends GirComplexBase {
  kind: GirElementKind.Class;
  abstract?: boolean;
  fundamental?: boolean;
  typeStruct?: string;
  constructors: GirConstructor[];
  fields: GirField[];
}

/**
 * Records are similar to classes but can be simpler
 */
export interface GirRecord extends GirComplexBase {
  kind: GirElementKind.Record;
  // Record-specific attributes
  disguised?: boolean;
  opaque?: boolean;
  pointer?: boolean;
  foreign?: boolean;
  gtypeStructFor?: string;
  copyFunction?: string;
  freeFunction?: string;
  // Records have fields like classes
  fields: GirField[];
  // But no constructors (unlike classes)
}



export interface GirDoc {
  text: string;
  filename?: string;
  line?: string;
}

export interface GirAttribute {
  name: string;
  value: string;
}

export interface GirSourcePosition {
  filename?: string;
  line?: string;
}

export interface GirParameter {
  name: string;
  type?: string;
  cType?: string;
  doc?: GirDoc;
  transferOwnership?: string;
  nullable?: boolean;
  allowNone?: boolean;
  direction?: string;
  callerAllocates?: boolean;
}

export interface GirReturnValue {
  type?: string;
  cType?: string;
  doc?: GirDoc;
  transferOwnership?: string;
  nullable?: boolean;
}

/**
 * GirCallable
 *
 * Represents callable elements like functions, methods, constructors,
 * and callbacks.
 */
export interface GirCallable extends GirBaseElement {
  parameters: GirParameter[];
  returnValue?: GirReturnValue;
  throws?: boolean;
}

export interface GirFunction extends GirCallable {
  kind: GirElementKind.Function;
}

export interface GirConstructor extends GirCallable {
  kind: GirElementKind.Constructor;
}

export interface GirMethod extends GirCallable {
  kind: GirElementKind.Method;
}

export interface GirCallback extends GirCallable {
  kind: GirElementKind.Callback;
}

export interface GirProperty extends GirBaseElement {
  kind: GirElementKind.Property;
  type?: string;
  cType?: string;
  transferOwnership?: string;
  writable?: boolean;
  readable?: boolean;
  construct?: boolean;
  constructOnly?: boolean;
}

export interface GirField extends GirBaseElement {
  kind: GirElementKind.Field;
  type?: string;
  cType?: string;
  readable?: boolean;
  writable?: boolean;
  private?: boolean;
  bits?: string;
}

export interface GirSignal extends GirBaseElement {
  kind: GirElementKind.Signal;
  when?: string;
  detailed?: boolean;
  action?: boolean;
  noHooks?: boolean;
  noRecurse?: boolean;
  parameters: GirParameter[];
  returnValue?: GirReturnValue;
}

export interface GirMember extends GirKind {
  kind: GirElementKind.Member;
  name: string;
  value: string;
  cIdentifier?: string;
  glibNick?: string;
  doc?: GirDoc;
  // It's not a GirBaseElement, so it won't have 'id', 'attributes' etc. unless added.
  // For search results, we might need a common structure or handle it.
  // For now, keeping as is. If used in GirAnyElement, ensure
  // properties are checked.
}


export interface GirEnum extends GirBaseElement {
  kind: GirElementKind.Enum;
  cType?: string;
  glibTypeName?: string;
  glibGetType?: string;
  members: GirMember[];
  errorDomain?: string;
}

export interface GirAlias extends GirBaseElement {
  kind: GirElementKind.Alias;
  type?: string;
  cType?: string;
}

export interface GirConstant extends GirBaseElement {
  kind: GirElementKind.Constant;
  type?: string;
  cType?: string;
  value: string;
}

