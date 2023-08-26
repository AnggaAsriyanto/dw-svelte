<script lang="ts">
	import { goto } from '$app/navigation';

     export let data;
     console.log(data)

     // let nextLink = `/hentai/${data.code}/${parseInt(data.idx) + 1}`
     // let prevLink = `/hentai/${data.code}/${parseInt(data.idx) - 1}`

     function nextIdx() {
          goto(`/hentai/${data.code}/${data.idx + 1}`, { replaceState: true, invalidateAll: true })
     }

     function prevIdx() {
          goto(`/hentai/${data.code}/${data.idx - 1}`, { replaceState: true, invalidateAll: true })
     }
</script>

<p>Hello index { data.idx }</p>
<button on:click={nextIdx}>next</button>
<button on:click={prevIdx}>prev</button>


