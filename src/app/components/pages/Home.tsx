import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "../../utils/images";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-[#e5e0d8] overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <ImageWithFallback
            src={IMAGES.hero}
            alt="공방 대표 이미지"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-['Noto_Serif_KR',serif] mb-6 tracking-wide leading-tight"
          >
            흙과 불, 그리고<br />
            기다림의 시간
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-light tracking-widest max-w-lg mb-10 text-white/90"
          >
            삼박한최 공방은 일상에 스며드는 따뜻한 도자기를 빚습니다.
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
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-8">손끝에서 피어나는 담백함</h2>
          <p className="text-[#5c574f] leading-loose text-lg">
            자연스러운 흙의 질감과 차분한 유약의 색상.<br className="hidden md:block" />
            우리의 일상 속 식탁과 공간에 스며들어 편안함을 주는 도자기를 만듭니다.<br className="hidden md:block" />
            삼박한최 공방의 모든 작품은 작가의 세심한 손길로 완성되는 단 하나의 공예품입니다.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 mt-10 text-[#8b7355] hover:text-[#2d2a26] transition-colors border-b border-transparent hover:border-[#2d2a26] pb-1">
            <span className="text-sm tracking-widest">공방 이야기 더보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Featured Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-2">대표 작품</h2>
              <p className="text-[#5c574f] tracking-wide">삼박한최의 시그니처 시리즈</p>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-2 text-sm text-[#5c574f] hover:text-[#2d2a26] transition-colors">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: IMAGES.celadon, title: "청자 다기 세트", desc: "은은한 비색이 감도는 찻자리" },
              { img: IMAGES.whitePorcelain, title: "백자 달항아리", desc: "비움과 채움의 미학" },
              { img: IMAGES.handmadeCups, title: "데일리 머그", desc: "손에 착 감기는 편안함" }
            ].map((item, i) => (
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
      <section className="py-32 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ImageWithFallback src={IMAGES.wheelHands} alt="물레 작업" className="w-full aspect-square object-cover" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">흙을 만지는 시간,<br/>오롯이 나에게 집중하는 순간</h2>
            <p className="text-[#5c574f] leading-loose mb-10">
              차분한 공방에서 흙을 만지며 일상의 스트레스를 비워보세요.<br/>
              초보자도 쉽게 따라할 수 있는 원데이 클래스부터,<br/>
              깊이 있게 배우는 정규반까지 다양한 수업이 준비되어 있습니다.
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
