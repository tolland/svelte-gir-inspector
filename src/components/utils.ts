// src/components/utils.ts
import { GirElementKind, type SearchResult } from "../types";
import ComplexTypeItems from "./elements/ComplexTypeItems.svelte";
import EnumElement from "./elements/EnumElement.svelte";
import NotImplementedElement from "./elements/NotImplementedElement.svelte";

export function getComponentForKind(kind: GirElementKind): string {
  switch (kind) {
    case GirElementKind.Class:
    case GirElementKind.Interface:
    case GirElementKind.Record:
      return "ComplexTypeRenderer";
    case GirElementKind.Enum:
      return "EnumRenderer";
    case GirElementKind.Function:
    case GirElementKind.Method:
    case GirElementKind.Constructor:
    case GirElementKind.Callback:
      return "CallableRenderer";
    default:
      return "SimpleRenderer";
  }
}

export const componentMap = {
  [GirElementKind.Class]: ComplexTypeItems,
  [GirElementKind.Interface]: ComplexTypeItems,
  [GirElementKind.Record]: ComplexTypeItems,
  [GirElementKind.Enum]: EnumElement,
  [GirElementKind.Function]: NotImplementedElement,
  [GirElementKind.Method]: NotImplementedElement,
  [GirElementKind.Constructor]: NotImplementedElement,
  [GirElementKind.Callback]: NotImplementedElement,
  [GirElementKind.Property]: NotImplementedElement,
  [GirElementKind.Field]: NotImplementedElement,
  [GirElementKind.Signal]: NotImplementedElement,
  [GirElementKind.Constant]: NotImplementedElement,
  [GirElementKind.Alias]: NotImplementedElement,
  [GirElementKind.Member]: NotImplementedElement,
  [GirElementKind.Namespace]: NotImplementedElement,
  [GirElementKind.Repository]: NotImplementedElement,
};

const results: SearchResult[] = [];

const searchInElement = (
  searchTerm: string,
  element: any,
  type: string,
  currentPath: string,
) => {
  if (element.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    results.push({ item: element, type, filePath: currentPath });
  }
};

const searchRecursively = (
  searchTerm: string,
  element: any,
  type: string,
  currentPath: string,
) => {
  searchInElement(searchTerm, element, type, currentPath);
  if ("methods" in element && Array.isArray((element as any).methods)) {
    (element as any).methods.forEach((m: any) =>
      searchInElement(searchTerm, m, "Method", `${currentPath}.${m.name}`),
    );
  }
  if ("properties" in element && Array.isArray((element as any).properties)) {
    (element as any).properties.forEach((p: any) =>
      searchInElement(searchTerm, p, "Property", `${currentPath}.${p.name}`),
    );
  }
  if ("signals" in element && Array.isArray((element as any).signals)) {
    (element as any).signals.forEach((s: any) =>
      searchInElement(searchTerm, s, "Signal", `${currentPath}.${s.name}`),
    );
  }
  if ("fields" in element && Array.isArray((element as any).fields)) {
    (element as any).fields.forEach((f: any) =>
      searchInElement(searchTerm, f, "Field", `${currentPath}.${f.name}`),
    );
  }
  if ("functions" in element && Array.isArray((element as any).functions)) {
    (element as any).functions.forEach((f: any) =>
      searchInElement(searchTerm, f, "Function", `${currentPath}.${f.name}`),
    );
  }
  if ("callbacks" in element && Array.isArray((element as any).callbacks)) {
    (element as any).callbacks.forEach((cb: any) =>
      searchInElement(searchTerm, cb, "Callback", `${currentPath}.${cb.name}`),
    );
  }
  if ("constants" in element && Array.isArray((element as any).constants)) {
    (element as any).constants.forEach((c: any) =>
      searchRecursively(searchTerm, c, "Constant", `${currentPath}.${c.name}`),
    );
  }
  if ("members" in element && Array.isArray((element as any).members)) {
    (element as any).members.forEach((m: any) =>
      searchInElement(
        searchTerm,
        m as any,
        "Member",
        `${currentPath}.${m.name}`,
      ),
    );
  }
};
