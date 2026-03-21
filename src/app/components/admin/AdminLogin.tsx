import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { LockKeyhole, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "./AdminAuthProvider";

export function AdminLogin() {
  const { session, signIn, isConfigured } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isConfigured) {
    return <Navigate to="/admin/gallery" replace />;
  }

  if (session) {
    return <Navigate to="/admin/gallery" replace />;
  }

  const from = typeof location.state?.from === "string" ? location.state.from : "/admin/gallery";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      toast.success("관리자 로그인에 성공했습니다.");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e7dfd3] px-6 py-10 text-[#2d2a26]">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] bg-[#2d2a26] p-10 text-[#f4ece1] md:p-14">
          <p className="text-xs tracking-[0.35em] uppercase text-[#ccb89c]">Admin Access</p>
          <h1 className="mt-5 text-4xl font-['Noto_Serif_KR',serif] leading-tight md:text-5xl">
            공방 운영 데이터를
            <br />
            한 곳에서 관리합니다.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[#dfd1bf]">
            작품 갤러리 등록, 문의 확인, 운영 메모 정리를 위한 관리자 공간입니다.
            Supabase Auth 계정으로 로그인하면 실제 운영 데이터에 접근할 수 있습니다.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Sparkles className="mb-4 h-5 w-5 text-[#ccb89c]" />
              <p className="font-medium">갤러리 정리</p>
              <p className="mt-2 text-sm text-[#dfd1bf]">작품 카드 추가, 대표작 지정, 표시 순서 관리</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <LockKeyhole className="mb-4 h-5 w-5 text-[#ccb89c]" />
              <p className="font-medium">문의 관리</p>
              <p className="mt-2 text-sm text-[#dfd1bf]">신규 문의 확인과 진행 상태 업데이트</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#f9f5ef] p-8 md:p-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b7355]">Supabase Login</p>
          <h2 className="mt-4 text-3xl font-['Noto_Serif_KR',serif]">관리자 로그인</h2>
          <form className="mt-10 flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm">
              이메일
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                placeholder="admin@sambakhanchoi.com"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              비밀번호
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-[#d8caba] bg-white px-4 py-3 outline-none transition focus:border-[#8b7355]"
                placeholder="비밀번호"
                required
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 rounded-2xl bg-[#2d2a26] px-5 py-4 text-sm tracking-[0.2em] text-white transition hover:bg-[#8b7355] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
