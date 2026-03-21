import { motion } from "motion/react";
import { Send, MapPin, Phone, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createInquiry } from "../../lib/contentRepository";
import type { InquiryType } from "../../types/content";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    type: "클래스 문의" as InquiryType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await createInquiry(formData);
      toast.success("문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.");
      setFormData({ name: "", contact: "", type: "클래스 문의", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "문의 접수에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: name === "type" ? (value as InquiryType) : value,
    }));
  };

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 font-['Noto_Sans_KR',sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h1 className="text-4xl md:text-5xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6">문의하기</h1>
        <p className="text-[#5c574f] tracking-widest text-sm uppercase">Contact Us</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-12"
        >
          <div>
            <h2 className="text-2xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-4">어떤 점이 궁금하신가요?</h2>
            <p className="text-[#5c574f] leading-loose mb-8">
              수업 안내, 도자기 구매, 협업 제안 등 궁금한 점을 남겨주시면 
              확인 후 이메일이나 문자로 정성껏 답변해 드리겠습니다.
            </p>
          </div>

          <div className="space-y-8 bg-[#f5f5f0] p-10 rounded-sm">
            <h3 className="text-lg font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-6 border-b border-[#e5e0d8] pb-4">공방 정보</h3>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#8b7355] mt-1 shrink-0" />
              <div>
                <p className="font-medium text-[#2d2a26] mb-1">오시는 길</p>
                <p className="text-sm text-[#5c574f] leading-relaxed">
                  서울시 종로구 북촌로 123<br />
                  (안국역 2번 출구에서 도보 10분)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#8b7355] mt-1 shrink-0" />
              <div>
                <p className="font-medium text-[#2d2a26] mb-1">전화 문의</p>
                <p className="text-sm text-[#5c574f]">02-1234-5678</p>
                <p className="text-xs text-[#a8a196] mt-1">화-토 11:00 - 19:00 (일,월 휴무)</p>
              </div>
            </div>

            <div className="pt-4 flex gap-4 border-t border-[#e5e0d8] mt-4">
              <a href="#" className="flex items-center gap-2 text-sm text-[#5c574f] hover:text-[#2d2a26] transition-colors">
                <Instagram className="w-4 h-4" /> 인스타그램
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-[#5c574f] hover:text-[#2d2a26] transition-colors">
                <MessageCircle className="w-4 h-4" /> 카카오톡 채널
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-white border border-[#e5e0d8] p-10 md:p-14 rounded-sm flex flex-col gap-6">
            <h3 className="text-xl font-['Noto_Serif_KR',serif] text-[#2d2a26] mb-4 border-b border-[#e5e0d8] pb-4">온라인 문의</h3>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#2d2a26] mb-2">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e5e0d8] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#8b7355] focus:border-[#8b7355] transition-colors text-sm"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-[#2d2a26] mb-2">연락처 또는 이메일</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e5e0d8] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#8b7355] focus:border-[#8b7355] transition-colors text-sm"
                placeholder="010-0000-0000 또는 example@email.com"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-[#2d2a26] mb-2">문의 유형</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e5e0d8] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#8b7355] focus:border-[#8b7355] transition-colors text-sm text-[#2d2a26]"
              >
                <option value="클래스 문의">클래스 문의</option>
                <option value="작품 구매 문의">작품 구매 문의</option>
                <option value="주문제작/답례품">주문제작/답례품 문의</option>
                <option value="기타">기타 문의</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#2d2a26] mb-2">문의 내용</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e5e0d8] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#8b7355] focus:border-[#8b7355] transition-colors text-sm resize-none"
                placeholder="문의하실 내용을 상세히 적어주세요."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full py-4 bg-[#2d2a26] text-white hover:bg-[#8b7355] transition-colors rounded-sm text-sm tracking-widest flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? "접수 중..." : "문의 보내기"} <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-center text-[#a8a196] mt-2">
              입력하신 개인정보는 문의 답변을 위해서만 사용됩니다.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
