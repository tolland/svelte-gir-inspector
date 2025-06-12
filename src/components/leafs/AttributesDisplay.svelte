<script lang="ts">
  import type { GirAttribute } from '../../types';
  export let attributes: GirAttribute[] | undefined = undefined;
</script>

{#if attributes && attributes.length > 0}
  <div class="mt-3">
    <h4 class="font-semibold text-slate-800 mb-1">Attributes:</h4>
    <ul class="list-disc list-inside pl-2 space-y-0.5 text-xs">
      {#each attributes as attr (attr.name)}
        <li>
          <span class="font-mono bg-slate-100 px-1 rounded">{attr.name}</span>:
          <span class="font-mono bg-slate-100 px-1 rounded">{attr.value}</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}
