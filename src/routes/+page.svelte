<script lang="ts">
  // @ts-ignore
  import {page} from '$app/stores';
  import FileUploader from '../components/widgets/FileUploader.svelte';
  import GirBrowser from '../components/GirBrowser.svelte';
  import GirElementDetails from '../components/GirElementDetails.svelte';
  import SearchBar from '../components/widgets/SearchBar.svelte';
  import {Tabs, TabsContent, TabsList, TabsTrigger} from '$lib/components/ui/tabs';
  import {
    type GirAnyElement,
    type GirClass,
    type GirEnum,
    type GirInterface,
    type GirMember,
    type GirNamespace,
    type GirRecord,
    isComplexElement,
    type SearchResult
  } from '../types';
  import {FileIcon} from '../components/icons';
  import {onMount} from 'svelte';
  import {ScrollArea, Scrollbar} from "$lib/components/ui/scroll-area";
  import {House, PanelsTopLeft} from '@lucide/svelte';
  import {appState, PRELOAD_FILES} from '../shared.svelte.js';
  import {preloadGirFiles} from "../utils.ts";

  function setActiveRepo(repoId: string) {
    appState.activeRepositoryId = repoId;
    appState.selectedItem = undefined;
    appState.searchTerm = ''; // Clear search term when switching repos
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

  {#if appState.error}
    <div class="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 mx-4 mt-4 rounded" role="alert">
      <p class="font-bold">Error</p>
      <p>{appState.error}</p>
    </div>
  {/if}
  {#if appState.isLoading}
    <div class="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 mx-4 mt-4 rounded" role="status">
      <p>Loading...</p>
    </div>
  {/if}

  <Tabs value="tab-1" class="items-left">

    <ScrollArea>
      <TabsList
        class="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
      >
        <TabsTrigger
          value="tab-1"
          class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
        >
          <House class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true"/>
          File Management
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
        >
          <PanelsTopLeft
            class="-ms-0.5 me-1.5 opacity-60"
            size={16}
            stroke-width={2}
            aria-hidden="true"
          />
          Inspector
        </TabsTrigger>
      </TabsList>
      <Scrollbar orientation="horizontal"/>
    </ScrollArea>

    <TabsContent value="tab-1">
      <div class="flex flex-row justify-center w-full">
        <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4">

          <!-- file uploader -->
          <FileUploader disabled={appState.isLoading}/>
          <!-- end of file uploader -->

          <div class="mt-4">
            <h2 class="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wider">Loaded GIR Files</h2>
            {#if appState.repositories.length === 0 && !appState.isLoading}
              <p class="text-sm text-slate-500 italic">No GIR files loaded. Upload one to get started.</p>
            {/if}
            <ul>
              {#each appState.repositories as repo (repo.id)}
                <button
                  class="w-full p-2 my-1 rounded-md cursor-pointer text-sm flex items-center transition-colors
                              {appState.activeRepositoryId === repo.id ? 'bg-blue-600 text-white font-medium shadow-sm' : 'hover:bg-blue-50 text-slate-700'}"
                  on:click={() => setActiveRepo(repo.id)}
                  on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveRepo(repo.id); }}
                >
                  <span
                    class={`mr-2 flex-shrink-0 ${appState.activeRepositoryId === repo.id ? 'text-white': 'text-slate-500'}`}>
                    {@html FileIcon()}
                  </span>
                  <span class="truncate">{repo.fileName}</span>
                </button>
              {/each}
            </ul>
          </div>
        </div>
      </div>

    </TabsContent>
    <TabsContent value="tab-2">
      <div class="flex flex-row h-[calc(100vh-10rem)] gap-4 p-4">
        <!-- search and browser column -->
        <ScrollArea class="w-1/4 bg-white rounded-lg shadow-lg">
          <div class="p-4">
            <SearchBar disabled={appState.isLoading || appState.repositories.length === 0}/>

            <GirBrowser />
          </div>
        </ScrollArea>

        <!-- Content area -->
        <ScrollArea class="w-3/4 bg-white rounded-lg shadow-lg">
          <div class="p-4">
            <GirElementDetails/>
          </div>
        </ScrollArea>
      </div>
    </TabsContent>
  </Tabs>

</div>
