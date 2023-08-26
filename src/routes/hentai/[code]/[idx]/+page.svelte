<script lang="ts">
	import { goto } from '$app/navigation';

     export let data;
     console.log(data)

     let imgIdx = parseInt(data.idx)
     let nextLink = `/hentai/${data.code}/${imgIdx + 1}`
     let prevLink = `/hentai/${data.code}/${imgIdx - 1}`

     function nextIdx() {
          goto(nextLink, { replaceState: true, invalidateAll: true })
     }

     function prevIdx() {
          goto(prevLink, { replaceState: true, invalidateAll: true })
     }
</script>

<p>Hello index { imgIdx }</p>
<button on:click={nextIdx}>next</button>
<button on:click={prevIdx}>prev</button>


