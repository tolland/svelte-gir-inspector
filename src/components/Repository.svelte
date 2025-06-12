<script lang="ts">
  import {CodeBracketIcon, FileIcon} from './icons';
  import {getIcon} from "../utils";
  import Namespace from "./Namespace.svelte";
  import type {GirNamespace, GirRepository, SelectedItem} from "../types";

  type Props = {
    repo: GirRepository;
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
  }

  let {
    repo,
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

  // const snippets = Object.values(snippetProps).filter(v => typeof v === 'function');

  let Icon = $derived(getIcon(typeLabel));
  let iconColor = $derived(typeLabel === 'Method' ? 'text-blue-500' : typeLabel === 'Function' ? 'text-green-500' : 'text-slate-500');
</script>



<h2 class="text-xl font-semibold text-slate-800 mb-3 border-b pb-2">
  <span class="inline align-text-bottom mr-2">{@html FileIcon()}</span>
  {repo.fileName}
</h2>

<ul>
  {#each repo.namespaces as ns (ns.id)}
    <Namespace
      ns={ns}
      typeLabel="Namespace"
      icon={CodeBracketIcon("text-gray-700")}
      filePath={ns.id}
      defaultOpen={repo.namespaces.length === 1}
      hasChildren={true}
    ></Namespace>
  {/each}
</ul>
