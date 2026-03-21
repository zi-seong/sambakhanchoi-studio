import { motion } from "motion/react";
import { IMAGES } from "../../utils/images";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function About() {
  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 font-['Noto_Sans_KR',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-32"
      >
        <h1 className="text-4xl md:text-5xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">공방 이야기</h1>
        <p className="text-[#5c574f] tracking-widest text-sm uppercase">About Studio</p>
      </motion.div>

      {/* Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <ImageWithFallback src={IMAGES.warmInterior} alt="공방 내부" className="w-full aspect-[4/5] object-cover rounded-sm" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] leading-tight">
            삼박한최,<br />세가지 박자가 맞는 공간
          </h2>
          <div className="w-12 h-px bg-[#8b7355] my-4"></div>
          <p className="text-[#5c574f] leading-loose">
            흙, 불, 그리고 사람.<br />
            이 세 가지 요소가 조화롭게 어우러지는 곳, 삼박한최 공방입니다.
          </p>
          <p className="text-[#5c574f] leading-loose">
            우리는 자연에서 온 재료에 사람의 온기를 더해, 
            일상에서 오래도록 쓰일 수 있는 도자기를 빚습니다. 
            화려한 기교보다는 쓰임새를 먼저 생각하며, 
            시간이 지날수록 손때가 묻어 더욱 아름다워지는 그릇을 추구합니다.
          </p>
        </motion.div>
      </section>

      {/* Process/Tools Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 aspect-[16/9] md:aspect-auto h-[60vh]"
        >
          <ImageWithFallback src={IMAGES.toolsClay} alt="작업 도구" className="w-full h-full object-cover rounded-sm" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#f5f5f0] p-12 flex flex-col justify-center rounded-sm"
        >
          <h3 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">천천히, 묵묵하게</h3>
          <p className="text-[#5c574f] leading-loose text-sm">
            도자기를 만드는 과정은 기다림의 연속입니다. 
            흙을 빚고 말리는 시간, 초벌과 재벌을 거치며 
            불 속에서 견디는 시간. 
            그 모든 과정을 조급해하지 않고 묵묵히 지켜보며 
            가장 자연스러운 결과물을 기다립니다.
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
            {/* Using a general craft/pottery person image here since we don't have a specific portrait, 
                or maybe the hand making pottery is better if we want to stay abstract */}
            <ImageWithFallback src={IMAGES.wheelHands} alt="작가 사진" className="w-full h-full object-cover grayscale" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#8b7355] text-sm tracking-widest mb-2 font-medium">도예가</p>
            <h3 className="text-3xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">최도예</h3>
            <p className="text-[#5c574f] leading-loose mb-6 text-sm md:text-base">
              "쓰는 사람의 온도가 더해질 때, 비로소 도자기가 완성된다고 믿습니다.<br />
              너무 무겁지 않되 깊이가 있고, 가볍지 않되 편안한 그릇을 만들고자 합니다."
            </p>
            <ul className="text-[#a8a196] text-sm space-y-2 font-light">
              <li>2020 한국도자재단 신진작가 공모전 입상</li>
              <li>2021 개인전 '흙의 시간' (갤러리 아토)</li>
              <li>2023 삼박한최 도예공방 오픈</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
