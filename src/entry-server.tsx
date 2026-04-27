import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppProviders from "./AppProviders";
import AppRoutes from "./AppRoutes";
import { SeoProvider, type SeoEntry } from "./lib/seoContext";
import { setSiteUrlOverride, clearSiteUrlOverride } from "./lib/seo";

export const render = (url: string, siteUrl: string) => {
  const capture: { current: SeoEntry | null } = { current: null };

  setSiteUrlOverride(siteUrl);

  const appHtml = renderToString(
    <AppProviders>
      <SeoProvider capture={capture}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </SeoProvider>
    </AppProviders>,
  );

  clearSiteUrlOverride();

  return {
    appHtml,
    seo: capture.current,
  };
};
