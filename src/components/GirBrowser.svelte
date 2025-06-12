<script lang="ts">
  import type {GirRepository, SearchResult, SelectedItem} from '../types';
  import ItemDisplay from './ItemDisplay.svelte';
  import Repository from "./Repository.svelte";
  import {CodeBracketIcon} from "./icons";
  import {getIcon} from "../utils";

  export let repositories: GirRepository[];
  export let activeRepositoryId: string | null;
  export let searchResults: SearchResult[];
  export let searchTerm: string;

  function handleSelectElement(selectedItem: SelectedItem) {
    // dispatch('selectElement', event.detail);
  }


  $: activeRepo = repositories.find(r => r.id === activeRepositoryId);
</script>

<div class="p-4 h-full overflow-y-auto">
  {#if searchTerm && searchResults.length > 0}
    <h2 class="text-lg font-semibold text-slate-800 mb-2">Search Results ({searchResults.length}) for "{searchTerm}
      "</h2>
    <ul>
      {#each searchResults as result (result.filePath)}
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
  {:else if searchTerm && searchResults.length === 0}
    <div class="p-8 text-center text-slate-500">No results found for "{searchTerm}".</div>
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
