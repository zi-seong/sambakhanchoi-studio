import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_SITE_IMAGES } from "../lib/siteImagesDefaults";
import { getSiteImages, uploadSiteImage } from "../lib/contentRepository";

interface SiteImagesContextValue {
  img: (key: string) => string;
  images: Record<string, string>;
  upload: (key: string, file: File) => Promise<string>;
  refresh: () => Promise<void>;
}

const defaultImages = Object.fromEntries(
  Object.entries(DEFAULT_SITE_IMAGES).map(([k, v]) => [k, v.defaultUrl])
);

const SiteImagesContext = createContext<SiteImagesContextValue>({
  img: (key) => DEFAULT_SITE_IMAGES[key]?.defaultUrl ?? "",
  images: defaultImages,
  upload: async () => "",
  refresh: async () => {},
});

export function SiteImagesProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<Record<string, string>>(defaultImages);

  const loadImages = async () => {
    try {
      const data = await getSiteImages();
      setImages({ ...defaultImages, ...data });
    } catch {
      // defaults 유지
    }
  };

  useEffect(() => {
    void loadImages();
  }, []);

  const img = (key: string) => images[key] ?? DEFAULT_SITE_IMAGES[key]?.defaultUrl ?? "";

  const upload = async (key: string, file: File): Promise<string> => {
    const url = await uploadSiteImage(key, file);
    setImages((prev) => ({ ...prev, [key]: url }));
    return url;
  };

  return (
    <SiteImagesContext.Provider value={{ img, images, upload, refresh: loadImages }}>
      {children}
    </SiteImagesContext.Provider>
  );
}

export function useSiteImages() {
  return useContext(SiteImagesContext);
}
