import { createBrowserRouter } from "react-router";
import { AdminGalleryPage } from "./components/admin/AdminGalleryPage";
import { AdminInquiriesPage } from "./components/admin/AdminInquiriesPage";
import { AdminTextsPage } from "./components/admin/AdminTextsPage";
import { AdminImagesPage } from "./components/admin/AdminImagesPage";
import { AdminNoticesPage } from "./components/admin/AdminNoticesPage";
import { AdminStudentWorksPage } from "./components/admin/AdminStudentWorksPage";
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
import { StudentWorks } from "./components/pages/StudentWorks";

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
          { path: "student-works", Component: StudentWorks },
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
              { path: "student-works", Component: AdminStudentWorksPage },
              { path: "notices", Component: AdminNoticesPage },
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
