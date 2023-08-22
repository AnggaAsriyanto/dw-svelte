<script lang="ts">
	import type { PageServerData } from "./$types";

     export let data: PageServerData;
</script>

<a href="/about">go to about</a>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<ul>
     {#each data.contents as content }
          <li>
               <a href="/h/{content.code}">{content.title}</a>
          </li>
     {/each}
</ul>
