
// --- MOCK SERVICE FOR DYNAMIC CONTENT ---
// In a real application, this file would make API calls to your backend.
// For this simulation, we use localStorage to persist the data.

import type { HeroContent, HomeSectionsContent, AboutPageContent } from '../types';

const HERO_CONTENT_KEY = 'gtecdrone_hero_content';
const HOME_SECTIONS_CONTENT_KEY = 'gtecdrone_home_sections_content';
const ABOUT_PAGE_CONTENT_KEY = 'gtecdrone_about_page_content';

// Seed data from original hardcoded content
const seedHeroData: HeroContent = {
    mainTitle: "Gtec Drone",
    subtitle: "Topografia & Agrimensura",
    description: "Serviços de Topografia, Agrimensura e Georreferenciamento",
    buttonText: "Ligue Agora",
    buttonLink: "tel:+5569984318944",
    imageUrl: "https://images.pexels.com/photos/5473185/pexels-photo-5473185.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
};

const seedHomeSectionsData: HomeSectionsContent = {
    aboutSectionTitle: "Sobre",
    aboutSectionSubtitle: "Compromisso com a Precisão e a Qualidade",
    aboutSectionText: "Jacson presta serviços de topografia, agrimensura, georreferenciamento de imóvel rural, retificação de área, usucapião, levantamento topográfico planialtimétrico para projetos de infraestrutura, de regularização fundiária, loteamentos, regularização ambiental, etc. A empresa se destaca por prestar serviços direcionados a exigência e a necessidade de cada cliente de forma exclusiva e personalizada.",
    servicesSectionTitle: "Serviços",
    servicesSectionSubtitle: "Soluções Completas para sua Necessidade",
};

const seedAboutPageData: AboutPageContent = {
    preTitle: "Sobre",
    title: "Jacson Topografia & Agrimensura",
    subtitle: "Excelência e precisão em cada projeto.",
    imageUrl: "https://adenilsongiovanini.com.br/blog/wp-content/uploads/2021/06/rtk-topografia-768x670.png",
    paragraph1: "Jacson presta serviços de topografia, agrimensura, georreferenciamento de imóvel rural, retificação de área, usucapião, levantamento topográfico planialtimétrico para projetos de infra estrutura, de regularização fundiária, loteamentos, regularização ambiental, etc.",
    paragraph2: "Jacson se destaca por prestar serviços direcionados a exigência e a necessidade de cada cliente de forma exclusiva e personalizada. Utilizamos equipamentos de última geração e uma equipe altamente qualificada para garantir a máxima precisão e confiabilidade em todos os nossos levantamentos e projetos.",
};

const initializeData = () => {
    if (!localStorage.getItem(HERO_CONTENT_KEY)) {
        localStorage.setItem(HERO_CONTENT_KEY, JSON.stringify(seedHeroData));
    }
    if (!localStorage.getItem(HOME_SECTIONS_CONTENT_KEY)) {
        localStorage.setItem(HOME_SECTIONS_CONTENT_KEY, JSON.stringify(seedHomeSectionsData));
    }
    if (!localStorage.getItem(ABOUT_PAGE_CONTENT_KEY)) {
        localStorage.setItem(ABOUT_PAGE_CONTENT_KEY, JSON.stringify(seedAboutPageData));
    }
};

initializeData();

// --- Hero Content ---
export const getHeroContent = async (): Promise<HeroContent> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = localStorage.getItem(HERO_CONTENT_KEY);
            resolve(data ? JSON.parse(data) : seedHeroData);
        }, 200);
    });
};

export const updateHeroContent = async (content: HeroContent): Promise<HeroContent> => {
    return new Promise(resolve => {
        setTimeout(() => {
            localStorage.setItem(HERO_CONTENT_KEY, JSON.stringify(content));
            resolve(content);
        }, 500);
    });
};

// --- Home Page Sections ---
export const getHomeSectionsContent = async (): Promise<HomeSectionsContent> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = localStorage.getItem(HOME_SECTIONS_CONTENT_KEY);
            resolve(data ? JSON.parse(data) : seedHomeSectionsData);
        }, 200);
    });
};

export const updateHomeSectionsContent = async (content: HomeSectionsContent): Promise<HomeSectionsContent> => {
    return new Promise(resolve => {
        setTimeout(() => {
            localStorage.setItem(HOME_SECTIONS_CONTENT_KEY, JSON.stringify(content));
            resolve(content);
        }, 500);
    });
};

// --- About Page Content ---
export const getAboutPageContent = async (): Promise<AboutPageContent> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = localStorage.getItem(ABOUT_PAGE_CONTENT_KEY);
            resolve(data ? JSON.parse(data) : seedAboutPageData);
        }, 200);
    });
};

export const updateAboutPageContent = async (content: AboutPageContent): Promise<AboutPageContent> => {
     return new Promise(resolve => {
        setTimeout(() => {
            localStorage.setItem(ABOUT_PAGE_CONTENT_KEY, JSON.stringify(content));
            resolve(content);
        }, 500);
    });
};
