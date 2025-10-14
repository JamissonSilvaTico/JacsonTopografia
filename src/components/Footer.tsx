import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Gtec Drone Topografia & Agrimensura. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;