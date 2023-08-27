<script lang="ts">
     export let data
     let { supabase } = data
     $: ({ supabase } = data)

     let email: string
     let password: string

     const handleSignUp = async () => {
       await supabase.auth.signUp({
         email,
         password,
       })
     }
</script>
   
<form on:submit="{handleSignUp}">
     <input name="email" bind:value="{email}" />
     <input type="password" name="password" bind:value="{password}" />
     <button>Sign up</button>
</form>