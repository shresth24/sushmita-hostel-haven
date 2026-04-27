import { createContext, PropsWithChildren, useContext } from "react";

export interface SeoEntry {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  type: "website" | "article";
  robots: string;
  structuredData: Record<string, unknown>[];
}

interface SeoCapture {
  current: SeoEntry | null;
}

const SeoContext = createContext<SeoCapture | null>(null);

export const SeoProvider = ({
  children,
  capture,
}: PropsWithChildren<{ capture: SeoCapture }>) => (
  <SeoContext.Provider value={capture}>{children}</SeoContext.Provider>
);

export const useSeoCapture = () => useContext(SeoContext);
