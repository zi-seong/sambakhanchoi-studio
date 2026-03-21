import { Outlet } from "react-router";
import { AdminAuthProvider } from "./components/admin/AdminAuthProvider";

export function RootRouteProvider() {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  );
}
