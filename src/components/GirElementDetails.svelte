<script lang="ts">
  import type {GirAnyElement, SelectedItem} from '../types';
  import DetailCard from './DetailCard.svelte';
  import DocDisplay from './leafs/DocDisplay.svelte';
  import AttributesDisplay from './leafs/AttributesDisplay.svelte';
  import ParametersDisplay from './leafs/ParametersDisplay.svelte';
  import ReturnValueDisplay from './leafs/ReturnValueDisplay.svelte';

  export let selectedItem: SelectedItem | null = null;

  // Helper variables for cleaner template logic
  let item: GirAnyElement, type: string, filePath: string;
  $: if (selectedItem) {
    item = selectedItem.item;
    type = selectedItem.type;
    filePath = selectedItem.filePath;
  }
</script>

{#if !selectedItem}
  <div class="p-8 text-center text-slate-500">Select an element from the browser or search results to see its details.
  </div>
{:else}
  <div class="p-4 h-full overflow-y-auto">
    <DetailCard title={`${type}: ${item.name}`}>
      <p class="text-xs text-slate-400 mb-2 break-all">Path: {filePath}</p>

      {#if 'cIdentifier' in item && item.cIdentifier}
        <p>C Identifier: <span class="font-mono bg-slate-200 px-1 rounded">{item.cIdentifier}</span></p>
      {/if}
      {#if 'glibName' in item && item.glibName}
        <p>GLib Name: <span class="font-mono bg-slate-200 px-1 rounded">{item.glibName}</span></p>
      {/if}
      {#if 'glibName' in item && !item.glibName && 'glibNick' in item && item.glibNick}
        <p>GLib Nick: <span class="font-mono bg-slate-200 px-1 rounded">{item.glibNick}</span></p>
      {/if}
      {#if 'version' in item && item.version}
        <p>Version: <span class="font-mono bg-slate-200 px-1 rounded">{item.version}</span></p>
      {/if}version
      {#if 'deprecated' in item && item.deprecated}
        <p class="text-orange-600 font-semibold">
          Deprecated {typeof item.deprecated === 'string' ? `: ${item.deprecated}` : ''}</p>
      {/if}

      {#if 'sourcePosition' in item && item.sourcePosition}
        <p class="text-xs text-slate-500">
          Source: {item.sourcePosition.filename}{item.sourcePosition.line && ` (line ${item.sourcePosition.line})`}
        </p>
      {/if}

      {#if 'doc' in item && item.doc}
        <DocDisplay doc={item.doc}/>
      {/if}

      {#if 'attributes' in item && Array.isArray(item.attributes)}
        <AttributesDisplay attributes={item.attributes}/>
      {/if}

      {#if ['Function', 'Constructor', 'Method', 'Callback'].includes(type) && 'parameters' in item}
        <ParametersDisplay params={item.parameters}/>
        {#if type !== 'Constructor'}
          <ReturnValueDisplay rv={item.returnValue}/>
        {/if}
        {#if 'throws' in item && item.throws}
          <p class="text-red-600 font-semibold mt-2">Throws Exception</p>
        {/if}
      {/if}

      {#if type === 'Property' || type === 'Field'}
        {#if 'type' in item && item.type}
          <p>Type: <span
            class="font-mono bg-slate-200 px-1 rounded">{item.type}</span> {item.cType && `(C: ${item.cType})`}</p>
        {/if}
        {#if 'transferOwnership' in item && item.transferOwnership}
          <p>Transfer: <span class="font-mono bg-slate-200 px-1 rounded">{item.transferOwnership}</span></p>
        {/if}
        {#if 'readable' in item }
          <p>Readable: {item.readable ? 'Yes' : 'No'}</p>
        {/if}
        {#if 'writable' in item }
          <p>Writable: {item.writable ? 'Yes' : 'No'}</p>
        {/if}
        {#if 'construct' in item && item.construct}<p>Construct Property</p>{/if}
        {#if 'constructOnly' in item && item.constructOnly}<p>Construct-Only Property</p>{/if}
      {/if}

      {#if type === 'Enum'}
        {#if 'members' in item && item.members}
          <h4 class="font-semibold text-slate-800 my-2">Members:</h4>
          <ul class="space-y-1">
            {#each item.members as m, i (i)}
              <li class="border-l-2 border-purple-500 pl-3 py-1 bg-slate-50 rounded-r">
                <p class="font-semibold font-mono text-purple-700">{m.name}</p>
                <p>Value: <span class="font-mono bg-slate-200 px-1 rounded">{m.value}</span></p>
                {#if m.cIdentifier}<p>C Identifier: <span
                  class="font-mono bg-slate-200 px-1 rounded">{m.cIdentifier}</span></p>{/if}
                {#if m.glibNick}<p>GLib Nick: <span class="font-mono bg-slate-200 px-1 rounded">{m.glibNick}</span>
                </p>{/if}
                {#if m.doc}
                  <div class="mt-1">
                    <DocDisplay doc={m.doc}/>
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
        {/if}
      {/if}
    </DetailCard>
  </div>
{/if}
