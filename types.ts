export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
}

export interface HeroContent {
  mainTitle: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

export interface HomePageSection {
  _id: string;
  title: string;
  subtitle?: string;
  content?: string;
  type: "text" | "services";
  order: number;
  visible: boolean;
}

export interface AboutPageContent {
  preTitle: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  paragraph1: string;
  paragraph2: string;
}

export interface SiteSettings {
  logoType: "text" | "image";
  logoTextLine1: string;
  logoTextLine2: string;
  logoImageUrl: string;
}
