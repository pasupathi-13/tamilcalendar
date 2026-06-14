/**
 * prerender.mjs
 * Run after `vite build` to generate static HTML files for each route.
 * Usage: node prerender.mjs
 *
 * This makes Google crawl real HTML content per page instead of an empty shell.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Page metadata for each route (used to inject SEO tags into pre-rendered HTML)
const routes = [
  {
    path: '/',
    title: 'Tamil Calendar 2026 | Today Tamil Calendar, Nalla Neram, Rahu Kalam',
    description: 'Online Tamil Calendar 2026 with Nalla Neram, Rahu Kalam, Daily Panchangam, Muhurtham Dates, and Tamil Nadu Government Holidays.',
    canonical: 'https://tamilcalendar.vercel.app/',
  },
  {
    path: '/daily',
    title: 'Daily Tamil Calendar 2026 | Panchangam, Tithi, Nakshatra',
    description: 'Today Tamil Panchangam with Tithi, Nakshatra, Yogam, Karanam, Nalla Neram, Rahu Kalam, Emagandam, and Kuligai timings.',
    canonical: 'https://tamilcalendar.vercel.app/daily',
  },
  {
    path: '/monthly',
    title: 'Monthly Tamil Calendar 2026 | மாதாந்திர நாட்காட்டி',
    description: 'View monthly Tamil calendar for 2026 with important Tamil dates, festivals, and auspicious days for each month.',
    canonical: 'https://tamilcalendar.vercel.app/monthly',
  },
  {
    path: '/nalla-neram',
    title: 'Nalla Neram Today 2026 | நல்ல நேரம் | Auspicious Timings',
    description: 'Today Nalla Neram, Gowri Nalla Neram, Rahu Kalam, Emagandam, and Kuligai timings for Tamil Nadu. Daily auspicious timings.',
    canonical: 'https://tamilcalendar.vercel.app/nalla-neram',
  },
  {
    path: '/muhurtham',
    title: 'Muhurtham Dates 2026 & 2027 | திருமண முகூர்த்த தேதிகள்',
    description: 'Tamil wedding Muhurtham dates for 2026 and 2027. Auspicious marriage dates with detailed panchangam information.',
    canonical: 'https://tamilcalendar.vercel.app/muhurtham',
  },
  {
    path: '/festivals',
    title: 'Tamil Festivals 2026 | தமிழ் திருவிழாக்கள்',
    description: 'Complete list of Tamil festivals in 2026 including Pongal, Deepavali, Karthigai Deepam, Aadi Perukku and all major Tamil Nadu festivals.',
    canonical: 'https://tamilcalendar.vercel.app/festivals',
  },
  {
    path: '/holidays',
    title: 'Tamil Nadu Government Holidays 2026 | அரசு விடுமுறைகள்',
    description: 'Complete list of Tamil Nadu government holidays and public holidays for 2026. Official holiday calendar for Tamil Nadu.',
    canonical: 'https://tamilcalendar.vercel.app/holidays',
  },
  {
    path: '/chandrashtamam',
    title: 'Chandrashtamam 2026 | சந்திராஷ்டமம் | All Rasi Timings',
    description: 'Chandrashtamam dates and timings for all 12 Rasi in 2026. Know when to avoid important activities based on your moon sign.',
    canonical: 'https://tamilcalendar.vercel.app/chandrashtamam',
  },
  {
    path: '/about',
    title: 'About Tamil Calendar 2026 | பற்றி',
    description: 'About Tamil Calendar 2026 - A complete Tamil panchangam app with daily timings, festivals, holidays, and muhurtham dates.',
    canonical: 'https://tamilcalendar.vercel.app/about',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Tamil Calendar 2026',
    description: 'Privacy policy for Tamil Calendar 2026 website. Learn how we handle your data and protect your privacy.',
    canonical: 'https://tamilcalendar.vercel.app/privacy',
  },
];

function buildHtml(route) {
  // Inject SEO meta tags and canonical into the <head> of the built index.html
  const metaTags = `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${route.canonical}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ta_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
  `;

  return indexHtml.replace('</head>', `${metaTags}</head>`);
}

// Generate HTML file for each route
for (const route of routes) {
  const html = buildHtml(route);

  if (route.path === '/') {
    // Root is already dist/index.html — overwrite with enriched version
    fs.writeFileSync(path.join(distDir, 'index.html'), html);
    console.log(`✅ Updated: /index.html`);
  } else {
    // Create a folder per route with an index.html inside
    // e.g. dist/daily/index.html → served at /daily
    const routeDir = path.join(distDir, route.path.slice(1));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    console.log(`✅ Created: ${route.path}/index.html`);
  }
}

console.log('\n🎉 Pre-rendering complete! All routes have static HTML files.');
console.log('📌 Google Search Console can now crawl each URL individually.\n');
