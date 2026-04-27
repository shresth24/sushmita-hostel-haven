const normalizeUrl = (value: string) => value.replace(/\/+$/, "");
let siteUrlOverride = "";

export const setSiteUrlOverride = (value: string) => {
  siteUrlOverride = normalizeUrl(value);
};

export const clearSiteUrlOverride = () => {
  siteUrlOverride = "";
};

export const getSiteUrl = () => {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();

  if (configuredUrl) {
    return normalizeUrl(configuredUrl);
  }

  if (siteUrlOverride) {
    return siteUrlOverride;
  }

  if (typeof window !== "undefined") {
    return normalizeUrl(window.location.origin);
  }

  return "";
};

export const toAbsoluteUrl = (path: string) => {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return path;
  }

  return new URL(path, `${siteUrl}/`).toString();
};
