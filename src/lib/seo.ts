const normalizeUrl = (value: string) => value.replace(/\/+$/, "");

export const getSiteUrl = () => {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();

  if (configuredUrl) {
    return normalizeUrl(configuredUrl);
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
