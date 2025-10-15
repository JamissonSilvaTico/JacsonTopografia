import type { HomePageSection } from "../types";

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
  if (response.status === 204) return null;
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Falha ao gerenciar seções.");
  }
  return response.json();
};

// Public: Fetches only visible sections
export const getHomePageSections = async (): Promise<HomePageSection[]> => {
  const response = await fetch("/api/home-sections");
  return handleResponse(response);
};

// Admin: Fetches all sections
export const getAllHomePageSections = async (): Promise<HomePageSection[]> => {
  const response = await fetch("/api/home-sections/all", {
    headers: getAuthHeader(),
  });
  return handleResponse(response);
};

export const addHomePageSection = async (
  sectionData: Omit<HomePageSection, "_id" | "type">
): Promise<HomePageSection> => {
  const response = await fetch("/api/home-sections", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(sectionData),
  });
  return handleResponse(response);
};

export const updateHomePageSection = async (
  id: string,
  sectionData: Partial<HomePageSection>
): Promise<HomePageSection> => {
  const response = await fetch(`/api/home-sections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(sectionData),
  });
  return handleResponse(response);
};

export const deleteHomePageSection = async (id: string): Promise<void> => {
  const response = await fetch(`/api/home-sections/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  await handleResponse(response);
};
