<script>
  let { children } = $props();
  import "../css/style.css";
</script>

<!--<nav>-->
<!--  <a href="/">default</a>-->
<!--  <a href="/sidebar">sidebar</a>-->
<!--</nav>-->

{@render children()}
