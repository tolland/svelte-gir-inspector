<script lang="ts">
  import { onMount } from 'svelte';
  import GirFileUploader from '../../components/widgets/GirFileUploader.svelte';
  import GirBrowser from '../../components/GirBrowser.svelte';
  import GirElementDetails from '../../components/GirElementDetails.svelte';
  import SearchBar from '../../components/widgets/SearchBar.svelte';
  import { parseGirContent } from '../../services/girParser';
  import type { GirRepository, SelectedItem, SearchResult } from '../../types';
  import { FileIcon } from '../../components/icons';

  let repositories: GirRepository[] = [];
  let activeRepositoryId: string | null = null;
  let selectedItem: SelectedItem | null = null;
  let searchTerm: string = '';
  let searchResults: SearchResult[] = [];
  let isLoading: boolean = false;
  let error: string | null = null;

  // Define GIR files to preload. Ensure these files are in your public/gir/ directory.
  const PRELOAD_FILES: string[] = [
    // 'gir/Babl-0.1.gir',
    // 'gir/Gegl-0.4.gir',
    'gir/Gimp-3.0.gir',
    'gir/GimpUi-3.0.gir',
    'gir/Gtk-3.0.gir',
  ];

  async function handleFileLoad(event: CustomEvent<{ fileName: string, content: string }>) {
    const { fileName, content } = event.detail;
    if (repositories.some(repo => repo.fileName === fileName)) {
      alert(`File "${fileName}" is already loaded.`);
      return;
    }
    isLoading = true;
    error = null;
    try {
      await new Promise(resolve => setTimeout(resolve, 0));
      const parsedRepo = parseGirContent(content, fileName);
      repositories = [...repositories, parsedRepo];
      if (!activeRepositoryId) {
        activeRepositoryId = parsedRepo.id;
      }
    } catch (e) {
      console.error("Error parsing GIR file:", e);
      error = `Failed to parse ${fileName}: ${e instanceof Error ? e.message : String(e)}`;
    } finally {
      isLoading = false;
    }
  }

  function handleSelectElement(event: any) {
    selectedItem = event.detail;
  }

  function setActiveRepo(repoId: string) {
    activeRepositoryId = repoId;
    selectedItem = null;
    searchTerm = '';
  }

  function performSearch(term: string) {
    if (!term.trim()) {
      searchResults = [];
      return;
    }
    const lowerTerm = term.toLowerCase();
    const results: SearchResult[] = [];

    const searchInElement = (el: any, type: string, path: string) => {
      let match = false;
      if (el.name?.toLowerCase().includes(lowerTerm)) {
        match = true;
      }
      if (('cIdentifier' in el && el.cIdentifier) && el.cIdentifier.toLowerCase().includes(lowerTerm)) {
        match = true;
      }
      if (('glibName' in el && el.glibName) && el.glibName.toLowerCase().includes(lowerTerm)) {
        match = true;
      }
      if (('glibNick' in el && el.glibNick) && el.glibNick.toLowerCase().includes(lowerTerm)) {
        match = true;
      }

      if (match) {
        results.push({ item: el, type, filePath: path });
      }
    };

    const searchRecursively = (element: any, type: string, currentPath: string) => {
      searchInElement(element, type, currentPath);

      if ('constructors' in element && Array.isArray(element.constructors)) {
        element.constructors.forEach(cons => searchRecursively(cons, 'Constructor', `${currentPath}.${cons.name}`));
      }
      if ('methods' in element && Array.isArray(element.methods)) {
        element.methods.forEach(m => searchRecursively(m, 'Method', `${currentPath}.${m.name}`));
      }
      if ('functions' in element && Array.isArray(element.functions)) {
        element.functions.forEach(f => searchRecursively(f, 'Function', `${currentPath}.${f.name}`));
      }
      if ('properties' in element && Array.isArray(element.properties)) {
        element.properties.forEach(p => searchRecursively(p, 'Property', `${currentPath}.${p.name}`));
      }
      if ('fields' in element && Array.isArray(element.fields)) {
        element.fields.forEach(f => searchRecursively(f, 'Field', `${currentPath}.${f.name}`));
      }
      if ('signals' in element && Array.isArray(element.signals)) {
        element.signals.forEach(s => searchRecursively(s, 'Signal', `${currentPath}.${s.name}`));
      }
      if ('callbacks' in element && Array.isArray(element.callbacks)) {
        element.callbacks.forEach(cb => searchRecursively(cb, 'Callback', `${currentPath}.${cb.name}`));
      }
      if ('constants' in element && Array.isArray(element.constants)) {
         element.constants.forEach(c => searchRecursively(c, 'Constant', `${currentPath}.${c.name}`));
      }
       if ('members' in element && Array.isArray(element.members)) {
        element.members.forEach(m => searchInElement(m, 'Member', `${currentPath}.${m.name}`));
      }
    };

    repositories.forEach(repo => {
      repo.namespaces.forEach(ns => {
        const nsPath = `${repo.id}.${ns.name}`;
        searchRecursively(ns, 'Namespace', nsPath);
        ns.classes.forEach(c => searchRecursively(c, 'Class', `${nsPath}.${c.name}`));
        ns.interfaces.forEach(i => searchRecursively(i, 'Interface', `${nsPath}.${i.name}`));
        ns.records.forEach(r => searchRecursively(r, 'Record', `${nsPath}.${r.name}`));
        ns.enums.forEach(e => searchRecursively(e, 'Enum', `${nsPath}.${e.name}`));
        ns.aliases.forEach(a => searchRecursively(a, 'Alias', `${nsPath}.${a.name}`));
      });
    });
    searchResults = results;
  }

  let debounceTimer: ReturnType<typeof setTimeout>;
  $: {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);
  }

  // Preload GIR files on page load
  async function preloadGirFiles() {
    for (const filePath of PRELOAD_FILES) {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status} fetching ${filePath}`);
        }
        const content = await response.text();
        const fileName = filePath.split('/').pop() || filePath;
        const parsedRepo = parseGirContent(content, fileName);
        repositories = [...repositories, parsedRepo];
        if (!activeRepositoryId) {
          activeRepositoryId = parsedRepo.id;
        }
      } catch (e) {
        console.error(`Error preloading GIR file ${filePath}:`, e);
        error = `Failed to preload ${filePath.split('/').pop()}: ${e instanceof Error ? e.message : String(e)}`;
      }
    }
  }

  // Call preloadGirFiles on page load
  onMount(() => {
    preloadGirFiles();
  });
</script>

<div class="flex flex-col h-screen font-sans bg-slate-100">
  <header class="bg-slate-800 text-white p-4 shadow-md sticky top-0 z-10">
    <h1 class="text-2xl font-semibold">GIR Inspector</h1>
  </header>

  {#if error}
    <div class="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 mx-4 mt-4 rounded" role="alert">
      <p class="font-bold">Error</p>
      <p>{error}</p>
    </div>
  {/if}
  {#if isLoading}
    <div class="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 mx-4 mt-4 rounded" role="status">
      <p>Loading...</p>
    </div>
  {/if}

  <div class="flex flex-col flex-1 overflow-y-auto p-4 gap-4">
    <div class="w-full bg-white rounded-lg shadow-lg flex flex-col">
      <GirFileUploader handleUpload={handleFileLoad} disabled={isLoading} />
      <SearchBar bind:searchTerm disabled={isLoading || repositories.length === 0} />
      <div class="p-4 overflow-y-auto max-h-[25vh] sm:max-h-[200px]">
        <h2 class="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wider">Loaded GIR Files</h2>
        {#if repositories.length === 0 && !isLoading}
          <p class="text-sm text-slate-500 italic">No GIR files loaded. Upload one to get started.</p>
        {/if}
        <ul>
          {#each repositories as repo (repo.id)}
            <button
              class="w-full p-2 my-1 rounded-md cursor-pointer text-sm flex items-center transition-colors
                          {activeRepositoryId === repo.id ? 'bg-blue-600 text-white font-medium shadow-sm' : 'hover:bg-blue-50 text-slate-700'}"
              on:click={() => setActiveRepo(repo.id)}
              on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveRepo(repo.id); }}
            >
              <span class={`mr-2 flex-shrink-0 ${activeRepositoryId === repo.id ? 'text-white': 'text-slate-500'}`}>
                {@html FileIcon()}
              </span>
              <span class="truncate">{repo.fileName}</span>
            </button>
          {/each}
        </ul>
      </div>
    </div>
    <div class="w-full flex-1 bg-white rounded-lg shadow-lg overflow-hidden min-h-[300px]">
      <GirBrowser
        on:selectElement={handleSelectElement}
        {searchResults}
      />
    </div>
    <div class="w-full bg-white rounded-lg shadow-lg overflow-hidden min-h-[200px] h-[30vh]">
      <GirElementDetails />
    </div>
  </div>
</div>
