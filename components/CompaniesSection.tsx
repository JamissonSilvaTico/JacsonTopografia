import React, { useState, useEffect } from "react";
import { getCompanies } from "../api/companyService";
import { Company } from "../types";

const CompaniesSection: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto animate-pulse"></div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (companies.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold leading-8 text-gray-900">
          Companies I've had worked
        </h2>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company._id}
              className="col-span-1 flex justify-center filter grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              title={company.name}
              dangerouslySetInnerHTML={{ __html: company.logoSvg }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesSection;
