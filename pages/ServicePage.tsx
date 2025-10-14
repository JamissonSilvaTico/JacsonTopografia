
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceById } from '../api/serviceService';
import { Service } from '../types';

const ServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      if (serviceId) {
        setLoading(true);
        const data = await getServiceById(serviceId);
        setService(data || null);
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  if (loading) {
     return (
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Carregando...</h1>
        </div>
     )
  }

  if (!service) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Serviço não encontrado</h1>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="relative">
        <img className="h-96 w-full object-cover" src={service.imageUrl} alt={service.title} />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center px-4">
            {service.title}
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed">
            {service.longDescription}
          </p>
          <div className="mt-12">
            <Link to="/contato" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
              Solicitar um Orçamento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
