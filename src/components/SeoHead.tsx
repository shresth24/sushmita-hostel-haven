import { useEffect } from "react";
import { siteConfig } from "@/content/site";
import { toAbsoluteUrl } from "@/lib/seo";
import { useSeoCapture } from "@/lib/seoContext";

type StructuredData = Record<string, unknown>;

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  structuredData?: StructuredData | StructuredData[];
}

const upsertMeta = (selector: string, attribute: "name" | "property", value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, selector.match(/"(.+?)"/)?.[1] ?? "");
    document.head.appendChild(element);
  }

  element.setAttribute("content", value);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const removeExistingSchemas = () => {
  document.head
    .querySelectorAll('script[data-seo-schema="true"]')
    .forEach((element) => element.remove());
};

const SeoHead = ({
  title,
  description,
  path,
  image = siteConfig.image,
  type = "website",
  robots = "index,follow",
  structuredData,
}: SeoHeadProps) => {
  const seoCapture = useSeoCapture();
  const canonicalUrl = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);
  const schemaEntries = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  if (seoCapture) {
    seoCapture.current = {
      title,
      description,
      canonicalUrl,
      imageUrl,
      type,
      robots,
      structuredData: schemaEntries,
    };
  }

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', "name", description);
    upsertMeta('meta[name="robots"]', "name", robots);
    upsertMeta('meta[property="og:type"]', "property", type);
    upsertMeta('meta[property="og:site_name"]', "property", siteConfig.name);
    upsertMeta('meta[property="og:locale"]', "property", siteConfig.locale);
    upsertMeta('meta[property="og:title"]', "property", title);
    upsertMeta('meta[property="og:description"]', "property", description);
    upsertMeta('meta[property="og:url"]', "property", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", imageUrl);
    upsertMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", title);
    upsertMeta('meta[name="twitter:description"]', "name", description);
    upsertMeta('meta[name="twitter:image"]', "name", imageUrl);
    upsertLink("canonical", canonicalUrl);

    removeExistingSchemas();

    schemaEntries.forEach((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    });

    return () => {
      removeExistingSchemas();
    };
  }, [description, image, path, robots, structuredData, title, type]);

  return null;
};

export default SeoHead;
