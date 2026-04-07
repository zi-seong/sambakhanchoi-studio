import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useSiteTexts } from "../SiteTextsProvider";
import { useSiteImages } from "../SiteImagesProvider";

export function Classes() {
  const { t } = useSiteTexts();
  const { img } = useSiteImages();

  const processSteps = [
    { step: "01", title: t("classes.process.step1.title"), desc: t("classes.process.step1.desc") },
    { step: "02", title: t("classes.process.step2.title"), desc: t("classes.process.step2.desc") },
    { step: "03", title: t("classes.process.step3.title"), desc: t("classes.process.step3.desc") },
    { step: "04", title: t("classes.process.step4.title"), desc: t("classes.process.step4.desc") },
  ];

  return (
    <div className="pt-16 md:pt-24 pb-16 md:pb-32 max-w-7xl mx-auto px-6 font-['Noto_Sans_KR',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h1 className="text-4xl md:text-5xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">{t("classes.title")}</h1>
        <p className="text-[#5c574f] tracking-widest text-sm uppercase">Pottery Classes</p>
      </motion.div>

      {/* Hero for Classes */}
      <section className="relative h-[60vh] md:h-[70vh] w-full mb-16 md:mb-32 rounded-sm overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={img("wheelHands")}
            alt="물레 수업"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-['Noto_Serif_KR',serif] text-white mb-6">{t("classes.hero.title")}</h2>
            <p className="text-white/90 text-sm md:text-base font-light tracking-wide max-w-md mx-auto leading-relaxed whitespace-pre-line">
              {t("classes.hero.body")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Class Types */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-32">
        {/* 원데이 클래스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-[#e5e0d8] p-10 md:p-14 rounded-sm flex flex-col h-full"
        >
          <div className="text-[#8b7355] text-xs font-bold tracking-widest mb-4">ONE-DAY CLASS</div>
          <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">{t("classes.oneday.title")}</h3>
          <p className="text-[#5c574f] text-sm leading-loose mb-10 flex-grow">
            {t("classes.oneday.body")}
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3 text-sm text-[#2d2a26]">
              <CheckCircle2 className="w-5 h-5 text-[#8b7355] shrink-0" />
              <span>{t("classes.oneday.item1")}</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#2d2a26]">
              <CheckCircle2 className="w-5 h-5 text-[#8b7355] shrink-0" />
              <span>{t("classes.oneday.item2")}</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#2d2a26]">
              <CheckCircle2 className="w-5 h-5 text-[#8b7355] shrink-0" />
              <span>{t("classes.oneday.item3")}</span>
            </li>
          </ul>
        </motion.div>

        {/* 정규 클래스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#2d2a26] text-white p-10 md:p-14 rounded-sm flex flex-col h-full"
        >
          <div className="text-[#a8a196] text-xs font-bold tracking-widest mb-4">REGULAR CLASS</div>
          <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-white mb-6">{t("classes.regular.title")}</h3>
          <p className="text-white/70 text-sm leading-loose mb-10 flex-grow">
            {t("classes.regular.body")}
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3 text-sm text-white/90">
              <CheckCircle2 className="w-5 h-5 text-[#a8a196] shrink-0" />
              <span>{t("classes.regular.item1")}</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/90">
              <CheckCircle2 className="w-5 h-5 text-[#a8a196] shrink-0" />
              <span>{t("classes.regular.item2")}</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/90">
              <CheckCircle2 className="w-5 h-5 text-[#a8a196] shrink-0" />
              <span>{t("classes.regular.item3")}</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Process Steps */}
      <section className="bg-[#f5f5f0] p-10 md:p-16 rounded-sm mb-16 md:mb-32">
        <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-12 text-center">{t("classes.process.title")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          {processSteps.map((item, i) => (
            <div key={i} className="flex flex-col relative z-10 bg-white p-6 rounded-sm border border-[#e5e0d8] shadow-sm">
              <span className="text-[#8b7355] text-3xl font-['Noto_Serif_KR',serif] font-bold mb-4 opacity-50">{item.step}</span>
              <h4 className="text-lg font-bold text-[#2d2a26] mb-2">{item.title}</h4>
              <p className="text-sm text-[#5c574f] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[#5c574f] text-sm mt-10 tracking-wide">
          {t("classes.process.note")}
        </p>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">{t("classes.cta.title")}</h3>
        <p className="text-[#5c574f] mb-10">{t("classes.cta.body")}</p>
        <Link to="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-[#8b7355] text-white hover:bg-[#2d2a26] transition-colors rounded-sm text-sm tracking-widest gap-2 group">
          클래스 문의하기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
