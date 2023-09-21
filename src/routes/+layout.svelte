<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { invalidate } from '$app/navigation'
	import { navigating } from '$app/stores';
  import { afterUpdate, onMount } from 'svelte'

  export let data
  let loadingTimeout: any;
  let loadingWait: any;

  console.log(data.session)

  let { supabase, session } = data
  $: ({ supabase, session } = data)
  $: {
    if(navigating) {
      console.log('load')
      loadingTimeout = setTimeout(() => {
        loadingWait = true
      }, 100)
    } else {
      clearTimeout(loadingTimeout)
      loadingWait = false
    }
  }

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => subscription.unsubscribe()
  });

  function setNavigating() {
    const loadBar = document.querySelector(".load-bar");
    
    if (navigating) {
      clearTimeout(loadingTimeout);
      loadingTimeout = setTimeout(() => {
        loadBar?.classList.add("loading");
      }, 100);
    } else {
      clearTimeout(loadingTimeout);
      loadBar?.classList.remove("loading");
    }
  }
</script>

<div class="load-bar { $navigating && loadingWait ? 'loading' : 'loaded'}"></div>

<header>

</header>

<main>
  <slot />
</main>

<footer>

</footer>

<style lang="scss">
  :global(*) {
    outline: none;
    list-style: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    width: 100vw;
    overflow-x: hidden;
    background-color: #151515;
    color: #fefefe;
  }

  main {
    position: relative;
    min-height: 100vh;
  }

  .load-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #f700ff;
    z-index: 9999;
    transform-origin: 0 100%;
    transform: scaleX(0);
    transition: transform 1s ease-out;
  }

  .load-bar.loading {
    transform: scaleX(1);
  }

  .load-bar.loaded {
    opacity: 0;
  }
</style>