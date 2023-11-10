<script lang="ts">
	import Image from "../../Image.svelte";
     import type { LayoutServerData } from "../../hentai/[code]/$types";

     export let data: LayoutServerData

     console.log(data)

     let urlImage = `https://overdoujin.gumlet.io/covers/${data.content.code}`
     let srcsetImage = `${urlImage}?w=250&format=webp&q=80&fit=fill 250w, ${urlImage}?w=300&format=webp&q=80&fit=fill 300w, ${urlImage}?w=600&format=webp&q=80&fit=fill 600w`
</script>

<!-- <img class="img" srcset="{srcsetImage}" src="{urlImage}" alt="{data.content.title}"> -->
<Image 
     src={data.content.code}
     sizes="sm:250 md:300 lg:600" 
     width={null} 
     height={null} 
     alt={data.content.title} 
     quality="80"
     fit="fill"
     title={data.content.title}
     loading={null}
/>
<p>{ data.content.code }</p>
<ul>
     {#each data.images as image, index}
          <li>
               <a href="/hentai/{data.content.code}/{index + 1}">
                    { image.key }
               </a>
          </li>
     {/each}
</ul>

<style lang="scss">
     
</style>
