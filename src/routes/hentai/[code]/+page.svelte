<script lang="ts">
	import type { PageServerData } from "../../hentai/[code]/$types";

     export let data: PageServerData

     console.log(data)

     // let images = JSON.parse(data.test)
     let urlImage = `https://overdoujin.gumlet.io/covers/${data.content.code}`
     let srcsetImage = `${urlImage}?w=250&format=webp&q=80&fit=fill 250w, ${urlImage}?w=300&format=webp&q=80&fit=fill 300w, ${urlImage}?w=600&format=webp&q=80&fit=fill 600w`
</script>

<!-- <img class="img" srcset="{srcsetImage}" src="{urlImage}" alt="{data.content.title}"> -->
<p>{ data.content.code }</p>
<ul>
     {#each data?.imageContents?.objects as image}
          <li>
               { image.key }
          </li>
     {/each}
</ul>

<style lang="scss">
     // .img {
     //      max-width: 300px;
     // }
</style>
