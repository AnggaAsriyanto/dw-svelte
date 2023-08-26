import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public" 

export async function GET({ setHeaders })  {
     setHeaders({
          'Content-Type': 'application/xml'
     });
          
     const site = 'https://overdoujin.com'
     const currentTime = new Date().toISOString();

     const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

     const staticUrls = [
          '/login',
          '/register'
     ]

     const contents = await supabase.from('contents').select('code')
     const contentUrls = contents.data?.map((content) => `/hentai/${content.code}`)

     const allUrls = [...staticUrls, ...contentUrls]

     let sitemap = '<?xml version="1.0" encoding="UTF-8" ?>\n';
     sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
     sitemap += `<url>
                    <loc>${site}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.7</priority>
                 </url>\n`;
   
     allUrls.forEach((url) => {
       sitemap += '<url>\n';
       sitemap += `<loc>${site}${url}</loc>\n`;
       sitemap += '<changefreq>weekly</changefreq>\n';
       sitemap += `<lastmod>${currentTime}</lastmod>\n`
       sitemap += '</url>\n';
     });
   
     sitemap += '</urlset>';
     return new Response(sitemap);
}