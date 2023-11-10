<script lang="ts">
	import type { PageServerData } from "./$types";
     import Card from "./Card.svelte";

     export let data: PageServerData;
</script>

<a href="/about">go to about</a>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each data.contents as content }
<div class="home-page">
     <section class="group-section">
          <h2><i>N</i> Latest Uploads</h2>
          <div class="group-posts">
               <Card posts="{data.contents}"/>
          </div>
          <a href="/hentai" class="more">More Latest <i>N</i></a>
     </section>
</div>
<!-- <li>
     <a href="/hentai/{content.code}">{content.title}</a>
</li> -->
{/each}

<style lang="scss" scoped>
</style>
