<script lang="ts">
	import type { PageServerData } from "./$types";

     export let data: PageServerData
</script>

<img class="img" src="https://overdoujin.gumlet.io/covers/{data.content.code}" alt="{data.content.title}">
<p>{ data.content.code }</p>

<style>
     .img {
          max-width: 300px;
     }
</style>