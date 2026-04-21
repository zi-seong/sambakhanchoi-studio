import { Link, NavLink, Outlet } from "react-router";
import { LogOut, Package, MessageSquareMore, Settings2, Type, Image, BellRing, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "./AdminAuthProvider";

const navItems = [
  { to: "/admin/gallery", label: "갤러리 관리", icon: Package },
  { to: "/admin/student-works", label: "수강생 작품 관리", icon: GraduationCap },
  { to: "/admin/notices", label: "공지 관리", icon: BellRing },
  { to: "/admin/inquiries", label: "문의 관리", icon: MessageSquareMore },
  { to: "/admin/texts", label: "텍스트 관리", icon: Type },
  { to: "/admin/images", label: "이미지 관리", icon: Image },
];

export function AdminLayout() {
  const { signOut, isConfigured, session } = useAdminAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("관리자 로그아웃이 완료되었습니다.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "로그아웃에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#efe7dd] text-[#2d2a26]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-[#dfd1bf] bg-[#f7f2eb] px-6 py-8 lg:border-b-0 lg:border-r">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2d2a26] text-white">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#8b7355]">Sambakhanchoi</p>
              <h1 className="text-2xl font-['Noto_Serif_KR',serif]">관리자</h1>
            </div>
          </Link>

          <div className="mt-10 rounded-2xl border border-[#dfd1bf] bg-white/70 p-4 text-sm text-[#5c574f]">
            {isConfigured && session ? (
              <>
                <p className="mb-1 text-xs tracking-[0.2em] uppercase text-[#8b7355]">Signed in</p>
                <p className="break-all">{session.user.email}</p>
              </>
            ) : (
              <>
                <p className="mb-1 text-xs tracking-[0.2em] uppercase text-[#8b7355]">Demo mode</p>
                <p>Supabase 키가 없어서 브라우저 저장소로 동작합니다.</p>
              </>
            )}
          </div>

          <nav className="mt-8 flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
                      isActive
                        ? "bg-[#2d2a26] text-white"
                        : "bg-white/70 text-[#5c574f] hover:bg-white"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {isConfigured && session ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-8 inline-flex items-center gap-2 text-sm text-[#5c574f] hover:text-[#2d2a26]"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </button>
          ) : null}
        </aside>

        <main className="px-6 py-8 md:px-10 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
