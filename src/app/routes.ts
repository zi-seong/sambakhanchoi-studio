import { createBrowserRouter } from "react-router";
import { AdminGalleryPage } from "./components/admin/AdminGalleryPage";
import { AdminInquiriesPage } from "./components/admin/AdminInquiriesPage";
import { AdminTextsPage } from "./components/admin/AdminTextsPage";
import { AdminImagesPage } from "./components/admin/AdminImagesPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";
import { RootRouteProvider } from "./RouteProviders";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Gallery } from "./components/pages/Gallery";
import { Classes } from "./components/pages/Classes";
import { Contact } from "./components/pages/Contact";

export const router = createBrowserRouter([
  {
    Component: RootRouteProvider,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: Home },
          { path: "about", Component: About },
          { path: "gallery", Component: Gallery },
          { path: "classes", Component: Classes },
          { path: "contact", Component: Contact },
        ],
      },
      { path: "/admin/login", Component: AdminLogin },
      {
        path: "/admin",
        Component: AdminProtectedRoute,
        children: [
          {
            Component: AdminLayout,
            children: [
              { index: true, Component: AdminGalleryPage },
              { path: "gallery", Component: AdminGalleryPage },
              { path: "inquiries", Component: AdminInquiriesPage },
              { path: "texts", Component: AdminTextsPage },
              { path: "images", Component: AdminImagesPage },
            ],
          },
        ],
      },
    ],
  },
]);
