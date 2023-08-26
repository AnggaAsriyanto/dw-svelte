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
          console.log(panel, panelCurrent)
     }

     function prevIdx() {
          if(data.idx === 1) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx - 1}`, { replaceState: true })
          console.log(panel, panelCurrent)
     }


</script>

<p bind:this={panel}>Hello index { data.idx }</p>
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


