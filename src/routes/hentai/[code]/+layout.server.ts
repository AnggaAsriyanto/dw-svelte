import { supabase } from "$lib/supabaseClient";
import type { LayoutServerLoad } from "../../$types";

export const load: LayoutServerLoad = async ({ params, platform }) => {
     const { data } = await supabase.from('contents').select('*').eq("code", params.code).single();

     const option = {
          prefix: `contents/${params.code}`,
          include: ['customMetadata']
     }

     const imageContents = await platform?.env?.BUCKET.list(option) 

     return {
          content: data ?? [],
          imageContents: imageContents ? JSON.parse(JSON.stringify(imageContents)) : []
     }
}