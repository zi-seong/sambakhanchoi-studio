import { Outlet } from "react-router";
import { AdminAuthProvider } from "./components/admin/AdminAuthProvider";
import { SiteTextsProvider } from "./components/SiteTextsProvider";
import { SiteImagesProvider } from "./components/SiteImagesProvider";

export function RootRouteProvider() {
  return (
    <AdminAuthProvider>
      <SiteTextsProvider>
        <SiteImagesProvider>
          <Outlet />
        </SiteImagesProvider>
      </SiteTextsProvider>
    </AdminAuthProvider>
  );
}
