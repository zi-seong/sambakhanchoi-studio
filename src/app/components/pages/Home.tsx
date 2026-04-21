import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useSiteTexts } from "../SiteTextsProvider";
import { useSiteImages } from "../SiteImagesProvider";
import { getNotices } from "../../lib/contentRepository";
import type { Notice } from "../../types/content";

export function Home() {
  const { t } = useSiteTexts();
  const { img } = useSiteImages();
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    getNotices()
      .then((data) => setNotices(data.filter((n) => n.isActive)))
      .catch(() => {});
  }, []);

  const works = [
    { img: img("celadon"), title: t("home.works.item1.title"), desc: t("home.works.item1.desc") },
    { img: img("whitePorcelain"), title: t("home.works.item2.title"), desc: t("home.works.item2.desc") },
    { img: img("handmadeCups"), title: t("home.works.item3.title"), desc: t("home.works.item3.desc") },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-[#1c1a18] overflow-hidden">
        {/* 모바일: 이미지 fallback */}
        <div className="md:hidden absolute inset-0 w-full h-full">
          <ImageWithFallback
            src={img("hero")}
            alt="공방 대표 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 데스크탑: 유튜브 영상 */}
        <div className="hidden md:block absolute inset-0">
          <iframe
            src="https://www.youtube.com/embed/ZSJSWPxy72A?autoplay=1&mute=1&loop=1&playlist=ZSJSWPxy72A&controls=0&rel=0&modestbranding=1&start=74"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.78vh] h-[56.25vw] scale-[1.5]"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-['Noto_Serif_KR',serif] mb-6 tracking-wide leading-tight whitespace-pre-line"
          >
            {t("home.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-light tracking-widest max-w-lg mb-10 text-white/90"
          >
            {t("home.hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4"
          >
            <Link to="/contact" className="px-8 py-3 bg-[#8b7355] text-white hover:bg-[#6b583f] transition-colors rounded-sm text-sm tracking-widest">
              판매 문의
            </Link>
            <Link to="/classes" className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/50 text-white hover:bg-white hover:text-[#1c1a18] transition-colors rounded-sm text-sm tracking-widest">
              수업 안내
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Intro */}
      <section className="py-16 md:py-32 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-8">{t("home.brand.title")}</h2>
          <p className="text-[#5c574f] leading-loose text-lg whitespace-pre-line">
            {t("home.brand.body")}
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 mt-10 text-[#8b7355] hover:text-[#2d2a26] transition-colors border-b border-transparent hover:border-[#2d2a26] pb-1">
            <span className="text-sm tracking-widest">공방 이야기 더보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Notices */}
      {notices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26]">공지사항</h2>
                <span className="text-xs text-[#8b7355] tracking-widest uppercase">Notice</span>
              </div>
              <ul className="divide-y divide-[#e5e0d8]">
                {notices.map((notice) => (
                  <li key={notice.id} className="py-5 flex gap-8 md:gap-16">
                    <span className="shrink-0 w-24 text-xs text-[#8b7355] tracking-wide pt-1">
                      {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#2d2a26] mb-1">{notice.title}</p>
                      <p className="text-sm text-[#5c574f] leading-relaxed whitespace-pre-line">{notice.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-2">{t("home.works.title")}</h2>
              <p className="text-[#5c574f] tracking-wide">{t("home.works.subtitle")}</p>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-2 text-sm text-[#5c574f] hover:text-[#2d2a26] transition-colors">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {works.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#f5f5f0] mb-6">
                  <ImageWithFallback src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="text-xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-2">{item.title}</h3>
                <p className="text-sm text-[#5c574f]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm text-[#5c574f] hover:text-[#2d2a26] transition-colors">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Atmosphere / Classes Teaser */}
      <section className="py-16 md:py-32 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ImageWithFallback src={img("wheelHands")} alt="물레 작업" className="w-full aspect-square object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6 whitespace-pre-line">{t("home.classes.title")}</h2>
            <p className="text-[#5c574f] leading-loose mb-10 whitespace-pre-line">
              {t("home.classes.body")}
            </p>
            <Link to="/classes" className="px-8 py-3 border border-[#2d2a26] text-[#2d2a26] hover:bg-[#2d2a26] hover:text-white transition-colors rounded-sm text-sm tracking-widest">
              수업 알아보기
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
