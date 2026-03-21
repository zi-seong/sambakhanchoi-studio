import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IMAGES } from "../../utils/images";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Classes() {
  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 font-['Noto_Sans_KR',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h1 className="text-4xl md:text-5xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">수업 안내</h1>
        <p className="text-[#5c574f] tracking-widest text-sm uppercase">Pottery Classes</p>
      </motion.div>

      {/* Hero for Classes */}
      <section className="relative h-[60vh] md:h-[70vh] w-full mb-32 rounded-sm overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={IMAGES.wheelHands}
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
             <h2 className="text-3xl md:text-4xl font-['Noto_Serif_KR',serif] text-white mb-6">흙을 빚는 오롯한 시간</h2>
             <p className="text-white/90 text-sm md:text-base font-light tracking-wide max-w-md mx-auto leading-relaxed">
               손끝에 닿는 차가운 흙의 감촉과<br />
               부드럽게 돌아가는 물레의 리듬에 맞춰<br />
               복잡한 생각은 비우고 나만의 도자기를 만들어보세요.
             </p>
          </motion.div>
        </div>
      </section>

      {/* Class Types */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        {/* 원데이 클래스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-[#e5e0d8] p-10 md:p-14 rounded-sm flex flex-col h-full"
        >
          <div className="text-[#8b7355] text-xs font-bold tracking-widest mb-4">ONE-DAY CLASS</div>
          <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">원데이 클래스</h3>
          <p className="text-[#5c574f] text-sm leading-loose mb-10 flex-grow">
            처음 흙을 만져보시는 분들을 위한 체험형 수업입니다.
            물레 또는 핸드빌딩 방식을 선택하여, 
            나만의 컵, 접시, 혹은 작은 오브제를 완성해볼 수 있습니다.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3 text-sm text-[#2d2a26]">
              <CheckCircle2 className="w-5 h-5 text-[#8b7355] shrink-0" />
              <span>소요시간: 약 120분</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#2d2a26]">
              <CheckCircle2 className="w-5 h-5 text-[#8b7355] shrink-0" />
              <span>완성품: 1-2개의 도자기 (가마 소성 후 3~4주 뒤 수령)</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#2d2a26]">
              <CheckCircle2 className="w-5 h-5 text-[#8b7355] shrink-0" />
              <span>대상: 초보자 환영, 커플/친구/가족</span>
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
          <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-white mb-6">정규 클래스</h3>
          <p className="text-white/70 text-sm leading-loose mb-10 flex-grow">
            도예의 기초부터 심화 과정까지 체계적으로 배우는 수업입니다.
            흙 꼬막 밀기, 중심 잡기부터 시작해 다양한 형태의 기물을 만들고,
            직접 유약을 바르는 과정까지 전 과정을 경험할 수 있습니다.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3 text-sm text-white/90">
              <CheckCircle2 className="w-5 h-5 text-[#a8a196] shrink-0" />
              <span>진행방식: 주 1회 (월 4회 기준)</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/90">
              <CheckCircle2 className="w-5 h-5 text-[#a8a196] shrink-0" />
              <span>수업내용: 기초 핸드빌딩, 전기물레, 유약 시유 등</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/90">
              <CheckCircle2 className="w-5 h-5 text-[#a8a196] shrink-0" />
              <span>대상: 취미로 꾸준히 도예를 배우고 싶으신 분</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Process Steps */}
      <section className="bg-[#f5f5f0] p-10 md:p-16 rounded-sm mb-32">
        <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-12 text-center">도자기가 완성되는 과정</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          {[
             { step: "01", title: "흙 빚기 (성형)", desc: "손이나 물레를 이용해 형태를 만듭니다." },
             { step: "02", title: "건조 및 굽깎기", desc: "반건조 상태에서 바닥을 깎고 다듬습니다." },
             { step: "03", title: "초벌구이", desc: "800도 가마에서 1차로 구워냅니다." },
             { step: "04", title: "유약 및 재벌구이", desc: "색을 입힌 후 1250도에서 2차로 구워 완성합니다." }
          ].map((item, i) => (
             <div key={i} className="flex flex-col relative z-10 bg-white p-6 rounded-sm border border-[#e5e0d8] shadow-sm">
                <span className="text-[#8b7355] text-3xl font-['Noto_Serif_KR',serif] font-bold mb-4 opacity-50">{item.step}</span>
                <h4 className="text-lg font-bold text-[#2d2a26] mb-2">{item.title}</h4>
                <p className="text-sm text-[#5c574f] leading-relaxed">{item.desc}</p>
             </div>
          ))}
        </div>
        <p className="text-center text-[#5c574f] text-sm mt-10 tracking-wide">
          * 원데이 클래스 수강 시 완성품 수령까지 <span className="font-bold text-[#2d2a26]">약 3~4주</span>가 소요됩니다.
        </p>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">나만의 도자기를 빚어볼까요?</h3>
        <p className="text-[#5c574f] mb-10">궁금한 점이 있으시다면 언제든 편하게 문의해주세요.</p>
        <Link to="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-[#8b7355] text-white hover:bg-[#2d2a26] transition-colors rounded-sm text-sm tracking-widest gap-2 group">
          클래스 문의하기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
