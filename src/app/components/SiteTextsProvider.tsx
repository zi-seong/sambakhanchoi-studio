import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_SITE_TEXTS } from "../lib/siteTextsDefaults";
import { getSiteTexts, updateSiteText } from "../lib/contentRepository";

interface SiteTextsContextValue {
  t: (key: string) => string;
  texts: Record<string, string>;
  refresh: () => Promise<void>;
  save: (key: string, value: string) => Promise<void>;
}

const defaultTexts = Object.fromEntries(
  Object.entries(DEFAULT_SITE_TEXTS).map(([k, v]) => [k, v.value])
);

const SiteTextsContext = createContext<SiteTextsContextValue>({
  t: (key) => DEFAULT_SITE_TEXTS[key]?.value ?? key,
  texts: defaultTexts,
  refresh: async () => {},
  save: async () => {},
});

export function SiteTextsProvider({ children }: { children: React.ReactNode }) {
  const [texts, setTexts] = useState<Record<string, string>>(defaultTexts);

  const loadTexts = async () => {
    try {
      const data = await getSiteTexts();
      setTexts({ ...defaultTexts, ...data });
    } catch {
      // defaults 유지
    }
  };

  useEffect(() => {
    void loadTexts();
  }, []);

  const t = (key: string) => texts[key] ?? DEFAULT_SITE_TEXTS[key]?.value ?? key;

  const save = async (key: string, value: string) => {
    await updateSiteText(key, value);
    setTexts((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SiteTextsContext.Provider value={{ t, texts, refresh: loadTexts, save }}>
      {children}
    </SiteTextsContext.Provider>
  );
}

export function useSiteTexts() {
  return useContext(SiteTextsContext);
}
