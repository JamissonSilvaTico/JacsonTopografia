import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicePage from "./pages/ServicePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/admin/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProfilePage from "./pages/admin/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import HeroEditorPage from "./pages/admin/HeroEditorPage";
import AboutEditorPage from "./pages/admin/AboutEditorPage";
import SiteSettingsPage from "./pages/admin/SiteSettingsPage";
import HomePageSectionsPage from "./pages/admin/HomePageSectionsPage";
import CompaniesEditorPage from "./pages/admin/CompaniesEditorPage";
import ProjectsEditorPage from "./pages/admin/ProjectsEditorPage";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isAdminRoute ? "bg-gray-100" : "bg-gray-50"
      } text-gray-800`}
    >
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/servicos/:serviceId" element={<ServicePage />} />
          <Route path="/projetos/:projectId" element={<ProjectPage />} />

          {/* Admin Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="hero" element={<HeroEditorPage />} />
            <Route path="home-sections" element={<HomePageSectionsPage />} />
            <Route path="companies" element={<CompaniesEditorPage />} />
            <Route path="projects" element={<ProjectsEditorPage />} />
            <Route path="about" element={<AboutEditorPage />} />
            <Route path="settings" element={<SiteSettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
