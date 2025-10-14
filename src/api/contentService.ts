import type { HeroContent } from '../types';
import { getAuthHeader } from './authService';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Falha ao buscar dados.');
    }
    return response.json();
};

export const getHeroContent = async (): Promise<HeroContent> => {
    const response = await fetch('/api/content/hero');
    return handleResponse(response);
};

export const updateHeroContent = async (content: HeroContent): Promise<HeroContent> => {
    const response = await fetch('/api/content/hero', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(content),
    });
    return handleResponse(response);
};