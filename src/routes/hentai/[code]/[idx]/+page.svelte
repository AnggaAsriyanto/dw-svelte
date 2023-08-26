<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

     export let data;
     console.log(data)

     let panelCurrent: any;
     let panelList: any;

     onMount(() => {
          console.log(panelCurrent, panelList)
     })

     function nextIdx() {
          panelCurrent = ''
          if(data.idx === data.images.length) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx + 1}`, { replaceState: true })
     }

     function prevIdx() {
          panelCurrent = ''
          if(data.idx === 1) {
               return goto(`/hentai/${data.code}`)
          }
          goto(`/hentai/${data.code}/${data.idx - 1}`, { replaceState: true })
     }


</script>

<p bind:this={panelCurrent}>Hello index { data.idx }</p>
<button on:click={prevIdx}>prev</button>
<button on:click={nextIdx}>next</button>

<ul>
     { #each data.images as images }
          <li bind:this={panelList}>{ images.key }</li>
     {/each}
</ul>


