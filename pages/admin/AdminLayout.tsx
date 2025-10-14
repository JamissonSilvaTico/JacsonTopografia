
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../api/authService";

const Sidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({
  isOpen,
  toggle,
}) => (
  <>
    <div
      className={`fixed inset-0 z-20 bg-black opacity-50 transition-opacity lg:hidden ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={toggle}
    ></div>
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Jacson Admin</h1>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mt-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-gray-700 text-white" : ""
            }`
          }
          onClick={toggle}
        >
          <span className="mx-3">Serviços</span>
        </NavLink>
        <NavLink
          to="/admin/hero"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mt-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-gray-700 text-white" : ""
            }`
          }
          onClick={toggle}
        >
          <span className="mx-3">Página Inicial</span>
        </NavLink>
        <NavLink
          to="/admin/about"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mt-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-gray-700 text-white" : ""
            }`
          }
          onClick={toggle}
        >
          <span className="mx-3">Página Sobre</span>
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 mt-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-gray-700 text-white" : ""
            }`
          }
          onClick={toggle}
        >
          <span className="mx-3">Perfil</span>
        </NavLink>
      </nav>
    </div>
  </>
);

const Header: React.FC<{ onMenuClick: () => void; title: string }> = ({
  onMenuClick,
  title,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white border-b">
      <button
        className="text-gray-500 focus:outline-none lg:hidden"
        onClick={onMenuClick}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Sair
      </button>
    </header>
  );
};

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Gerenciamento de Serviços";
      case "/admin/hero":
        return "Editor da Página Inicial";
      case "/admin/about":
        return 'Editor da Página "Sobre"';
      case "/admin/profile":
        return "Configuração de Perfil";
      default:
        return "Admin";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle()}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
