<script lang="ts">
  import type {GirAnyElement, SelectedItem} from '../types';
  import type {Snippet} from 'svelte'
  import {ChevronDownIcon, ChevronRightIcon} from "./icons";
  import {getIcon} from "../utils";
  import {type Icon as IconType} from '@lucide/svelte';
  import ComplexTypeItems from "./ComplexTypeItems.svelte";
  import {isComplexElement} from "../util/guards";

  type Props = {
    activeIndex?: number;
    item: GirAnyElement;
    typeLabel: string;
    icon?: typeof IconType;
    filePath: string;
    defaultOpen?: boolean;
    hasChildren?: boolean;
    level?: number;
    isExpanded?: boolean;
    isSelected?: boolean;
    isLeaf?: boolean;
    toggle?: (selectedItem: SelectedItem) => void;
    select?: (selectedItem: SelectedItem) => void;
    children?: Snippet;
  } & Record<string, Snippet | any>;

  let {
    item,
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

  const handleSelect = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    console.log('Item selected:', item.name);
    console.log('Type label:', typeLabel);
    console.log('File path:', filePath);
    select && select({item, type: typeLabel, filePath});
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
    toggle && toggle({item, type: typeLabel, filePath});
  };

  const complexElement = isComplexElement(item);

  let isDeprecated = $derived('deprecated' in item && !!item.deprecated);
  let cIdentifier = $derived('cIdentifier' in item && typeof item.cIdentifier === 'string' ? item.cIdentifier : null);
  icon = getIcon(typeLabel);
  let iconColor = $derived(typeLabel === 'Method' ? 'text-blue-500' : typeLabel === 'Function' ? 'text-green-500' : 'text-slate-500');

  const Icon = icon

</script>

<li class="item-typeLabel-{typeLabel} my-0.5">
  <div
    class="flex items-center p-2 hover:bg-slate-100 rounded-md cursor-pointer"
    style="padding-left: {level * 1.5}rem;"
    role="button"
    tabindex="0"
    onkeydown={toggleOpen}
  >
    {#if complexElement || hasChildren}
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
    <span class="truncate">{item.name}</span> <span>complexElement={complexElement}</span><span>isExpanded={isExpanded}</span>

    kind: {item.kind}


    {#if cIdentifier}
      <span class="ml-2 text-xs text-slate-500 font-mono hidden md:inline">({cIdentifier})</span>
    {/if}
    {#if isDeprecated}
      <span class="ml-2 text-xs text-orange-500 font-semibold">(deprecated)</span>
    {/if}


  </div>
  {#if isOpen && hasChildren}

    <div class="wrapper">
      {#if isComplexElement(item) }
        <ComplexTypeItems
          item={item}
          parentFilePath={filePath}
        ></ComplexTypeItems>
      {/if}
    </div>

  {/if}
</li>
