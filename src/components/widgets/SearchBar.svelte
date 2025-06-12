<script lang="ts">
  import {SearchIcon} from '../icons';
  import {appState} from '../../shared.svelte.js';

  type Props = {
    disabled: boolean;
  };

  let {disabled = false}: Props = $props();
  let placeholder: string = "Search elements...";

</script>

<div class="p-4 border-b border-slate-300">
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {@html SearchIcon("text-gray-400")}
    </div>
    <input
      type="search"
      bind:value={appState.searchTerm}
      {placeholder}
      {disabled}
      class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none disabled:bg-slate-50"
    />
  </div>
</div>
