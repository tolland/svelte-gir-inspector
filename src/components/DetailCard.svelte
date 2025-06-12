<script lang="ts">
  export let title: string;
</script>

<div class="bg-white shadow rounded-lg mb-4">
  <div class="px-4 py-3 border-b border-slate-200">
    <h3 class="text-lg leading-6 font-medium text-slate-900">{title}</h3>
  </div>
  <div class="px-4 py-3 text-sm text-slate-700 leading-relaxed">
    <slot></slot>
  </div>
</div>
