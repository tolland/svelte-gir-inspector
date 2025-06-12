<script lang="ts">
  import type {GirNamespace, SelectedItem} from '../types';
  import type {Snippet} from 'svelte'
  import {getIcon} from "../utils";
  import GirElementList from "./GirElementList.svelte";
  import {ChevronDownIcon, ChevronRightIcon} from "./icons";

  type Props = {
    ns: GirNamespace;
    typeLabel: string;
    icon?: any;
    filePath: string;
    defaultOpen?: boolean;
    hasChildren?: boolean;
    level?: number;
    isExpanded?: boolean;
    isSelected?: boolean;
    isLeaf?: boolean;
    toggle?: (selectedItem: SelectedItem) => void;
    select?: (selectedItem: SelectedItem) => void;
    activeIndex?: number;
    children?: Snippet;
  } & Record<string, Snippet | any>;

  let {
    ns,
    typeLabel,
    icon,
    filePath,
    defaultOpen = false,
    hasChildren = false,
    level = 0,
    isExpanded = false,
    isSelected = false,
    isLeaf = false,
    toggle,
    select,
    activeIndex = $bindable(-1),
    children,
    ...snippetProps
  }: Props = $props();

  const snippets = Object.values(snippetProps).filter(v => typeof v === 'function');

  let isOpen = $state(defaultOpen);

  const handleSelectNamespace = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    console.log('namespace selected:', ns.name);
    console.log('Type label:', typeLabel);
    console.log('File path:', filePath);
    // dispatch('select', {item, type: typeLabel, filePath});
    // select && select({ns, type: typeLabel, filePath});
  };

  const toggleOpen = (e: MouseEvent | KeyboardEvent) => {
    console.log('toggle open called in item:');
    e.stopPropagation();
    if (e instanceof KeyboardEvent && e.key !== 'Enter' && e.key !== ' ') {
      return;
    }
    console.log('toggle open called in item 2:', isOpen);
    isOpen = !isOpen;
    // dispatch the toggle event to the parent component
    // toggle && toggle({item, type: typeLabel, filePath});
  };

  const handleSelectElement = (selectedItem: SelectedItem) => {
    console.log('Selected item in namespace:', selectedItem);
    // dispatch('selectElement', event.detail);
    select && select(selectedItem);
  };


  // let isDeprecated = $derived('deprecated' in item && !!item.deprecated);
  // let cIdentifier = $derived('cIdentifier' in item && typeof item.cIdentifier === 'string' ? item.cIdentifier : null);
  let Icon = $derived(getIcon(typeLabel));
  let iconColor = $derived(typeLabel === 'Method' ? 'text-blue-500' : typeLabel === 'Function' ? 'text-green-500' : 'text-slate-500');
</script>
<!--
  @component

  A gir Namespace which maps metadata entries to C functionality.
  This a similar concept to namespace in C++, but for GObject-based
  C libraries

  This component is a list item `<li></li>` whcih itself contains a list of the
  categories of objects that this namespace contains

-->

{#snippet showNamespace(ns: GirNamespace)}
  <pre>hello {ns.id} {ns.name}!</pre>
{/snippet}

<h3>namespace</h3>
{@render showNamespace(ns)}


<li class="item-typeLabel-{typeLabel} my-0.5">
  <div
    class="flex items-center p-2 hover:bg-slate-100 rounded-md cursor-pointer"
    style="padding-left: {level * 1.5}rem;"
    role="button"
    tabindex="0"
    onkeydown={toggleOpen}
  >
    {#if hasChildren}
      <button
        class="mr-2 text-slate-500 hover:text-slate-700 cursor-pointer  focus:outline-none"
        onclick={toggleOpen}
        aria-label={isExpanded ? 'Collapse' : 'Expand'}
      >
        {#if isOpen}
          {@html ChevronDownIcon()}
        {:else}
          {@html ChevronRightIcon()}
        {/if}
      </button>
    {/if}
    <span class="mr-2 flex-shrink-0 {iconColor}">
      <Icon/>
    </span>
    <span class="truncate">{ns.name}</span>
  </div>

  {#if isOpen && hasChildren}
    <ul class="namespace-ul-wrapper ml-4 pl-2 border-l border-slate-300">
      <GirElementList
        elements={ns.classes}
        typeLabel="Class"
        icon={getIcon("Class")}
        parentFilePath={ns.id}
        title="Classes"
        defaultOpen={true}
        selectElement={handleSelectElement}
      />

      <GirElementList
        elements={ns.interfaces}
        typeLabel="Interface"
        icon={getIcon("Interface")}
        parentFilePath={ns.id}
        title="Interfaces"
        defaultOpen={true}
        selectElement={handleSelectElement}
      />
      <GirElementList
        elements={ns.records}
        typeLabel="Record"
        icon={getIcon("Record")}
        parentFilePath={ns.id}
        title="Records"
        defaultOpen={true}
        selectElement={handleSelectElement}
      />
      <GirElementList
        elements={ns.enums}
        typeLabel="Enum"
        icon={getIcon("Enum")}
        parentFilePath={ns.id}
        defaultOpen={true}
        title="Enums/Bitfields"
        selectElement={handleSelectElement}
      />
      <GirElementList
        elements={ns.functions}
        typeLabel="Function"
        icon={getIcon("Function")}
        parentFilePath={ns.id}
        title="Functions"
        defaultOpen={true}
        selectElement={handleSelectElement}
      />
      <GirElementList
        elements={ns.aliases}
        typeLabel="Alias"
        icon={getIcon("Alias")}
        parentFilePath={ns.id}
        title="Aliases"
        defaultOpen={true}
        selectElement={handleSelectElement}
      />
      <GirElementList
        elements={ns.constants}
        typeLabel="Constant"
        icon={getIcon("Constant")}
        parentFilePath={ns.id}
        title="Constants"
        defaultOpen={true}
        selectElement={handleSelectElement}
      />
      <GirElementList
        elements={ns.callbacks}
        typeLabel="Callback"
        icon={getIcon("Callback")}
        parentFilePath={ns.id}
        title="Callbacks"
        defaultOpen={true}
        selectElement={handleSelectElement}
      />

    </ul>

  {/if}
</li>


