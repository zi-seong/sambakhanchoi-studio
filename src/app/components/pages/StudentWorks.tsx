import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getStudentWorks } from "../../lib/contentRepository";
import type { StudentWork } from "../../types/content";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function StudentWorks() {
  const [works, setWorks] = useState<StudentWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setWorks(await getStudentWorks());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "수강생 작품을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 font-['Noto_Sans_KR',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">수강생 작품</h1>
        <p className="text-[#5c574f] tracking-widest text-sm uppercase">Student Works</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {isLoading ? (
          <div className="rounded-2xl border border-dashed border-[#e5e0d8] px-6 py-16 text-center text-sm text-[#5c574f]">
            수강생 작품을 불러오는 중입니다.
          </div>
        ) : works.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#e5e0d8] px-6 py-16 text-center text-sm text-[#5c574f]">
            등록된 수강생 작품이 없습니다.
          </div>
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="2rem">
              {works.map((work, idx) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative cursor-pointer mb-8 overflow-hidden rounded-sm"
                >
                  <ImageWithFallback
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full block group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-['Noto_Serif_KR',serif] text-white mb-1">{work.title}</h3>
                    <p className="text-sm text-white/80 mb-2">{work.studentName}</p>
                    {work.description && (
                      <p className="text-sm text-white/70 font-light">{work.description}</p>
                    )}
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
