import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "../../$types";

export const load: PageServerLoad = async ({ params, platform, cookies }) => {
     const { data } = await supabase.from('contents').select('*').eq("code", params.code).single();

     const option = {
          prefix: `contents/${params.code}`,
          include: ['customMetadata']
     }

     let imageContents
     const imageCookie = cookies.get(`image-${params.code}`)

     if(imageCookie) {
          imageContents = imageCookie
     } else { 
          imageContents = await platform?.env?.BUCKET.list(option) 
          cookies.set(`image-${params.code}`, JSON.stringify(imageContents))
     }

     return {
          content: data ?? [],
          imageContents: imageContents ? JSON.parse(imageContents) : []
     }
}