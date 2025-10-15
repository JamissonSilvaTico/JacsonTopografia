import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../api/serviceService";
import { getHeroContent } from "../api/contentService";
import { Service, HeroContent } from "../types";
import CompaniesSection from "../components/CompaniesSection";

const Hero: React.FC = () => {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getHeroContent();
      setContent(data);
    };
    fetchContent();
  }, []);

  if (!content) {
    return (
      <div className="relative bg-gray-900" style={{ height: "576px" }}>
        {/* Placeholder for loading state */}
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={content.imageUrl}
          alt="Operador de drone com capacete em campo"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          <span className="block">{content.mainTitle}</span>
          <span className="block text-sky-400 text-2xl sm:text-3xl lg:text-4xl mt-1">
            {content.subtitle}
          </span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
          {content.description}
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto">
            <a
              href={content.buttonLink}
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 sm:px-10"
            >
              {content.buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => (
  <div className="py-16 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
          Sobre
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Compromisso com a Precisão e a Qualidade
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Jacson presta serviços de topografia, agrimensura, georreferenciamento
          de imóvel rural, retificação de área, usucapião, levantamento
          topográfico planialtimétrico para projetos de infraestrutura, de
          regularização fundiária, loteamentos, regularização ambiental, etc. A
          empresa se destaca por prestar serviços direcionados a exigência e a
          necessidade de cada cliente de forma exclusiva e personalizada.
        </p>
      </div>
    </div>
  </div>
);

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
            Serviços
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Soluções Completas para sua Necessidade
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden group"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={service.imageUrl}
                  alt={service.title}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/servicos/${service.id}`}
                    className="text-base font-semibold text-sky-600 hover:text-sky-500 group-hover:underline"
                  >
                    Saiba mais <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <CompaniesSection
        title="Empresas Parceiras"
        subtitle="Confiança e credibilidade no mercado."
      />
    </>
  );
};

export default Home;
