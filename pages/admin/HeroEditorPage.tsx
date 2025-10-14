
import React, { useState, useEffect } from 'react';
import { getHeroContent, updateHeroContent, getHomeSectionsContent, updateHomeSectionsContent } from '../../api/contentService';
import { HeroContent, HomeSectionsContent } from '../../types';

const HeroEditorPage: React.FC = () => {
    const [heroData, setHeroData] = useState<HeroContent | null>(null);
    const [sectionsData, setSectionsData] = useState<HomeSectionsContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const [hero, sections] = await Promise.all([
                    getHeroContent(),
                    getHomeSectionsContent()
                ]);
                setHeroData(hero);
                setSectionsData(sections);
            } catch (error) {
                console.error("Failed to fetch page content:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, []);

    const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (heroData) {
            setHeroData({ ...heroData, [e.target.name]: e.target.value });
        }
    };
    
    const handleSectionsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (sectionsData) {
            setSectionsData({ ...sectionsData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!heroData || !sectionsData) return;

        setIsSaving(true);
        setMessage('');
        try {
            await Promise.all([
                updateHeroContent(heroData),
                updateHomeSectionsContent(sectionsData)
            ]);
            setMessage('Conteúdo da página inicial atualizado com sucesso!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Ocorreu um erro ao salvar as alterações.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <p>Carregando editor...</p>;
    }

    if (!heroData || !sectionsData) {
        return <p>Não foi possível carregar o conteúdo para edição.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
                {/* Hero Section Editor */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Seção Principal (Hero)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Título Principal</label>
                                <input type="text" name="mainTitle" value={heroData.mainTitle} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Subtítulo</label>
                                <input type="text" name="subtitle" value={heroData.subtitle} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                             <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Descrição</label>
                                <textarea name="description" value={heroData.description} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-md" rows={3} required />
                            </div>
                        </div>
                        <div>
                             <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Texto do Botão</label>
                                <input type="text" name="buttonText" value={heroData.buttonText} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Link do Botão (URL)</label>
                                <input type="text" name="buttonLink" value={heroData.buttonLink} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-md" placeholder="Ex: tel:+55... ou https://..." required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">URL da Imagem de Fundo</label>
                                <input type="url" name="imageUrl" value={heroData.imageUrl} onChange={handleHeroChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section on Home */}
                 <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Seção "Sobre" (na Home)</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Título da Seção (ex: Sobre)</label>
                        <input type="text" name="aboutSectionTitle" value={sectionsData.aboutSectionTitle} onChange={handleSectionsChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Subtítulo da Seção</label>
                        <input type="text" name="aboutSectionSubtitle" value={sectionsData.aboutSectionSubtitle} onChange={handleSectionsChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Texto da Seção</label>
                        <textarea name="aboutSectionText" value={sectionsData.aboutSectionText} onChange={handleSectionsChange} className="w-full px-3 py-2 border rounded-md" rows={4} required />
                    </div>
                </div>
                
                {/* Services Section on Home */}
                 <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Seção de Serviços (na Home)</h2>
                     <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Título da Seção (ex: Serviços)</label>
                        <input type="text" name="servicesSectionTitle" value={sectionsData.servicesSectionTitle} onChange={handleSectionsChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Subtítulo da Seção</label>
                        <input type="text" name="servicesSectionSubtitle" value={sectionsData.servicesSectionSubtitle} onChange={handleSectionsChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                </div>
                
                {message && <p className="text-sm text-green-600 my-4">{message}</p>}

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-sky-400"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Salvando...' : 'Salvar Todas as Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeroEditorPage;
