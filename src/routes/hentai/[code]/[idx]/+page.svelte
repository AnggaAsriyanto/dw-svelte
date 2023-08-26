<script lang="ts">
	import { goto } from '$app/navigation';

     export let data;
     console.log(data)

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
</script>

<p>Hello index { data.idx }</p>
<button on:click={prevIdx}>prev</button>
<button on:click={nextIdx}>next</button>


