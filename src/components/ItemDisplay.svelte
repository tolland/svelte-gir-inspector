<script lang="ts">
  import type {GirDisplayableElement, SelectedItem} from '../types';
  import {isComplexElement, isDisplayableElement} from '../types';
  import {ChevronDownIcon, ChevronRightIcon} from "./icons";
  import {getIcon} from "../utils";
  import {type Icon as IconType} from '@lucide/svelte';
  import {hasChildren as itemHasChildren} from "../types/utility";
  import {selectedItem} from '../stores';
  import {componentMap} from "./utils.ts";

  type Props = {
    activeIndex?: number;
    item: GirDisplayableElement;
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
  };

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
  }: Props = $props();

  hasChildren = itemHasChildren(item);
  let isOpen = $state(defaultOpen);

  const handleSelect = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    // select && select({item, type: typeLabel, filePath});
    if (isDisplayableElement(item)) {
      console.log('Item selected:', item.name);
      console.log('Type label:', typeLabel);
      console.log('File path:', filePath);
      selectedItem.set({item, type: typeLabel, filePath});
      // set(item);
    }
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
  };

  const complexElement = isComplexElement(item);

  let isDeprecated = $derived('deprecated' in item && !!item.deprecated);
  let cIdentifier = $derived('cIdentifier' in item && typeof item.cIdentifier === 'string' ? item.cIdentifier : null);
  icon = getIcon(typeLabel);
  let iconColor = $derived(typeLabel === 'Method' ? 'text-blue-500' : typeLabel === 'Function' ? 'text-green-500' : 'text-slate-500');

  const Icon = icon

  let DynaComponent = $derived(componentMap[item.kind] as any);

  // $inspect(DynaComponent);

</script>

<li class="item-typeLabel-{typeLabel} my-0.5">
  <div
    class="flex items-center p-1 text-sm hover:bg-slate-100 rounded-md cursor-pointer"
    style="padding-left: {level * 1.5}rem;"
    role="button"
    tabindex="0"
    onkeydown={handleSelect}
    onclick={handleSelect}
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
    <span class="truncate">{item.name}</span>

    {#if cIdentifier}
      <span class="ml-2 text-xs text-slate-500 font-mono hidden md:inline">({cIdentifier})</span>
    {/if}
    {#if isDeprecated}
      <span class="ml-2 text-xs text-orange-500 font-semibold">(deprecated)</span>
    {/if}

  </div>
  <!--  <h3>isOpen: {isOpen}</h3>-->
  <!--  <h3>hasChildren: {hasChildren}</h3>-->
  {#if isOpen && hasChildren}
    {#if DynaComponent}
      <h1>rendering for {item.kind} constructor name is "{DynaComponent.constructor.name}"</h1>
    <DynaComponent
      {item}
      parentfilePath={filePath}
    />
    {:else}
No component found for {item.kind}
    {/if}

  {/if}
</li>
