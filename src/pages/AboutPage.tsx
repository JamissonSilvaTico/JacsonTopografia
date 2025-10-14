import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">
            Sobre
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Jacson Topografia & Agrimensura
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Excelência e precisão em cada projeto.
          </p>
        </div>

        <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <img
              className="rounded-lg shadow-xl w-full"
              src="https://picsum.photos/seed/about/600/400"
              alt="Jacson trabalhando em campo"
            />
          </div>

          <div className="relative mt-10 lg:mt-0">
            <p className="text-lg text-gray-600 leading-relaxed">
              Jacson topografia que presta serviços de topografia, agrimensura,
              georreferenciamento de imóvel rural, retificação de área,
              usucapião, levantamento topográfico planialtimétrico para projetos
              de infra estrutura, de regularização fundiária, loteamentos,
              regularização ambiental, etc.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Jacson se destaca por prestar serviços direcionados a exigência e
              a necessidade de cada cliente de forma exclusiva e personalizada.
              Utilizamos equipamentos de última geração e uma equipe altamente
              qualificada para garantir a máxima precisão e confiabilidade em
              todos os nossos levantamentos e projetos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
