import React from 'react';

const companies = [
  {
    name: 'Cachet',
    logo: (
      <svg
        aria-label="Cachet logo"
        className="h-8 w-auto text-gray-600"
        viewBox="0 0 120 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M13.5 27C20.4036 27 26 21.4036 26 14.5C26 7.59644 20.4036 2 13.5 2C6.59644 2 1 7.59644 1 14.5C1 21.4036 6.59644 27 13.5 27Z"
            stroke="#96C177"
            strokeWidth="2"
          />
          <path
            d="M8 14.5L12.0625 19L19 11"
            stroke="#96C177"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="32" y="20" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="18" fill="currentColor">
            Cachet
          </text>
        </g>
      </svg>
    ),
  },
  {
    name: 'Guitar Center',
    logo: (
      <svg
        aria-label="Guitar Center logo"
        className="h-11 w-auto"
        viewBox="0 0 160 40"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M48.1,18.7c-0.1-0.9-0.5-1.7-1-2.4c-0.5-0.6-1.2-1.1-2-1.4c-0.8-0.3-1.6-0.5-2.5-0.5c-0.9,0-1.8,0.2-2.5,0.5 c-0.7,0.3-1.4,0.7-2,1.2c-0.6,0.5-1.1,1.2-1.4,2c-0.3,0.8-0.5,1.7-0.5,2.6c0,1.4,0.3,2.6,0.9,3.7c0.6,1.1,1.4,1.9,2.4,2.5 c0.5,0.3,0.9,0.5,1.4,0.7c-0.8,0.5-1.4,1.2-1.8,2c-0.4,0.8-0.6,1.8-0.6,2.8c0,1,0.2,2,0.6,2.9c0.4,0.9,0.9,1.7,1.6,2.3 c0.7,0.6,1.5,1,2.4,1.3c0.9,0.3,1.9,0.4,2.9,0.4c1.1,0,2.2-0.2,3.1-0.6c0.9-0.4,1.7-1,2.3-1.7c0.6-0.7,1.1-1.5,1.4-2.5 c0.3-0.9,0.4-2,0.4-3.1c0-0.9-0.2-1.8-0.5-2.6c-0.3-0.8-0.7-1.5-1.3-2.1c-0.5-0.6-1.2-1.1-1.8-1.4C47.8,20.5,48.1,19.7,48.1,18.7z M41.8,21.3c-0.6,0-1.1-0.2-1.4-0.6c-0.4-0.4-0.5-0.8-0.5-1.4c0-0.6,0.2-1.1,0.5-1.4c0.4-0.4,0.8-0.5,1.4-0.5c0.6,0,1.1,0.2,1.4,0.5 c0.4,0.4,0.5,0.8,0.5,1.4c0,0.6-0.2,1.1-0.5,1.4C42.9,21.1,42.4,21.3,41.8,21.3z M42.4,30.3c0.7,0,1.3,0.3,1.8,0.7 c0.4,0.4,0.7,1,0.7,1.8c0,0.7-0.2,1.3-0.7,1.8c-0.4,0.4-1.1,0.7-1.8,0.7c-0.7,0-1.3-0.3-1.8-0.7c-0.4-0.4-0.7-1-0.7-1.8 c0-0.7,0.2-1.3,0.7-1.8C41.1,30.5,41.7,30.3,42.4,30.3z M27.1,19.3L0.3,29.1l-9-21.7L20.6,0.5L27.1,19.3z M14.8,24.1 c-0.9,0-1.8-0.4-2.5-1.1c-0.7-0.7-1-1.6-1-2.6c0-1,0.3-1.9,1-2.6c0.7-0.7,1.6-1.1,2.5-1.1c0.9,0,1.8,0.4,2.5,1.1 c0.7,0.7,1,1.6,1,2.6c0,1-0.3,1.9-1,2.6C16.6,23.7,15.7,24.1,14.8,24.1z M58.1,25.2h5.2v2.3h-5.2V25.2z"/>
        <text x="70" y="20" fontFamily="Impact, sans-serif" fontSize="18">GUITAR</text>
        <text x="70" y="38" fontFamily="Impact, sans-serif" fontSize="18">CENTER</text>
      </svg>
    ),
  },
  {
    name: 'TOKICO',
    logo: (
      <svg
        aria-label="TOKICO logo"
        className="h-6 w-auto"
        viewBox="0 0 100 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="18"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="22"
          fontWeight="bold"
          fill="#D9232D"
        >
          TOKICO
        </text>
      </svg>
    ),
  },
  {
    name: 'Shopify',
    logo: (
        <svg
            aria-label="Shopify logo"
            className="h-12 w-auto"
            viewBox="0 0 81 94"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#96BF48" d="M72.93 24.64L52.36 4.06a8 8 0 00-5.65-2.42H34.28a8 8 0 00-5.66 2.42L8 24.64a8 8 0 00-5.59 5.65l-9 42.06A14.24 14.24 0 0013.84 84.18H55.69a14.24 14.24 0 0013.84-11.83l9-42.06a8 8 0 00-5.6-5.65z"/>
            <path fill="#FFF" d="M58.74 48.88a18.25 18.25 0 01-19 17.26 3.61 3.61 0 110-7.22 11 11 0 0011.81-10 3.61 3.61 0 117.22 0zm-3.62-9.69a3.61 3.61 0 01-3.61 3.61A18.25 18.25 0 0132.48 25.53a3.61 3.61 0 117.22 0 11 11 0 0011.81 10 3.61 3.61 0 013.61 3.66z"/>
        </svg>
    ),
  },
  {
    name: 'profil rejser',
    logo: (
        <svg
            aria-label="Profil Rejser logo"
            className="h-10 w-auto text-black"
            viewBox="0 0 120 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="currentColor">profil</text>
             <g transform="translate(54 5)">
                <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                <ellipse cx="7" cy="7" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                <line x1="0.5" y1="7" x2="13.5" y2="7" stroke="currentColor" strokeWidth="1.2"/>
            </g>
            <text x="0" y="36" fontFamily="Arial, sans-serif" fontSize="16" fill="currentColor">rejser</text>
        </svg>
    ),
  },
];


const CompaniesSection: React.FC = () => {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-3xl font-bold leading-8 text-gray-900">
                    Companies I've had worked
                </h2>
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {companies.map((company) => (
                        <div key={company.name} className="col-span-1 flex justify-center filter grayscale hover:grayscale-0 transition duration-300 ease-in-out">
                            {company.logo}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompaniesSection;
