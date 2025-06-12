<script lang="ts">
  import type { GirParameter } from '../../types';
  import DocDisplay from './DocDisplay.svelte';

  export let params: GirParameter[] | undefined = undefined;
  export let title: string = "Parameters";
</script>

{#if !params || params.length === 0}
  <p class="italic text-slate-500">No parameters.</p>
{:else}
  <h4 class="font-semibold text-slate-800 my-2">{title}:</h4>
  <ul class="space-y-2">
    {#each params as p, i (i)}
      <li class="border-l-2 border-blue-500 pl-3 py-1 bg-slate-50 rounded-r">
        <p class="font-semibold font-mono text-blue-700">{p.name}</p>
        {#if p.type}
          <p>Type: <span class="font-mono bg-slate-200 px-1 rounded">{p.type}</span> {p.cType && `(C: ${p.cType})`}</p>
        {/if}
        {#if p.direction}
          <p>Direction: <span class="font-mono bg-slate-200 px-1 rounded">{p.direction}</span></p>
        {/if}
        {#if p.transferOwnership}
          <p>Transfer: <span class="font-mono bg-slate-200 px-1 rounded">{p.transferOwnership}</span></p>
        {/if}
        {#if p.nullable}
          <p class="text-xs text-slate-600">Nullable</p>
        {/if}
        {#if p.allowNone}
          <p class="text-xs text-slate-600">Allow None</p>
        {/if}
        {#if p.doc}
          <div class="mt-1"><DocDisplay doc={p.doc} /></div>
        {/if}
      </li>
    {/each}
  </ul>
{/if}
