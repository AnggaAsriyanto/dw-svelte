import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
     const { data } = await supabase.from('contents').select('*').eq("code", params.code).single();
     return {
          content: data ?? []
     }
}