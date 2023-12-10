import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { json } from "@sveltejs/kit";

const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY)

export async function POST({ request }) {
     const body = await request.json()

     const res = await supabase.from('reads').insert(body)

     return json([body, res])
}