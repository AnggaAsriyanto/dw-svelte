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
          prefix: 'covers'
     }

     const test = await platform?.env?.BUCKET.list(option)

     // const metadataPromises = listObjectsResponse?.Contents?.map(async (object) => {
     //      const metadata = await s3.send(new HeadObjectCommand({ Bucket: 'overdoujin', Key: object.Key }))
     //      return { key: object.Key, metadata: metadata.Metadata};
     // });

     // const response = await s3.send(new HeadObjectCommand({ Bucket: 'overdoujin', Key: 'contents/unofg/01_unofg.png' }))

     // const images = await Promise.all(metadataPromises);     

     return {
          content: data ?? [],
          list: listObjectsResponse ?? [],
          test: test ?? []
     }
}