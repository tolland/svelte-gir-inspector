import type {
  GirAlias,
  GirCallback,
  GirClass,
  GirConstant,
  GirEnum,
  GirFunction,
  GirInterface,
  GirKind,
  GirRecord
} from "./main";
import {GirElementKind} from "./base";


export interface GirRepository extends GirKind {
  kind: GirElementKind.Repository;
  fileName: string; // Original name of the GIR file
  includes: Array<{ name: string; version: string }>;
  packages: string[];
  namespaces: GirNamespace[];
  id: string; // e.g., fileName
}

export interface GirNamespace extends GirKind {
  kind: GirElementKind.Namespace;
  name: string;
  version?: string;
  sharedLibrary?: string | string[];
  cIdentifierPrefixes?: string[];
  cSymbolPrefixes?: string[];
  classes: GirClass[];
  interfaces: GirInterface[];
  records: GirRecord[];
  enums: GirEnum[];
  aliases: GirAlias[];
  constants: GirConstant[];
  functions: GirFunction[];
  callbacks: GirCallback[];
  // Other elements like unions, bitfields can be added
  id: string; // e.g., namespaceName
}
