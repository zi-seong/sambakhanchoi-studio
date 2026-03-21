import { useEffect, useState } from "react";
import { MailOpen, MessageCircleMore } from "lucide-react";
import { toast } from "sonner";
import { getInquiries, updateInquiryStatus } from "../../lib/contentRepository";
import type { Inquiry, InquiryStatus } from "../../types/content";

const statusLabelMap: Record<InquiryStatus, string> = {
  new: "신규",
  in_progress: "진행 중",
  done: "응답 완료",
};

const statusClassMap: Record<InquiryStatus, string> = {
  new: "bg-[#efe1d2] text-[#8b7355]",
  in_progress: "bg-[#e7efe0] text-[#5b7d42]",
  done: "bg-[#dedce9] text-[#625a82]",
};

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      setInquiries(await getInquiries());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "문의 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((current) =>
        current.map((inquiry) => (inquiry.id === id ? { ...inquiry, status } : inquiry)),
      );
      toast.success("문의 상태가 업데이트되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "상태 변경에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#8b7355]">Admin</p>
          <h1 className="text-4xl font-['Noto_Serif_KR',serif]">문의 관리</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#5c574f]">
          공개 문의 폼으로 접수된 내용을 확인하고 상태를 관리합니다.
        </p>
      </section>

      <section className="rounded-[2rem] bg-white/70 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-['Noto_Serif_KR',serif]">접수된 문의</h2>
          <span className="text-sm text-[#5c574f]">{inquiries.length}건</span>
        </div>

        {loading ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#d8caba] px-6 py-10 text-center text-sm text-[#5c574f]">
            문의 목록을 불러오는 중입니다.
          </div>
        ) : inquiries.length === 0 ? (
          <div className="mt-6 rounded-[1.5rem] bg-[#f9f5ef] px-6 py-12 text-center">
            <MailOpen className="mx-auto h-6 w-6 text-[#8b7355]" />
            <p className="mt-4 text-lg font-['Noto_Serif_KR',serif]">아직 접수된 문의가 없습니다.</p>
            <p className="mt-2 text-sm text-[#5c574f]">
              공개 사이트의 문의 폼이 접수되면 이 목록에 자동으로 쌓입니다.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {inquiries.map((inquiry) => (
              <article key={inquiry.id} className="rounded-[1.5rem] border border-[#e4d7c9] bg-[#fcfaf7] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#efe1d2] px-3 py-1 text-xs text-[#8b7355]">
                        {inquiry.type}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${statusClassMap[inquiry.status]}`}
                      >
                        {statusLabelMap[inquiry.status]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-['Noto_Serif_KR',serif]">{inquiry.name}</h3>
                      <p className="mt-1 text-sm text-[#5c574f]">{inquiry.contact}</p>
                    </div>
                    <p className="text-sm leading-7 text-[#3d3933]">{inquiry.message}</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-[#8b7355]">
                      {new Date(inquiry.createdAt).toLocaleString("ko-KR")}
                    </p>
                  </div>

                  <div className="min-w-[180px] rounded-2xl bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm text-[#5c574f]">
                      <MessageCircleMore className="h-4 w-4" />
                      처리 상태
                    </div>
                    <select
                      value={inquiry.status}
                      onChange={(event) =>
                        void handleStatusChange(
                          inquiry.id,
                          event.target.value as InquiryStatus,
                        )
                      }
                      className="w-full rounded-xl border border-[#d8caba] bg-[#faf7f2] px-3 py-2 text-sm outline-none transition focus:border-[#8b7355]"
                    >
                      <option value="new">신규</option>
                      <option value="in_progress">진행 중</option>
                      <option value="done">응답 완료</option>
                    </select>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
