import React from "react";
import { Company } from "../types";

interface CompaniesSectionProps {
  title: string;
  subtitle?: string;
  companies: Company[];
}

const CompaniesSection: React.FC<CompaniesSectionProps> = ({
  title,
  subtitle,
  companies,
}) => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold leading-8 text-gray-900">{title}</h2>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {companies.length > 0 ? (
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company._id}
              className="col-span-1 flex justify-center"
              title={company.name}
            >
              <img
                src={company.logoUrl}
                alt={company.name}
                className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Em breve, novas parcerias serão divulgadas aqui.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompaniesSection;
