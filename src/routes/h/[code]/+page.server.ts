import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";
import { s3 } from "$lib/s3";
import {
     ListObjectsV2Command,
   } from "@aws-sdk/client-s3";

export const load: PageServerLoad = async ({ params, platform }) => {
     const { data } = await supabase.from('contents').select('*').eq("code", params.code).single();

     const listObjectsResponse = await s3.send(new ListObjectsV2Command({ Bucket: 'overdoujin', Prefix: `contents/${params.code}/` }))

     const option = {
          prefix: `contents/${params.code}`,
          include: ['customMetadata']
     }

     const test = await platform?.env?.BUCKET.list(option) 

     return {
          content: data ?? [],
          list: listObjectsResponse ?? [],
          test: test ? JSON.parse(JSON.stringify(test)) : []
     }
}