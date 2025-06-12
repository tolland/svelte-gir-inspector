<script lang="ts">
  import {type SearchResult, type SelectedItem} from '../types';
  import ItemDisplay from './ItemDisplay.svelte';
  import Repository from "./Repository.svelte";
  import {CodeBracketIcon} from "./icons";
  import {getIcon} from "../utils";

  import {appState} from '../shared.svelte.js';

  type Props = {};

  const {}: Props = $props();

  function handleSelectElement(selectedItem: SelectedItem) {
    // dispatch('selectElement', event.detail);
  }

  let activeRepo = $derived(appState.repositories.find(r => r.id === appState.activeRepositoryId));
  let searchResultsState = $state<SearchResult[]>([]);

  function performSearch(searchTerm: string) {
    if (!searchTerm) {
      searchResultsState = [];
      return;
    }

    const results: SearchResult[] = [];
    const searchInElement = (element: any, type: string, currentPath: string) => {
      if (element.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({item: element, type, filePath: currentPath});
      }
    };

    const searchRecursively = (element: any, type: string, currentPath: string) => {
      searchInElement(element, type, currentPath);
      if ('methods' in element && Array.isArray((element as any).methods)) {
        (element as any).methods.forEach((m: any) => searchInElement(m, 'Method', `${currentPath}.${m.name}`));
      }
      if ('properties' in element && Array.isArray((element as any).properties)) {
        (element as any).properties.forEach((p: any) => searchInElement(p, 'Property', `${currentPath}.${p.name}`));
      }
      if ('signals' in element && Array.isArray((element as any).signals)) {
        (element as any).signals.forEach((s: any) => searchInElement(s, 'Signal', `${currentPath}.${s.name}`));
      }
      if ('fields' in element && Array.isArray((element as any).fields)) {
        (element as any).fields.forEach((f: any) => searchInElement(f, 'Field', `${currentPath}.${f.name}`));
      }
      if ('functions' in element && Array.isArray((element as any).functions)) {
        (element as any).functions.forEach((f: any) => searchInElement(f, 'Function', `${currentPath}.${f.name}`));
      }
      if ('callbacks' in element && Array.isArray((element as any).callbacks)) {
        (element as any).callbacks.forEach((cb: any) => searchInElement(cb, 'Callback', `${currentPath}.${cb.name}`));
      }
      if ('constants' in element && Array.isArray((element as any).constants)) {
        (element as any).constants.forEach((c: any) => searchRecursively(c, 'Constant', `${currentPath}.${c.name}`));
      }
      if ('members' in element && Array.isArray((element as any).members)) {
        (element as any).members.forEach((m: any) => searchInElement(m as any, 'Member', `${currentPath}.${m.name}`)); // Cast GirMember
      }
    };

    appState.repositories.forEach(repo => {
      repo.namespaces.forEach(ns => {
        const nsPath = `${repo.id}.${ns.name}`;
        searchRecursively(ns, 'Namespace', nsPath);
        ns.classes.forEach(c => searchRecursively(c, 'Class', `${nsPath}.${c.name}`));
        ns.interfaces.forEach(i => searchRecursively(i, 'Interface', `${nsPath}.${i.name}`));
        ns.records.forEach(r => searchRecursively(r, 'Record', `${nsPath}.${r.name}`));
        ns.enums.forEach(e => searchRecursively(e, 'Enum', `${nsPath}.${e.name}`));
        // Note: Aliases, top-level functions, constants, callbacks for namespaces were not searched in original recursive.
        // Adding them for completeness if desired:
        ns.aliases.forEach(a => searchRecursively(a, 'Alias', `${nsPath}.${a.name}`));
        // ns.functions.forEach(f => searchRecursively(f, 'Function', `${nsPath}.${f.name}`)); // Already handled by generic functions in complex types.
        // ns.constants.forEach(c => searchRecursively(c, 'Constant', `${nsPath}.${c.name}`)); // Already handled.
        // ns.callbacks.forEach(cb => searchRecursively(cb, 'Callback', `${nsPath}.${cb.name}`)); // Already handled.
      });
    });
    searchResultsState = results;
  }

  let debounceTimer: ReturnType<typeof setTimeout>;

  $effect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(appState.searchTerm);
    }, 300);
  });
</script>

<div class="p-4 h-full overflow-y-auto">
  {#if appState.searchTerm && searchResultsState.length > 0}
    <h2 class="text-lg font-semibold text-slate-800 mb-2">Search Results ({searchResultsState.length}) for
      "{appState.searchTerm}
      "</h2>
    <ul>
      {#each searchResultsState as result (result.filePath)}
        <ItemDisplay
          item={result.item}
          typeLabel={result.type}
          icon={getIcon(result.type)}
          filePath={result.filePath}
          select={handleSelectElement}
          hasChildren={false}
        />
      {/each}
    </ul>
  {:else if appState.searchTerm && searchResultsState.length === 0}
    <div class="p-8 text-center text-slate-500">No results found for "{appState.searchTerm}".</div>
  {:else if !activeRepo}
    <div class="p-8 text-center text-slate-500">Select a GIR file from the list to browse its contents.</div>
  {:else}
    <Repository
      repo={activeRepo}
      typeLabel="Repository"
      icon={CodeBracketIcon("text-gray-700")}
      filePath={activeRepo.id}
      select={handleSelectElement}
      defaultOpen={true}
      hasChildren={true}
    />
  {/if}
</div>
