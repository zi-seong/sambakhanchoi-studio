import { Link, Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, MessageCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { useSiteTexts } from "./SiteTextsProvider";

const NAV_LINKS = [
  { path: "/about", label: "공방 이야기" },
  { path: "/gallery", label: "작품 갤러리" },
  { path: "/classes", label: "수업 안내" },
  { path: "/contact", label: "문의하기" },
];

export function Layout() {
  const { t } = useSiteTexts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] font-['Noto_Sans_KR',sans-serif] selection:bg-[#8b7355] selection:text-white flex flex-col">
      <Toaster position="top-center" richColors />
      <header className="sticky top-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#e5e0d8]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="삼박한최" className="h-10 w-10 object-contain" />
            <span className="text-sm font-['Noto_Sans_KR',sans-serif] text-[#5c574f] tracking-normal">도예공방</span>
          </Link>

          <nav className="hidden md:flex gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors ${
                  location.pathname === link.path ? "text-[#2d2a26] font-medium border-b border-[#2d2a26] pb-1" : "text-[#5c574f] hover:text-[#2d2a26]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-[#2d2a26]"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#faf9f6] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-[#e5e0d8]">
              <img src="/logo.png" alt="삼박한최" className="h-10 w-10 object-contain" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#2d2a26]">
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col gap-8 p-10 mt-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-2xl font-['Noto_Serif_KR',serif] ${
                    location.pathname === link.path ? "text-[#2d2a26]" : "text-[#5c574f]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[#1c1a18] text-[#e5e0d8] py-16 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-['Noto_Serif_KR',serif] tracking-widest mb-6">삼박한최</h3>
            <p className="text-sm text-[#a8a196] leading-relaxed max-w-sm whitespace-pre-line">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-widest mb-6 text-white">INFORMATION</h4>
            <ul className="text-sm text-[#a8a196] space-y-3">
              <li>{t("footer.address")}</li>
              <li>{t("footer.hours")}</li>
              <li>{t("footer.phone")}</li>
              <li>{t("footer.email")}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-widest mb-6 text-white">CONNECT</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full border border-[#5c574f] hover:bg-white hover:text-[#1c1a18] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-[#5c574f] hover:bg-white hover:text-[#1c1a18] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-[#5c574f] hover:bg-white hover:text-[#1c1a18] transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-8 text-xs text-[#5c574f]">
              <p>{t("footer.owner")}</p>
              <p className="mt-2">&copy; {new Date().getFullYear()} 삼박한최 공방. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
