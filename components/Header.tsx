import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { getServices } from "../api/serviceService";
import { getProjects } from "../api/projectService";
import { getSiteSettings } from "../api/settingsService";
import { Service, Project, SiteSettings } from "../types";

const DropdownMenu: React.FC<{
  items: { id: string; title: string }[];
  path: string;
  onClose: () => void;
}> = ({ items, path, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-20 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/${path}/${item.id}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={onClose}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isProjectsOpen, setProjectsOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSiteSettings(data);
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      }
    };
    fetchServices();
    fetchProjects();
    fetchSettings();
  }, []);

  const navLinkClasses =
    "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-sky-100 hover:text-sky-700 transition-colors";
  const activeNavLinkClasses = "bg-sky-200 text-sky-800";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`;

  const renderLogo = () => {
    if (!siteSettings) {
      return (
        <div className="h-10 w-40 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      );
    }

    if (siteSettings.logoType === "image" && siteSettings.logoImageUrl) {
      return (
        <img
          src={siteSettings.logoImageUrl}
          alt="Logo Jacson Topografia"
          className="h-14 w-auto"
        />
      );
    }

    return (
      <div className="text-xl font-bold text-gray-800">
        <span className="text-sky-600">{siteSettings.logoTextLine1}</span>
        <span className="text-sm font-normal text-gray-500 block -mt-1">
          {siteSettings.logoTextLine2}
        </span>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">{renderLogo()}</Link>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={getNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/sobre" className={getNavLinkClass}>
                Sobre
              </NavLink>
              <div className="relative">
                <button
                  onClick={() => setServicesOpen(!isServicesOpen)}
                  className={`${navLinkClasses} inline-flex items-center`}
                  disabled={services.length === 0}
                >
                  <span>Serviços</span>
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isServicesOpen && (
                  <DropdownMenu
                    items={services}
                    path="servicos"
                    onClose={() => setServicesOpen(false)}
                  />
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setProjectsOpen(!isProjectsOpen)}
                  className={`${navLinkClasses} inline-flex items-center`}
                  disabled={projects.length === 0}
                >
                  <span>Projetos</span>
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isProjectsOpen && (
                  <DropdownMenu
                    items={projects}
                    path="projetos"
                    onClose={() => setProjectsOpen(false)}
                  />
                )}
              </div>
              <NavLink to="/contato" className={getNavLinkClass}>
                Contato
              </NavLink>
              <a
                href="https://www.linkedin.com/in/jacson-tico-592182204?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://wa.me/5569981191606"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </a>
            </nav>
          </div>
          <div className="md:hidden flex items-center">
            <a
              href="https://wa.me/5569981191606"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-green-500 hover:text-green-600 hover:bg-gray-100"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.956-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.225 4.485 4.635-1.218zM8.332 9.554c-.135-.271-.271-.271-.406-.271-.135 0-.271 0-.406 0-.135 0-.338.068-.541.338-.203.271-.811.811-.811 1.984s.811 2.318.946 2.484c.135.166 1.621 2.593 3.961 3.504.541.203.946.338 1.282.406.541.135.946.102 1.282-.068.37-.167 1.621-.745 1.857-1.487.236-.745.236-1.383.167-1.487-.068-.102-.203-.167-.406-.271s-1.621-.81-1.857-.912c-.236-.102-.406-.167-.541.167-.135.338-.71.811-.878.979-.167.167-.338.203-.541.068-.203-.135-.811-.304-1.554-.946-.576-.473-.979-.946-1.114-1.114-.135-.167-.034-.236.068-.338.068-.068.167-.203.236-.271.034-.034.068-.068.102-.135.034-.068.034-.135 0-.236-.034-.102-.541-1.283-.745-1.72z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/jacson-tico-592182204?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-blue-700 hover:text-blue-800 hover:bg-gray-100"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
            >
              <span className="sr-only">Abrir menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block ${getNavLinkClass({ isActive })}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                `block ${getNavLinkClass({ isActive })}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </NavLink>

            <p className="px-3 py-2 text-sm font-medium text-gray-500">
              Serviços:
            </p>
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/servicos/${service.id}`}
                className="block pl-8 pr-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {service.title}
              </Link>
            ))}

            <p className="px-3 pt-4 pb-2 text-sm font-medium text-gray-500">
              Projetos:
            </p>
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projetos/${project.id}`}
                className="block pl-8 pr-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {project.title}
              </Link>
            ))}

            <NavLink
              to="/contato"
              className={({ isActive }) =>
                `block ${getNavLinkClass({ isActive })} pt-4`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
