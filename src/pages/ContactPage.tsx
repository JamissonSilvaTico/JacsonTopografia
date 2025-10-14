import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Estou pronto para atender você. Fale comigo para um orçamento ou
            para tirar suas dúvidas.
          </p>
        </div>
        <div className="mt-16 max-w-lg mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 md:max-w-none lg:max-w-3xl">
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Telefone / WhatsApp
              </h3>
              <p className="mt-2 text-base text-gray-500">
                +55 (69) 9 8119-1606
              </p>
              <a
                href="tel:+5569981191606"
                className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-500"
              >
                Ligar agora
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">Email</h3>
              <p className="mt-2 text-base text-gray-500">
                Jacson.slv7@gmail.com
              </p>
              <a
                href="mailto:contato@gtecdrone.com"
                className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-500"
              >
                Enviar email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
