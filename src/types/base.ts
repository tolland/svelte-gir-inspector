/**
 *
 */
export enum GirElementKind {
  Repository = 'repository',
  Namespace = 'namespace',
  Class = 'class',
  Interface = 'interface',
  Record = 'record',
  Enum = 'enum',
  Alias = 'alias',
  Constant = 'constant',
  Function = 'function',
  Constructor = 'constructor',
  Method = 'method',
  Property = 'property',
  Field = 'field',
  Signal = 'signal',
  Callback = 'callback',
  Member = 'member',
  Bitfield = 'bitfield',
  Union = 'union',
}

export enum GirComplexKind {
  Class = 'class',
  Interface = 'interface',
  Record = 'record',
}
