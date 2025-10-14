
import React, { useState, useEffect } from 'react';
import { getAboutPageContent, updateAboutPageContent } from '../../api/contentService';
import { AboutPageContent } from '../../types';

const AboutEditorPage: React.FC = () => {
    const [formData, setFormData] = useState<AboutPageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            const data = await getAboutPageContent();
            setFormData(data);
            setIsLoading(false);
        };
        fetchContent();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        setIsSaving(true);
        setMessage('');
        try {
            await updateAboutPageContent(formData);
            setMessage('Conteúdo da página "Sobre" atualizado com sucesso!');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            setMessage('Ocorreu um erro ao salvar as alterações.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <p>Carregando editor...</p>;
    }

    if (!formData) {
        return <p>Não foi possível carregar o conteúdo para edição.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Editar Conteúdo da Página "Sobre"</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Pré-título</label>
                        <input type="text" name="preTitle" value={formData.preTitle} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Título Principal</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Subtítulo</label>
                        <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">URL da Imagem</label>
                        <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Parágrafo 1</label>
                        <textarea name="paragraph1" value={formData.paragraph1} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" rows={4} required />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Parágrafo 2</label>
                        <textarea name="paragraph2" value={formData.paragraph2} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" rows={4} required />
                    </div>
                   
                    {message && <p className="text-sm text-green-600 my-4">{message}</p>}

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-sky-400"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AboutEditorPage;
