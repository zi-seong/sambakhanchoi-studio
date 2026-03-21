import { Navigate, Outlet, useLocation } from "react-router";
import { useAdminAuth } from "./AdminAuthProvider";

export function AdminProtectedRoute() {
  const { session, loading, isConfigured } = useAdminAuth();
  const location = useLocation();

  if (!isConfigured) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3eee6] text-[#2d2a26] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-[#8b7355] mb-3">Admin</p>
          <h1 className="text-3xl font-['Noto_Serif_KR',serif]">인증 상태를 확인하는 중입니다.</h1>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
