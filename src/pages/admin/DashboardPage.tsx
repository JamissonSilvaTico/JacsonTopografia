import React, { useState, useEffect, useCallback } from 'react';
import { getServices, addService, updateService, deleteService } from '../../api/serviceService';
import { Service } from '../../types';

const ServiceFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    service: Service | null;
}> = ({ isOpen, onClose, onSave, service }) => {
    const [formData, setFormData] = useState<Omit<Service, 'id'>>({
        title: '', shortDescription: '', longDescription: '', imageUrl: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (service) {
            setFormData({
                title: service.title,
                shortDescription: service.shortDescription,
                longDescription: service.longDescription,
                imageUrl: service.imageUrl
            });
        } else {
            setFormData({ title: '', shortDescription: '', longDescription: '', imageUrl: '' });
        }
    }, [service, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (service) {
                await updateService(service.id, formData);
            } else {
                await addService(formData);
            }
            onSave();
        } catch (error) {
            console.error('Failed to save service:', error);
            alert('Falha ao salvar o serviço.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg m-4 max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{service ? 'Editar Serviço' : 'Adicionar Novo Serviço'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Título</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">URL da Imagem</label>
                        <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descrição Curta</label>
                        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows={2} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descrição Longa</label>
                        <textarea name="longDescription" value={formData.longDescription} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows={5} required />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700" disabled={isSaving}>
                            {isSaving ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const loadServices = useCallback(async () => {
        setIsLoading(true);
        const data = await getServices();
        setServices(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    const handleAdd = () => {
        setSelectedService(null);
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };
    
    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            await deleteService(id);
            loadServices();
        }
    };
    
    const handleSave = () => {
        setIsModalOpen(false);
        loadServices();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">Serviços</h1>
                <button onClick={handleAdd} className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700">
                    Adicionar Serviço
                </button>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                {isLoading ? (
                    <p className="p-4">Carregando serviços...</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição Curta</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {services.map(service => (
                                <tr key={service.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-sm truncate">{service.shortDescription}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => handleEdit(service)} className="text-sky-600 hover:text-sky-900">Editar</button>
                                        <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            <ServiceFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                service={selectedService}
            />
        </div>
    );
};

export default DashboardPage;