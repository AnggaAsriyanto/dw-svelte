<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { invalidate } from '$app/navigation'
	import { navigating } from '$app/stores';
  import { onMount } from 'svelte'
  import '../app.scss'

  export let data
  
  let isLoading: any = false;
  let timeout: any;
  console.log(data.session)

  let { supabase, session } = data
  $: ({ supabase, session } = data)

  $: if ($navigating) {
    timeout = setTimeout(() => {
      isLoading = true;
    }, 1000);
  }

  $: if (!$navigating) {
    clearTimeout(timeout);
    isLoading = false;
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
</script>

<div class="load-bar { isLoading ? 'loading' : 'loaded'}"></div>

<header>

</header>

<main>
  <div class="container">
    <slot />
  </div>
</main>

<footer>

</footer>

<style lang="scss">
  .container {
    padding: 1rem 0 0;
    @media (min-width: 550px) {
          padding: 1rem;
    }
    @media (min-width: 1000px) {
          padding: 1rem 3rem 1rem 1.8rem;
    }
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