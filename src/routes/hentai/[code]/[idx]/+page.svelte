<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, afterUpdate } from 'svelte';

     export let data;
     console.log(data)

     let panel: any;
     let panelCurrent: any;
     let loadedImages: any = {};

     afterUpdate(() => {
          const panel = document.querySelector("#panel")
          if(panel) {
               console.log('updated')
               renderPanel()
               renderImage(data.idx)
               renderImage(data.idx + 1)
               renderImage(data.idx + 2)
          }
     })

     function nextIdx() {
          if(data.idx === data.images.length) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx + 1}`, { replaceState: true })
          // scrollIntoView()
     }

     function prevIdx() {
          if(data.idx === 1) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx - 1}`, { replaceState: true })
          // scrollIntoView()
     }

     function scrollIntoView() {
          const panel = document.querySelector("#panel")

          if(panel) {
               panel.scrollIntoView()
          }
     }

     function renderImage(idx: number) {
          const img = new Image();
          const src = 'https://overdoujin.gumlet.io/' + data.images[idx].key + '?format=webp'

          if(loadedImages[src]) {
               return
          }

          if(data.images[idx]) {
               img.src = src

               img.onload = function() {
                    loadedImages[img.src] = true;
               }
          }
     }

     function renderPanel() {
          const panel = document.querySelector("#panel")
          
          if (panel) {
               const newPanel = document.createElement("img")
               newPanel.src = 'https://overdoujin.gumlet.io/' + data.images[data.idx - 1].key + '?format=webp';
               newPanel.id = 'panel';
               newPanel.alt = data.images[data.idx - 1].key;
               newPanel.width = data.images[data.idx - 1].customMetadata.width;
               newPanel.height = data.images[data.idx - 1].customMetadata.height;
               
               newPanel.style.display = "block";
               newPanel.style.maxWidth = "300px";
               newPanel.style.height = "auto";
               newPanel.style.objectFit = "contain";
               newPanel.style.backgroundColor = "gray";

               panel.parentNode?.replaceChild(newPanel, panel)
          }
     }

</script>

<div class="read page">
     <p>Hello index { data.idx }</p>

     <img bind:this={panel}
          id="panel"
          src="https://overdoujin.gumlet.io/{data.images[data.idx - 1].key}?format=webp" 
          alt="{data.images[data.idx - 1].key}" 
          width="{data.images[data.idx - 1].customMetadata.width}" 
          height="{data.images[data.idx - 1].customMetadata.height}"
     >

     <!-- {#if data.images[data.idx]}
          <img 
          class="hide"
          src="https://overdoujin.gumlet.io/{data.images[data.idx].key}?format=webp" 
          alt="{data.images[data.idx].key}" 
          width="{data.images[data.idx].customMetadata.width}" 
          height="{data.images[data.idx].customMetadata.height}">
     {/if}

     {#if data.images[data.idx + 1]}
          <img 
          class="hide"
          src="https://overdoujin.gumlet.io/{data.images[data.idx + 1].key}?format=webp" 
          alt="{data.images[data.idx + 1].key}" 
          width="{data.images[data.idx + 1].customMetadata.width}" 
          height="{data.images[data.idx + 1].customMetadata.height}">
     {/if}


     {#if data.images[data.idx + 2]}
          <img 
          class="hide"
          src="https://overdoujin.gumlet.io/{data.images[data.idx + 2].key}?format=webp" 
          alt="{data.images[data.idx + 2].key}" 
          width="{data.images[data.idx + 2].customMetadata.width}" 
          height="{data.images[data.idx + 2].customMetadata.height}">
     {/if} -->
     

     <button on:click={prevIdx}>prev</button>
     <button on:click={nextIdx}>next</button>
     <button on:click={scrollIntoView}>into view</button>

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
          display: block;
          max-width: 300px;
          height: auto;
          object-fit: contain;
          background-color: gray;
     }
</style>


