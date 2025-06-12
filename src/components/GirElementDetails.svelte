<script lang="ts">
  import type {SelectedItem} from '../types';
  import DetailCard from './DetailCard.svelte';
  import DocDisplay from './leafs/DocDisplay.svelte';
  import AttributesDisplay from './leafs/AttributesDisplay.svelte';
  import ParametersDisplay from './leafs/ParametersDisplay.svelte';
  import ReturnValueDisplay from './leafs/ReturnValueDisplay.svelte';
  import { selectedItem } from '../stores.js';

  let item = $selectedItem?.item;
  let type = $selectedItem?.type;
  let name = $selectedItem?.item.name;
  let filePath = $selectedItem?.filePath;
  $inspect(selectedItem);
</script>

{#if !$selectedItem?.item}
  <div class="p-8 text-center text-slate-500">Select an element from the browser or search results to see its details.
  </div>
{:else}
  <div class="p-4 h-full overflow-y-auto">
    <DetailCard title={`${$selectedItem?.item.kind}: ${$selectedItem?.item.name}`}>
      <p class="text-xs text-slate-400 mb-2 break-all">Path: {$selectedItem?.filePath}</p>

      {#if 'cIdentifier' in $selectedItem?.item && $selectedItem?.item.cIdentifier}
        <p>C Identifier: <span class="font-mono bg-slate-200 px-1 rounded">{$selectedItem?.item.cIdentifier}</span></p>
      {/if}
      {#if 'glibName' in $selectedItem?.item && $selectedItem?.item.glibName}
        <p>GLib Name: <span class="font-mono bg-slate-200 px-1 rounded">{$selectedItem?.item.glibName}</span></p>
      {/if}
      {#if 'glibName' in $selectedItem?.item && !$selectedItem?.item.glibName && 'glibNick' in $selectedItem?.item && $selectedItem?.item.glibNick}
        <p>GLib Nick: <span class="font-mono bg-slate-200 px-1 rounded">{$selectedItem?.item.glibNick}</span></p>
      {/if}
      {#if 'version' in item && item.version}
        <p>Version: <span class="font-mono bg-slate-200 px-1 rounded">{$selectedItem?.item.version}</span></p>
      {/if}version
      {#if 'deprecated' in $selectedItem?.item && $selectedItem?.item.deprecated}
        <p class="text-orange-600 font-semibold">
          Deprecated {typeof $selectedItem?.item.deprecated === 'string' ? `: ${$selectedItem?.item.deprecated}` : ''}</p>
      {/if}

      {#if 'sourcePosition' in $selectedItem?.item && $selectedItem?.item.sourcePosition}
        <p class="text-xs text-slate-500">
          Source: {$selectedItem?.item.sourcePosition.filename}{$selectedItem?.item.sourcePosition.line && ` (line ${$selectedItem?.item.sourcePosition.line})`}
        </p>
      {/if}

      {#if 'doc' in $selectedItem?.item && $selectedItem?.item.doc}
        <DocDisplay doc={$selectedItem?.item.doc}/>
      {/if}

      {#if 'attributes' in $selectedItem?.item && Array.isArray($selectedItem?.item.attributes)}
        <AttributesDisplay attributes={$selectedItem?.item.attributes}/>
      {/if}

      {#if ['Function', 'Constructor', 'Method', 'Callback'].includes(type) && 'parameters' in $selectedItem?.item}
        <ParametersDisplay params={$selectedItem?.item.parameters}/>
        {#if type !== 'Constructor'}
          <ReturnValueDisplay rv={$selectedItem?.item.returnValue}/>
        {/if}
        {#if 'throws' in $selectedItem?.item && $selectedItem?.item.throws}
          <p class="text-red-600 font-semibold mt-2">Throws Exception</p>
        {/if}
      {/if}

      {#if type === 'Property' || type === 'Field'}
        {#if 'type' in $selectedItem?.item && $selectedItem?.item.type}
          <p>Type: <span
            class="font-mono bg-slate-200 px-1 rounded">{$selectedItem?.item.type}</span> {$selectedItem?.item.cType && `(C: ${$selectedItem?.item.cType})`}</p>
        {/if}
        {#if 'transferOwnership' in $selectedItem?.item && $selectedItem?.item.transferOwnership}
          <p>Transfer: <span class="font-mono bg-slate-200 px-1 rounded">{$selectedItem?.item.transferOwnership}</span></p>
        {/if}
        {#if 'readable' in $selectedItem?.item }
          <p>Readable: {$selectedItem?.item.readable ? 'Yes' : 'No'}</p>
        {/if}
        {#if 'writable' in $selectedItem?.item }
          <p>Writable: {$selectedItem?.item.writable ? 'Yes' : 'No'}</p>
        {/if}
        {#if 'construct' in $selectedItem?.item && $selectedItem?.item.construct}<p>Construct Property</p>{/if}
        {#if 'constructOnly' in $selectedItem?.item && $selectedItem?.item.constructOnly}<p>Construct-Only Property</p>{/if}
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
