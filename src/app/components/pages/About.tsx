import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useSiteTexts } from "../SiteTextsProvider";
import { useSiteImages } from "../SiteImagesProvider";

export function About() {
  const { t } = useSiteTexts();
  const { img } = useSiteImages();

  return (
    <div className="pt-16 md:pt-24 pb-16 md:pb-32 max-w-7xl mx-auto px-6 font-['Noto_Sans_KR',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-32"
      >
        <h1 className="text-4xl md:text-5xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">{t("about.title")}</h1>
        <p className="text-[#5c574f] tracking-widest text-sm uppercase">About Studio</p>
      </motion.div>

      {/* Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16 md:mb-40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <ImageWithFallback src={img("warmInterior")} alt="공방 내부" className="w-full aspect-[4/5] object-cover rounded-sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] leading-tight whitespace-pre-line">
            {t("about.philosophy.title")}
          </h2>
          <div className="w-12 h-px bg-[#8b7355] my-4"></div>
          <p className="text-[#5c574f] leading-loose whitespace-pre-line">
            {t("about.philosophy.body1")}
          </p>
          <p className="text-[#5c574f] leading-loose">
            {t("about.philosophy.body2")}
          </p>
        </motion.div>
      </section>

      {/* Process/Tools Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 aspect-[16/9] md:aspect-auto md:h-[60vh]"
        >
          <ImageWithFallback src={img("toolsClay")} alt="작업 도구" className="w-full h-full object-cover rounded-sm" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#f5f5f0] p-8 md:p-12 flex flex-col justify-center rounded-sm"
        >
          <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">{t("about.process.title")}</h3>
          <p className="text-[#5c574f] leading-loose text-sm">
            {t("about.process.body")}
          </p>
        </motion.div>
      </section>

      {/* Artist Profile */}
      <section className="bg-white border border-[#e5e0d8] p-8 md:p-16 rounded-sm">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#faf9f6]"
          >
            <ImageWithFallback src={img("wheelHands")} alt="작가 사진" className="w-full h-full object-cover grayscale" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#8b7355] text-sm tracking-widest mb-2 font-medium">{t("about.artist.role")}</p>
            <h3 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">{t("about.artist.name")}</h3>
            <p className="text-[#5c574f] leading-loose mb-6 text-sm md:text-base whitespace-pre-line">
              {t("about.artist.quote")}
            </p>
            <ul className="text-[#a8a196] text-sm space-y-2 font-light">
              <li>{t("about.artist.career1")}</li>
              <li>{t("about.artist.career2")}</li>
              <li>{t("about.artist.career3")}</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
