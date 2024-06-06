import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { transformParsedJson } from '../plugins';

const BASE_URL = process.env.BASE_URL;
if (BASE_URL === undefined) {
  throw new Error('BASE_URL env var is required');
}

const postsPerPage = Number(process.env.VITE_POSTS_PER_PAGE) || 5;


const xml = readFileSync(`${process.cwd()}/src/content/index.xml`, 'utf8');
const parser = new XMLParser();


const parsed = transformParsedJson(parser.parse(xml))

const urls = parsed.map((page) => ({
  loc: `${BASE_URL}/blog/${page.slug}`,
  lastmod: new Date(page.date).toISOString().slice(0, 10),
  changefreq: 'yearly',
  priority: 0.8
}));

const noOfPages = Math.ceil(parsed.length / postsPerPage);

for (let i = 1; i <= noOfPages; i++) {
  urls.push({
    loc: `${BASE_URL}/page/${i}`,
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: 'never',
    priority: 0.5
  });
}

// push the root url
urls.push({
  loc: `${BASE_URL}/`,
  lastmod: new Date().toISOString().slice(0, 10),
  changefreq: 'never',
  priority: 1
});

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`).join('')}
</urlset>
`;

writeFileSync(resolve(process.cwd(), 'public', 'sitemap.xml'), sitemap);

