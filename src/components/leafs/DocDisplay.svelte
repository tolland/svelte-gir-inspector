<script lang="ts">
  import type { GirDoc } from '../../types';
  export let doc: GirDoc | undefined = undefined;
</script>

{#if !doc || !doc.text.trim()}
  <p class="italic text-slate-500">No documentation available.</p>
{:else}
  <div class="prose prose-sm max-w-none">
    <pre class="whitespace-pre-wrap font-sans bg-slate-50 p-2 rounded text-slate-800">{doc.text}</pre>
    {#if doc.filename || doc.line}
      <p class="text-xs text-slate-400 mt-1">
        Source: {doc.filename}{doc.line && ` (line ${doc.line})`}
      </p>
    {/if}
  </div>
{/if}
