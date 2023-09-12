<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { invalidate } from '$app/navigation'
	import { navigating } from '$app/stores';
  import { onMount } from 'svelte'

  export let data

  console.log(data.session)

  let { supabase, session } = data
  $: ({ supabase, session } = data)

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
</script>

<div class="load-bar { $navigating ? 'loading' : 'loaded'}"></div>

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
    right: 0;
    width: 100%;
    height: 3px;
    background-color: #007bff;
    z-index: 9999;
    transform-origin: 100% 0;
    transform: scaleX(0);
    transition: transform 1s ease-out;
  }

  .load-bar.loading {
    transform: scaleX(1);
  }

  .load-bar.loaded {
    opacity: 0;
    transform: scaleX(1);
    transition: opacity transform .1s; 
  }
</style>