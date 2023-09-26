<script lang="ts">
	import { goto } from '$app/navigation';
	import { afterUpdate } from 'svelte';

     export let data;
     console.log(data)

     let panel: any;
     let panelCurrent: any;
     let loadedImages: any = {};

     let preloadTotal = 3;

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
               newPanel.style.height = "100%";
               newPanel.style.objectFit = "contain";
               // newPanel.style.backgroundColor = "gray";

               panel.parentNode?.replaceChild(newPanel, panel)
          }
     }

</script>

<!-- <div class="read page">
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
</div> -->

<div class="read-page">
     <div class="read-cont">

          <div class="menu-bar">
               <div class="btn-bar">
               </div>
               <div class="bar">
                    <div class="btn-bar">
                         <button on:click={prevIdx}>P</button>
                    </div>
                    <div class="status">
                         <p>{ data.idx }</p>
                    </div>
                    <div class="btn-bar">
                         <button on:click={nextIdx}>N</button>
                    </div>
               </div>
               <div class="btn-bar">
                    <p>r</p>
               </div>
          </div>

          <div class="image-group">

               <img bind:this={panel}
                    id="panel"
                    src="https://overdoujin.gumlet.io/{data.images[data.idx - 1].key}?format=webp" 
                    alt="{data.images[data.idx - 1].key}" 
                    width="{data.images[data.idx - 1].customMetadata.width}" 
                    height="{data.images[data.idx - 1].customMetadata.height}"
               >

               <!-- <div class="img-cont">
                    <NuxtImg
                    v-for="(img, idx) in image"
                    :key="idx"
                    provider="gumlet"
                    loading="lazy"
                    :src="img.key"
                    :alt="img.key"
                    :width="img.metadata.width"
                    :height="img.metadata.height"
                    :modifiers="{ format: 'auto', compress: 'true' }"
                    ref="panel"
                    />
               </div> -->
          </div>

          <div class="menu-bar">
               <div class="btn-bar">
               </div>
               <div class="bar">
                    <div class="btn-bar">
                         <button on:click={prevIdx}>P</button>
                    </div>
                    <div class="status">
                         <p>{ data.idx }</p>
                    </div>
                    <div class="btn-bar">
                         <button on:click={nextIdx}>N</button>
                    </div>
               </div>
               <div class="btn-bar">
                    <p>r</p>
               </div>
          </div>

     </div>

     <!-- <div v-show="gallery" :class="['gallery', { show: showGallery }]">
          <div class="close-gallery">
               <button @click="gallery = null" type="button" aria-label="close">Close</button>
          </div>
          <div id="scroll" ref="scrollref">
               <ul class="list-cont">
                    <li @click="moveTo(idx)" v-for="(img, idx) in image" :key="idx">
                         <div class="img-cont-list" ref="currentPanel">
                              <NuxtImg
                              provider="gumlet"
                              sizes="sm:150px md:200px lg:400"
                              loading="lazy"
                              format="webp"
                              :src="img.key"
                              :alt="img.key"
                              :width="img.metadata.width"
                              :height="img.metadata.height"
                              />
                              <small class="index-image">{{ idx + 1 }}</small>
                         </div>
                    </li>
               </ul>
          </div>
     </div> -->
</div>

<style lang="scss">
     .read-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #212121;
     }
     .menu-bar {
          height: 2.5rem;
          width: 100%;
          display: flex;
          padding: 0 .8rem;
          justify-content: space-between;
          align-items: center;
          // background-color: #343438;
          background-color: #383838;
          font-size: 1.2rem;
          color: #e8e8e8;
          .icon {
               cursor: pointer;
          }
          .icon:active {
               color: transparent;
          }
          .btn-bar {
               height: auto;
               width: auto;
               display: flex;
               justify-content: center;
               align-items: center;
          }
          .bar {
               display: flex;
               align-items: center;
               >div {
                    margin: 0 .8rem;
               }
               .status {
                    cursor: pointer;
                    span {
                         font-weight: 400;
                         padding: 0 .2rem;
                         opacity: .95;
                    }
               }
               p {
                    font-size: .9rem;
                    font-weight: bold;
               }
          }
     }

     .image-group {
          position: relative;
          @media (min-width: 1000px) {
               min-height: 80vh;
          }
     }
     .read-cont {
          width: 100%;
          height: auto;
          overflow: hidden;
          @media (min-width: 1000px) {
               width: 80%;
          }
          .next {
               right: 0;
          }
          .img-cont {
               max-width: 100%;
          }
          img {
               display: block;
               max-width: 100%;
               width: 100%;
               height: 100%;
          }
     }

     .gallery {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 75vw;
          max-width: 600px;
          height: 60vh;
          border-radius: 3px;
          overflow: hidden;
          background-color: #28282B;
          color: #e8e8e8;
          z-index: 999999;
          padding: 0 0 .5rem;
          opacity: 0;
          &.show {
               opacity: 1;
          }
          #scroll {
               width: 100%;
               height: 90%;
               overflow-y: scroll;
          }
          .close-gallery {
               width: 100%;
               height: 2.5rem;
               background-color: #323232;
               display: flex;
               justify-content: center;
               button {
                    border: none;
                    background-color: transparent;
                    color: #e8e8e8;
                    font-family: inherit;
                    cursor: pointer;
                    &:active {
                         opacity: .9;
                    }
               }
          }
          .list-cont {
               width: 100%;
               height: max-content;
               display: grid;
               grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
               gap: .3rem;
               padding: .5rem .2rem;
               @media (min-width: 550px) {
                    padding: .5rem 1rem;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));      
               };
               .img-cont-list {
                    position: relative;
                    overflow: hidden;
                    background-color: #323232;
                    opacity: 1;
                    .index-image {
                         position: absolute;
                         top: 0;
                         left: 0;
                         font-family: inherit;
                         padding: .1rem .5rem;
                         background-color: rgba(0, 0, 0, .5);
                         border-radius:  0 0 5px;
                    }
               }
               img {
                    display: block;
                    border-radius: 3px;
                    height: 100%;
                    width: 100%;
                    cursor: pointer;
               }
          }
     }
</style>


