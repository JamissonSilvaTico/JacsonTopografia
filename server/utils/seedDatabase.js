import User from "../models/User.js";
import Service from "../models/Service.js";
import HeroContent from "../models/HeroContent.js";
import HomePageSection from "../models/HomePageSection.js";
import AboutPageContent from "../models/AboutPageContent.js";
import SiteSettings from "../models/SiteSettings.js";
import Company from "../models/Company.js";
import { seedServices } from "../data/seedData.js";

const seedHeroContent = {
  mainTitle: "jacson",
  subtitle: "Topografia & Agrimensura",
  description: "Serviços de Topografia, Agrimensura e Georreferenciamento",
  buttonText: "Ligue Agora",
  buttonLink: "tel:+5569981191606",
  imageUrl:
    "https://images.pexels.com/photos/5473185/pexels-photo-5473185.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
};

const seedHomePageSections = [
  {
    title: "Sobre",
    subtitle: "Compromisso com a Precisão e a Qualidade",
    content:
      "Jacson presta serviços de topografia, agrimensura, georreferenciamento de imóvel rural, retificação de área, usucapião, levantamento topográfico planialtimétrico para projetos de infraestrutura, de regularização fundiária, loteamentos, regularização ambiental, etc. A empresa se destaca por prestar serviços direcionados a exigência e a necessidade de cada cliente de forma exclusiva e personalizada.",
    type: "text",
    order: 1,
    visible: true,
  },
  {
    title: "Serviços",
    subtitle: "Soluções Completas para sua Necessidade",
    type: "services",
    order: 2,
    visible: true,
  },
];

const seedAboutPageData = {
  preTitle: "Sobre",
  title: "Jacson Topografia & Agrimensura",
  subtitle: "Excelência e precisão em cada projeto.",
  imageUrl:
    "https://adenilsongiovanini.com.br/blog/wp-content/uploads/2021/06/rtk-topografia-768x670.png",
  paragraph1:
    "Jacson presta serviços de topografia, agrimensura, georreferenciamento de imóvel rural, retificação de área, usucapião, levantamento topográfico planialtimétrico para projetos de infra estrutura, de regularização fundiária, loteamentos, regularização ambiental, etc.",
  paragraph2:
    "Jacson se destaca por prestar serviços direcionados a exigência e a necessidade de cada cliente de forma exclusiva e personalizada. Utilizamos equipamentos de última geração e uma equipe altamente qualificada para garantir a máxima precisão e confiabilidade em todos os nossos levantamentos e projetos.",
};

const seedSiteSettings = {
  logoType: "text",
  logoTextLine1: "Jacson",
  logoTextLine2: "Topografia & Agrimensura",
  logoImageUrl: "",
};

const seedCompanies = [
  {
    name: "Cachet",
    order: 1,
    logoSvg: `<svg aria-label="Cachet logo" class="h-8 w-auto text-gray-600" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.5 27C20.4036 27 26 21.4036 26 14.5C26 7.59644 20.4036 2 13.5 2C6.59644 2 1 7.59644 1 14.5C1 21.4036 6.59644 27 13.5 27Z" stroke="#96C177" stroke-width="2"/><path d="M8 14.5L12.0625 19L19 11" stroke="#96C177" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="32" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" fill="currentColor">Cachet</text></g></svg>`,
  },
  {
    name: "Guitar Center",
    order: 2,
    logoSvg: `<svg aria-label="Guitar Center logo" class="h-11 w-auto" viewBox="0 0 160 40" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M48.1,18.7c-0.1-0.9-0.5-1.7-1-2.4c-0.5-0.6-1.2-1.1-2-1.4c-0.8-0.3-1.6-0.5-2.5-0.5c-0.9,0-1.8,0.2-2.5,0.5 c-0.7,0.3-1.4,0.7-2,1.2c-0.6,0.5-1.1,1.2-1.4,2c-0.3,0.8-0.5,1.7-0.5,2.6c0,1.4,0.3,2.6,0.9,3.7c0.6,1.1,1.4,1.9,2.4,2.5 c0.5,0.3,0.9,0.5,1.4,0.7c-0.8,0.5-1.4,1.2-1.8,2c-0.4,0.8-0.6,1.8-0.6,2.8c0,1,0.2,2,0.6,2.9c0.4,0.9,0.9,1.7,1.6,2.3 c0.7,0.6,1.5,1,2.4,1.3c0.9,0.3,1.9,0.4,2.9,0.4c1.1,0,2.2-0.2,3.1-0.6c0.9-0.4,1.7-1,2.3-1.7c0.6-0.7,1.1-1.5,1.4-2.5 c0.3-0.9,0.4-2,0.4-3.1c0-0.9-0.2-1.8-0.5-2.6c-0.3-0.8-0.7-1.5-1.3-2.1c-0.5-0.6-1.2-1.1-1.8-1.4C47.8,20.5,48.1,19.7,48.1,18.7z M41.8,21.3c-0.6,0-1.1-0.2-1.4-0.6c-0.4-0.4-0.5-0.8-0.5-1.4c0-0.6,0.2-1.1,0.5-1.4c0.4-0.4,0.8-0.5,1.4-0.5c0.6,0,1.1,0.2,1.4,0.5 c0.4,0.4,0.5,0.8,0.5,1.4c0,0.6-0.2,1.1-0.5,1.4C42.9,21.1,42.4,21.3,41.8,21.3z M42.4,30.3c0.7,0,1.3,0.3,1.8,0.7 c0.4,0.4,0.7,1,0.7,1.8c0,0.7-0.2,1.3-0.7,1.8c-0.4,0.4-1.1,0.7-1.8,0.7c-0.7,0-1.3-0.3-1.8-0.7c-0.4-0.4-0.7-1-0.7-1.8 c0-0.7,0.2-1.3,0.7-1.8C41.1,30.5,41.7,30.3,42.4,30.3z M27.1,19.3L0.3,29.1l-9-21.7L20.6,0.5L27.1,19.3z M14.8,24.1 c-0.9,0-1.8-0.4-2.5-1.1c-0.7-0.7-1-1.6-1-2.6c0-1,0.3-1.9,1-2.6c0.7-0.7,1.6-1.1,2.5-1.1c0.9,0,1.8,0.4,2.5,1.1 c0.7,0.7,1,1.6,1,2.6c0,1-0.3,1.9-1,2.6C16.6,23.7,15.7,24.1,14.8,24.1z M58.1,25.2h5.2v2.3h-5.2V25.2z"/><text x="70" y="20" font-family="Impact, sans-serif" font-size="18">GUITAR</text><text x="70" y="38" font-family="Impact, sans-serif" font-size="18">CENTER</text></svg>`,
  },
  {
    name: "TOKICO",
    order: 3,
    logoSvg: `<svg aria-label="TOKICO logo" class="h-6 w-auto" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="bold" fill="#D9232D">TOKICO</text></svg>`,
  },
  {
    name: "Shopify",
    order: 4,
    logoSvg: `<svg aria-label="Shopify logo" class="h-12 w-auto" viewBox="0 0 81 94" xmlns="http://www.w3.org/2000/svg"><path fill="#96BF48" d="M72.93 24.64L52.36 4.06a8 8 0 00-5.65-2.42H34.28a8 8 0 00-5.66 2.42L8 24.64a8 8 0 00-5.59 5.65l-9 42.06A14.24 14.24 0 0013.84 84.18H55.69a14.24 14.24 0 0013.84-11.83l9-42.06a8 8 0 00-5.6-5.65z"/><path fill="#FFF" d="M58.74 48.88a18.25 18.25 0 01-19 17.26 3.61 3.61 0 110-7.22 11 11 0 0011.81-10 3.61 3.61 0 117.22 0zm-3.62-9.69a3.61 3.61 0 01-3.61 3.61A18.25 18.25 0 0132.48 25.53a3.61 3.61 0 117.22 0 11 11 0 0011.81 10 3.61 3.61 0 013.61 3.66z"/></svg>`,
  },
  {
    name: "profil rejser",
    order: 5,
    logoSvg: `<svg aria-label="Profil Rejser logo" class="h-10 w-auto text-black" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg"><text x="0" y="18" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="currentColor">profil</text><g transform="translate(54 5)"><circle cx="7" cy="7" r="6.5" stroke="currentColor" stroke-width="1.2" fill="none"/><ellipse cx="7" cy="7" rx="3" ry="6.5" stroke="currentColor" stroke-width="1.2" fill="none"/><line x1="0.5" y1="7" x2="13.5" y2="7" stroke="currentColor" stroke-width="1.2"/></g><text x="0" y="36" font-family="Arial, sans-serif" font-size="16" fill="currentColor">rejser</text></svg>`,
  },
];

const seedDatabase = async () => {
  try {
    // Seed Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("No users found, creating default admin user...");
      await User.create({
        username: "jacsonadmin",
        password: "Mudar@123",
      });
      console.log(
        "Admin user 'jacsonadmin' created. Please change this password after your first login."
      );
    }

    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log("No services found, seeding services...");
      await Service.insertMany(seedServices);
      console.log("Services seeded successfully.");
    }

    // Seed Hero Content
    const heroContentCount = await HeroContent.countDocuments();
    if (heroContentCount === 0) {
      console.log("No hero content found, seeding hero content...");
      await HeroContent.create(seedHeroContent);
      console.log("Hero content seeded successfully.");
    }

    // Seed Home Page Sections
    const homeSectionsCount = await HomePageSection.countDocuments();
    if (homeSectionsCount === 0) {
      console.log("No home page sections found, seeding...");
      await HomePageSection.insertMany(seedHomePageSections);
      console.log("Home page sections seeded successfully.");
    }

    // Seed About Page Content
    const aboutPageContentCount = await AboutPageContent.countDocuments();
    if (aboutPageContentCount === 0) {
      console.log("No about page content found, seeding...");
      await AboutPageContent.create(seedAboutPageData);
      console.log("About page content seeded successfully.");
    }

    // Seed Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      console.log("No site settings found, seeding...");
      await SiteSettings.create(seedSiteSettings);
      console.log("Site settings seeded successfully.");
    }

    // Seed Companies
    const companyCount = await Company.countDocuments();
    if (companyCount === 0) {
      console.log("No companies found, seeding companies...");
      await Company.insertMany(seedCompanies);
      console.log("Companies seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedDatabase;
