import User from "../models/User.js";
import Service from "../models/Service.js";
import HeroContent from "../models/HeroContent.js";
import HomePageSection from "../models/HomePageSection.js";
import AboutPageContent from "../models/AboutPageContent.js";
import SiteSettings from "../models/SiteSettings.js";
import Company from "../models/Company.js";
import Project from "../models/Project.js";
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
  {
    title: "Empresas Parceiras",
    subtitle: "Confiança e credibilidade no mercado.",
    type: "companies",
    order: 3,
    visible: true,
  },
  {
    title: "Projetos",
    subtitle: "Conheça alguns dos nossos trabalhos",
    type: "projects",
    order: 4,
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
    logoUrl: "https://www.vectorlogo.zone/logos/cachethq/cachethq-ar21.svg",
  },
  {
    name: "Guitar Center",
    order: 2,
    logoUrl:
      "https://static.guitarcenter.com/static/gc/img/logo/gc_logo_black.svg",
  },
  {
    name: "TOKICO",
    order: 3,
    logoUrl: "https://i.imgur.com/6K8UmCl.png",
  },
  {
    name: "Shopify",
    order: 4,
    logoUrl: "https://www.vectorlogo.zone/logos/shopify/shopify-ar21.svg",
  },
  {
    name: "Profil Rejser",
    order: 5,
    logoUrl: "https://www.profilrejser.dk/images/logo-profil-rejser.svg",
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

    // Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log("No projects found, project collection is empty.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedDatabase;
