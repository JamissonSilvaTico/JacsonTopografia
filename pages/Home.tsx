import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../api/serviceService";
import { getHeroContent } from "../api/contentService";
import { getHomePageSections } from "../api/homeSectionsService";
import { getCompanies } from "../api/companyService";
import { getProjects } from "../api/projectService";
import {
  Service,
  HeroContent,
  HomePageSection,
  Company,
  Project,
} from "../types";
import CompaniesSection from "../components/CompaniesSection";

const Hero: React.FC = () => {
  const [content, setContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getHeroContent();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch hero content:", error);
      }
    };
    fetchContent();
  }, []);

  if (!content) {
    return (
      <div
        className="relative bg-gray-200 animate-pulse"
        style={{ height: "576px" }}
      >
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

const Home: React.FC = () => {
  const [pageData, setPageData] = useState<{
    sections: HomePageSection[];
    services: Service[];
    companies: Company[];
    projects: Project[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [sectionsData, servicesData, companiesData, projectsData] =
          await Promise.all([
            getHomePageSections(),
            getServices(),
            getCompanies(),
            getProjects(),
          ]);
        setPageData({
          sections: sectionsData || [],
          services: servicesData || [],
          companies: companiesData || [],
          projects: projectsData || [],
        });
        // FIX: Corrected invalid `catch (error) =>` syntax to `catch (error)`.
      } catch (error) {
        console.error("Falha ao carregar os dados da página inicial:", error);
        setPageData({
          sections: [],
          services: [],
          companies: [],
          projects: [],
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const companySectionData = pageData?.sections.find(
    (s) => s.type === "companies"
  );
  const otherSections =
    pageData?.sections.filter((s) => s.type !== "companies") || [];

  return (
    <>
      <Hero />
      {isLoading ? (
        <div className="text-center py-24">
          <p className="text-xl text-gray-500">Carregando conteúdo...</p>
        </div>
      ) : (
        pageData && (
          <>
            {otherSections.map((section, index) => {
              if (!section.visible) {
                return null;
              }

              const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-50";

              switch (section.type) {
                case "text":
                  const hasImage = !!section.imageUrl;
                  const isImageLeft = index % 2 !== 0;
                  return (
                    <div
                      key={section._id}
                      className={`py-16 overflow-hidden ${bgColor}`}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {hasImage ? (
                          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                            <div
                              className={`relative ${
                                !isImageLeft ? "lg:col-start-2" : ""
                              }`}
                            >
                              <img
                                className="rounded-lg shadow-xl w-full"
                                src={section.imageUrl}
                                alt={section.title}
                              />
                            </div>
                            <div
                              className={`relative mt-10 lg:mt-0 ${
                                !isImageLeft
                                  ? "lg:col-start-1 lg:row-start-1"
                                  : ""
                              }`}
                            >
                              <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
                                {section.title}
                              </h2>
                              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {section.subtitle}
                              </p>
                              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                                {section.content}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
                              {section.title}
                            </h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                              {section.subtitle}
                            </p>
                            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                              {section.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );

                case "services":
                  if (pageData.services.length === 0) return null;
                  return (
                    <div key={section._id} className={`py-16 ${bgColor}`}>
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                          <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
                            {section.title}
                          </h2>
                          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            {section.subtitle}
                          </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                          {pageData.services.map((service) => (
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
                                    Saiba mais{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );

                case "projects":
                  if (pageData.projects.length === 0) return null;
                  return (
                    <div key={section._id} className={`py-16 ${bgColor}`}>
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                          <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
                            {section.title}
                          </h2>
                          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            {section.subtitle}
                          </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                          {pageData.projects.map((project) => (
                            <div
                              key={project.id}
                              className="flex flex-col rounded-lg shadow-lg overflow-hidden group"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="h-48 w-full object-cover"
                                  src={project.imageUrl}
                                  alt={project.title}
                                />
                              </div>
                              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                  <p className="text-xl font-semibold text-gray-900">
                                    {project.title}
                                  </p>
                                  <p className="mt-3 text-base text-gray-500">
                                    {project.shortDescription}
                                  </p>
                                </div>
                                <div className="mt-6">
                                  <Link
                                    to={`/projetos/${project.id}`}
                                    className="text-base font-semibold text-sky-600 hover:text-sky-500 group-hover:underline"
                                  >
                                    Ver projeto{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}

            {companySectionData &&
              companySectionData.visible &&
              pageData.companies.length > 0 && (
                <CompaniesSection
                  key={companySectionData._id}
                  title={companySectionData.title}
                  subtitle={companySectionData.subtitle}
                  companies={pageData.companies}
                />
              )}
          </>
        )
      )}
    </>
  );
};

export default Home;
