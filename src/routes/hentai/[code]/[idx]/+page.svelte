<script lang="ts">
	import { goto } from '$app/navigation';
	import { afterUpdate } from 'svelte';

     export let data;
     console.log(data)

     let panel: any;
     let panelCurrent: any;
     let loadedImages: any = {};

     afterUpdate(() => {
          const panel = document.querySelector("#panel")
          if(panel) {
               console.log('updated')
               renderImage(data.idx - 1)
               renderImage(data.idx)
               renderImage(data.idx + 1)
               // renderPanel()
          }
     })

     function nextIdx() {
          if(data.idx === data.images.length) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx + 1}`, { replaceState: true })
     }

     function prevIdx() {
          if(data.idx === 1) {
               return goto(`/hentai/${data.code}`)
          }

          goto(`/hentai/${data.code}/${data.idx - 1}`, { replaceState: true })
     }

     function scrollIntoView() {
          const panel = document.querySelector("#panel")

          if(panel) {
               panel.scrollIntoView()
          }
     }

     function renderImage(idx: number) {
          if(loadedImages[idx]) {
               return loadedImages[idx]
          }

          const img = new Image();

          if(data.images[idx]) {
               img.src = 'https://overdoujin.gumlet.io/' + data.images[idx].key + '?format=webp'
               img.width = data.images[idx].customMetadata.width
               img.height = data.images[idx].customMetadata.height
               img.id = 'panel'

               loadedImages[idx] = {
                    image: img,
                    loaded: false,
               };
               console.log(loadedImages)
          }

          img.onload = () => {
               loadedImages[idx].loaded = true;

               if(data.idx - 1 === idx) {
                    renderPanel()
               }
          }
     }

     function renderPanel() {
          const panel = document.querySelector("#panel")
          
          if (panel) {
               // const newPanel = document.createElement("img")
               const newPanel = loadedImages[data.idx - 1].image;
               // newPanel.src = 'https://overdoujin.gumlet.io/' + data.images[data.idx - 1].key + '?format=webp';
               // newPanel.id = 'panel';
               // newPanel.width = data.images[data.idx - 1].customMetadata.width;
               // newPanel.height = data.images[data.idx - 1].customMetadata.height;
               
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
          &.hide {
               display: none;
          }
     }
</style>


