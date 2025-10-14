import User from "../models/User.js";
import Service from "../models/Service.js";
import HeroContent from "../models/HeroContent.js";
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

const seedDatabase = async () => {
  try {
    // Seed Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("No users found, creating admin user...");
      await User.create({
        username: "admin",
        password: "comamor",
      });
      console.log("Admin user created successfully.");
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
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedDatabase;
