// --- MOCK SERVICE FOR SERVICES ---
// In a real application, this file would make API calls to your backend to get/manage services.
// For this simulation, we use localStorage to persist the data.

import { SERVICES as seedData } from '../constants';
import type { Service } from '../types';

const STORAGE_KEY = 'gtecdrone_services';

// Initialize with seed data if local storage is empty
const initializeServices = () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    }
};

initializeServices();

const getAllServicesFromStorage = (): Service[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveAllServicesToStorage = (services: Service[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
};

export const getServices = async (): Promise<Service[]> => {
    // Simulate network delay
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getAllServicesFromStorage());
        }, 200);
    });
};

export const getServiceById = async (id: string): Promise<Service | undefined> => {
     return new Promise(resolve => {
        setTimeout(() => {
            const services = getAllServicesFromStorage();
            resolve(services.find(s => s.id === id));
        }, 200);
    });
};

export const addService = async (service: Omit<Service, 'id'>): Promise<Service> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const services = getAllServicesFromStorage();
            const newService: Service = {
                ...service,
                id: service.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            };
            services.push(newService);
            saveAllServicesToStorage(services);
            resolve(newService);
        }, 500);
    });
};

export const updateService = async (id: string, updatedServiceData: Partial<Service>): Promise<Service> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            let services = getAllServicesFromStorage();
            const index = services.findIndex(s => s.id === id);
            if (index !== -1) {
                services[index] = { ...services[index], ...updatedServiceData };
                saveAllServicesToStorage(services);
                resolve(services[index]);
            } else {
                reject(new Error("Serviço não encontrado."));
            }
        }, 500);
    });
};


export const deleteService = async (id: string): Promise<{ success: boolean }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            let services = getAllServicesFromStorage();
            const updatedServices = services.filter(s => s.id !== id);
            saveAllServicesToStorage(updatedServices);
            resolve({ success: true });
        }, 500);
    });
};