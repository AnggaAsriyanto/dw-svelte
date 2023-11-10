<script lang="ts">
	import type { PageServerData } from "./$types";
     import Card from "./Card.svelte";

     export let data: PageServerData;
</script>

<div class="home-page">
     <section class="group-section">
          <h2><i class="bi bi-lightning-fill"></i> Latest Uploads</h2>
          <div class="group-posts">
               <Card posts="{data.contents}"/>
          </div>
          <a href="/hentai" class="more">More Latest <i class="bi bi-arrow-right"></i></a>
     </section>
</div>

<style lang="scss" scoped>
</style>
