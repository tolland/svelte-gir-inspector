<script lang="ts">
  import type { GirReturnValue } from '../../types';
  import DocDisplay from './DocDisplay.svelte';

  export let rv: GirReturnValue | undefined = undefined;
</script>

{#if !rv}
  <p class="italic text-slate-500">No return value (void or constructor).</p>
{:else}
  <h4 class="font-semibold text-slate-800 my-2">Return Value:</h4>
  <div class="border-l-2 border-green-500 pl-3 py-1 bg-slate-50 rounded-r">
    {#if rv.type}
      <p>Type: <span class="font-mono bg-slate-200 px-1 rounded">{rv.type}</span> {rv.cType && `(C: ${rv.cType})`}</p>
    {/if}
    {#if rv.transferOwnership}
      <p>Transfer: <span class="font-mono bg-slate-200 px-1 rounded">{rv.transferOwnership}</span></p>
    {/if}
    {#if rv.nullable}
      <p class="text-xs text-slate-600">Nullable</p>
    {/if}
    {#if rv.doc}
      <div class="mt-1"><DocDisplay doc={rv.doc} /></div>
    {/if}
  </div>
{/if}
