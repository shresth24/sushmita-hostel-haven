import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const rawSiteUrl =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.VERCEL_URL ||
  "";

const normalizeSiteUrl = (value) => {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
};

const siteUrl = rawSiteUrl ? normalizeSiteUrl(rawSiteUrl) : "";
const publicDir = path.resolve("public");

const routes = [
  "/",
  "/girls-hostel-boring-road-patna",
  "/girls-hostel-rajapur-patna",
];

const lastModified = new Date().toISOString();

await mkdir(publicDir, { recursive: true });

if (!siteUrl) {
  await rm(path.join(publicDir, "sitemap.xml"), { force: true });
  await writeFile(
    path.join(publicDir, "robots.txt"),
    `User-agent: *
Allow: /
`,
    "utf8",
  );
  console.warn(
    "[seo] VITE_SITE_URL was not set. Skipped sitemap generation and wrote a minimal robots.txt. Set VITE_SITE_URL before deploying.",
  );
} else {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`,
    )
    .join("\n")}
</urlset>
`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  await writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
  await writeFile(path.join(publicDir, "robots.txt"), robots, "utf8");
}
