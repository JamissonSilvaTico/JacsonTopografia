import type { HeroContent, AboutPageContent } from "../types";

const SESSION_TOKEN_KEY = "gtecdrone_session_token";

const getAuthToken = (): string | null => {
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
};

const getAuthHeader = (): Record<string, string> => {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Falha ao buscar dados.");
  }
  return response.json();
};

// --- Hero Content ---
export const getHeroContent = async (): Promise<HeroContent> => {
  const response = await fetch("/api/content/hero");
  return handleResponse(response);
};

export const updateHeroContent = async (
  content: HeroContent
): Promise<HeroContent> => {
  const response = await fetch("/api/content/hero", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(content),
  });
  return handleResponse(response);
};

// --- About Page Content ---
export const getAboutPageContent = async (): Promise<AboutPageContent> => {
  const response = await fetch("/api/content/aboutpage");
  return handleResponse(response);
};

export const updateAboutPageContent = async (
  content: AboutPageContent
): Promise<AboutPageContent> => {
  const response = await fetch("/api/content/aboutpage", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(content),
  });
  return handleResponse(response);
};
