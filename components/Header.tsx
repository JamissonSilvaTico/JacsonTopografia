import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { getServices } from "../api/serviceService";
import { Service } from "../types";

const ServicesDropdown: React.FC<{
  services: Service[];
  onClose: () => void;
}> = ({ services, onClose }) => {
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
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/servicos/${service.id}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={onClose}
          >
            {service.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  const navLinkClasses =
    "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-sky-100 hover:text-sky-700 transition-colors";
  const activeNavLinkClasses = "bg-sky-200 text-sky-800";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              <span className="text-sky-600">Jacson</span>
              <span className="text-sm font-normal text-gray-500 block -mt-1">
                Topografia & Agrimensura
              </span>
            </Link>
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
                  <ServicesDropdown
                    services={services}
                    onClose={() => setServicesOpen(false)}
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
          <div className="md:hidden">
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
            <NavLink
              to="/contato"
              className={({ isActive }) =>
                `block ${getNavLinkClass({ isActive })}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </NavLink>
             <a
              href="https://www.linkedin.com/in/jacson-tico-592182204?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left mt-2 px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/5569984318944"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left mt-2 px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;