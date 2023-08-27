<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

     export let data;
     console.log(data)

     let panel: any;
     let panelCurrent: any;

     onMount(() => {
          console.log(panel, panelCurrent)
     })

     function nextIdx() {
          if(data.idx === data.images.length) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx + 1}`, { replaceState: true })
          toTopPanel()
     }

     function prevIdx() {
          if(data.idx === 1) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx - 1}`, { replaceState: true })
          toTopPanel()
     }

     function toTopPanel() {
          panel.scrollIntoView()
     }


</script>

<div class="read page">
     <p>Hello index { data.idx }</p>
     <img bind:this={panel} src="https://overdoujin.gumlet.io/{data.images[data.idx - 1].customMetadata.key}" alt="">
     <button on:click={prevIdx}>prev</button>
     <button on:click={nextIdx}>next</button>

     <ul>
          { #each data.images as images, idx }
               {#if idx + 1 === data.idx }
                    <li bind:this={panelCurrent}>{ images.key }</li>
               {:else} 
                    <li>{ images.key }</li>
               {/if}
          {/each}
     </ul>
</div>

<style lang="scss">
     img {
          max-width: 300px;
     }
</style>


