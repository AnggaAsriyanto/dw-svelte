import { supabase } from "$lib/supabaseClient";
import type { LayoutServerLoad } from "../../$types";

export const load: LayoutServerLoad = async ({ params, platform }) => {
     const { data } = await supabase.from('contents').select('*').eq("code", params.code).single();

     const option = {
          prefix: `contents/${params.code}`,
          include: ['customMetadata']
     }

     const imageRawList= await platform?.env?.BUCKET.list(option)
     const imageList = JSON.parse(JSON.stringify(imageRawList))

     return {
          content: data ?? [],
          images: imageList?.objects ?? []
     }
}