import { supabase } from '$lib/supabaseClient.js';

export async function GET()  {
     const site = 'https://overdoujin.com'

     const contents = await supabase.from('contents').select('code')
     const contentUrls = contents.data?.map((content) => `/hentai/${content.code}`)

     const allUrls = [...contentUrls]

     const sitemapXML = generateSitemap(allUrls, site)

     return {
          headers: {
               'Content-Type': 'application/xml',
          },
          body: sitemapXML,
     };
}

function generateSitemap(urls, site) {
     let sitemap = '<?xml version="1.0" encoding="UTF-8" ?>\n';
     sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
   
     urls.forEach((url) => {
       sitemap += '<url>\n';
       sitemap += `<loc>${site}${url}</loc>\n`;
       sitemap += '<changefreq>daily</changefreq>\n'; // Frekuensi perubahan (bisa disesuaikan)
       sitemap += '</url>\n';
     });
   
     sitemap += '</urlset>';
     return sitemap;
}