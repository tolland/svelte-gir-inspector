<script lang="ts" generics="T extends GirBaseElement">

  import type {Component} from 'svelte';
  import type {GirBaseElement, SelectedItem} from '../types';
  import ItemDisplay from './ItemDisplay.svelte';
  import {ChevronDownIcon, ChevronRightIcon} from './icons';
  import {type Icon as IconType} from '@lucide/svelte';

  // This prop will allow passing a component to render children, or rely on slot
  // export let childRenderer: ComponentType | null = null;

  const {
    elements,
    typeLabel,
    icon,
    parentFilePath,
    title,
    defaultOpen,
    childRenderer,
    selectElement
  }: {
    elements: T[];
    typeLabel: string;
    icon?: typeof IconType;
    parentFilePath: string;
    title: string;
    defaultOpen: boolean;
    childRenderer?: Component | null;
    selectElement?: (selectedItem: SelectedItem) => void;
  } = $props();

  function onClickToggle(_e: MouseEvent) {
    isOpen = !isOpen
  }

  function onKeydownToggle(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') isOpen = !isOpen;
  }

  // @ts-ignore - Keep import alive
  const _typeCheck: GirBaseElement = null as any;

  let isOpen = $state(defaultOpen);

  function handleSelectElement(selectedItem: SelectedItem) {
    console.log('Selected item in list:', selectedItem);
    //dispatch('selectElement', event.detail);
  }
</script>
<!--
  @component

  ElementList is a component to represent collected children of elements
  such as classes, interfaces, for the UI representation



-->

{#if elements && elements.length > 0}
  <li class="element-list-{typeLabel}-li-wrapper my-1">
    <div
      class="element-list-div  flex items-center p-1.5 rounded-md hover:bg-slate-200 cursor-pointer text-sm font-semibold text-slate-700"
      role="button"
      tabindex="0"
      onclick={onClickToggle}
      onkeydown={onKeydownToggle}
    >
      <span class="mr-1">
        {#if isOpen}
          {@html ChevronDownIcon()}
        {:else}
          {@html ChevronRightIcon()}
        {/if}
      </span>
      {title} ({elements.length})
    </div>
    {#if isOpen}
      <ul class="element-list-is-open-ul-{typeLabel} ml-4 pl-2 border-l border-slate-300">
        {#each elements as el (el.id)}
          <ItemDisplay
            item={el}
            typeLabel={typeLabel}
            icon={icon}
            filePath={`${parentFilePath}.${el.name}`}
            select={handleSelectElement}
            hasChildren={!!childRenderer}
          ></ItemDisplay>
        {/each}
      </ul>
    {/if}
  </li>
{/if}
