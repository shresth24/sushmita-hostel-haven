import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.resolve("dist");
const serverEntryPath = path.join(distDir, "server", "entry-server.js");

const rawSiteUrl =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.VERCEL_URL ||
  "";

const normalizeSiteUrl = (value) => {
  if (!value) return "";
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
};

const siteUrl = normalizeSiteUrl(rawSiteUrl);

const routes = ["/", "/girls-hostel-boring-road-patna", "/girls-hostel-rajapur-patna"];

const { render } = await import(pathToFileURL(serverEntryPath).href);

const template = await readFile(path.join(distDir, "index.html"), "utf8");

const stripSeoTags = (head) =>
  head
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta[^>]+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name="robots"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name="twitter:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<link[^>]+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>\s*/gi, "");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderSeoTags = (seo) => {
  if (!seo) return "";

  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type)}" />`,
    `<meta property="og:site_name" content="Sushmita Girls Hostel" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.imageUrl)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.imageUrl)}" />`,
    ...seo.structuredData.map(
      (entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`,
    ),
  ];

  return tags.join("\n    ");
};

const renderDocument = (appHtml, seo) =>
  template.replace(/<head>([\s\S]*?)<\/head>/i, (_match, headContent) => {
    const cleanHead = stripSeoTags(headContent).trimEnd();
    return `<head>${cleanHead}\n    ${renderSeoTags(seo)}\n  </head>`;
  }).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

for (const route of routes) {
  const { appHtml, seo } = render(route, siteUrl);
  const html = renderDocument(appHtml, seo);
  const outputPath =
    route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route.slice(1), "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

await rm(path.join(distDir, "server"), { recursive: true, force: true });
