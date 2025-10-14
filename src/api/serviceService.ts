import type { Service } from '../types';
import { getAuthHeader } from './authService';

const handleResponse = async (response: Response) => {
    if (response.status === 204) return null; // Handle No Content response for delete
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Ocorreu um erro na operação de serviço.');
    }
    return data;
};

export const getServices = async (): Promise<Service[]> => {
    const response = await fetch('/api/services');
    return handleResponse(response);
};

export const getServiceById = async (id: string): Promise<Service | undefined> => {
    const response = await fetch(`/api/services/${id}`);
    return handleResponse(response);
};

export const addService = async (service: Omit<Service, 'id'>): Promise<Service> => {
    const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(service),
    });
    return handleResponse(response);
};

export const updateService = async (id: string, updatedServiceData: Partial<Service>): Promise<Service> => {
    const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(updatedServiceData),
    });
    return handleResponse(response);
};

export const deleteService = async (id: string): Promise<{ success: boolean }> => {
    const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
            ...getAuthHeader(),
        },
    });
    if (!response.ok) {
         const data = await response.json();
         throw new Error(data.message || 'Falha ao excluir serviço.');
    }
    return { success: true };
};