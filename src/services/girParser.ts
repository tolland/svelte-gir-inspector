import type {
  GirAlias,
  GirAnyElement,
  GirAttribute,
  GirCallback,
  GirClass,
  GirConstant,
  GirConstructor,
  GirDoc,
  GirEnum,
  GirField,
  GirFunction,
  GirInterface,
  GirMember,
  GirMethod,
  GirNamespace,
  GirParameter,
  GirProperty,
  GirRecord,
  GirRepository,
  GirReturnValue,
  GirSignal,
  GirSourcePosition
} from '../types';
import {GirElementKind,} from '../types';

const CORE_NS = "http://www.gtk.org/introspection/core/1.0";
const C_NS = "http://www.gtk.org/introspection/c/1.0";
const GLIB_NS = "http://www.gtk.org/introspection/glib/1.0";

function getAttr(element: Element, attributeName: string, ns?: string): string | undefined {
  return ns ? element.getAttributeNS(ns, attributeName) ?? undefined : element.getAttribute(attributeName) ?? undefined;
}

function getAllAttributes(element: Element): GirAttribute[] {
  return Array.from(element.attributes).map(attr => ({name: attr.name, value: attr.value}));
}

function getDoc(element: Element): GirDoc | undefined {
  const docEl = Array.from(element.children).find(
    child => child.localName === 'doc' && child.namespaceURI === CORE_NS
  );
  if (docEl) {
    return {
      text: docEl.textContent || '',
      filename: getAttr(docEl, 'filename'),
      line: getAttr(docEl, 'line'),
    };
  }
  return undefined;
}

function getSourcePosition(element: Element): GirSourcePosition | undefined {
  const spEl = Array.from(element.children).find(
    child => child.localName === 'source-position' && child.namespaceURI === CORE_NS
  );
  if (spEl) {
    return {
      filename: getAttr(spEl, 'filename'),
      line: getAttr(spEl, 'line'),
    };
  }
  return undefined;
}

function parseParameters(element: Element, _pathPrefix: string): GirParameter[] {
  const params: GirParameter[] = [];
  const paramContainer = Array.from(element.children).find(
    child => child.localName === 'parameters' && child.namespaceURI === CORE_NS
  );
  if (!paramContainer) return params;

  Array.from(paramContainer.children).filter(
    child => (child.localName === 'parameter' || child.localName === 'instance-parameter') && child.namespaceURI === CORE_NS
  ).forEach(pEl => {
    const typeEl = Array.from(pEl.children).find(
      child => (child.localName === 'type' || child.localName === 'varargs' || child.localName === 'array') && child.namespaceURI === CORE_NS
    );
    params.push({
      name: getAttr(pEl, 'name')!,
      doc: getDoc(pEl),
      transferOwnership: getAttr(pEl, 'transfer-ownership'),
      nullable: getAttr(pEl, 'nullable') === '1',
      allowNone: getAttr(pEl, 'allow-none') === '1',
      direction: getAttr(pEl, 'direction'),
      callerAllocates: getAttr(pEl, 'caller-allocates') === '1',
      type: typeEl ? getAttr(typeEl, 'name') : undefined,
      cType: typeEl ? getAttr(typeEl, 'type', C_NS) : undefined,
    });
  });
  return params;
}

function parseReturnValue(element: Element): GirReturnValue | undefined {
  const rvEl = Array.from(element.children).find(
    child => child.localName === 'return-value' && child.namespaceURI === CORE_NS
  );
  if (!rvEl) return undefined;

  const typeEl = Array.from(rvEl.children).find(
    child => (child.localName === 'type' || child.localName === 'array') && child.namespaceURI === CORE_NS
  );
  return {
    doc: getDoc(rvEl),
    transferOwnership: getAttr(rvEl, 'transfer-ownership'),
    nullable: getAttr(rvEl, 'nullable') === '1',
    type: typeEl ? getAttr(typeEl, 'name') : undefined,
    cType: typeEl ? getAttr(typeEl, 'type', C_NS) : undefined,
  };
}

function parseBaseElement(element: Element, _pathPrefix: string, _type: string): Omit<GirAnyElement, 'id' | "kind"> {
  const name = getAttr(element, 'name')!;
  const docDeprecatedEl = Array.from(element.children).find(
    child => child.localName === 'doc-deprecated' && child.namespaceURI === CORE_NS
  );
  return {
    name: name,
    cIdentifier: getAttr(element, 'identifier', C_NS),
    glibName: getAttr(element, 'name', GLIB_NS) || getAttr(element, 'nick', GLIB_NS),
    doc: getDoc(element),
    sourcePosition: getSourcePosition(element),
    deprecated: getAttr(element, 'deprecated') || (docDeprecatedEl ? docDeprecatedEl.textContent || true : false), // Use textContent if available
    version: getAttr(element, 'version'),
    attributes: getAllAttributes(element),
  } as Omit<GirAnyElement, 'id' | "kind">; // Cast needed as it's a generic parser
}


function parseCallable(element: Element, pathPrefix: string, type: string): GirFunction | GirConstructor | GirMethod | GirCallback {
  const base = parseBaseElement(element, pathPrefix, type) as Omit<GirFunction, 'id' | 'parameters' | 'returnValue' | 'throws' | 'kind'>;
  const name = base.name || (type === 'constructor' ? 'new' : 'unknown_callable'); // Ensure name is always a string
  return {
    ...base,
    id: `${pathPrefix}.${name}`,
    parameters: parseParameters(element, `${pathPrefix}.${name}`),
    returnValue: parseReturnValue(element),
    throws: getAttr(element, 'throws') === '1',
    kind: GirElementKind[type as keyof typeof GirElementKind],
  } as GirFunction;
}


function parseProperty(element: Element, pathPrefix: string): GirProperty {
  const base = parseBaseElement(element, pathPrefix, 'Property') as Omit<GirProperty, 'id' | 'type' | 'cType' | 'transferOwnership' | 'writable' | 'readable' | 'construct' | 'constructOnly'>;
  const name = base.name!;
  const typeEl = Array.from(element.children).find(
    child => (child.localName === 'type' || child.localName === 'array') && child.namespaceURI === CORE_NS
  );
  return {
    ...base,
    id: `${pathPrefix}.${name}`,
    type: typeEl ? getAttr(typeEl, 'name') : undefined,
    cType: typeEl ? getAttr(typeEl, 'type', C_NS) : undefined,
    transferOwnership: getAttr(element, 'transfer-ownership'),
    writable: getAttr(element, 'writable') === '1',
    readable: getAttr(element, 'readable') !== '0',
    construct: getAttr(element, 'construct') === '1',
    constructOnly: getAttr(element, 'construct-only') === '1',
  };
}

function parseField(element: Element, pathPrefix: string): GirField {
  const base = parseBaseElement(element, pathPrefix, 'Field') as Omit<GirField, 'id' | 'type' | 'cType' | 'readable' | 'writable' | 'private' | 'bits'>;
  const name = base.name!;

  let typeEl: Element | undefined = undefined; // Ensure typeEl can be undefined
  const childrenOfField = Array.from(element.children);

  const directType = childrenOfField.find(c => c.localName === 'type' && c.namespaceURI === CORE_NS);
  if (directType) {
    typeEl = directType;
  } else {
    const directArray = childrenOfField.find(c => c.localName === 'array' && c.namespaceURI === CORE_NS);
    if (directArray) {
      typeEl = directArray; // This could be an array of types, parser might need to handle <type> inside <array>
    } else {
      const callbackEl = childrenOfField.find(c => c.localName === 'callback' && c.namespaceURI === CORE_NS);
      if (callbackEl) {
        // A field that is a callback will have its type defined inside the <callback> element
        typeEl = Array.from(callbackEl.children).find(c => c.localName === 'type' && c.namespaceURI === CORE_NS) || undefined;
      }
    }
  }

  return {
    ...base,
    id: `${pathPrefix}.${name}`,
    type: typeEl ? getAttr(typeEl, 'name') : (getAttr(element, 'name', C_NS) === 'gpointer' ? 'gpointer' : undefined), // Fallback for things like gpointer in C
    cType: typeEl ? getAttr(typeEl, 'type', C_NS) : getAttr(element, 'type', C_NS),
    readable: getAttr(element, 'readable') !== '0',
    writable: getAttr(element, 'writable') === '1',
    private: getAttr(element, 'private') === '1',
    bits: getAttr(element, 'bits'),
  };
}

function parseSignal(element: Element, pathPrefix: string): GirSignal {
  const base = parseBaseElement(element, pathPrefix, 'Signal') as Omit<GirSignal, 'id' | 'when' | 'detailed' | 'action' | 'noHooks' | 'noRecurse' | 'parameters' | 'returnValue'>;
  const name = base.name!;
  return {
    ...base,
    id: `${pathPrefix}.${name}`,
    when: getAttr(element, 'when'),
    detailed: getAttr(element, 'detailed') === '1',
    action: getAttr(element, 'action') === '1',
    noHooks: getAttr(element, 'no-hooks') === '1',
    noRecurse: getAttr(element, 'no-recurse') === '1',
    parameters: parseParameters(element, `${pathPrefix}.${name}`),
    returnValue: parseReturnValue(element),
  };
}

function parseMembers(element: Element, _pathPrefix: string): GirMember[] {
  const members: GirMember[] = [];
  Array.from(element.children).filter(
    child => child.localName === 'member' && child.namespaceURI === CORE_NS
  ).forEach(mEl => {
    const name = getAttr(mEl, 'name')!;
    members.push({
      name,
      value: getAttr(mEl, 'value')!,
      cIdentifier: getAttr(mEl, 'identifier', C_NS),
      glibNick: getAttr(mEl, 'nick', GLIB_NS),
      doc: getDoc(mEl),
      kind: GirElementKind.Member,
    });
  });
  return members;
}

function parseEnum(element: Element, pathPrefix: string): GirEnum {
  const base = parseBaseElement(element, pathPrefix, 'Enum') as Omit<GirEnum, 'id' | 'cType' | 'glibTypeName' | 'glibGetType' | 'members' | 'errorDomain'>;
  const name = base.name!;
  return {
    ...base,
    id: `${pathPrefix}.${name}`,
    cType: getAttr(element, 'type', C_NS),
    glibTypeName: getAttr(element, 'type-name', GLIB_NS),
    glibGetType: getAttr(element, 'get-type', GLIB_NS),
    members: parseMembers(element, `${pathPrefix}.${name}`),
    errorDomain: getAttr(element, 'error-domain', GLIB_NS),
  };
}

function parseAlias(element: Element, pathPrefix: string): GirAlias {
  const base = parseBaseElement(element, pathPrefix, 'Alias') as Omit<GirAlias, 'id' | 'type' | 'cType'>;
  const name = base.name!;
  const typeEl = Array.from(element.children).find(
    child => (child.localName === 'type' || child.localName === 'array') && child.namespaceURI === CORE_NS
  );
  return {
    ...base,
    id: `${pathPrefix}.${name}`,
    type: typeEl ? getAttr(typeEl, 'name') : undefined,
    cType: typeEl ? getAttr(typeEl, 'type', C_NS) : undefined,
  };
}

function parseConstant(element: Element, pathPrefix: string): GirConstant {
  const base = parseBaseElement(element, pathPrefix, 'Constant') as Omit<GirConstant, 'id' | 'type' | 'cType' | 'value'>;
  const name = base.name!;
  const typeEl = Array.from(element.children).find(
    child => (child.localName === 'type' || child.localName === 'array') && child.namespaceURI === CORE_NS
  );
  return {
    ...base,
    id: `${pathPrefix}.${name}`,
    type: typeEl ? getAttr(typeEl, 'name') : undefined,
    cType: typeEl ? getAttr(typeEl, 'type', C_NS) : undefined,
    value: getAttr(element, 'value')!,
  };
}

function parseComplexType<T extends GirClass | GirInterface | GirRecord>(element: Element, pathPrefix: string, type: 'Class' | 'Interface' | 'Record'): T {
  const base = parseBaseElement(element, pathPrefix, type) as Omit<T, 'id' | 'cSymbolPrefix' | 'cType' | 'glibTypeName' | 'glibGetType' | 'parent' | 'functions' | 'methods' | 'properties' | 'signals' | 'callbacks' | 'constants' | 'constructors' | 'fields' | 'prerequisites' | 'kind'>;
  const name = base.name!;
  const currentPath = `${pathPrefix}.${name}`;
  const children = Array.from(element.children);

  const constructors: GirConstructor[] = [];
  children.filter(el => el.localName === 'constructor' && el.namespaceURI === CORE_NS).forEach(el => constructors.push(parseCallable(el, currentPath, 'Constructor') as GirConstructor));

  const methods: GirMethod[] = [];
  children.filter(el => el.localName === 'method' && el.namespaceURI === CORE_NS).forEach(el => methods.push(parseCallable(el, currentPath, 'Method') as GirMethod));

  const functions: GirFunction[] = [];
  children.filter(el => el.localName === 'function' && el.namespaceURI === CORE_NS).forEach(el => functions.push(parseCallable(el, currentPath, 'Function') as GirFunction));

  const properties: GirProperty[] = [];
  children.filter(el => el.localName === 'property' && el.namespaceURI === CORE_NS).forEach(el => properties.push(parseProperty(el, currentPath)));

  const signals: GirSignal[] = [];
  children.filter(el => el.localName === 'signal' && (el.namespaceURI === GLIB_NS || el.namespaceURI === CORE_NS)).forEach(el => signals.push(parseSignal(el, currentPath)));

  const fields: GirField[] = [];
  if (type === 'Class' || type === 'Record') {
    children.filter(el => el.localName === 'field' && el.namespaceURI === CORE_NS).forEach(el => fields.push(parseField(el, currentPath)));
  }

  const callbacks: GirCallback[] = [];
  children.filter(el => el.localName === 'callback' && el.namespaceURI === CORE_NS).forEach(el => callbacks.push(parseCallable(el, currentPath, 'Callback') as GirCallback));

  const constants: GirConstant[] = [];
  children.filter(el => el.localName === 'constant' && el.namespaceURI === CORE_NS).forEach(el => constants.push(parseConstant(el, currentPath)));

  const prerequisites: string[] = [];
  children.filter(prereqEl => prereqEl.localName === 'prerequisite' && prereqEl.namespaceURI === CORE_NS).forEach(prereqEl => {
    const prereqName = getAttr(prereqEl, 'name');
    if (prereqName) prerequisites.push(prereqName);
  });
  // Handle implements for interfaces and classes
  const implementsInterfaces: string[] = [];
  children.filter(implEl => implEl.localName === 'implements' && implEl.namespaceURI === CORE_NS).forEach(implEl => {
    const implName = getAttr(implEl, 'name');
    if (implName) implementsInterfaces.push(implName);
  });


  const complexData: any = {
    ...base,
    id: currentPath,
    cSymbolPrefix: getAttr(element, 'symbol-prefix', C_NS),
    cType: getAttr(element, 'type', C_NS),
    glibTypeName: getAttr(element, 'type-name', GLIB_NS),
    glibGetType: getAttr(element, 'get-type', GLIB_NS),
    parent: getAttr(element, 'parent'),
    functions,
    methods,
    properties,
    signals,
    callbacks,
    constants,
    prerequisites: prerequisites.length > 0 ? prerequisites : undefined,
    implements: implementsInterfaces.length > 0 ? implementsInterfaces : undefined, // Added implements here
  };

  if (type === 'Class' || type === 'Record') {
    complexData.constructors = constructors;
    complexData.fields = fields;
    complexData.abstract = getAttr(element, 'abstract') === '1';
    complexData.fundamental = getAttr(element, 'fundamental', GLIB_NS) === '1';
    complexData.typeStruct = getAttr(element, 'type-struct', GLIB_NS);
  }
  if (type === 'Record') {
    complexData.disguised = getAttr(element, 'disguised') === '1';
    complexData.foreign = getAttr(element, 'foreign') === '1';
    complexData.gtypeStructFor = getAttr(element, 'struct-for', GLIB_NS);
  }

  return complexData as T;
}


export function parseGirContent(xmlString: string, fileName: string): GirRepository {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");
  const repoElement = doc.documentElement;

  if (!repoElement || repoElement.localName !== 'repository') {
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
      throw new Error(`Invalid GIR file: XML parsing error. Details: ${errorNode.textContent}`);
    }
    throw new Error('Invalid GIR file: Missing <repository> root element.');
  }

  const repoChildren = Array.from(repoElement.children);

  const includes: Array<{ name: string; version: string }> = [];
  repoChildren.filter(incEl => incEl.localName === 'include' && incEl.namespaceURI === CORE_NS).forEach(incEl => {
    includes.push({name: getAttr(incEl, 'name')!, version: getAttr(incEl, 'version')!});
  });

  const packages: string[] = [];
  repoChildren.filter(pkgEl => pkgEl.localName === 'package' && pkgEl.namespaceURI === CORE_NS).forEach(pkgEl => {
    const name = getAttr(pkgEl, 'name');
    if (name) packages.push(name);
  });

  const namespaces: GirNamespace[] = [];
  repoChildren.filter(nsEl => nsEl.localName === 'namespace' && nsEl.namespaceURI === CORE_NS).forEach(nsEl => {
    const nsName = getAttr(nsEl, 'name')!;
    const nsPath = `${fileName}.${nsName}`; // ID for the namespace itself
    const nsChildren = Array.from(nsEl.children);

    const currentNamespace: GirNamespace = {
      name: nsName,
      id: nsPath,
      version: getAttr(nsEl, 'version'),
      sharedLibrary: getAttr(nsEl, 'shared-library')?.split(','),
      cIdentifierPrefixes: getAttr(nsEl, 'identifier-prefixes', C_NS)?.split(','),
      cSymbolPrefixes: getAttr(nsEl, 'symbol-prefixes', C_NS)?.split(','),
      classes: [], interfaces: [], records: [], enums: [], aliases: [], constants: [], functions: [], callbacks: [],
      kind: GirElementKind.Namespace,
    };

    nsChildren.filter(el => el.localName === 'class' && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.classes.push(parseComplexType(el, nsPath, 'Class')));
    nsChildren.filter(el => el.localName === 'interface' && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.interfaces.push(parseComplexType(el, nsPath, 'Interface')));
    nsChildren.filter(el => el.localName === 'record' && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.records.push(parseComplexType(el, nsPath, 'Record')));
    nsChildren.filter(el => (el.localName === 'enumeration' || el.localName === 'bitfield') && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.enums.push(parseEnum(el, nsPath)));
    nsChildren.filter(el => el.localName === 'alias' && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.aliases.push(parseAlias(el, nsPath)));
    nsChildren.filter(el => el.localName === 'constant' && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.constants.push(parseConstant(el, nsPath)));
    nsChildren.filter(el => el.localName === 'function' && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.functions.push(parseCallable(el, nsPath, 'Function') as GirFunction));
    nsChildren.filter(el => el.localName === 'callback' && el.namespaceURI === CORE_NS).forEach(el => currentNamespace.callbacks.push(parseCallable(el, nsPath, 'Callback') as GirCallback));

    namespaces.push(currentNamespace);
  });

  return {
    fileName,
    id: fileName, // ID for the repository itself
    includes,
    packages,
    namespaces,
    kind: GirElementKind.Repository,
  };
}
