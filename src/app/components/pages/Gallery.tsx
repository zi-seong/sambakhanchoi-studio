import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getGalleryItems } from "../../lib/contentRepository";
import type { GalleryItem } from "../../types/content";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Gallery() {
  const [filter, setFilter] = useState("전체");
  const [works, setWorks] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categories = ["전체", "식기", "다기", "오브제", "소품", "과정"];

  useEffect(() => {
    const loadWorks = async () => {
      try {
        setWorks(await getGalleryItems());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "작품 데이터를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadWorks();
  }, []);

  const filteredWorks =
    filter === "전체" ? works : works.filter((work) => work.category === filter);

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 font-['Noto_Sans_KR',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">작품 갤러리</h1>
        <p className="text-[#5c574f] tracking-widest text-sm uppercase">Gallery</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm transition-colors border ${
              filter === cat 
              ? "bg-[#2d2a26] text-white border-[#2d2a26]" 
              : "bg-white text-[#5c574f] border-[#e5e0d8] hover:border-[#2d2a26]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Masonry Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {isLoading ? (
          <div className="rounded-2xl border border-dashed border-[#e5e0d8] px-6 py-16 text-center text-sm text-[#5c574f]">
            작품 갤러리를 불러오는 중입니다.
          </div>
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="2rem">
              {filteredWorks.map((work, idx) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative cursor-pointer mb-8 overflow-hidden rounded-sm"
                >
                  <ImageWithFallback
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full block group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs text-white/80 tracking-widest mb-2 border border-white/30 px-2 py-1 self-start rounded-sm">{work.category}</span>
                    <h3 className="text-xl font-['Noto_Serif_KR',serif] text-white mb-2">{work.title}</h3>
                    <p className="text-sm text-white/90 font-light">{work.description}</p>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </motion.div>
    </div>
  );
}
