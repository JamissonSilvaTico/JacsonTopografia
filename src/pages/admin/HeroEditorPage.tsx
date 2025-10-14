import React, { useState, useEffect } from 'react';
import { getHeroContent, updateHeroContent } from '../../api/contentService';
import { HeroContent } from '../../types';

const HeroEditorPage: React.FC = () => {
    const [formData, setFormData] = useState<HeroContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            const data = await getHeroContent();
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
            await updateHeroContent(formData);
            setMessage('Conteúdo da página inicial atualizado com sucesso!');
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
                <h2 className="text-xl font-bold text-gray-800 mb-6">Editar Seção Principal da Home</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Column 1 */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Título Principal</label>
                                <input type="text" name="mainTitle" value={formData.mainTitle} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Subtítulo</label>
                                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                             <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Descrição</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" rows={3} required />
                            </div>
                        </div>
                        {/* Column 2 */}
                        <div>
                             <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Texto do Botão</label>
                                <input type="text" name="buttonText" value={formData.buttonText} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Link do Botão (URL)</label>
                                <input type="text" name="buttonLink" value={formData.buttonLink} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Ex: tel:+55... ou https://..." required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">URL da Imagem de Fundo</label>
                                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                        </div>
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

export default HeroEditorPage;