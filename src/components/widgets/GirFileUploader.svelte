<script lang="ts">
  import { UploadIcon } from '../icons';

  export let disabled: boolean = false;

  // const dispatch = createEventDispatcher<{ fileLoad: { fileName: string, content: string } }>();
  let fileInputRef: HTMLInputElement;

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      Array.from(target.files).forEach(file => {
        if (file.name.endsWith('.gir')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
            //  dispatch('fileLoad', { fileName: file.name, content: e.target.result });
            }
          };
          reader.readAsText(file);
        } else {
          alert(`File "${file.name}" is not a .gir file and will be ignored.`);
        }
      });
      // Reset file input to allow uploading the same file again
      if (fileInputRef) {
        fileInputRef.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef?.click();
  };
</script>

<div class="p-4 border-b border-slate-300">
  <input
    type="file"
    multiple
    accept=".gir"
    on:change={handleFileChange}
    bind:this={fileInputRef}
    class="hidden"
    {disabled}
  />
  <button
    on:click={handleButtonClick}
    {disabled}
    class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    <span class="mr-2">{@html UploadIcon()}</span>
    Upload GIR File(s)
  </button>
</div>
