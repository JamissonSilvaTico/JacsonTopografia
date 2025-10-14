
import React, { useState, useEffect } from "react";
import { getAboutPageContent } from "../api/contentService";
import { AboutPageContent } from "../types";

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const data = await getAboutPageContent();
      setContent(data);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading || !content) {
    return (
      <div className="text-center py-24">
        <p className="text-xl text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
            {content.preTitle}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <img
              className="rounded-lg shadow-xl w-full"
              src={content.imageUrl}
              alt="Jacson trabalhando em campo"
            />
          </div>

          <div className="relative mt-10 lg:mt-0">
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.paragraph1}
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {content.paragraph2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
