<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { invalidate } from '$app/navigation'
	import { navigating } from '$app/stores';
  import { afterUpdate, onMount } from 'svelte'

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

  :global(.group-section) {
    text-align: center;
    color: #eaeaea;
    background-color: #000000;
    border-radius: 3px;
    padding-top: 1rem;
    height: auto;
    h2 {
          font-size: 1.1rem;
    }
    .icon-title {
          color: #fff;
    }
    .more {
          display: inline-block;
          color: inherit;
          text-decoration: none;
          padding: .4rem .5rem;
          border-radius: 4px;
          margin-top: .5rem;
          margin-bottom: .7rem;
          font-size: .85rem;
          background-color: #373737;
          &:active {
              transform: scale(.95);
          }
    }
  }

  :global(.group-posts) {
    padding: .5rem;
    width: 100%;
    height: max-content;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: .5rem .1rem;
    border-radius: 3px;
    padding-top: 1rem;
    @media (min-width: 550px) {
          padding: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: .5rem .3rem;       
    };
    @media (min-width: 1000px) {
          padding: 1.5rem 1.5rem .5rem;
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