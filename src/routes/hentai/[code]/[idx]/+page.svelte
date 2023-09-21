<script lang="ts">
	import { goto } from '$app/navigation';
	import { afterUpdate } from 'svelte';

     export let data;
     console.log(data)

     let panel: any;
     let panelCurrent: any;
     let loadedImages: any = {};

     let preloadTotal: number = 3;

     afterUpdate(() => {
          const panel = document.querySelector("#panel")
          if(panel) {
               preloadImage(preloadTotal)
               renderPanel()
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

     function preloadImage(num: number) {
          renderImage(data.idx - 1)

          for(let i = 0; i < num; i++) {
               renderImage(data.idx + i)
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

               loadedImages[idx] = {
                    image: img,
                    loaded: false,
               };
               console.log(loadedImages)
          }

          const onLoad = () => {
               loadedImages[idx].loaded = true;
          }

          const onFail = () => {
               const imageFail = loadedImages[idx]
          }

          img.onload = onLoad;
          img.onerror = onFail;
     }

     function renderPanel() {
          const panel = document.querySelector("#panel")
          
          if (panel) {
               const newPanel = loadedImages[data.idx - 1].image;
               newPanel.id = 'panel';
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


