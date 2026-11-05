import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { missingDetails, pageMeta, storeData } from './src/seo.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// After building, writes a copy of index.html for each page (shop/index.html etc.) with that page's
// title and description. Without these, GitHub Pages answers /shop with "404 Not Found", so a refresh
// or a link from Google breaks and only the home page can show up in search results.
// Also writes 404.html, sitemap.xml and robots.txt, and adds the shop's details for Google.
function seoPages(siteUrl) {
  let outDir;
  const page = (html, path, { title, description, noindex }) => {
    const url = siteUrl + (path === '/' ? '/' : path + '/');
    const head = noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`;
    return html
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
      .replace('</head>', head + '\n</head>');
  };
  const write = (file, text) => {
    mkdirSync(resolve(outDir, file, '..'), { recursive: true });
    writeFileSync(resolve(outDir, file), text);
  };

  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const json = JSON.stringify(storeData(siteUrl)).replace(/</g, '\\u003c');
      const html = readFileSync(resolve(outDir, 'index.html'), 'utf8')
        .replace('</head>', `<script type="application/ld+json">${json}</script>\n</head>`);

      for (const [path, meta] of Object.entries(pageMeta)) {
        write(path === '/' ? 'index.html' : path.slice(1) + '/index.html', page(html, path, meta));
      }
      const hidden = { title: 'Admin – [SHOP NAME]', description: 'Staff only.', noindex: true };
      write('admin/index.html', page(html, '/admin', hidden));
      // Any other address: the app shows the home page, but search engines shouldn't list it.
      write('404.html', page(html, '/', { ...pageMeta['/'], noindex: true }));

      const day = new Date().toISOString().slice(0, 10);
      const urls = Object.entries(pageMeta)
        .filter(([, m]) => !m.noindex)
        .map(([path]) => `  <url><loc>${siteUrl}${path === '/' ? '/' : path + '/'}</loc><lastmod>${day}</lastmod></url>`);
      write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
      write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

      const missing = missingDetails();
      if (missing.length) {
        console.warn(`\nGoogle won't get the shop's ${missing.join(', ')} until the placeholders in src/data.js are filled in.`);
      }
    }
  };
}

// BASE_PATH is the folder the site is served from, e.g. "/cardshop/" on
// https://YOUR-USERNAME.github.io/cardshop/. Leave it unset for a custom domain.
// VITE_SITE_URL is the full address, set in .env and the deploy workflow.
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '');
  return {
    plugins: [react(), seoPages(siteUrl)],
    base: process.env.BASE_PATH || '/'
  };
});
