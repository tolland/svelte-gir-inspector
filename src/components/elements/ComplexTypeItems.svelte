<script lang="ts">
  import type {GirClass, GirInterface, GirRecord, SelectedItem} from '../../types';
  import GirElementList from '../GirElementList.svelte';

  export let item: GirClass | GirInterface | GirRecord;
  export let parentFilePath: string;

  function handleSelectElement(selectedElement: SelectedItem) {
  }
</script>

<h1>this is complex</h1>

<ul> <!-- Added a wrapping <ul> as GirElementList renders <li> -->
  {#if 'constructors' in item && item.constructors && item.constructors.length > 0}
    <GirElementList
      elements={item.constructors}
      typeLabel="Constructor"
      parentFilePath={parentFilePath}
      title="Constructors"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
  {#if item.methods && item.methods.length > 0}
    <GirElementList
      elements={item.methods}
      typeLabel="Method"
      parentFilePath={parentFilePath}
      title="Methods"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
  {#if item.functions && item.functions.length > 0}
    <GirElementList
      elements={item.functions}
      typeLabel="Function"
      parentFilePath={parentFilePath}
      title="Static Functions"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
  {#if item.properties && item.properties.length > 0}
    <GirElementList
      elements={item.properties}
      typeLabel="Property"
      parentFilePath={parentFilePath}
      title="Properties"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
  {#if 'fields' in item && item.fields && item.fields.length > 0}
    <GirElementList
      elements={item.fields}
      typeLabel="Field"
      parentFilePath={parentFilePath}
      title="Fields"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
  {#if item.signals && item.signals.length > 0}
    <GirElementList
      elements={item.signals}
      typeLabel="Signal"
      parentFilePath={parentFilePath}
      title="Signals"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
  {#if item.callbacks && item.callbacks.length > 0}
    <GirElementList
      elements={item.callbacks}
      typeLabel="Callback"
      parentFilePath={parentFilePath}
      title="Callbacks"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
  {#if item.constants && item.constants.length > 0}
    <GirElementList
      elements={item.constants}
      typeLabel="Constant"
      parentFilePath={parentFilePath}
      title="Constants"
      defaultOpen={false}
      selectElement={handleSelectElement}
    />
  {/if}
</ul>
