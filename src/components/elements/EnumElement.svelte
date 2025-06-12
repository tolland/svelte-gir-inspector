<script lang="ts">

  import type {GirDisplayableElement, GirEnum} from "../../types";
  import ItemDisplay from "../ItemDisplay.svelte";
  import MemberElement from "../leafs/MemberElement.svelte";

  type Props = {
    item: GirEnum;
  }

  let {
    item,
  }: Props = $props();

</script>

<h1>This is an enum element</h1>

<ul class="element-list-is-open-ul-enum ml-4 pl-2 border-l border-slate-300">
  {#each item.members as el (el.name)}
    <MemberElement
      item={el}
    ></MemberElement>
  {/each}
</ul>
