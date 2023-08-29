<script lang="ts">
	import { onMount } from 'svelte'
	export let src: any;
     export let width: any;
     export let height: any;
     export let alt: any;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
          const img = new Image();
          img.src = src;
          loading = true;

          img.onload = () => {
               loading = false;
               loaded = true;
          };
          img.onerror = () => {
               loading = false;
               failed = true;
          };
	})
</script>

{#if loaded}
	<img {src} {alt} {width} {height}/>
{:else if failed}
	<img src="{src + '&q=10'}" alt="Not Found"/>
{:else if loading}
	<img src="{src + '&q=10'}" alt="Loading..."/>
{/if}
