import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
     const { data } = await supabase.from('contents').select().order('id', { ascending: false }).limit(20);
     return {
          contents: data ?? []
     }
}